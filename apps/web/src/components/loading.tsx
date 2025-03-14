import { LoaderCircle } from "lucide-react";

export function Loading() {
  return (
    <div className="page-content container pt-[126px] lg:pt-[137px]">
      <div className="flex justify-center py-[6.25rem]">
        <LoaderCircle className="animate-spin size-[4.6875rem] text-primary flex" />
      </div>
    </div>
  );
}
