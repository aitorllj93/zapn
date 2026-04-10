import {
  type ProgramItem,
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramImage,
  useProgram,
} from "planby";
import { useMemo, useState } from "react";

import ProgramDetail from "./program-detail";
import { cn } from "../lib/utils";

const providerBackgrounds = {
  blue: "linear-gradient(to right, rgb(5, 25, 55), rgb(0, 35, 96), rgb(0, 46, 179))",
  red: "linear-gradient(to right, rgb(99, 23, 27), rgb(155, 44, 44), rgb(229, 62, 62))",
  teal: "linear-gradient(to right, rgb(29, 64, 68), rgb(40, 94, 97), rgb(44, 122, 123))",
  magenta:
    "linear-gradient(to right, rgb(74, 20, 140), rgb(106, 27, 154), rgb(106, 27, 154))",
  default:
    "linear-gradient(to right, var(--primary), color-mix(in lab, var(--primary) 80%, transparent), color-mix(in lab, var(--primary) 60%, transparent))",
  twitch: "linear-gradient(to right, #4d3e63, #733dc4,#9146ff)",
  _youtube: "linear-gradient(to right, #613939, #d91616,#ff0000)",
  active:
    "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4))",
} as const;

export type Props = ProgramItem & {
  channel: {
    logo?: string;
    name: string;
    watchUrl?: string;
    url?: string;
  }
};

export default ({ channel, program, ...rest }: Props) => {
  const { data } = program;
  const { title, since, till } = data;

  const [isOpen, setIsOpen] = useState(false);

  const { styles, formatTime, set12HoursTimeFormat, isLive } =
    useProgram({
      program,
      ...rest,
    });
  styles.position.minWidth = styles.width;

  const image = isLive ? data.image : undefined;

  const background = useMemo(() => 
    isLive
      ? ((providerBackgrounds[
        data.providedBy
        ?.provider as keyof typeof providerBackgrounds
        ] || providerBackgrounds.default) as string)
      : "rgba(100, 100, 100, 0.3)",
    [isLive, data.providedBy]
  );

  const sinceTime = useMemo(() => formatTime(since, set12HoursTimeFormat()).toLowerCase(), [since]);
  const tillTime = useMemo(() => formatTime(till, set12HoursTimeFormat()).toLowerCase(), [till]);

  const onClick = () => {
    setIsOpen(!isOpen)
  };

  return (
    <div className="epg-program-item" onClick={onClick} title={title}>
      <ProgramBox width={styles.width} style={styles.position}
        className="hover:z-10 hover:w-auto!">
        <ProgramContent
          width={styles.width}
          isLive={isLive}
          className="backdrop-blur-sm p-0!"
          style={{
            background,
          }}
        >
          <ProgramFlex>
            {image ?
              <figure>
                <ProgramImage
                  src={image}
                  alt="Preview"
                  className="absolute w-full! object-cover mask-[linear-gradient(to_right,black_70%,transparent)]"
                  style={{
                    height: styles.position.height
                  }}
                />
              </figure> :
              null
            }
            <ProgramStack className={cn(
              "px-2 py-1 relative",
              image && "bg-linear-to-r from-black/80 to-black/0"
            )}>
              <h3
                className={cn(
                  "text-base truncate",
                  isLive ? "text-white" : "text-foreground"
                )}
              >
                {title}
              </h3>
              <p
                className={cn(
                  "text-xs truncate",
                  isLive ? "text-muted" : "text-muted-foreground"
                )}
              >
                {sinceTime} - {tillTime}
              </p>
            </ProgramStack>
          </ProgramFlex>
        </ProgramContent>
      </ProgramBox>
      <ProgramDetail
        channel={channel}
        program={data}
        since={sinceTime}
        till={tillTime}
        open={isOpen}
        onOpenChange={setIsOpen} />
    </div>
  );
};