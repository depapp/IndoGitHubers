import { parseAsString, useQueryStates } from 'nuqs'

const sortingParsers = {
  sortBy: parseAsString.withDefault(''),
  sortDir: parseAsString.withDefault('desc'),
}

const sortingUrlKeys = {
  sortBy: 'sortBy',
  sortDir: 'sortDir',
}

export function useSortingSearchParams() {
  return useQueryStates(sortingParsers, {
    urlKeys: sortingUrlKeys,
  })
}
