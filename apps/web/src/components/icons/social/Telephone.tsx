import { cn } from "@workspace/ui/lib/utils";
import { CommonProps } from "../types";

export default function Telephone({ className }: CommonProps) {
  return (
    <svg
      className={cn("size-5 shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="var(--icon)"
        d="M18 13.42v3.536a1 1 0 0 1-.93.998c-.437.03-.794.046-1.07.046C7.163 18 0 10.837 0 2c0-.276.015-.633.046-1.07A1 1 0 0 1 1.044 0H4.58a.5.5 0 0 1 .498.45c.023.23.044.413.064.552A13.9008 13.9008 0 0 0 6.35 5.003c.095.2.033.439-.147.567L4.045 7.112a13.047 13.047 0 0 0 6.844 6.844l1.54-2.154a.4617.4617 0 0 1 .573-.149 13.9005 13.9005 0 0 0 4 1.205c.139.02.322.042.55.064a.5002.5002 0 0 1 .449.498H18Z"
      ></path>
    </svg>
  );
}
