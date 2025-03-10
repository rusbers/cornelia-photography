"use client";

import { useState } from "react";
import { CheckCircle, CircleAlert } from "lucide-react";
import { formSparkFormAction } from "./formSparkFormAction";
import { SubmitButton } from "./submit-button";
import { cn } from "@workspace/ui/lib/utils";

const FORM_ID = "bZ2EHQTAv";

export const Form = ({ className }: { className?: string }) => {
  const [state, setState] = useState({
    message: "",
    hasError: false,
    isComplete: false,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await formSparkFormAction(FORM_ID, state, formData);
    setState(result);
  };

  const isSuccess = !state.hasError && state.isComplete;
  const isError = state.hasError && state.isComplete;

  return (
    <form
      className={cn(
        "grid gap-4 bg-background md:grid-cols-2 md:gap-6",
        className,
      )}
      onSubmit={handleSubmit}
    >
      <input
        className="input"
        type="text"
        name="name"
        required
        placeholder="Name *"
        aria-label="Your name"
      />
      <input
        className="input"
        type="email"
        name="email"
        required
        placeholder="Email Address *"
        aria-label="Email"
      />
      <input
        className="input"
        type="string"
        name="date"
        placeholder="e.g. DD/MM/YYYY"
        aria-label="Event date"
      />
      <input
        className="input"
        type="text"
        name="location"
        placeholder="Event Location"
        aria-label="Event location"
      />
      <textarea
        className="input h-[9.375rem] resize-none p-5 md:col-span-full"
        name="message"
        placeholder="Your Message *"
        required
        aria-label="Message"
      ></textarea>

      <SubmitButton isSuccess={isSuccess} isError={isError} />
    </form>
  );
};
