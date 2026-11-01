import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCountdown(targetDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const now = new Date();
  const total = Math.max(0, Math.floor((targetDate.getTime() - now.getTime()) / 1000));
  const days = Math.floor(total / (60 * 60 * 24));
  const hours = Math.floor((total % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((total % (60 * 60)) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds, total };
}

export function generateRegistrationId(sequence: number): string {
  return `JR26-${String(sequence).padStart(4, "0")}`;
}

export function padTwo(n: number): string {
  return String(n).padStart(2, "0");
}

