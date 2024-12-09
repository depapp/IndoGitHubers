import type { Cache, State } from 'swr'

const CACHE_LIFETIME = 1_000 * 60 * 60 * 24

export const localCache = (): Cache => {
  const map = new Map<string, { data: State<unknown>; timestamp: number }>(
    JSON.parse(localStorage.getItem('swr-cache') || '[]'),
  )

  window.addEventListener('beforeunload', () => {
    const cache = Array.from(map.entries())

    localStorage.setItem('swr-cache', JSON.stringify(cache))
  })

  return {
    keys: () => map.keys(),
    get: (key: string) => {
      const value = map.get(key)
      if (!value) {
        return undefined
      }

      const { data, timestamp } = value
      if (Date.now() - timestamp > CACHE_LIFETIME) {
        map.delete(key)
        return undefined
      }

      return data
    },
    set: (key: string, value: State<unknown>) =>
      map.set(key, { data: value, timestamp: Date.now() }),
    delete: (key: string) => map.delete(key),
  }
}
