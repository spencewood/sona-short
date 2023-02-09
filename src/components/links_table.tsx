import Link from "next/link";
import { useState } from "react";
import { ILink } from "../data/link.interface";
import { flipDirection, sort, SortDirection } from "../util/sort";
import Arrow from "./arrow";

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

  const navigate = (id: string) => (_e: React.MouseEvent) => {
    onNavigate(id);
  };

  const sortedList = sort(links, sortBy, sortDirection);

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left hidden md:table-cell">Url</th>
          <th className="px-4 py-2 text-left">Shorted Url</th>
          <th className="px-4 py-2 text-left">
            <div className="flex items-center justify-center">
              <button onClick={setSort(SortBy.Count)}>Count</button>
              <Arrow show={sortBy === SortBy.Count} direction={sortDirection} />
            </div>
          </th>
          <th className="px-4 py-2 text-left">
            <div className="flex items-center justify-center">
              <button onClick={setSort(SortBy.CreatedDate)}>
                Date Created
              </button>
              <Arrow
                show={sortBy === SortBy.CreatedDate}
                direction={sortDirection}
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedList.map((link, idx) => (
          <tr key={link.id} className={idx % 2 === 0 ? "bg-gray-100" : ""}>
            <td className="border px-2 lg:px-4 py-2 flex items-center hidden md:table-cell">
              <div className="max-w-xs lg:max-w-2xl truncate">
                <Link
                  href={`/links/${link.raw_shortened_path_id}`}
                  className="hover:text-teal-800"
                >
                  {link.uri}
                </Link>
              </div>
            </td>
            <td className="border px-2 lg:px-4">
              <div className="flex">
                <div className="truncate max-w-[100px] lg:max-w-fit">
                  <Link
                    href={`/links/${link.raw_shortened_path_id}`}
                    className="hover:text-teal-800"
                  >
                    {link.shortened_uri}
                  </Link>
                </div>
                <Link
                  href={`/${link.raw_shortened_path_id}`}
                  onClick={navigate(link.raw_shortened_path_id)}
                  target="_blank"
                >
                  <span className="material-symbols-outlined md-18 pl-1">
                    open_in_new
                  </span>
                </Link>
              </div>
            </td>
            <td className="border px-2 lg:px-4 py-2">{link.count}</td>
            <td className="border px-2 lg:px-4 py-2">{link.created_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinksTable;
