import sanitizeHtml from 'sanitize-html';

export function cleanRichText(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: ['b', 'i', 'a'],
    allowedAttributes: { a: ['href'] },
  });
}
