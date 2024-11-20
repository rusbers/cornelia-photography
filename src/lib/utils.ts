import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalize = (string: string) => {
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
};

export const isOdd = (number: number) => number % 2;
