
import { Channel, Program } from "@zapn/epg/types";

import LiveContentCarousel from '../live-content-carousel';
import { useLiveContent } from "../../hooks/use-live-content";

type Props = {
  guide: {
    channels: Channel[];
    programs: Program[];
  }
}

export default function LiveContent({ guide }: Props) {
  const { liveChannels, nextChannels } = useLiveContent(guide);

  return (
    <section>
      <LiveContentCarousel title="En Vivo" contents={liveChannels} />
      <LiveContentCarousel title="A Continuación" contents={nextChannels} />
    </section>
  );
}