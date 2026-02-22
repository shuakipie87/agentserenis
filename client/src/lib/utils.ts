import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx.
 * Handles conditional classes and resolves Tailwind conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a price in USD.
 * @param priceInDollars - The price as a number (e.g., 24.99)
 * @returns Formatted price string (e.g., "$24.99")
 */
export function formatPrice(priceInDollars: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(priceInDollars);
}

/**
 * Format weight for display.
 * Converts grams to kg for weights >= 1000g.
 * @param grams - Weight in grams
 * @returns Formatted weight string (e.g., "500g" or "1.5 kg")
 */
export function formatWeight(grams: number): string {
  if (grams >= 1000) {
    const kg = grams / 1000;
    return `${kg % 1 === 0 ? kg.toFixed(0) : kg.toFixed(1)} kg`;
  }
  return `${grams}g`;
}

/**
 * Generate a unique ID for client-side use (e.g., toast notifications).
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Debounce a function call.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Truncate text to a maximum length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

/**
 * Calculate the line item total for a cart item.
 */
export function calculateItemTotal(pricePerKg: number, weightGrams: number, quantity: number): number {
  return (pricePerKg * (weightGrams / 1000)) * quantity;
}
