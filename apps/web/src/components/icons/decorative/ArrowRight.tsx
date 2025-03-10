import { cn } from "@workspace/ui/lib/utils";
import { CommonProps } from "../types";

export default function ArrowRight({ className }: CommonProps) {
  return (
    <svg
      className={cn("shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M18 8L22 12L18 16"></path>
      <path d="M2 12H22"></path>
    </svg>
  );
}
