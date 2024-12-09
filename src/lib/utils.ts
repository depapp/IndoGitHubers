import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { User } from './api';

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
    // Split by either dot, space or dash chars
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

export const shareToSocial = (user: User) => {
  const shareData = {
    title: 'Check out my GitHub stats',
    text: `Hey, checkout my GitHub stats:\n\nUsername: ${user.username}\n\n🏅\nFollowers Rank: #${user.followerRank}\nContribution Rank: #${user.contributionRank}\n\n🏆\nTotal Followers: ${user.followers}\nTotal Contribution: ${user.contributions}\n\nGo check yours at https://indogithubers.vercel.app/u/${user.username} #IndoGitHubers`,
    url: `https://indogithubers.vercel.app/u/${user.username}`,
  };

  if (navigator.canShare(shareData)) {
    return navigator.share(shareData);
  }

  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareData.text
  )}`;
  window.open(url, '_blank');
};

export async function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  }

  return document.execCommand('copy', true, text);
}
