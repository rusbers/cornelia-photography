"use server";

export async function formSparkFormAction<T>(
  formId: string,
  state: T,
  form: FormData,
) {
  if (!formId) {
    return {
      message: "Form field missing",
      hasError: true,
      isComplete: false,
    };
  }

  const filteredData = Object.fromEntries(
    [...form.entries()].filter(([key]) => !key.startsWith("$ACTION_")),
  );

  try {
    const response = await fetch(`https://submit-form.com/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error:", errorData);
      return {
        message: errorData.message || "Submission failed",
        hasError: true,
        isComplete: true,
      };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return { message: "An error occurred", hasError: true, isComplete: true };
  }

  return { message: "done", hasError: false, isComplete: true };
}
