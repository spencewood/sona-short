import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import { appendLink } from "../../data/data";
import { ILink } from "../../data/link.interface";
import { getSimpleDate } from "../../util/date";
import { getPath, getRoot, getScheme } from "../../util/url";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILink | string>
) {
  const uri = req.body;

  const shortId = nanoid(8);

  const newLink: ILink = {
    id: nanoid(27),
    scheme: getScheme(uri),
    path: getPath(uri),
    raw_shortened_path_id: shortId,
    root: getRoot(uri),
    shortened_path: `/${shortId}`,
    shortened_uri: `${process.env.LOCAL_BASE}/${shortId}`,
    uri,
    count: 0,
    created_date: getSimpleDate(),
  };

  try {
    await appendLink(newLink);
    return res.status(200).json(newLink);
  } catch (err) {
    return res.status(400).send("Unable to save link");
  }
}
