import { Box, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useTradesStore, type ITrade } from "../store/useTradesStore";
import { isBefore, startOfDay } from "date-fns";

export default function Trade() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateTrade, data: trades } = useTradesStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITrade>();
  const trade: ITrade | undefined = location.state;
  const isEdit = trade ? true : false;
  const remoteTrade = isEdit ? trades.find((t) => t.id === trade?.id) : null;
  const onSubmit: SubmitHandler<ITrade> = (data) => {
    if (isEdit && remoteTrade?.version === Number(data.version)) {
      const isVersionConfirmed = confirm(
        "Do you want to override same version to updated trade?"
      );
      if (isVersionConfirmed) {
        updateTrade({ ...data, createdDate: trade?.createdDate });
        navigate("/trades");
      }
    } else {
      updateTrade({ ...data, createdDate: trade?.createdDate });
    }
  };

  const validateVersionIsGreaterOrEqual = (value: number) => {
    if (!isEdit) return true;
    if (remoteTrade && remoteTrade.version > Number(value)) {
      return "Updated Vesrion should be greater than or equal to save version";
    }
    return true;
  };

  const validateMaturityGreaterEqualToday = (value: Date) => {
    const isValid = isBefore(startOfDay(value), startOfDay(new Date()));
    if (isValid) {
      return "Maturity Date should be greater or equal to today's date";
    }
    return true;
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
      >
        {trade ? "Edit Trade" : "Add Trade"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <span>Trade Id: </span>
          <input
            disabled={isEdit}
            defaultValue={trade ? trade.id : ""}
            {...register("id", { required: true })}
          />
          {errors.id && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>
        <div>
          <span>Version: </span>
          <input
            defaultValue={trade ? trade.version : ""}
            {...register("version", {
              required: "This field is required",
              validate: validateVersionIsGreaterOrEqual,
            })}
          />
          {errors.version && (
            <span style={{ color: "red" }}>{errors.version.message}</span>
          )}
        </div>
        <div>
          <span>Counter Party Id: </span>
          <input
            defaultValue={trade ? trade.counterPartyId : ""}
            {...register("counterPartyId", { required: true })}
          />
          {errors.counterPartyId && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>
        <div>
          <span>Book Id: </span>
          <input
            defaultValue={trade ? trade.bookId : ""}
            {...register("bookId", { required: true })}
          />
          {errors.bookId && (
            <span style={{ color: "red" }}>This field is required</span>
          )}
        </div>
        <div>
          <span>Maturity Date (yyyy-MM-dd e.g. 2025-11-30): </span>
          <input
            defaultValue={trade ? trade.maturityDate + "" : ""}
            {...register("maturityDate", {
              required: "This field is required",
              validate: validateMaturityGreaterEqualToday,
            })}
          />
          {errors.maturityDate && (
            <span style={{ color: "red" }}>{errors.maturityDate.message}</span>
          )}
        </div>
        <input type="submit" />
      </form>
    </Box>
  );
}
