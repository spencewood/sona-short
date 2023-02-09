import { ILink } from "../data/link.interface";
import { flipDirection, sort, SortDirection } from "./sort";

const testData: ILink[] = [
  {
    id: "2L0snzEcSV5M9bmAP0ywP8lHXMl",
    scheme: "https",
    path: "/search",
    raw_shortened_path_id: "f2u9mqhb",
    root: "www.google.com",
    shortened_path: "/f2u9mqhb",
    shortened_uri: "http://localhost:8080/f2u9mqhb",
    uri: "https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69 i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8",
    count: 66,
    created_date: "2022-02-26",
  },
  {
    id: "2LBYFaB5DHNXNDSlmKtLVLBfxxJ",
    scheme: "https",
    path: "/watch",
    raw_shortened_path_id: "xdydumfi",
    root: "www.youtube.com",
    shortened_path: "/xdydumfi",
    shortened_uri: "http://localhost:8080/xdydumfi",
    uri: "https://www.youtube.com/watch?v=qe1kjT5xn4s",
    count: 11,
    created_date: "2022-02-28",
  },
];

describe("sort", () => {
  test("returns the same list", () => {
    expect(sort(testData, "scheme", SortDirection.Ascending)).toHaveLength(2);
  });

  test("sorts list by key", () => {
    expect(
      sort(testData, "created_date", SortDirection.Ascending)[0].created_date
    ).toBe("2022-02-28");
    expect(
      sort(testData, "created_date", SortDirection.Descending)[0].created_date
    ).toBe("2022-02-26");
    expect(sort(testData, "count", SortDirection.Ascending)[0].count).toBe(66);
    expect(sort(testData, "count", SortDirection.Descending)[0].count).toBe(11);
  });
});

describe("flipDirection", () => {
  test("flips sort direction", () => {
    expect(flipDirection(SortDirection.Ascending)).toBe(
      SortDirection.Descending
    );
    expect(flipDirection(SortDirection.Descending)).toBe(
      SortDirection.Ascending
    );
  });
});
