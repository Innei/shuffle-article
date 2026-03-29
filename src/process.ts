import { shuffleAll, shuffleElement } from './dom'
import type { ShuffleAllOptions } from './types'

/**
 * @deprecated Use `shuffleElement` instead.
 */
export const process = shuffleElement

/**
 * @deprecated Use `shuffleAll` instead.
 */
export function processAll(
  root: HTMLElement,
  options?: ShuffleAllOptions,
): void {
  shuffleAll(root, options)
}

export { shuffleAll, shuffleElement }
