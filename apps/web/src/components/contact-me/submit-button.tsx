import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  isSuccess: boolean;
  isError: boolean;
  isSubmitting: boolean;
};

export const SubmitButton = ({
  isSuccess,
  isError,
  isSubmitting,
}: SubmitButtonProps) => {
  return (
    <button
      disabled={isSubmitting}
      className="button mx-auto self-center md:col-span-full min-w-[13.4375rem] px-5"
    >
      {isSubmitting && <Loader2 className="animate-spin text-white size-4" />}
      {isSuccess ? "Submitted" : isError ? "Error, try again" : "Let's talk"}
    </button>
  );
};
