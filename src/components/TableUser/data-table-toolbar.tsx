'use client';

import type { Table } from '@tanstack/react-table';

import { Input } from '../ui/input';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  withTableViewOptions?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  withTableViewOptions,
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
    </div>
  );
}
