import { GetServerSideProps } from "next";
import { getData, updateCount } from "../../data/data";

export default function UrlRedirect() {
  // only redirects, no content
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { urlRedirect } = query;
  const data = await getData();
  const link = data.find((link) => urlRedirect === link.raw_shortened_path_id);

  if (!link) {
    return {
      notFound: true,
    };
  }

  await updateCount(link.raw_shortened_path_id);

  return {
    redirect: {
      destination: link.uri,
      permanent: false,
    },
  };
};
