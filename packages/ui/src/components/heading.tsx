import { ComponentProps, PropsWithChildren } from "react";

type Props = PropsWithChildren<ComponentProps<'h2'>>;

export default function Heading({ children, ...props }: Props) {

  return (
    <h2 {...props} className="font-heading text-xl md:text-3xl mb-2 md:mb-4">
      {children}
    </h2>
  );
}