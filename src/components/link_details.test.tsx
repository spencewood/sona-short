import { fireEvent, render } from "@testing-library/react";
import { ILink } from "../data/link.interface";
import LinkDetails from "./link_details";

const testData: ILink = {
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
};

describe("Link Details", () => {
  test("fires navigate for external link", () => {
    const onNavigate = jest.fn();
    const { getByText } = render(
      <LinkDetails link={testData} onNavigate={onNavigate} />
    );

    const newWindowLink = getByText("open_in_new");

    fireEvent.click(newWindowLink);

    expect(onNavigate).toHaveBeenCalled();
  });
});
