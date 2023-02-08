import { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../data/data";
import { ILink } from "../../data/link.interface";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ILink[] | string>
) {
  const data = await getData();

  res.status(200).send(data);
}
