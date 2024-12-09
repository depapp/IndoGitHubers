import { parseAsString, useQueryStates } from 'nuqs'

const filterParsers = {
  filterBy: parseAsString.withDefault('username'),
  filterValue: parseAsString.withDefault(''),
}

const filterUrlKeys = {
  filterBy: 'searchBy',
  filterValue: 's',
}

export function useFilterSearchParams() {
  return useQueryStates(filterParsers, {
    urlKeys: filterUrlKeys,
    throttleMs: 300,
  })
}
