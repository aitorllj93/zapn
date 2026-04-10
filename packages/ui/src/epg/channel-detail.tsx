
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../components/ui/dialog";

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
        <DialogHeader>
          <DialogTitle>
            {channel.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mx-auto">
          <img src={channel.logo} className="rounded-sm h-[120px]" />

        </div>
        <DialogFooter>
          <a href={channel.watchUrl ?? channel.url}>
            <Button>
              Ver Canal
            </Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelDetail;