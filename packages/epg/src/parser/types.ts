
export type XMLTextNode = {
  "#text": string;
  lang?: string;
};

type XMLEPGProgrammeCredits = {
  director?: string[] | string;
  actor?: string[] | string;
  writer?: string[] | string;
  presenter?: string[] | string;
  producer?: string[] | string;
  composer?: string[] | string;
};

export type XMLEPGProgramme = {
  title: XMLTextNode;
  'sub-title'?: XMLTextNode;
  desc?: XMLTextNode;
  category?: XMLTextNode;
  credits?: XMLEPGProgrammeCredits;
  'episode-num'?: XMLTextNode[] // [ '2025.68.0/1', 'S2026E69' ],
  image?: string;
  start?: string;
  stop?: string;
  channel: string;
};

export type XMLEPGChannel = {
  'display-name': string;
  id: string;
  url: string;
  icon?: {
    src: string;
  };
}

export type XMLEPG = {
  tv: {
    channel: XMLEPGChannel[]|XMLEPGChannel;
    programme: XMLEPGProgramme[];
  }
};

export type XMLChannel = {
  site: string;
  site_id: string;
  lang: string;
  xmltv_id: string;
  "#text": string;

  icon?: string;
  category?: string;
  watch_url?: string;
}

export type XMLChannels = {
  channels: {
    channel: XMLChannel[] | XMLChannel;
  }
}