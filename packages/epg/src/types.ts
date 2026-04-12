
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
  key?: string;
  label?: string;
  category?: string;
  provider?: string;
  channels: Channel[];
  programs: Program[];
}

export type Category = {
  slug: string;
  label: string;
}