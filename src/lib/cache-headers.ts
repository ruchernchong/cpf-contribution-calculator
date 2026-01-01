/**
 * Cache headers for API routes.
 * Uses aggressive edge caching to prevent CPU spikes from repeated requests.
 *
 * - s-maxage: Cache on Vercel Edge for 1 year
 * - stale-while-revalidate: Serve stale content while revalidating in background
 * - immutable: Content will never change (for truly static data)
 */
export const CACHE_HEADERS = {
  /**
   * For static data that never changes (age groups, ceiling timeline, etc.)
   * Cached indefinitely on edge and in browser.
   */
  immutable: {
    "Cache-Control":
      "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=31536000, immutable",
  },

  /**
   * For data that depends on query params but is still deterministic.
   * Vercel Edge caches by full URL including query string.
   */
  static: {
    "Cache-Control":
      "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=31536000",
  },
} as const;
