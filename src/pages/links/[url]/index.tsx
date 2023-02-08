import LinkDetails from "@/components/link_details";
import { ILink } from "@/data/link.interface";
import { GetServerSideProps } from "next";
import links from "../../../../public/links.json";

export default function Url({ link }: { link: ILink }) {
  return <LinkDetails link={link} />;
}

export const getServerSideProps: GetServerSideProps<{ link: ILink }> = async ({
  query,
}) => {
  const { url } = query;
  const link = links.find((link) => url === link.raw_shortened_path_id);

  if (!link) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      link,
    },
  };
};
