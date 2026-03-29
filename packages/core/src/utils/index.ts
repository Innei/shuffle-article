/**
 * Fisher-Yates shuffle (in-place).
 */
export function shuffle<T>(arr: T[]): T[] {
  let n = arr.length
  while (n > 0) {
    const random = (Math.random() * n--) >>> 0
    ;[arr[n], arr[random]] = [arr[random], arr[n]]
  }
  return arr
}
