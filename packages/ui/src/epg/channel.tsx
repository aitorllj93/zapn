import { type Channel, ChannelBox } from "planby";
import { useState } from "react";
import ChannelDetail from "./channel-detail";

export type Props = {
  channel: Channel;
};

export default ({ channel }: Props) => {
  const { position, logo, name } = channel;
  
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen)
  };

  return (
    <div className="epg-channel-item cursor-pointer" onClick={onClick} title={name}>
      <ChannelBox
        {...position}
        className="bg-foreground/15! backdrop-blur-sm"
      >
        <div className="w-full h-full flex items-center">
            <figure
              title={name}
              className="h-[64px] transition-all hover:scale-105 w-full py-2 md:p-2 flex items-center"
            >
              {logo ? <img
                className="aspect-auto min-h-0 max-h-full max-w-full mx-auto"
                src={logo}
                alt={name}
              /> : null}
              {!logo ? <p className="font-base line-clamp-1 text-balance bg-white pl-1 text-start font-display text-sm  uppercase text-black">
                {name}
              </p> : null}
            </figure>
        </div>
      </ChannelBox>
      <ChannelDetail
        channel={channel as any}
        open={isOpen} 
        onOpenChange={setIsOpen} />
    </div>
  );
};