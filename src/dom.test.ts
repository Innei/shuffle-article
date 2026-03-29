// @vitest-environment jsdom

import { beforeAll, describe, expect, it, vi } from 'vitest'
import { process, processAll, shuffleAll, shuffleElement } from './index'

beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    value: () => ({
      font: '',
      measureText: (text: string) => ({ width: text.length * 8 }),
    }),
  })
})

function setClientWidth(el: HTMLElement, width: number): void {
  Object.defineProperty(el, 'clientWidth', {
    configurable: true,
    value: width,
  })
}

describe('DOM shuffling API', () => {
  it('shuffleElement renders positioned character spans in-place', () => {
    document.body.innerHTML =
      '<p id="target" style="font: 16px sans-serif; line-height: 24px; margin: 0;">Hello</p>'

    const target = document.getElementById('target') as HTMLElement
    setClientWidth(target, 240)

    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0)
    shuffleElement(target)

    expect(target.getAttribute('data-shuffle-p')).toBe('')
    expect(target.querySelectorAll('[data-shuffle]')).toHaveLength(5)
    expect((target.querySelector('[data-shuffle]') as HTMLElement).style.position).toBe(
      'absolute',
    )
    expect(target.style.position).toBe('relative')

    randomSpy.mockRestore()
  })

  it('shuffleAll and legacy aliases handle paragraph collections', () => {
    document.body.innerHTML = `
      <div id="root">
        <p style="font: 16px sans-serif; line-height: 24px; margin: 0;">Alpha</p>
        <p style="font: 16px sans-serif; line-height: 24px; margin: 0;">Beta</p>
      </div>
    `

    const root = document.getElementById('root') as HTMLElement
    const paragraphs = Array.from(root.querySelectorAll<HTMLElement>('p'))
    paragraphs.forEach((paragraph) => {
      setClientWidth(paragraph, 240)
    })

    const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0)
    shuffleAll(root)

    expect(root.querySelectorAll('p[data-shuffle-p]')).toHaveLength(2)
    expect(process).toBe(shuffleElement)

    document.body.innerHTML =
      '<div id="legacy"><p style="font: 16px sans-serif; line-height: 24px; margin: 0;">Gamma</p></div>'

    const legacyRoot = document.getElementById('legacy') as HTMLElement
    const legacyParagraph = legacyRoot.querySelector('p') as HTMLElement
    setClientWidth(legacyParagraph, 240)
    processAll(legacyRoot)

    expect(legacyRoot.querySelectorAll('p[data-shuffle-p]')).toHaveLength(1)

    randomSpy.mockRestore()
  })
})
