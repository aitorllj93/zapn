
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
  program: {
    title: string;
    subtitle?: string;
    description: string;
    image: string;
    category?: string;
  };
  since: string;
  till: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const ProgramDetail = ({ channel, program, since, till, open, onOpenChange }: Props) => {
  return (
    <Dialog open={open}>
      <DialogContent>
        <div className={cn(
          program.image && "bg-linear-to-b from-black/80 to-black/0 rounded-xl"
        )}>
          {program.image ?
            <figure>
              <img src={program.image} className="absolute rounded-xl mask-[linear-gradient(to_bottom,black_70%,transparent)]" />
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
                  {program.title}
                </h3>
                <p className="line-clamp-2" title={program.subtitle}>
                  {program.subtitle !== program.title ? program.subtitle : ''}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <div className="font-mono whitespace-nowrap mb-2">
                  {since} - {till}
                </div>
                {program.category ? <Badge variant="secondary" className="bg-white/15 backdrop-blur-lg text-muted">
                  {program.category}
                </Badge> : null}
              </div>
            </div>

            <div className="-mx-4 no-scrollbar max-h-[30vh] overflow-y-auto px-4 mb-2">
              <p className="mb-4 leading-normal text-muted">
                {program.description}
              </p>
            </div>
            <div className="flex justify-end">
              <a href={channel.watchUrl ?? channel.url}>
                <Button>
                  {channel.logo ? <img
                    className="brightness-0 invert p-2 h-full mx-auto"
                    src={channel.logo}
                    alt={channel.name}
                  /> : null}
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

export default ProgramDetail;