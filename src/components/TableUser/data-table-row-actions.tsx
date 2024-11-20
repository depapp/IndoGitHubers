'use client';

import type { Row } from '@tanstack/react-table';
import { ActivityIcon, ExternalLink, MoreHorizontal, Share2Icon, } from 'lucide-react';

import type { User } from '@/lib/api';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = row.original as User;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            const tweetText = `Hey X, here are my GitHub stats:\n\nUsername: ${user.username}\n\n🏅\nFollowers Rank: #${user.followerRank}\nContribution Rank: #${user.contributionRank}\n\n🏆\nTotal Followers: ${user.followers}\nTotal Contribution: ${user.contributions}\n\nGo check yours at https://indogithubers.vercel.app/u/${user.username} #IndoGitHubers`;
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              tweetText
            )}`;
            window.open(url, '_blank');
          }}
        >
          Share
          <DropdownMenuShortcut>
            <Share2Icon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={`/u/${user.username}`}>
            Go to detail
            <DropdownMenuShortcut>
              <ActivityIcon />
            </DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={`https://github.com/${user.username}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            Visit GitHub
            <DropdownMenuShortcut>
              <ExternalLink />
            </DropdownMenuShortcut>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
