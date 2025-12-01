import { http, HttpResponse } from "msw";
import { API_URL, trades } from "./tradesConst";

export const handlers = [
  http.get(API_URL + "/api/trades", () => {
    return HttpResponse.json(trades);
  }),
  http.put(API_URL + "/api/trade/:id", (res) => {
    return HttpResponse.json(res);
  }),
  http.post(API_URL + "/api/trade", (res) => {
    return HttpResponse.json(res);
  }),
];
