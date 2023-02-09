import mock from "mock-fs";
import { appendLink, getData, updateCount } from "./data";

const testData = {
  id: "test123",
  scheme: "https",
  path: "/",
  raw_shortened_path_id: "abc123",
  root: "www.test.com",
  shortened_path: "/abc123",
  shortened_uri: "http://localhost:8080/abc123",
  uri: "https://www.test.com",
  count: 91,
  created_date: "2023-02-09",
};

afterEach(() => {
  mock.restore();
});

describe("getData", () => {
  test("gets defaults data if no tmp file", async () => {
    mock({});
    const data = await getData();
    expect(data).toHaveLength(11); // original json doc size
  });
});

describe("appendLink", () => {
  test("adds a link", async () => {
    mock({});
    await appendLink(testData);
    const data = await getData();
    expect(data).toHaveLength(12);
  });
});

describe("updateCount", () => {
  test("updates count", async () => {
    mock({
      "/tmp/links.json": JSON.stringify([
        {
          id: "test123",
          scheme: "https",
          path: "/",
          raw_shortened_path_id: "abc123",
          root: "www.test.com",
          shortened_path: "/abc123",
          shortened_uri: "http://localhost:8080/abc123",
          uri: "https://www.test.com",
          count: 91,
          created_date: "2023-02-09",
        },
      ]),
    });
    const originalData = await getData();
    const originalLink = originalData.find(
      (link) => link.raw_shortened_path_id === "abc123"
    );
    await updateCount("abc123");
    const newData = await getData();
    const newLink = newData.find(
      (link) => link.raw_shortened_path_id === "abc123"
    );

    expect(newLink?.count).toEqual((originalLink?.count ?? 0) + 1);
  });
});
