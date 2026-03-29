import {
  prepareWithSegments,
  layoutWithLines,
  type LayoutLine,
} from '@chenglou/pretext'
import { shuffle, escapeHTML } from './utils/index'

/**
 * Shared offscreen canvas context for measuring text.
 * Avoids creating a new canvas per call.
 */
let _measureCtx: CanvasRenderingContext2D | null = null
function getMeasureCtx(): CanvasRenderingContext2D {
  if (!_measureCtx) {
    const canvas = document.createElement('canvas')
    _measureCtx = canvas.getContext('2d')!
  }
  return _measureCtx
}

/**
 * Measures the width of a string segment using canvas.
 */
function measureText(text: string, font: string): number {
  const ctx = getMeasureCtx()
  ctx.font = font
  return ctx.measureText(text).width
}

/**
 * Computes (x, y) positions for every character in a text block using
 * pretext for line-breaking and canvas measureText for character offsets.
 * No getBoundingClientRect needed.
 */
function computeCharPositions(
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number,
): { chars: string[]; positions: { x: number; y: number }[] } {
  const prepared = prepareWithSegments(text, font)
  const result = layoutWithLines(prepared, maxWidth, lineHeight)

  const chars: string[] = []
  const positions: { x: number; y: number }[] = []

  for (let lineIdx = 0; lineIdx < result.lines.length; lineIdx++) {
    const line: LayoutLine = result.lines[lineIdx]
    const y = lineIdx * lineHeight
    const lineText = line.text

    // Measure each character's x offset within the line
    let xOffset = 0
    for (const char of lineText) {
      if (char === '\n') continue
      chars.push(char)
      positions.push({ x: xOffset, y })
      xOffset += measureText(char, font)
    }
  }

  return { chars, positions }
}

/**
 * Process an element: shuffle its text characters in the DOM
 * while maintaining their visual positions using absolute positioning.
 *
 * Uses @chenglou/pretext for text layout measurement instead of
 * getBoundingClientRect, avoiding expensive layout reflows.
 */
export function process(el: HTMLElement): void {
  const computedStyle = getComputedStyle(el)
  const font = computedStyle.font
  const lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.2
  const maxWidth = el.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight)

  // Extract all text from this element
  const text = el.textContent || ''
  if (text.trim().length === 0) return

  const { chars, positions } = computeCharPositions(text, font, maxWidth, lineHeight)
  if (chars.length === 0) return

  // Build character spans with absolute positioning
  const container = document.createElement('div')
  container.setAttribute('data-shuffle-p', '')
  container.style.position = 'relative'
  container.style.height = `${positions[positions.length - 1].y + lineHeight}px`

  const spans: HTMLSpanElement[] = []
  for (let i = 0; i < chars.length; i++) {
    const span = document.createElement('span')
    span.setAttribute('data-shuffle', '')
    span.textContent = chars[i]
    span.style.position = 'absolute'
    span.style.left = `${positions[i].x}px`
    span.style.top = `${positions[i].y}px`
    spans.push(span)
  }

  // Shuffle the order of spans in the DOM (visual positions stay the same)
  const shuffled = shuffle(spans)
  container.append(...shuffled)

  // Replace original content
  el.innerHTML = ''
  el.appendChild(container)
}

/**
 * Process all child paragraphs / text blocks within an element.
 */
export function processAll(el: HTMLElement): void {
  const paragraphs = el.querySelectorAll('p')
  if (paragraphs.length > 0) {
    paragraphs.forEach((p) => process(p))
  } else {
    process(el)
  }
}
