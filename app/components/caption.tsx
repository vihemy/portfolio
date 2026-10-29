import Balancer from "react-wrap-balancer";
import type { ReactNode } from "react";

export function CaptionComponent({ children }: { children: ReactNode }) {
  return (
    <span className="meta -mt-4 mb-8 block w-full text-center">
      <Balancer>{children}</Balancer>
    </span>
  );
}
