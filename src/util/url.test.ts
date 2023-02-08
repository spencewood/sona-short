import { getPath, getRoot, getScheme, isValidUri } from "./url";

describe("isValidUri", () => {
  test("matches correct url", () => {
    expect(isValidUri("https://google.com")).toBe(true);
    expect(isValidUri("http://www.google.com")).toBe(true);
    expect(isValidUri("http://test.com:8080")).toBe(true);
    expect(isValidUri("www.google.com")).toBe(false);
    expect(isValidUri("https://google")).toBe(true);
  });
});

describe("getScheme", () => {
  test("gets correct scheme", () => {
    expect(getScheme("https://google.com")).toEqual("https");
    expect(getScheme("http://google.com")).toEqual("http");
    expect(getScheme("google.com")).toEqual("");
  });
});

describe("getPath", () => {
  test("gets correct path", () => {
    expect(getPath("https://google.com")).toEqual("/");
    expect(getPath("http://google.com")).toEqual("/");
    expect(getPath("google.com")).toEqual("");
    expect(getPath("https://google.com/test")).toEqual("/test");
    expect(getPath("https://google.com/test?a=123")).toEqual("/test");
    expect(getPath("https://upstash.com/#section-pricing")).toEqual(
      "/#section-pricing"
    );
  });
});

describe("getRoot", () => {
  test("returns correct root", () => {
    expect(getRoot("https://google.com")).toEqual("google.com");
    expect(getRoot("google.com")).toEqual("");
    expect(getRoot("https://google.com/test")).toEqual("google.com");
    expect(
      getRoot(
        "https://github.com/code-423n4/2022-01-canto-identity/blob/main/src/CidNFT.sol"
      )
    ).toEqual("github.com");
  });
});
