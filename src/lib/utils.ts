import { encode, decode } from "@toon-format/toon";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convert(input: string | object): unknown {
  if (typeof input === "string") {
    return decode(input);
  }
  return encode(input);
}
