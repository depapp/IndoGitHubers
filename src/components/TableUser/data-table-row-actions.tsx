'use client';

import type { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import type { User } from '@/lib/api';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
            const tweetText = `Hey X, here are my GitHub stats:\n\nUsername: ${user.username}\n\n🏅\nFollowers Rank: #${user.followerRank}\nContribution Rank: #${user.contributionRank}\n\n🏆\nTotal Followers: ${user.followers}\nTotal Contribution: ${user.contributions}\n\nGo check yours at https://indogithubers.vercel.app #IndoGitHubers`;
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              tweetText
            )}`;
            window.open(url, '_blank');
          }}
        >
          Share
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
