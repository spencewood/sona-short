import mock from "mock-fs";
import { appendLink } from "../../../src/data/data";
import handler from '../../../src/pages/api/link';

jest.mock("nanoid", () => {
  return { nanoid: () => "1234" };
});

jest.mock("../../../src/data/data");

afterEach(() => {
  mock.restore();
});

const res: any = {
  status: jest.fn(function() { return this }),
  setHeader: jest.fn(function() { return this }),
  send: jest.fn(),
  json: jest.fn(),
};

describe("link api", () => {
  test("returns 400 if incorrect method", async () => {
    mock({});
    await handler({ method: "GET" } as never, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test("appends link on POST", async () => {
    mock({});
    await handler({ method: "POST", body: "https://test.com" } as never, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(appendLink).toHaveBeenCalledWith(expect.objectContaining({
      count: 0,
      uri: "https://test.com"
    }));
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      count: 0,
      uri: "https://test.com"
    }));
  });
})