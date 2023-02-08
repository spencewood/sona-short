import { Inter } from "@next/font/google";
import { useState } from "react";
import Download from "../components/download";
import LinksTable from "../components/links_table";
import UrlForm from "../components/url_form";
import { getData } from "../data/data";
import { ILink } from "../data/link.interface";

const inter = Inter({ subsets: ["latin"] });

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
    <div>
      <div>
        <UrlForm onAdd={addLink} />
      </div>
      <Download />
      <LinksTable links={localLinks} onNavigate={updateCount} />
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
