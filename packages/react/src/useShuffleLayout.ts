import {
  type MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {
  createShuffledLayout,
  type ShuffleLayoutInput,
  type ShuffleLayoutOptions,
  type ShuffledBlock,
} from 'article-shuffle'

export interface UseShuffleLayoutOptions {
  blocks: readonly string[]
  enabled?: boolean
  width?: number
}

export interface UseShuffleLayoutResult {
  blocks: ShuffledBlock[] | null
  blockPadding: { left: number; top: number }
  rootRef: MutableRefObject<HTMLElement | null>
  registerBlock: (index: number) => (node: HTMLElement | null) => void
}

const useSafeLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

function getFontValue(styles: CSSStyleDeclaration): string {
  if (styles.font) {
    return styles.font
  }

  const fontStyle = styles.fontStyle || 'normal'
  const fontVariant = styles.fontVariant || 'normal'
  const fontWeight = styles.fontWeight || '400'
  const fontSize = styles.fontSize || '16px'
  const lineHeight =
    styles.lineHeight && styles.lineHeight !== 'normal'
      ? `/${styles.lineHeight}`
      : ''
  const fontFamily = styles.fontFamily || 'sans-serif'

  return `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}${lineHeight} ${fontFamily}`
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

export function useShuffleLayout({
  blocks,
  enabled = true,
  width,
}: UseShuffleLayoutOptions): UseShuffleLayoutResult {
  const rootRef = useRef<HTMLElement | null>(null)
  const blockRefs = useRef<(HTMLElement | null)[]>([])
  const [layout, setLayout] = useState<ShuffledBlock[] | null>(null)
  const [blockPadding, setBlockPadding] = useState({ left: 0, top: 0 })

  const registerBlock = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      blockRefs.current[index] = node
    },
    [],
  )

  const recalculate = useCallback(() => {
    if (!enabled || blocks.length === 0) {
      setLayout(null)
      return
    }

    const root = rootRef.current
    const firstBlock = blockRefs.current[0]

    if (!root || !firstBlock) {
      return
    }

    const firstStyles = getComputedStyle(firstBlock)
    const paddingLeft = parseFloat(firstStyles.paddingLeft) || 0
    const paddingTop = parseFloat(firstStyles.paddingTop) || 0
    const paddingRight = parseFloat(firstStyles.paddingRight) || 0
    const inputs: ShuffleLayoutInput[] = blocks.map((text, index) => ({
      text,
      margin: getComputedStyle(blockRefs.current[index] ?? firstBlock).margin || '0',
    }))

    const blockContentWidth = Math.max(
      firstBlock.clientWidth - paddingLeft - paddingRight,
      0,
    )

    const options: ShuffleLayoutOptions = {
      font: getFontValue(firstStyles),
      lineHeight:
        parseFloat(firstStyles.lineHeight) ||
        parseFloat(firstStyles.fontSize) * 1.2,
      maxWidth: width ?? blockContentWidth,
      textIndent: parseFloat(firstStyles.textIndent) || 0,
    }

    setBlockPadding({ left: paddingLeft, top: paddingTop })
    setLayout(createShuffledLayout(inputs, options))
  }, [blocks, enabled, width])

  useSafeLayoutEffect(() => {
    blockRefs.current.length = blocks.length
    recalculate()
  }, [blocks, recalculate])

  useEffect(() => {
    if (!enabled || width !== undefined || !rootRef.current) {
      return
    }

    if (typeof ResizeObserver === 'undefined') {
      return
    }

    const observer = new ResizeObserver(() => {
      recalculate()
    })

    observer.observe(rootRef.current)

    return () => {
      observer.disconnect()
    }
  }, [enabled, recalculate, width])

  return {
    blocks: layout,
    blockPadding,
    rootRef,
    registerBlock,
  }
}
