// @vitest-environment jsdom

import { beforeAll, describe, expect, it, vi } from 'vitest'
import { createShuffleLayout } from './layout'

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    value: () => ({
      font: '',
      measureText: (text: string) => ({ width: text.length * 8 }),
    }),
  })
})

describe('createShuffleLayout', () => {
  it('preserves all characters while shuffling positions', () => {
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0)

    const [block] = createShuffleLayout(
      [{ text: 'Hello world', margin: '12px 0' }],
      {
        font: '16px sans-serif',
        lineHeight: 24,
        maxWidth: 320,
      },
    )

    expect(block).toBeDefined()
    expect(block.margin).toBe('12px 0')
    expect(block.height).toBeGreaterThan(0)
    expect(block.characters.map((character) => character.char).sort()).toEqual(
      'Hello world'.split('').sort(),
    )

    randomSpy.mockRestore()
  })

  it('skips blank text blocks', () => {
    const blocks = createShuffleLayout(
      [{ text: '   ' }, { text: '\n' }],
      {
        font: '16px sans-serif',
        lineHeight: 24,
        maxWidth: 320,
      },
    )

    expect(blocks).toEqual([])
  })
})
