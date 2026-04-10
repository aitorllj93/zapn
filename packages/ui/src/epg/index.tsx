"use client";

import { CSSProperties, useMemo } from 'react';
import { Channel, Epg, Layout, Program, useEpg } from 'planby';

import ChannelItem from './channel';
import ProgramItem from './program';
import { Timeline } from './timeline';

type Props = {
  style?: CSSProperties;
  channels?: Omit<Channel, 'position'>[];
  programs?: Program[];
}

const EPG = ({ channels = [], programs = [], style }: Props) => {
  const { startDate, endDate } = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    return { startDate: start, endDate: end };
  }, []);

  const memoizedChannels = useMemo(() => channels as Channel[], [channels]);
  const memoizedPrograms = useMemo(() => programs, [programs]);
  const memoizedChannelsMap = useMemo(() => new Map<string, Channel>(memoizedChannels.map(c => ([c.uuid, c]))), [memoizedChannels])

  const epg = useEpg({
    channels: memoizedChannels,
    epg: memoizedPrograms,
    startDate,
    endDate
  });

  return (
    <div style={style}>
      <Epg {...epg.getEpgProps()}>
        <Layout
          {...epg.getLayoutProps()}
          renderTimeline={(props) => <Timeline {...props} />}
          renderProgram={({ program, ...rest }) => (
            <ProgramItem
              key={program.data.id}
              program={program}
              channel={memoizedChannelsMap.get(program.data.channelUuid)}
              {...(rest as any)}
            />
          )}
          renderChannel={({ channel }) => (
            <ChannelItem key={channel.uuid} channel={channel} />
          )}
        />
      </Epg>
    </div>
  )
}

export default EPG;