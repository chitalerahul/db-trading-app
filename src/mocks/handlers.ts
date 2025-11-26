import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:5173/api/trades", () => {
    return HttpResponse.json([
      {
        id: "T1",
        version: 1,
        counterPartyId: "CP-1",
        bookId: "B1",
        maturityDate: "26/11/2025",
        createdDate: new Date(),
        expired: false,
      },
      {
        id: "T2",
        version: 1,
        counterPartyId: "CP-1",
        bookId: "B1",
        maturityDate: "26/11/2025",
        createdDate: new Date(),
        expired: false,
      },
      {
        id: "T3",
        version: 1,
        counterPartyId: "CP-1",
        bookId: "B1",
        maturityDate: "26/11/2025",
        createdDate: new Date(),
        expired: false,
      },
    ]);
  }),
];
