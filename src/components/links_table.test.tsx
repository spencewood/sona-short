import { fireEvent, render } from "@testing-library/react";
import { ILink } from "../data/link.interface";
import LinksTable from "./links_table";

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

describe("Links Table", () => {
  test("sorts by count", () => {
    const onNavigate = jest.fn();
    const { container, getByText } = render(
      <LinksTable links={testData} onNavigate={onNavigate} />
    );

    const rows = container.querySelectorAll("table tbody tr");

    expect(rows[0].querySelectorAll("td")[2]).toHaveTextContent("11");

    const countColumn = getByText("Count");

    fireEvent.click(countColumn);

    const newRows = container.querySelectorAll("table tbody tr");

    expect(newRows[0].querySelectorAll("td")[2]).toHaveTextContent("66");
  });

  test("sorts by date", () => {
    const onNavigate = jest.fn();
    const { container, getByText } = render(
      <LinksTable links={testData} onNavigate={onNavigate} />
    );

    const rows = container.querySelectorAll("table tbody tr");

    expect(rows[0].querySelectorAll("td")[3]).toHaveTextContent("2022-02-28");

    const dateColumn = getByText("Date Created");

    fireEvent.click(dateColumn);

    const newRows = container.querySelectorAll("table tbody tr");

    expect(newRows[0].querySelectorAll("td")[3]).toHaveTextContent(
      "2022-02-26"
    );
  });

  test("fires navigate for external link", () => {
    const onNavigate = jest.fn();
    const { getAllByText } = render(
      <LinksTable links={testData} onNavigate={onNavigate} />
    );

    const newWindowLinks = getAllByText("open_in_new");

    fireEvent.click(newWindowLinks[0]);

    expect(onNavigate).toHaveBeenCalledWith("xdydumfi");
  });
});
