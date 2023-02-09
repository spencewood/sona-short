import { fireEvent, render, waitFor } from "@testing-library/react";
import UrlForm from "./url_form";

(global as any).fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
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
      }),
    ok: true,
  })
);

beforeEach(() => {
  (global as any).fetch.mockClear();
});

describe("URL form", () => {
  test("incorrect uri", () => {
    const onAdd = jest.fn();
    const { getByRole, getByTestId, getByText } = render(
      <UrlForm onAdd={onAdd} />
    );

    const input = getByTestId("entry");
    const button = getByRole("button", { name: "Submit" });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(button);

    expect(getByText("Invalid URI")).toBeDefined();
    expect(onAdd).not.toHaveBeenCalled();
  });

  test("submit new uri", async () => {
    const onAdd = jest.fn();
    const { getByRole, getByTestId } = render(<UrlForm onAdd={onAdd} />);

    const input = getByTestId("entry");
    const button = getByRole("button", { name: "Submit" });

    fireEvent.change(input, { target: { value: "https://www.google.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/link", {
        body: "https://www.google.com",
        method: "POST",
      });
      expect(onAdd).toHaveBeenCalledWith(
        expect.objectContaining({
          root: "www.google.com",
        })
      );
    });
  });

  test("unable to add", async () => {
    (global as any).fetch.mockImplementationOnce(() =>
      Promise.reject("API is down")
    );

    const onAdd = jest.fn();
    const { getByRole, getByTestId, getByText } = render(
      <UrlForm onAdd={onAdd} />
    );

    const input = getByTestId("entry");
    const button = getByRole("button", { name: "Submit" });

    fireEvent.change(input, { target: { value: "https://www.google.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(getByText("Unable to register Link")).toBeDefined();
    });
  });
});
