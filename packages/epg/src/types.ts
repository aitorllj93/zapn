
import * as plutotv from './parser/providers/plutotv';
import * as plextv from './parser/providers/plextv';

export type Provider = 
  typeof plutotv.PROVIDER_ID | 
  typeof plextv.PROVIDER_ID |
  'default';

export type Channel = {
  uuid: string;
  logo: string;

  name: string;
  url?: string;
  watchUrl?: string;
  provider: Provider;
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
  provider: Provider;
}

export type EPG = {
  key?: string;
  label?: string;
  category?: string;
  provider?: Provider;
  channels: Channel[];
  programs: Program[];
}

export type Category = {
  slug: string;
  label: string;
}