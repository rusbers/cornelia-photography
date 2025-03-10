import { cn } from "@workspace/ui/lib/utils";
import { CommonProps } from "../types";

export default function CheckCircle({ className }: CommonProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-5 shrink-0", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--icon)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" fill="var(--icon)"></circle>
      <path d="m9 12 2 2 4-4" stroke="#fff"></path>
    </svg>
  );
}
