import { readdir } from "node:fs/promises";
import { extname, join } from "node:path";

import { EPG } from "./types";
import { parseChannelsXMLFile, parseEPGXMLFile } from "./parser";

export const loadDirectory = async (dir: string): Promise<EPG[]> => {
  const channelsDir = join(dir, 'channels');
  const guidesDir = join(dir, 'guides');

  const entries = await readdir(guidesDir, { withFileTypes: true });
  const result: EPG[] = [];

  for (const entry of entries) {
    if ((entry.isDirectory())) {
      // skip for now
      continue;
    }

    if (extname(entry.name) === '.xml') {
      const channels = await parseChannelsXMLFile(join(channelsDir, entry.name));
      if (!channels) {
        continue;
      }

      const epg = await parseEPGXMLFile(join(entry.parentPath, entry.name), channels);

      if (epg) {
        result.push(epg);
      }
    }
  }

  return result;
}