import LinkDetails from "@/components/link_details";
import { ILink } from "@/data/link.interface";
import { GetServerSideProps } from "next";
import { getData } from "../../../data/data";

export default function Url({ link }: { link: ILink }) {
  return <LinkDetails link={link} />;
}

export const getServerSideProps: GetServerSideProps<{ link: ILink }> = async ({
  query,
}) => {
  const { url } = query;
  const data = await getData();
  const link = data.find((link) => url === link.raw_shortened_path_id);

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
