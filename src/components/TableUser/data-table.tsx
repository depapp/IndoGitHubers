'use client'

import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatLastUpdated } from '@/lib/utils'
import { ClockIcon } from 'lucide-react'
import { useState } from 'react'
import { DataTablePagination } from './data-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'
import type { DataTableProps } from './types'

export function DataTable<TData, TValue>({
  columns,
  data,
  updatedAt,

  pageIndex,
  pageSize,
  setPageParams,

  filterBy,
  filterValue,
  setFilterParams,

  sortBy,
  sortDir,
  setSortParams,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    {
      id: filterBy,
      value: filterValue,
    },
  ])
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: sortBy,
      desc: sortDir === 'desc',
    },
  ])

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
      pagination: {
        pageSize: pageSize,
        pageIndex: pageIndex,
      },
    },
    initialState: {
      columnVisibility: {
        username: true,
        name: true,
      },
    },
  })

  return (
    <div className="grid gap-2 grid-cols-1">
      <div className="rounded-md border">
        <div className="p-4">
          <DataTableToolbar
            table={table}
            withTableViewOptions={true}
            withSortOptions={false}
            filterValue={filterValue}
            setFilterParams={setFilterParams}
            setSortParams={setSortParams}
          />
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="p-4">
          <DataTablePagination
            table={table}
            withPageSize={true}
            setPageParams={setPageParams}
          />
        </div>
      </div>
      <p className="text-muted-foreground flex gap-2 items-center">
        <ClockIcon className="h-[1.2rem] w-[1.2rem]" /> Last updated at:{' '}
        {formatLastUpdated(updatedAt)}
      </p>
    </div>
  )
}
