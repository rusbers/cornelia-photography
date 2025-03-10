import { cn } from "@workspace/ui/lib/utils";
import type { CommonProps } from "../types";

export default function ArrowLeft({ className }: CommonProps) {
  return (
    <svg
      className={cn("shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8L2 12L6 16"></path>
      <path d="M2 12H22"></path>
    </svg>
  );
}
