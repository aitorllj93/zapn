import { Channel, EPG, Program } from "@zapn/epg/types";
import { isLive } from "@zapn/epg/utils";
import { useMemo } from "react";


export function useLiveContent(guide: EPG) {
  const { channels, programs } = guide;

  const livePrograms = new Map(programs.filter(p => isLive(p.since, p.till)).map(p => ([p.channelUuid, p])));

  const nextPrograms = useMemo(() => {
    const programsMap = new Map<string, Program>();

    for (const channel of channels) {
      const current = livePrograms.get(channel.uuid);
      if (!current) continue;

      const next = programs
        .filter(p => p.channelUuid === channel.uuid && p.since >= current.till)
        .sort((a, b) => new Date(a.since).getTime() - new Date(b.since).getTime())[0];

      if (next) {
        programsMap.set(channel.uuid, next);
      }
    }

    return programsMap;
  }, [channels, livePrograms])

  const liveChannels: [Channel, Program][] = channels
    .filter(c => livePrograms.has(c.uuid))
    .map(c => [c, livePrograms.get(c.uuid)!]);

  const nextChannels: [Channel, Program][] = channels
    .filter(c => nextPrograms.has(c.uuid))
    .map(c => [c, nextPrograms.get(c.uuid)!]);

  return {
    liveChannels,
    nextChannels
  }
}