import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  isSuccess: boolean;
  isError: boolean;
};

export const SubmitButton = ({ isSuccess, isError }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="button mx-auto self-center md:col-span-full"
    >
      {pending && <Loader2 className="animate-spin text-white" />}
      {isSuccess
        ? "Submitted"
        : isError
          ? "Something went wrong"
          : "Let's talk"}
    </button>
  );
};
