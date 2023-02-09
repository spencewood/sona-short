import mock from "mock-fs";
import { updateCount } from "../../src/data/data";
import { getServerSideProps } from '../../src/pages/[urlRedirect]';

jest.mock("../../src/data/data", () => {
  const original = jest.requireActual("../../src/data/data");
  return {
    ...original,
    updateCount: jest.fn(),
  }
})

afterEach(() => {
  mock.restore();
});

describe("urlRedirect", () => {
  test("not found", async () => {
    mock({});
    const res = await getServerSideProps({
      query: {
        urlRedirect: 'abc123',
      }
     } as never);
    
    expect((res as any).notFound).toBe(true);
  });

  test("redirects", async () => {
    mock({});
    const res = await getServerSideProps({
      query: {
        urlRedirect: '4a39lfml',
      }
     } as never);
    
    expect((res as any).redirect).toEqual({
      destination: "https://yearn.finance/vaults/factory",
      permanent: false
    });
  });

  test("increments count", async () => {
    mock({});
    const res = await getServerSideProps({
      query: {
        urlRedirect: '4a39lfml',
      }
     } as never);
     
    expect(updateCount).toHaveBeenCalledWith('4a39lfml');
  });
});