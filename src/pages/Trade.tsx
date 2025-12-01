import { Box, Typography } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useTradesStore, type ITrade } from "../store/useTradesStore";
import { isBefore, startOfDay } from "date-fns";
import { BASE } from "../mocks/tradesConst";

export default function Trade() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateRemoteTrade, addRemoteTrade, data: trades } = useTradesStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITrade>({ mode: "onSubmit" });
  const trade: ITrade | undefined = location.state;
  const isEdit = trade ? true : false;
  const remoteTrade =
    isEdit && trades ? trades?.find((t) => t.id === trade?.id) : null;

  const onSubmit: SubmitHandler<ITrade> = async (data) => {
    if (isEdit) {
      if (Number(remoteTrade?.version) === Number(data.version)) {
        const isVersionConfirmed = confirm(
          "Do you want to override same version to updated trade?"
        );
        if (isVersionConfirmed) {
          await updateRemoteTrade({
            ...data,
            createdDate: trade?.createdDate,
          });
          navigate(BASE + "trades");
        }
      } else {
        await updateRemoteTrade({ ...data, createdDate: trade?.createdDate });
        navigate(BASE + "/trades");
      }
    } else {
      await addRemoteTrade({ ...data, createdDate: startOfDay(new Date()) });
      navigate(BASE + "/trades");
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

  const validateTradeId = (value: string) => {
    if (isEdit) return true;
    const existingTrade = trades.find((t) => t.id === value);
    if (existingTrade)
      return "Trade Id already exists. Please enter another trade id.";
    return true;
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: "center", mt: 3, mb: 3 }}
        data-testid="tradeHeader"
      >
        {trade ? "Edit Trade" : "Add Trade"}
      </Typography>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>
              Trade Id:
              <input
                data-testid="id"
                disabled={isEdit}
                defaultValue={trade ? trade.id : ""}
                {...register("id", {
                  required: "This field is required",
                  validate: validateTradeId,
                })}
              />
            </label>
            {errors.id && (
              <span style={{ color: "red" }} data-testid="idError">
                {errors.id.message}
              </span>
            )}
          </div>
          <div>
            <label>
              Version:
              <input
                data-testid="version"
                defaultValue={trade ? trade.version : ""}
                {...register("version", {
                  required: "This field is required",
                  validate: validateVersionIsGreaterOrEqual,
                })}
              />
            </label>
            {errors.version && (
              <span style={{ color: "red" }} data-testid="versionError">
                {errors.version.message}
              </span>
            )}
          </div>
          <div>
            <label>
              Counter Party Id:
              <input
                data-testid="couterPartyId"
                defaultValue={trade ? trade.counterPartyId : ""}
                {...register("counterPartyId", { required: true })}
              />
              {errors.counterPartyId && (
                <span style={{ color: "red" }} data-testid="couterPartyIdError">
                  This field is required
                </span>
              )}
            </label>
          </div>
          <div>
            <label>
              Book Id:
              <input
                data-testid="bookId"
                defaultValue={trade ? trade.bookId : ""}
                {...register("bookId", { required: true })}
              />
            </label>
            {errors.bookId && (
              <span style={{ color: "red" }} data-testid="bookIdError">
                This field is required
              </span>
            )}
          </div>
          <div>
            <label>
              Maturity Date (yyyy-MM-dd e.g. 2025-11-30):
              <input
                data-testid="maturityDate"
                defaultValue={trade ? trade.maturityDate + "" : ""}
                {...register("maturityDate", {
                  required: "This field is required",
                  validate: validateMaturityGreaterEqualToday,
                })}
              />
            </label>
            {errors.maturityDate && (
              <span style={{ color: "red" }} data-testid="maturityDateError">
                {errors.maturityDate.message}
              </span>
            )}
          </div>
          <input type="submit" data-testid="tradeSubmit" />
        </form>
      </div>
    </Box>
  );
}
