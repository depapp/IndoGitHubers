'use client';

import type { User } from '@/lib/api';
import { formatNumber } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const renderRank = (rank: number) => {
  if (rank === 1) {
    return <p className="text-right text-3xl">🥇</p>;
  }
  if (rank === 2) {
    return <p className="text-right text-3xl">🥈</p>;
  }
  if (rank === 3) {
    return <p className="text-right text-3xl">🥉</p>;
  }
  return <p className="text-right">#{formatNumber(rank)}</p>;
}

export const columnsDesktop: ColumnDef<User>[] = [
  {
    accessorKey: 'avatarUrl',
    header: 'Avatar',
    enableHiding: false,
    cell: ({ row }) => {
      const avatarUrl = row.getValue('avatarUrl') as string;
      const username = row.getValue('username') as string;

      return (
        <div className="">
          <Avatar>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => {
      const username = row.getValue('username') as string;
      return (
        <Link
          to={`/u/${username}`}
          className="underline"
        >
          {username}
        </Link>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'followerRank',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="# Followers" />
    ),
    cell: ({ row }) => {
      const followerRank = row.getValue('followerRank') as number;
      return renderRank(followerRank);
    },
  },
  {
    accessorKey: 'followers',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Followers" />
    ),
    cell: ({ row }) => {
      const followers = row.getValue('followers') as number;
      return <p className="text-right">{formatNumber(followers)}</p>;
    },
  },
  {
    accessorKey: 'contributionRank',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="# Contributions" />
    ),
    cell: ({ row }) => {
      const contributionRank = row.getValue('contributionRank') as number;
      return renderRank(contributionRank);
    },
  },
  {
    accessorKey: 'contributions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contributions" />
    ),
    cell: ({ row }) => {
      const contributions = row.getValue('contributions') as number;
      return <p className="text-right">{formatNumber(contributions)}</p>;
    },
  },
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];


export const columnsMobile: ColumnDef<User>[] = [
  {
    accessorKey: 'avatarUrl',
  },
  {
    accessorKey: 'username',
  },
  {
    accessorKey: 'name',
  },
  {
    accessorKey: 'followerRank',
  },
  {
    accessorKey: 'followers',
  },
  {
    accessorKey: 'contributionRank',
  },
  {
    accessorKey: 'contributions',
  },
  {
    accessorKey: 'company',
  },
];
