import {
  prepareWithSegments,
  layoutNextLine,
  type LayoutCursor,
} from '@chenglou/pretext'
import { shuffle } from './utils/index'
import type {
  ShuffleLayoutInput,
  ShuffleLayoutOptions,
  ShuffledBlock,
  ShuffledCharacter,
} from './types'

let measureContext: CanvasRenderingContext2D | null = null

function getMeasureContext(): CanvasRenderingContext2D {
  if (!measureContext) {
    const canvas = document.createElement('canvas')
    measureContext = canvas.getContext('2d')!
  }

  return measureContext
}

function computeCharacters(
  text: string,
  { font, lineHeight, maxWidth, textIndent = 0 }: ShuffleLayoutOptions,
): { characters: ShuffledCharacter[]; height: number } {
  const prepared = prepareWithSegments(text, font)
  const context = getMeasureContext()
  context.font = font

  const characters: ShuffledCharacter[] = []
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 }
  let lineIndex = 0

  while (true) {
    const isFirstLine = lineIndex === 0
    const lineMaxWidth = isFirstLine ? Math.max(maxWidth - textIndent, 0) : maxWidth
    const line = layoutNextLine(prepared, cursor, lineMaxWidth)

    if (!line) {
      break
    }

    const y = lineIndex * lineHeight
    let xOffset = isFirstLine ? textIndent : 0

    for (const char of line.text) {
      if (char === '\n') {
        continue
      }

      characters.push({ char, x: xOffset, y })
      xOffset += context.measureText(char).width
    }

    cursor = line.end
    lineIndex++
  }

  return { characters, height: lineIndex * lineHeight }
}

export function createShuffleLayout(
  inputs: readonly ShuffleLayoutInput[],
  options: ShuffleLayoutOptions,
): ShuffledBlock[] {
  return inputs.flatMap((input) => {
    if (input.text.trim().length === 0) {
      return []
    }

    const { characters, height } = computeCharacters(input.text, options)

    return [
      {
        characters: shuffle([...characters]),
        height,
        margin: input.margin ?? '0',
      },
    ]
  })
}
