import { XMLChannel } from "../types";

export const PROVIDER_ID = 'plutotv';

export const SITE = 'pluto.tv';

export const channelIcon = (channel: XMLChannel) => 
  `https://images.pluto.tv/channels/${channel.site_id}/solidLogoSVG.svg`;

export const watchUrl = (channel: XMLChannel) =>
  `https://pluto.tv/es/live-tv/${channel.site_id}`;