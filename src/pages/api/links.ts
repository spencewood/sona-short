import { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../data/data";
import { ILink } from "../../data/link.interface";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ILink[] | string>
) {
  const data = await getData();

  res
    .status(200)
    .setHeader("Content-Type", "text/json")
    .setHeader("Content-disposition", "attachment; filename=links.json")
    .send(JSON.stringify(data, null, 2));
}
