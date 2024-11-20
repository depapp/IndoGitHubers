'use client';

import type { User } from '@/lib/api';
import { formatLastUpdated, formatNumber } from '@/lib/utils';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ClockIcon } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { renderRank } from './column';
import { DataTablePagination } from './data-table-pagination';
import { DataTableRowActions } from './data-table-row-actions';
import { DataTableToolbar } from './data-table-toolbar';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  updatedAt?: Date;
}

function renderRowUser({ row }: { row: Row<User> }) {
  const user = row.original as User;
  return (
    <div className="w-full px-4 py-2 rounded gap-4 grid border-b">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback>{user?.username}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <span className="text-sm text-muted-foreground">
              @{user?.username}
            </span>
          </div>
        </div>
        <DataTableRowActions row={row} />
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col gap-1 items-center">
          <span className="text-sm text-muted-foreground">Contributions</span>
          <div className="flex items-center gap-1">
            {renderRank(user?.contributionRank)} •{' '}
            {formatNumber(user?.contributions)}
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <span className="text-sm text-muted-foreground">Followers</span>
          <div className="flex items-center gap-1">
            {renderRank(user?.followerRank)} • {formatNumber(user?.followers)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardUsers<TData, TValue>({
  columns,
  data,
  updatedAt,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
    initialState: {
      columnVisibility: {
        username: true,
        name: true,
      },
    },
  });

  return (
    <div className="grid gap-2">
      <div className="rounded-md border">
        <div className="p-4">
          <DataTableToolbar table={table} withTableViewOptions={false} />
        </div>
        <div className="grid gap-2">
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map((row) => (
                <Fragment key={row.id}>
                  {renderRowUser({ row: row as Row<User> })}
                </Fragment>
              ))
          ) : (
            <div>
              <p className="h-24 text-center">No results.</p>
            </div>
          )}
        </div>

        <div className="p-4">
          <DataTablePagination table={table} withPageSize={false} />
        </div>
      </div>

      <p className="text-muted-foreground flex gap-2 items-center">
        <ClockIcon className="h-[1.2rem] w-[1.2rem]" /> Last updated at:{' '}
        {formatLastUpdated(updatedAt)}
      </p>
    </div>
  );
}
