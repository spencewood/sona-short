import mock from "mock-fs";
import handler from '../../../src/pages/api/links';

afterEach(() => {
  mock.restore();
});

const res: any = {
  status: jest.fn(function() { return this }),
  setHeader: jest.fn(function() { return this }),
  send: jest.fn(),
};

describe("links api", () => {
  test("returns a links", async () => {
    mock({});
    await handler(null as never, res);
    expect(res.send).toHaveBeenCalledWith(expect.stringContaining('"id": "2L0snzEcSV5M9bmAP0ywP8lHXMl"'));
  });
})