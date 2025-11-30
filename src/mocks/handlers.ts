import { http, HttpResponse } from "msw";
import { trades } from "./tradesConst";

export const handlers = [
  http.get("http://localhost:5173/api/trades", () => {
    return HttpResponse.json(trades);
  }),
  http.put("http://localhost:5173/api/trade/:id", (res) => {
    return HttpResponse.json(res);
  }),
  http.post("http://localhost:5173/api/trade", (res) => {
    return HttpResponse.json(res);
  }),
];
