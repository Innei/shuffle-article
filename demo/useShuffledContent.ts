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

  for (let lineIdx = 0; lineIdx < result.lines.length; lineIdx++) {
    const line: LayoutLine = result.lines[lineIdx]
    const y = lineIdx * lineHeight
    const lineText = line.text
    const ctx = getMeasureCtx()
    ctx.font = font

    let xOffset = 0
    for (const char of lineText) {
      if (char === '\n') continue
      chars.push({ char, x: xOffset, y })
      xOffset += ctx.measureText(char).width
    }
  }

  const height = result.lines.length * lineHeight
  return { chars, height }
}

export function useShuffledContent() {
  const [shuffledData, setShuffledData] = useState<{
    paragraphs: { chars: ShuffledChar[]; height: number }[]
  } | null>(null)

  const containerRef = useRef<HTMLElement>(null)

  const doShuffle = useCallback((el: HTMLElement) => {
    const paragraphs = el.querySelectorAll('p')
    const targets = paragraphs.length > 0 ? paragraphs : [el]
    const results: { chars: ShuffledChar[]; height: number }[] = []

    targets.forEach((target) => {
      const text = target.textContent || ''
      if (text.trim().length === 0) return

      const computedStyle = getComputedStyle(target)
      const font = computedStyle.font
      const lineHeight =
        parseFloat(computedStyle.lineHeight) ||
        parseFloat(computedStyle.fontSize) * 1.2
      const maxWidth =
        target.clientWidth -
        parseFloat(computedStyle.paddingLeft) -
        parseFloat(computedStyle.paddingRight)

      const { chars, height } = computeCharPositions(text, font, maxWidth, lineHeight)
      results.push({ chars: shuffle([...chars]), height })
    })

    setShuffledData({ paragraphs: results })
  }, [])

  return { shuffledData, doShuffle, containerRef }
}
