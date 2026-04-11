
import { Channel, Program } from "@zapn/epg/types";
import { isLive } from '@zapn/epg/utils';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "../ui/carousel";
import Item from './item';

type Props = {
  title: string;
  contents: [Channel, Program][]
}

export default function LiveContentCarousel({ contents, title }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-3 py-3 md:px-5 md:py-5">
      <h2 className="font-heading text-xl md:text-3xl mb-2 md:mb-4">
        {title}
      </h2>
      <Carousel className="w-full" opts={{
        align: "start",
        loop: true,
      }}>
        <CarouselContent className="-ml-1">
          {contents.map((c, idx) => (
            <CarouselItem key={idx} className="basis-1/3 pl-1 lg:basis-1/4">
              <Item channel={c[0]} program={c[1]} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}