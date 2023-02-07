export function isValidHttpUrl(str: string): boolean {
  try {
    const newUrl = new URL(str);
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
  } catch (err) {
    return false;
  }
}
