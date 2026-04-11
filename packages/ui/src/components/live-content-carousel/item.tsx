
import { Channel, Program } from "@zapn/epg/types";
import { formatTime, getProgress, set12HoursTimeFormat } from "@zapn/epg/utils";
import { useMemo } from "react";

type Props = {
  channel: Channel;
  program: Program;
};

export default function CarouselItem({ channel, program }: Props) {
  const progress = useMemo(() => getProgress(program.since, program.till), [program.since, program.till]);

  const sinceTime = useMemo(() => formatTime(program.since, set12HoursTimeFormat()).toLowerCase(), [program.since]);
  const tillTime = useMemo(() => formatTime(program.till, set12HoursTimeFormat()).toLowerCase(), [program.till]);

  return (
    <a href={channel.watchUrl ?? channel.url}>

      <div className="p-1">
        <figure>
          <picture className="w-full object-cover aspect-video relative">
            <div className="absolute top-1.5 right-1.5 z-10">
              <img className="min-w-0 max-w-8 w-full aspect-auto object-cover" src={channel.logo} />
            </div>

            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/20 to-transparent rounded-md"></div>

            {program.image ? 
              <img className="w-full object-cover aspect-video rounded-md" src={program.image} /> : 
              <div className="w-full object-cover aspect-video rounded-md bg-border" />
            }
            {progress !== 0 && (
              <div className="relative">
                <div className="w-full h-1.5 bg-black/15 backdrop-blur-sm absolute bottom-0 rounded-b-md">
                  <div className="h-1.5 bg-primary rounded-bl-md" style={{
                    width: `${progress}%`
                  }}>

                  </div>
                </div>
              </div>
            )}
          </picture>
          <figcaption>
            <h2 className="text-lg line-clamp-1" title={program.title}>
              {program.title}
            </h2>
            <div className="flex justify-between items-baseline">
              <h3 className="text-muted-foreground line-clamp-1">
                {channel.name}
              </h3>
              <div className="font-mono whitespace-nowrap text-sm text-muted-foreground">{sinceTime} - {tillTime}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </a>
  )
}