import {
  type ProgramItem,
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramStack,
  ProgramTitle,
  ProgramText,
  ProgramImage,
  useProgram,
} from "planby";
import { useState } from "react";
import { up } from "../hooks/use-breakpoint";
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
  const { image, title, since, till } = data;

  const [isOpen, setIsOpen] = useState(false);
  const { styles, formatTime, set12HoursTimeFormat, isLive, isMinWidth } =
    useProgram({
      program,
      ...rest,
      minWidth: !image ? 100 : 150
    });

  const isDesktop = up("md");

  const isActive = false;

  const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase();
  const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase();

  const onClick = () => {
    setIsOpen(!isOpen)
  };

  return (
    <div className="epg-program-item" onClick={onClick} title={title}>
      <ProgramBox width={styles.width} style={styles.position}>
        <ProgramContent
          width={styles.width}
          isLive={isLive}
          style={{
            background: isActive
              ? providerBackgrounds.active
              : isLive
                ? ((providerBackgrounds[
                    data.providedBy
                      ?.provider as keyof typeof providerBackgrounds
                  ] || providerBackgrounds.default) as string)
                : "rgba(100, 100, 100, 0.3)",
            padding: 0,
          }}
        >
          <ProgramFlex
            style={{
              padding: isDesktop && isMinWidth ? "0.5rem" : undefined,
            }}
          >
            {image ? <ProgramImage
              src={image}
              alt="Preview"
              style={{
                width: !isMinWidth ? "100%" : undefined,
              }}
            /> : null}
            {isMinWidth && (
              <ProgramStack>
                <ProgramTitle
                  className={cn(
                    isActive || isLive ? "text-white!": "text-foreground!"
                  )}
                  style={{
                    fontSize: isDesktop ? undefined : "0.8rem",
                    fontWeight: 250,
                    marginTop: isDesktop ? undefined : "0.125rem",
                    marginBottom: isDesktop ? undefined : "0.125rem",
                  }}
                >
                  {data.providedBy?.provider === "twitch" &&
                  data.providedBy?.channelId
                    ? "🔴"
                    : ""}{" "}
                  {title}
                </ProgramTitle>
                <ProgramText
                  className={cn(
                    isActive || isLive ? "text-muted!": "text-muted-foreground!"
                  )}
                  style={{
                    fontSize: isDesktop ? undefined : "0.5rem",
                  }}
                >
                  {sinceTime} - {tillTime}
                </ProgramText>
              </ProgramStack>
            )}
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