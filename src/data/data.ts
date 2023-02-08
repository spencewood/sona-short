import fs from "fs";
import links from "../../public/links.json";
import { ILink } from "./link.interface";

const tmpFilePath = "/tmp/links.json";

const saveData = (data: unknown): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(tmpFilePath, JSON.stringify(data, null, 2), () => {
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const getData = (): Promise<ILink[]> => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(tmpFilePath)) {
      return fs.readFile(tmpFilePath, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(JSON.parse(data.toString()) as unknown as ILink[]);
      });
    }
    return resolve(links);
  });
};

export const appendLink = async (link: ILink): Promise<void> => {
  (links as ILink[]).push(link);
  return saveData(links);
};

export const updateCount = async (linkId: string): Promise<void> => {
  const data = await getData();
  const newLinks = data.map((link) => {
    if (link.raw_shortened_path_id === linkId) {
      return {
        ...link,
        count: link.count + 1,
      };
    }
    return link;
  });

  return saveData(newLinks);
};
