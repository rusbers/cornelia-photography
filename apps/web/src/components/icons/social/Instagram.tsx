import { cn } from "@workspace/ui/lib/utils";
import { CommonProps } from "../types";

export default function Instagram({ className }: CommonProps) {
  return (
    <svg
      className={cn("size-5 shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="var(--icon)"
        d="M10 0c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.9074 4.9074 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.9144 4.9144 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.8903 4.8903 0 0 1-1.772-1.153A4.9037 4.9037 0 0 1 .525 16.55C.277 15.913.11 15.187.06 14.122.013 13.056 0 12.717 0 10c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 3.45.525C4.088.277 4.812.11 5.878.06 6.944.013 7.283 0 10 0Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.5-.25a1.25 1.25 0 1 0-2.5001 0 1.25 1.25 0 0 0 2.5001 0ZM10 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
      ></path>
    </svg>
  );
}
