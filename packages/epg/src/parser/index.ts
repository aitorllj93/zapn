import { readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { XMLParser, } from "fast-xml-parser";

import { XMLChannel, XMLChannels, XMLEPG, XMLEPGChannel, XMLEPGProgramme, XMLTextNode } from "./types";

import { isUrl } from "../utils";
import { Channel, EPG, Program, Provider } from "../types";
import { DEFAULT_CHANNEL_LOGO } from "./defaults";

import { resolveProvider, getChannelIcon, getWatchUrl } from './providers';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  htmlEntities: true,
  processEntities: {
    maxEntitySize: 5000
  }
});

const generateChannelUId = (channel: string, provider: string) => {
  return `${channel}-${provider}`;
}

const generateProgramId = (index: number, channel: string, provider: string) => {
  return `${index}-${channel}-${provider}`;

}

const mapDateStrToISO = (date: string) => date.replace(
  /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
  "$1-$2-$3T$4:$5:$6"
).split(" ")[0] + "Z";

const parseSeasonEpisode = (str: string) => {
  let season = null;
  let episode = null;

  // Formato tipo "S2026E69"
  const format1 = /^S(\d+)E(\d+)$/i;
  const match1 = str.match(format1);
  if (match1) {
    season = parseInt(match1[1] as string, 10);
    episode = parseInt(match1[2] as string, 10);
    return { season, episode };
  }

  // Formato tipo "2025.68.0/1"
  const format2 = /^(\d+)\.(\d+)\.\d+\/\d+$/;
  const match2 = str.match(format2);
  if (match2) {
    season = parseInt(match2[1] as string, 10);
    episode = parseInt(match2[2] as string, 10);
    return { season, episode };
  }

  return null;
}

const getChannelIconByProvider = (channel: XMLChannel, provider: string): string | undefined => {
  if (provider === 'plutotv') {
    return `https://images.pluto.tv/channels/${channel.site_id}/solidLogoSVG.svg`;
  }

  return undefined;
}

const getChannelWatchUrlByProvider = (channel: XMLChannel, provider: string): string | undefined => {
  if (provider === 'plutotv') {
    return `https://pluto.tv/es/live-tv/${channel.site_id}`;
  }

  return undefined;
}

const mapSeasonAndEpisode = (episode: XMLTextNode[] | undefined) => {
  if (!episode) {
    return null;
  }

  let result: { season: number; episode: number } | null = null;
  for (const ep of episode) {
    const parsed = parseSeasonEpisode(ep["#text"]);

    if (parsed) {
      result = parsed;
      break;
    }
  }

  return result;
}

const mapChannel = (channel: XMLEPGChannel, xmlChannel: XMLChannel, provider: Provider): Channel => {
  const uuid = generateChannelUId(channel.id, provider);
  return {
    uuid,
    logo: xmlChannel?.icon ?? channel.icon?.src ?? getChannelIconByProvider(xmlChannel, provider) ?? DEFAULT_CHANNEL_LOGO,

    name: channel["display-name"] ?? '',
    url: channel.url,
    category: xmlChannel.category,
    watchUrl: xmlChannel.watch_url ?? getChannelWatchUrlByProvider(xmlChannel, provider),
    provider,
  };
}

const mapProgram = (programme: XMLEPGProgramme, provider: Provider, index: number): Program | undefined => {
  if (!programme.start || !programme.stop) {
    return undefined;
  }

  const channelUuid = generateChannelUId(programme.channel, provider);
  const id = generateProgramId(index, programme.channel, provider);
  const seasonAndEpisode = mapSeasonAndEpisode(programme["episode-num"]);

  return {
    channelUuid,
    id,
    title: programme.title?.["#text"] ?? '',
    description: programme.desc?.["#text"] ?? '',
    image: programme.image ?? (undefined as unknown as string),
    since: mapDateStrToISO(programme.start),
    till: mapDateStrToISO(programme.stop),

    subtitle: programme["sub-title"]?.["#text"],
    category: programme.category?.["#text"],
    season: seasonAndEpisode?.season,
    episode: seasonAndEpisode?.episode,
    provider,
  };
}

const loadData = async (path: string): Promise<string> => {
  if (isUrl(path)) {
    const res = await fetch(path);
    return res.text();
  } else {
    return readFile(path, 'utf-8');
  }
}

export const parseChannelsXMLFile = async (path: string): Promise<XMLChannel[]> => {
  try {
    const raw = await loadData(path);

    const channels: XMLChannels = parser.parse(raw);

    return Array.isArray(channels.channels.channel) ? channels.channels.channel : [channels.channels.channel];

  } catch (err) {
    console.error(err);
    return [];
  }
}

export const parseEPGXMLFile = async (path: string, xmlchannels: XMLChannel[]): Promise<EPG | undefined> => {
  try {
    const raw = await loadData(path);

    const epg: XMLEPG = parser.parse(raw);

    const epgChannels = (Array.isArray(epg.tv.channel) ? epg.tv.channel : [epg.tv.channel]);

    const channels = xmlchannels.filter(c => epgChannels.some(ec => ec.id === c.xmltv_id))
      .map((c) => mapChannel(epgChannels.find(ec => ec.id === c.xmltv_id) as unknown as XMLEPGChannel, c, resolveProvider(c)));

    const programs = epg.tv.programme
      .map((p, idx) => {
        const channel = xmlchannels.find(ch => ch.xmltv_id === p.channel);

        if (!channel) {
          return undefined;
        }

        return mapProgram(p, resolveProvider(channel), idx);
      }).filter(Boolean) as Program[];

    return {
      channels,
      programs,
    };

  } catch (err) {
    console.error(err);
    return undefined;
  }
}