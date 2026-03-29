import { useCallback, useRef, useState } from 'react'
import {
  prepareWithSegments,
  layoutNextLine,
  type LayoutCursor,
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
  margin: string
}

interface StoredParams {
  texts: string[]
  font: string
  lineHeight: number
  textIndent: number
  margins: string[]
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
  textIndent: number,
): { chars: ShuffledChar[]; height: number } {
  const prepared = prepareWithSegments(text, font)

  const chars: ShuffledChar[] = []
  const ctx = getMeasureCtx()
  ctx.font = font

  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
  let lineIdx = 0

  while (true) {
    const isFirstLine = lineIdx === 0
    const lineMaxWidth = isFirstLine ? maxWidth - textIndent : maxWidth
    const line = layoutNextLine(prepared, cursor, lineMaxWidth)
    if (!line) break

    const y = lineIdx * lineHeight
    const xBase = isFirstLine ? textIndent : 0

    let xOffset = xBase
    for (const char of line.text) {
      if (char === '\n') continue
      chars.push({ char, x: xOffset, y })
      xOffset += ctx.measureText(char).width
    }

    cursor = line.end
    lineIdx++
  }

  return { chars, height: lineIdx * lineHeight }
}

function computeAll(
  texts: string[],
  font: string,
  lineHeight: number,
  maxWidth: number,
  textIndent: number,
  margins: string[],
): ShuffledParagraph[] {
  const results: ShuffledParagraph[] = []
  for (let i = 0; i < texts.length; i++) {
    if (texts[i].trim().length === 0) continue
    const { chars, height } = computeCharPositions(texts[i], font, maxWidth, lineHeight, textIndent)
    results.push({ chars: shuffle([...chars]), height, margin: margins[i] || '0' })
  }
  return results
}

export function useShuffledContent() {
  const [shuffledData, setShuffledData] = useState<{
    paragraphs: ShuffledParagraph[]
  } | null>(null)

  const lastParams = useRef<StoredParams | null>(null)

  const doShuffle = useCallback((el: HTMLElement) => {
    const pEls = el.querySelectorAll('p')
    const targets = pEls.length > 0 ? pEls : [el]

    const texts: string[] = []
    const margins: string[] = []
    let font = ''
    let lineHeight = 0
    let textIndent = 0

    targets.forEach((target) => {
      const text = target.textContent || ''
      const cs = getComputedStyle(target)
      texts.push(text)
      margins.push(cs.margin)
      if (!font) {
        font = cs.font
        lineHeight = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2
        textIndent = parseFloat(cs.textIndent) || 0
      }
    })

    const maxWidth = el.clientWidth - (() => {
      const cs = getComputedStyle(el)
      return parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
    })()

    lastParams.current = { texts, font, lineHeight, textIndent, margins }
    setShuffledData({ paragraphs: computeAll(texts, font, lineHeight, maxWidth, textIndent, margins) })
  }, [])

  const reshuffle = useCallback((maxWidth: number) => {
    const p = lastParams.current
    if (!p) return
    setShuffledData({ paragraphs: computeAll(p.texts, p.font, p.lineHeight, maxWidth, p.textIndent, p.margins) })
  }, [])

  return { shuffledData, doShuffle, reshuffle }
}
