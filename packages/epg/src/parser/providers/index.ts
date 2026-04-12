import { Provider } from "../../types";
import { XMLChannel } from "../types";

import * as plutotv from './plutotv';
import * as plextv from './plextv';


export const resolveProvider = (channel: XMLChannel): Provider => {
  if (channel.site === plutotv.SITE) {
    return plutotv.PROVIDER_ID;
  }

  if (channel.site === plextv.SITE) {
    return plextv.PROVIDER_ID;
  }

  return 'default';
}

export const getChannelIcon = (provider: Provider, channel: XMLChannel) => {
  if (channel.icon) {
    return channel.icon;
  }

  if (provider === plutotv.PROVIDER_ID) {
    return plutotv.channelIcon(channel);
  }

  return undefined;
}

export const getWatchUrl = (provider: Provider, channel: XMLChannel) => {
  if (channel.watch_url) {
    return channel.watch_url;
  }

  if (provider === plutotv.PROVIDER_ID) {
    return plutotv.watchUrl(channel);
  }

  return undefined;
}