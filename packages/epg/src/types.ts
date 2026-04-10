
export type Channel = {
  uuid: string;
  logo: string;

  name: string;
  url?: string;
  watchUrl?: string;
  provider: string;
  category?: string;
}

export type Program = {
  channelUuid: string;
  id: string;
  title: string;
  description: string;
  since: string | number | Date;
  till: string | number | Date;
  image: string;

  subtitle?: string;
  category?: string;
  season?: number;
  episode?: number;
  provider: string;
}

export type EPG = {
  provider?: string;
  channels: Channel[];
  programs: Program[];
}

type EPGFilterParams = {
  provider?: string[]|string;
};

export type EPGRepository = {
  getChannels(filter?: EPGFilterParams): Promise<Channel[]>;
  getGuide(filter?: EPGFilterParams): Promise<EPG|undefined>;
  getGuides(): Promise<EPG[]>;
  getGuidesAsCategories(filter?: EPGFilterParams): Promise<{
    label: string;
    epg: EPG;
  }[]>;
}
