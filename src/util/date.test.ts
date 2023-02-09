import { getSimpleDate } from "./date";

describe("simple date", () => {
  test("returns the right format", () => {
    expect(getSimpleDate(new Date(2020, 0, 20))).toEqual("2020-01-20");
    expect(getSimpleDate(new Date(2022, 2, 2))).toEqual("2022-03-02");
  });
});
