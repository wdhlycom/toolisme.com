/**
 * Take the first N sentences of an author's bio for compact display
 * (article bylines and the author box). Bio text comes from authorDetails;
 * nothing is invented.
 */
export function shortBio(about: string, maxSentences = 3): string {
  const parts = about.split(/\.\s+/).filter(Boolean)
  if (parts.length <= maxSentences) return about
  return parts.slice(0, maxSentences).join('. ') + '.'
}
