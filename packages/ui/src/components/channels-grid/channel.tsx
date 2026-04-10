import { cn } from "../../lib/utils";

type Props = {
  channel: {
    logo: string;
    name: string;
    url?: string;
    watchUrl?: string;
  };
  className?: string;
};

export default ({ channel, className, }: Props) => {
  const { logo, name, url, watchUrl } = channel;

  return (
    <a href={watchUrl ?? url}>
      <figure
        title={name}
        className={cn(
          "size-[80px] md:size-[128px] flex items-center justify-center p-3 md:p-4 rounded-xl bg-foreground/15 dark:bg-foreground/50 backdrop-blur-sm hover:scale-110 transition-all",
          className,
        )}
      >
        {logo ? <img
          className="max-w-full max-h-full object-contain"
          src={logo}
          alt={name}
        /> : null}
        {!logo ? <p className="font-base line-clamp-1 text-balance bg-white pl-1 text-start font-display text-sm  uppercase text-black">
          {name}
        </p> : null}
      </figure>
    </a>
  );
};