import { cn } from "@workspace/ui/lib/utils";
import { CommonProps } from "../types";

export default function HeadlineFlower({ className }: CommonProps) {
  return (
    <svg
      className={cn("h-6 w-[6.25rem] shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 24"
    >
      <path
        fill="var(--icon)"
        fillOpacity=".5"
        d="M43.9 13.9c-1.4-1.1-2.8-2.1-4-3.3l-4-4.1A235 235 0 0 1 32.8 3l-1.4-1.7c-.2-.3-.3-.8-.1-1 .1-.3.7-.4 1-.4l3.2.4c4.4.4 8.7.8 12.9 1.8 5 1.2 9.8 3 13.8 6.2 1.6 1.3 3 2.9 4.5 4.3 1.9 2 4.2 3.2 6.8 3.9 1 .2 2 .3 3 .2 6.3-.7 12.5-3 18.8-5l3.2-1c1.5-.7 1.5-.7 1.5 1a83.2 83.2 0 0 1-21.2 6.5L65.7 20c-2.5.3-5 .8-7.5 1.5a74 74 0 0 1-21.5 2.4 39.2 39.2 0 0 1-17.8-4.6c-3-1.6-6.2-3.2-9.1-5C6.5 12 3.5 9.7.4 7.3c-.2-.1-.3-.6-.4-.9L1 6c1.1 0 2.1.4 3.1.4 3.6.3 7.1.6 10.7.6 7.2 0 14 1 20.4 3.5l7.4 3.2 1.1.5.2-.2ZM6.8 9.5l-.1.1.7.6C10.8 12 14 14 17.6 15.7c3 1.5 6.3 2.8 9.6 3.6 5.5 1.5 11.3 1 17.2.9l.8-.2c-3.1-.7-6.3-1.3-9.4-1.8-6.4-1.2-12.5-3-18.4-5.1L8 9.7l-1.2-.2Zm38.6 9c-10.5-4.6-28-9-33.2-8.3 7.3 3.4 28.5 8.7 33.2 8.3ZM7.6 8.5l.9.2c3 .4 6.1.8 9.2 1 4.7.5 9.3 1.3 13.7 2.8l14.4 5c1.6.5 3.3.8 5 1.2-4.8-1.8-9.5-3.7-14-6A45 45 0 0 0 26 9.4c-6-1.2-12.3-.9-18.5-.8Zm30-5.4c9.1 4.4 17.7 9.5 27.3 13a55.7 55.7 0 0 0-27.2-13ZM62.9 17 48.9 10 35.3 3.1l-.2.4C43.3 9.5 52 15 62.7 17ZM41 2.5c1.8.5 3.7 1 5.5 1.7 3.6 1 7 2.5 10.2 4.6l8.6 5.9 4.2 2.6.2-.2c-3-1.6-5.5-3.8-7.6-6.4L61 9.6a37.8 37.8 0 0 0-20-7.1ZM20 18c10.1 5.7 22.7 4.7 35.5 2.4-1.4-.1-2.8-.2-4.2-.1-4.1.2-8.2.6-12.3.7-3.7.2-7.4.3-10.8-.6l-8.2-2.4Zm39.6-.5a78.2 78.2 0 0 1-20.6-9.8c5.5 5.8 12.1 9.5 20.6 9.8Z"
      ></path>
    </svg>
  );
}
