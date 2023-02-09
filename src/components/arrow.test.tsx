import { render } from "@testing-library/react";
import { SortDirection } from "../util/sort";
import Arrow from "./arrow";

describe("Arrow component", () => {
  test("no show", () => {
    const { container } = render(
      <Arrow show={false} direction={SortDirection.Ascending} />
    );
    expect(container.firstChild).toBeNull();
  });

  test("ascending", () => {
    const { getByText } = render(
      <Arrow show={true} direction={SortDirection.Ascending} />
    );
    expect(getByText("arrow_drop_down")).toBeDefined();
  });

  test("descending", () => {
    const { getByText } = render(
      <Arrow show={true} direction={SortDirection.Descending} />
    );
    expect(getByText("arrow_drop_up")).toBeDefined();
  });
});
