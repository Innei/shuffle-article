import { startTransition, useCallback, useRef, useState } from 'react'
import {
  createShuffleLayout,
  type ShuffleLayoutInput,
  type ShuffleLayoutOptions,
  type ShuffledBlock,
} from '../src'

interface StoredParams {
  blocks: ShuffleLayoutInput[]
  options: Omit<ShuffleLayoutOptions, 'maxWidth'>
}

function getContainerWidth(el: HTMLElement): number {
  const styles = getComputedStyle(el)
  return Math.max(
    el.clientWidth -
      parseFloat(styles.paddingLeft) -
      parseFloat(styles.paddingRight),
    0,
  )
}

function readLayoutSnapshot(el: HTMLElement): {
  blocks: ShuffleLayoutInput[]
  options: Omit<ShuffleLayoutOptions, 'maxWidth'>
  maxWidth: number
} {
  const targets = Array.from(el.querySelectorAll<HTMLElement>('p'))
  const blockElements = targets.length > 0 ? targets : [el]
  const [firstBlock] = blockElements

  if (!firstBlock) {
    return {
      blocks: [],
      options: {
        font: '',
        lineHeight: 0,
        textIndent: 0,
      },
      maxWidth: 0,
    }
  }

  const firstBlockStyles = getComputedStyle(firstBlock)

  return {
    blocks: blockElements.map((block) => ({
      text: block.textContent ?? '',
      margin: getComputedStyle(block).margin,
    })),
    options: {
      font: firstBlockStyles.font,
      lineHeight:
        parseFloat(firstBlockStyles.lineHeight) ||
        parseFloat(firstBlockStyles.fontSize) * 1.2,
      textIndent: parseFloat(firstBlockStyles.textIndent) || 0,
    },
    maxWidth: getContainerWidth(el),
  }
}

export function useShuffledContent() {
  const [shuffledData, setShuffledData] = useState<{
    paragraphs: ShuffledBlock[]
  } | null>(null)
  const lastParams = useRef<StoredParams | null>(null)

  const commitLayout = useCallback(
    (blocks: ShuffleLayoutInput[], options: ShuffleLayoutOptions) => {
      const paragraphs = createShuffleLayout(blocks, options)
      startTransition(() => {
        setShuffledData({ paragraphs })
      })
    },
    [],
  )

  const doShuffle = useCallback(
    (el: HTMLElement) => {
      const snapshot = readLayoutSnapshot(el)
      lastParams.current = {
        blocks: snapshot.blocks,
        options: snapshot.options,
      }
      commitLayout(snapshot.blocks, {
        ...snapshot.options,
        maxWidth: snapshot.maxWidth,
      })
    },
    [commitLayout],
  )

  const reshuffle = useCallback(
    (maxWidth: number) => {
      const last = lastParams.current
      if (!last) {
        return
      }

      commitLayout(last.blocks, { ...last.options, maxWidth })
    },
    [commitLayout],
  )

  return { shuffledData, doShuffle, reshuffle }
}
