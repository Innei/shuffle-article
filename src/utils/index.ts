export function shuffle(arr: any[]) {
  let n = arr.length,
    random
  while (0 != n) {
    random = (Math.random() * n--) >>> 0
    ;[arr[n], arr[random]] = [arr[random], arr[n]]
  }
  return arr
}

export function escapeHTML(t: string) {
  const lt = /</g,
    gt = />/g,
    ap = /'/g,
    ic = /"/g
  return t
    .toString()
    .replace(lt, '&lt;')
    .replace(gt, '&gt;')
    .replace(ap, '&#39;')
    .replace(ic, '&#34;')
}
