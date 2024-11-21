import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const range = (start: number, stop: number, step = 1) => {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
};

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('id-ID', {}).format(value);

export const formatLastUpdated = (date?: Date) => {
  if (!date) {
    return '';
  }

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const isTwoDaysAgo = date.toDateString() === twoDaysAgo.toDateString();

  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  if (isToday) {
    return `Today at ${formattedTime} WIB`;
  }

  if (isYesterday) {
    return `Yesterday at ${formattedTime} WIB`;
  }

  if (isTwoDaysAgo) {
    return `2 Days Ago at ${formattedTime} WIB`;
  }

  return date.toLocaleDateString();
};

// Taken from: https://stackoverflow.com/a/66239174
export const makeInitial = (name: string) => {
  const allNames = name
    // biome-ignore lint/suspicious/noControlCharactersInRegex: based on https://stackoverflow.com/a/20856346
    .replace(/[^\x00-\x7F]/g, '')
    .trim()
    .split(/\.|-|\s+/);

  if (allNames.length === 1) {
    return allNames[0].substring(0, 2).toUpperCase();
  }

  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }

    return acc;
  }, '');

  // Max is 3 chars
  return initials.substring(0, 3);
};
