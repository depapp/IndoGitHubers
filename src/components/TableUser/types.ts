import type { ColumnDef } from '@tanstack/react-table'
import type { ParserBuilder, SetValues } from 'nuqs'

export type SetPageParams = SetValues<{
  pageIndex: Omit<ParserBuilder<number>, 'parseServerSide'> & {
    readonly defaultValue: number
    parseServerSide(value: string | string[] | undefined): number
  }
  pageSize: Omit<ParserBuilder<number>, 'parseServerSide'> & {
    readonly defaultValue: number
    parseServerSide(value: string | string[] | undefined): number
  }
}>

export type SetFilterParams = SetValues<{
  filterBy: Omit<ParserBuilder<string>, 'parseServerSide'> & {
    readonly defaultValue: string
    parseServerSide(value: string | string[] | undefined): string
  }
  filterValue: Omit<ParserBuilder<string>, 'parseServerSide'> & {
    readonly defaultValue: string
    parseServerSide(value: string | string[] | undefined): string
  }
}>

export type SetSortParams = SetValues<{
  sortBy: Omit<ParserBuilder<string>, 'parseServerSide'> & {
    readonly defaultValue: string
    parseServerSide(value: string | string[] | undefined): string
  }
  sortDir: Omit<ParserBuilder<string>, 'parseServerSide'> & {
    readonly defaultValue: string
    parseServerSide(value: string | string[] | undefined): string
  }
}>

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  updatedAt?: Date

  pageIndex: number
  pageSize: number
  setPageParams: SetPageParams

  filterBy: string
  filterValue: string
  setFilterParams: SetFilterParams

  sortBy: string
  sortDir: string
  setSortParams: SetSortParams
}
