import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: number;
  color: string;
}

export function Spinner({
  className,
  size = 16,
  color = "text-brand",
}: SpinnerProps) {
  return (
    <LoaderCircle
      className={cn("animate-spin", className, color)}
      size={size}
      aria-label="Loading"
    />
  );
}
