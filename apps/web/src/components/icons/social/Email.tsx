import { cn } from "@workspace/ui/lib/utils";
import { CommonProps } from "../types";

export default function Email({ className }: CommonProps) {
  return (
    <svg
      className={cn("h-1.125rem w-[1.375rem] shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 18"
    >
      <path
        fill="var(--icon)"
        d="M2 2.5V1a1 1 0 0 1 1-1h18c.6 0 1 .4 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1h18V4.3l-8 7.2-10-9ZM0 7h5v2H0V7Zm0 5h8v2H0v-2Z"
      ></path>
    </svg>
  );
}
