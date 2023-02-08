import fs from "fs";
import path from "path";
import links from "../../public/links.json";
import { ILink } from "./link.interface";

const saveData = (data: unknown): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      fs.writeFile(
        path.resolve(".", "public/links.json"),
        JSON.stringify(data, null, 2),
        () => {
          resolve();
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

export const appendLink = async (link: ILink): Promise<void> => {
  (links as ILink[]).push(link);
  return saveData(links);
};

export const updateCount = async (linkId: string): Promise<void> => {
  const newLinks = links.map((link) => {
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
