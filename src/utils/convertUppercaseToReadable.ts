export const convertUppercaseToReadable = (str: string): string =>
  str.charAt(0) + str.slice(1).split('_').join(' ').toLowerCase();
