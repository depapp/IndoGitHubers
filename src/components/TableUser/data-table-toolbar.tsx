'use client';

import type { Table } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { ActivityIcon, ArrowDownNarrowWideIcon, UserRoundCheckIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  withTableViewOptions?: boolean;
  withSortOptions?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  withTableViewOptions,
  withSortOptions,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between gap-2 flex-wrap">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search username..."
          value={
            (table.getColumn('username')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('username')?.setFilterValue(event.target.value)
          }
          className="h-8 w-full md:w-[150px] lg:w-[250px]"
        />
      </div>
      {withTableViewOptions && <DataTableViewOptions table={table} />}
      {withSortOptions && (
        <div className={cn('flex items-center space-x-2 ml-2')}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-accent"
              >
                <ArrowDownNarrowWideIcon />
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[
                table.getColumn('followers'),
                table.getColumn('contributions'),
              ].map((column) => (
                <DropdownMenuItem
                  onClick={() => column?.toggleSorting?.(true)}
                  key={column?.id}
                >
                  {column?.id === 'contributions' ? (
                    <ActivityIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
                  ) : (
                    <UserRoundCheckIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
                  )}

                  By {column?.id}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
