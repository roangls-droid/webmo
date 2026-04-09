import type { PropsWithChildren } from "react";
import { cn } from "../utils/cn";

type Props = PropsWithChildren<{ className?: string }>;

export function Container({ children, className }: Props) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

