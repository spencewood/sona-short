import Link from "next/link";
import { ILink } from "../data/link.interface";

const LinkDetails = ({
  link,
  onNavigate,
}: {
  link: ILink;
  onNavigate: () => void;
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full lg:w-2/3">
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <th className="px-4 py-2 bg-gray-100 text-right">id</th>
              <td className="border px-4 py-2">{link.id}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-100 text-right">scheme</th>
              <td className="border px-4 py-2">{link.scheme}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-100 text-right">
                shorted path id
              </th>
              <td className="border px-4 py-2">{link.raw_shortened_path_id}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-100 text-right">root</th>
              <td className="border px-4 py-2">{link.root}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-100 text-right">
                shortened path
              </th>
              <td className="border px-4 py-2">{link.shortened_path}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-100 text-right">
                shortened uri
              </th>
              <td className="border px-4 py-2">
                {link.shortened_uri}{" "}
                <Link
                  href={`/${link.raw_shortened_path_id}`}
                  onClick={onNavigate}
                  target="_blank"
                >
                  <span className="material-symbols-outlined md-18 pl-1">
                    open_in_new
                  </span>
                </Link>
              </td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-100 text-right">uri</th>
              <td className="border px-4 py-2 break-all">{link.uri}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-100 text-right">count</th>
              <td className="border px-4 py-2">{link.count}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-100 text-right">created date</th>
              <td className="border px-4 py-2">{link.created_date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinkDetails;
