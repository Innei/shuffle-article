// @vitest-environment jsdom

import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { ShuffleText } from './ShuffleText'

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    value: () => ({
      font: '',
      measureText: (text: string) => ({ width: text.length * 8 }),
    }),
  })
})

describe('ShuffleText', () => {
  it('renders shuffled character spans from plain text input', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const root = createRoot(container)
    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0)

    await act(async () => {
      root.render(
        <ShuffleText
          text="Hello"
          width={240}
          blockStyle={{
            font: '16px sans-serif',
            lineHeight: '24px',
            margin: 0,
          }}
        />,
      )
    })

    expect(container.querySelectorAll('[data-shuffle-p]')).toHaveLength(1)
    expect(container.querySelectorAll('[data-shuffle]')).toHaveLength(5)
    expect(
      Array.from(container.querySelectorAll('[data-shuffle]')).map((node) =>
        node.textContent ?? '',
      ),
    ).toEqual(['e', 'l', 'l', 'o', 'H'])

    await act(async () => {
      root.unmount()
    })

    container.remove()
    randomSpy.mockRestore()
  })

  it('supports multiple blocks and disabled mode', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const root = createRoot(container)

    await act(async () => {
      root.render(
        <ShuffleText
          blocks={['Alpha', 'Beta']}
          enabled={false}
          blockStyle={{ margin: 0 }}
        />,
      )
    })

    expect(container.querySelectorAll('[data-shuffle]')).toHaveLength(0)
    expect(container.querySelectorAll('p')).toHaveLength(2)
    expect(container.textContent).toBe('AlphaBeta')

    await act(async () => {
      root.unmount()
    })

    container.remove()
  })
})
