
import { ComponentProps } from "react";

import Channel from "./channel";

type Props = {
  channels: (ComponentProps<typeof Channel>['channel'])[]
}

export default function ChannelsGrid({ channels }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-3 py-3 md:px-5 md:py-5">
      <h2 className="font-heading text-xl md:text-3xl mb-2 md:mb-4">
        Canales
      </h2>
      <ul className="grid justify-between grid-cols-[repeat(auto-fit,80px)] md:grid-cols-[repeat(auto-fit,128px)] gap-2 md:gap-4 w-full mx-auto">
        {channels.map((c, idx) => (
          <li key={idx}>
            <Channel channel={c} />
          </li>
        ))}
      </ul>
    </section>
  );
}