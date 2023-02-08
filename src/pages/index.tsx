import { Inter } from "@next/font/google";
import links from "../../public/links.json";
import LinksTable from "../components/links_table";
import UrlForm from "../components/url_form";
import { ILink } from "../data/link.interface";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ links }: { links: ILink[] }) {
  return (
    <div>
      <div>
        <UrlForm />
      </div>
      <LinksTable links={links} />
    </div>
  );
}

export const getServerSideProps = () => {
  return {
    props: {
      links,
    },
  };
};
