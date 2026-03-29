import { useCallback, useRef, useState } from 'react'
import {
  prepareWithSegments,
  layoutWithLines,
  type LayoutLine,
} from '@chenglou/pretext'
import { shuffle } from '../src/utils/index'

export interface ShuffledChar {
  char: string
  x: number
  y: number
}

export interface ShuffledParagraph {
  chars: ShuffledChar[]
  height: number
}

interface StoredParams {
  texts: string[]
  font: string
  lineHeight: number
}

let _measureCtx: CanvasRenderingContext2D | null = null
function getMeasureCtx(): CanvasRenderingContext2D {
  if (!_measureCtx) {
    const canvas = document.createElement('canvas')
    _measureCtx = canvas.getContext('2d')!
  }
  return _measureCtx
}

function computeCharPositions(
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number,
): { chars: ShuffledChar[]; height: number } {
  const prepared = prepareWithSegments(text, font)
  const result = layoutWithLines(prepared, maxWidth, lineHeight)

  const chars: ShuffledChar[] = []
  const ctx = getMeasureCtx()
  ctx.font = font

  for (let lineIdx = 0; lineIdx < result.lines.length; lineIdx++) {
    const line: LayoutLine = result.lines[lineIdx]
    const y = lineIdx * lineHeight

    let xOffset = 0
    for (const char of line.text) {
      if (char === '\n') continue
      chars.push({ char, x: xOffset, y })
      xOffset += ctx.measureText(char).width
    }
  }

  return { chars, height: result.lines.length * lineHeight }
}

function computeAll(texts: string[], font: string, lineHeight: number, maxWidth: number): ShuffledParagraph[] {
  return texts
    .filter((t) => t.trim().length > 0)
    .map((text) => {
      const { chars, height } = computeCharPositions(text, font, maxWidth, lineHeight)
      return { chars: shuffle([...chars]), height }
    })
}

export function useShuffledContent() {
  const [shuffledData, setShuffledData] = useState<{
    paragraphs: ShuffledParagraph[]
  } | null>(null)

  // Store last params so we can recompute on resize with a new width
  const lastParams = useRef<StoredParams | null>(null)

  const doShuffle = useCallback((el: HTMLElement) => {
    const pEls = el.querySelectorAll('p')
    const targets = pEls.length > 0 ? pEls : [el]

    const texts: string[] = []
    let font = ''
    let lineHeight = 0

    targets.forEach((target) => {
      const text = target.textContent || ''
      texts.push(text)
      if (!font) {
        const cs = getComputedStyle(target)
        font = cs.font
        lineHeight = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2
      }
    })

    const maxWidth = el.clientWidth - (() => {
      const cs = getComputedStyle(el)
      return parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
    })()

    lastParams.current = { texts, font, lineHeight }
    setShuffledData({ paragraphs: computeAll(texts, font, lineHeight, maxWidth) })
  }, [])

  const reshuffle = useCallback((maxWidth: number) => {
    const p = lastParams.current
    if (!p) return
    setShuffledData({ paragraphs: computeAll(p.texts, p.font, p.lineHeight, maxWidth) })
  }, [])

  return { shuffledData, doShuffle, reshuffle }
}
