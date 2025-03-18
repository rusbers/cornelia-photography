"use client";

import { useRef, useState } from "react";
import { formSparkFormAction } from "./formSparkFormAction";
import { SubmitButton } from "./submit-button";
import { cn } from "@workspace/ui/lib/utils";
import { z } from "zod";

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPARK_ID;
if (!FORM_ID) {
  console.error("Missing NEXT_PUBLIC_FORMSPARK_ID environment variable");
}

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z\s\-']+$/,
      "Name can only contain letters, spaces, hyphens and apostrophes",
    ),

  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email cannot exceed 100 characters"),

  date: z
    .string()
    .max(50, "Date description cannot exceed 50 characters")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .max(100, "Location cannot exceed 100 characters")
    .regex(/^[a-zA-Z0-9\s\-',\.]*$/, "Please enter a valid location")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message cannot exceed 2000 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export const Form = ({ className }: { className?: string }) => {
  const [state, setState] = useState({
    message: "",
    hasError: false,
    isComplete: false,
  });

  const [validationErrors, setValidationErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setValidationErrors({});

    if (!FORM_ID) {
      setState({
        message: "Form configuration error. Please contact the administrator.",
        hasError: true,
        isComplete: true,
      });
      return;
    }

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      setIsSubmitting(true);

      const validatedData = formSchema.parse(formValues);

      const sanitizedFormData = new FormData();
      Object.entries(validatedData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          sanitizedFormData.append(key, String(value).trim());
        }
      });

      const result = await formSparkFormAction(
        FORM_ID,
        state,
        sanitizedFormData,
      );
      setState(result);

      if (!result.hasError) {
        formRef.current?.reset();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof FormValues, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as keyof FormValues] = err.message;
          }
        });
        setValidationErrors(errors);

        setState({
          message: "Please correct the errors in the form.",
          hasError: true,
          isComplete: true,
        });
      } else {
        console.error("Form submission error:", error);
        setState({
          message: "An unexpected error occurred. Please try again.",
          hasError: true,
          isComplete: true,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSuccess = !state.hasError && state.isComplete;
  const isError = state.hasError && state.isComplete;

  return (
    <form
      ref={formRef}
      className={cn(
        "grid gap-4 bg-background md:grid-cols-2 md:gap-6",
        className,
      )}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex flex-col">
        <input
          className={cn("input")}
          type="text"
          name="name"
          required
          placeholder="Name *"
          aria-label="Your name"
          maxLength={50}
          disabled={isSubmitting}
        />
        {validationErrors.name && (
          <p className="mt-1 text-sm text-[#ed5c5c]">{validationErrors.name}</p>
        )}
      </div>
      <div className="flex flex-col">
        <input
          className={cn("input")}
          type="email"
          name="email"
          required
          placeholder="Email Address *"
          aria-label="Email"
          maxLength={100}
          disabled={isSubmitting}
        />
        {validationErrors.email && (
          <p className="mt-1 text-sm text-[#ed5c5c]">
            {validationErrors.email}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <input
          className={cn("input")}
          type="text"
          name="date"
          placeholder="Event Date"
          aria-label="Event date"
          maxLength={50}
          disabled={isSubmitting}
        />
        {validationErrors.date && (
          <p className="mt-1 text-sm text-[#ed5c5c]">{validationErrors.date}</p>
        )}
      </div>
      <div className="flex flex-col">
        <input
          className={cn("input")}
          type="text"
          name="location"
          placeholder="Event Location"
          aria-label="Event location"
          maxLength={100}
          disabled={isSubmitting}
        />
        {validationErrors.location && (
          <p className="mt-1 text-sm text-[#ed5c5c]">
            {validationErrors.location}
          </p>
        )}
      </div>
      <div className="flex flex-col md:col-span-full">
        <textarea
          className={cn("input h-[9.375rem] resize-none p-5")}
          name="message"
          placeholder="Your Message *"
          required
          aria-label="Message"
          maxLength={2000}
          disabled={isSubmitting}
        ></textarea>
        {validationErrors.message && (
          <p className="mt-1 text-sm text-[#ed5c5c]">
            {validationErrors.message}
          </p>
        )}
      </div>
      {isError && (
        <div className="text-[#ed5c5c] md:col-span-full">{state.message}</div>
      )}

      <SubmitButton
        isSuccess={isSuccess}
        isError={isError}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};
