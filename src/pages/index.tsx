import { useState } from "react";
import Download from "../components/download";
import LinksTable from "../components/links_table";
import UrlForm from "../components/url_form";
import { getData } from "../data/data";
import { ILink } from "../data/link.interface";

export default function Home({ links }: { links: ILink[] }) {
  const [localLinks, setLocalLinks] = useState(links);

  const addLink = (link: ILink) => {
    setLocalLinks((prev) => [link, ...prev]);
  };

  const updateCount = (id: string) => {
    setLocalLinks(
      localLinks.map((link) => {
        if (link.raw_shortened_path_id === id) {
          return {
            ...link,
            count: link.count + 1,
          };
        }
        return link;
      })
    );
  };

  return (
    <div className="">
      <div className="flex flex-column justify-center items-center">
        <div className="relative px-6 lg:px-8 bg-gray-100 w-full lg:w-3/6 p-2 py-10 text-xl drop-shadow-md rounded">
          <UrlForm onAdd={addLink} />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="py-10">
          <div className="flex justify-end w-full py-2">
            <Download />
          </div>
          <LinksTable links={localLinks} onNavigate={updateCount} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const data = await getData();
  return {
    props: {
      links: data,
    },
  };
};
