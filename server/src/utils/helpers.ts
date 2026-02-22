import crypto from 'crypto';

/**
 * Generates a unique order number in the format: MS-YYYYMMDD-XXX
 * where XXX is a random 3-character alphanumeric uppercase string.
 */
export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const datePart = `${year}${month}${day}`;

  const randomPart = crypto
    .randomBytes(3)
    .toString('hex')
    .slice(0, 3)
    .toUpperCase();

  return `MS-${datePart}-${randomPart}`;
}

/**
 * Converts a string to a URL-safe slug.
 * Handles unicode, multiple spaces/hyphens, and edge cases.
 */
export function slugify(name: string): string {
  return name
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // remove non-alphanumeric chars
    .replace(/[\s_]+/g, '-')         // spaces/underscores to hyphens
    .replace(/-+/g, '-')             // collapse consecutive hyphens
    .replace(/^-+|-+$/g, '');        // trim leading/trailing hyphens
}

/**
 * Calculates pagination offset (skip) and limit (take) from page/pageSize params.
 * Clamps values to safe defaults and maximums.
 */
export function paginate(
  page: number = 1,
  pageSize: number = 20
): { skip: number; take: number } {
  const safePage = Math.max(1, Math.floor(page));
  const safePageSize = Math.min(100, Math.max(1, Math.floor(pageSize)));

  return {
    skip: (safePage - 1) * safePageSize,
    take: safePageSize,
  };
}
