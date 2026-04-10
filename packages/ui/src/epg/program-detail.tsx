
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
        <DialogHeader>
          <DialogTitle>
            {program.title}
          </DialogTitle>
          <div className="flex justify-between text-muted-foreground">          
            <p className="line-clamp-2" title={program.subtitle}>
              {program.subtitle !== program.title ? program.subtitle : ''}
            </p>
            <span className="font-mono whitespace-nowrap">
              {since} - {till}
            </span>
          </div>
          <img src={program.image} className="rounded-sm" />
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[30vh] overflow-y-auto px-4">
          {program.category ? <Badge variant="secondary" className="mb-4 px-2 py-1">
            {program.category}
          </Badge> : null}
          <p className="mb-4 leading-normal">
            {program.description}
          </p>
        </div>
        <DialogFooter>
          <a href={channel.watchUrl ?? channel.url}>
            <Button>
              {channel.logo ? <img
                className="brightness-0 invert p-2 h-full rounded-t-md md:rounded-t-lg mx-auto"
                src={channel.logo}
                alt={channel.name}
              /> : null}
              Ver Canal
            </Button>
          </a>
          {/* <Button variant="outline" onClick={() => onOpenChange(true)}>Cerrar</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDetail;