import { createElement, useMemo, type CSSProperties, type HTMLAttributes } from 'react'
import type { ShuffledBlock } from 'article-shuffle'
import { useShuffleLayout } from './useShuffleLayout'

type TagName = keyof HTMLElementTagNameMap

function renderShuffledBlock(
  block: ShuffledBlock,
  index: number,
  tagName: TagName,
  className: string | undefined,
  style: CSSProperties | undefined,
  registerBlock: (index: number) => (node: HTMLElement | null) => void,
  paddingOffset: { left: number; top: number },
) {
  return createElement(
    tagName,
    {
      key: index,
      ref: registerBlock(index),
      className,
      style: {
        ...style,
        position: 'relative',
        height: `${block.height}px`,
        margin: block.margin,
        textIndent: 0,
      },
      'data-shuffle-p': '',
    },
    block.characters.map((character, characterIndex) =>
      createElement(
        'span',
        {
          key: `${index}-${characterIndex}`,
          'data-shuffle': '',
          style: {
            position: 'absolute',
            left: `${paddingOffset.left + character.x}px`,
            top: `${paddingOffset.top + character.y}px`,
          },
        },
        character.char,
      ),
    ),
  )
}

function renderPlainBlock(
  text: string,
  index: number,
  tagName: TagName,
  className: string | undefined,
  style: CSSProperties | undefined,
  registerBlock: (index: number) => (node: HTMLElement | null) => void,
) {
  return createElement(
    tagName,
    {
      key: index,
      ref: registerBlock(index),
      className,
      style,
    },
    text,
  )
}

export interface ShuffleTextProps extends HTMLAttributes<HTMLElement> {
  as?: TagName
  blockAs?: TagName
  text?: string
  blocks?: readonly string[]
  blockClassName?: string
  blockStyle?: CSSProperties
  enabled?: boolean
  width?: number
  children?: never
}

export function ShuffleText({
  as = 'div',
  blockAs = 'p',
  text,
  blocks,
  blockClassName,
  blockStyle,
  enabled = true,
  width,
  ...rest
}: ShuffleTextProps) {
  const normalizedBlocks = useMemo(() => {
    if (blocks && blocks.length > 0) {
      return [...blocks]
    }

    if (typeof text === 'string' && text.length > 0) {
      return [text]
    }

    return []
  }, [blocks, text])

  const { blocks: shuffledBlocks, blockPadding, rootRef, registerBlock } = useShuffleLayout({
    blocks: normalizedBlocks,
    enabled,
    width,
  })

  const renderedBlocks =
    enabled && shuffledBlocks
      ? shuffledBlocks.map((block, index) =>
          renderShuffledBlock(
            block,
            index,
            blockAs,
            blockClassName,
            blockStyle,
            registerBlock,
            blockPadding,
          ),
        )
      : normalizedBlocks.map((block, index) =>
          renderPlainBlock(
            block,
            index,
            blockAs,
            blockClassName,
            blockStyle,
            registerBlock,
          ),
        )

  return createElement(
    as,
    {
      ...rest,
      ref: rootRef,
    },
    renderedBlocks,
  )
}
