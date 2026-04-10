
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../components/ui/dialog";
import { cn } from "../lib/utils";

type Props = {
  channel: {
    logo?: string;
    name: string;
    watchUrl?: string;
    url?: string;
  };
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const ChannelDetail = ({ channel, open, onOpenChange }: Props) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <div className={cn(
          channel.logo && "bg-linear-to-b from-black/80 to-black/0 rounded-xl"
        )}>
          {channel.logo ?
            <figure className="absolute w-full">
              <img src={channel.logo} className="max-w-32 mt-4 mx-auto rounded-xl mask-[linear-gradient(to_bottom,black_70%,transparent)]" />
            </figure> :
            null
          }
          <div className="pt-32 p-4 relative bg-linear-to-b from-black/80 to-black/0 rounded-xl">
            <div className="flex justify-between text-muted/60 mb-3 gap-2">
              <div>
                <h3
                  className={cn(
                    "text-lg text-white",
                  )}>
                  {channel.name}
                </h3>
              </div>
            </div>
            <div className="flex justify-end">
              <a href={channel.watchUrl ?? channel.url}>
                <Button>
                  Ver Canal
                </Button>
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelDetail;