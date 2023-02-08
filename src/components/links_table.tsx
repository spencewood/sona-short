import Link from "next/link";
import { useState } from "react";
import { ILink } from "../data/link.interface";
import { flipDirection, sort, SortDirection } from "../util/sort";

enum SortBy {
  Count = "count",
  CreatedDate = "created_date",
}

const LinksTable = ({
  links,
  onNavigate,
}: {
  links: ILink[];
  onNavigate: (id: string) => void;
}) => {
  const [sortBy, setSortBy] = useState(SortBy.CreatedDate);
  const [sortDirection, setSortDirection] = useState(SortDirection.Ascending);

  const setSort = (newSortBy: SortBy) => (e: React.MouseEvent) => {
    e.preventDefault();

    if (sortBy === newSortBy) {
      setSortDirection((sortDir) => flipDirection(sortDir));
    }

    setSortBy(newSortBy);
  };

  const navigate = (id: string) => (e: React.MouseEvent) => {
    onNavigate(id);
  };

  const sortedList = sort(links, sortBy, sortDirection);

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Shortened Url</th>
          <th className="px-4 py-2">
            <a href="" onClick={setSort(SortBy.Count)}>
              Count
            </a>
          </th>
          <th className="px-4 py-2">
            <a href="" onClick={setSort(SortBy.CreatedDate)}>
              Date Created
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedList.map((link, idx) => (
          <tr key={link.id} className={idx % 2 === 0 ? "bg-gray-100" : ""}>
            <td className="border px-4 py-2">
              <Link href={`/links/${link.raw_shortened_path_id}`}>
                {link.shortened_uri}
              </Link>
              <Link
                href={`/${link.raw_shortened_path_id}`}
                onClick={navigate(link.raw_shortened_path_id)}
                target="_blank"
              >
                ex
              </Link>
            </td>
            <td className="border px-4 py-2">{link.count}</td>
            <td className="border px-4 py-2">{link.created_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinksTable;
