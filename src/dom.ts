import { createShuffleLayout } from './layout'
import type { ShuffleAllOptions, ShuffleLayoutOptions, ShuffledBlock } from './types'

function getElementLayoutOptions(el: HTMLElement): ShuffleLayoutOptions {
  const styles = getComputedStyle(el)

  return {
    font: styles.font,
    lineHeight:
      parseFloat(styles.lineHeight) || parseFloat(styles.fontSize) * 1.2,
    maxWidth: Math.max(
      el.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight),
      0,
    ),
    textIndent: parseFloat(styles.textIndent) || 0,
  }
}

function createCharacterNode(char: string, x: number, y: number): HTMLSpanElement {
  const span = document.createElement('span')
  span.setAttribute('data-shuffle', '')
  span.textContent = char
  span.style.position = 'absolute'
  span.style.left = `${x}px`
  span.style.top = `${y}px`
  return span
}

function renderBlockIntoElement(el: HTMLElement, block: ShuffledBlock): void {
  const currentPosition = getComputedStyle(el).position

  el.innerHTML = ''
  el.setAttribute('data-shuffle-p', '')
  el.style.height = `${block.height}px`

  if (currentPosition === '' || currentPosition === 'static') {
    el.style.position = 'relative'
  }

  el.append(
    ...block.characters.map((character) =>
      createCharacterNode(character.char, character.x, character.y),
    ),
  )
}

export function shuffleElement(el: HTMLElement): void {
  const [block] = createShuffleLayout(
    [{ text: el.textContent ?? '' }],
    getElementLayoutOptions(el),
  )

  if (!block) {
    return
  }

  renderBlockIntoElement(el, block)
}

export function shuffleAll(
  root: HTMLElement,
  { selector = 'p' }: ShuffleAllOptions = {},
): void {
  const targets = Array.from(root.querySelectorAll<HTMLElement>(selector))

  if (targets.length === 0) {
    shuffleElement(root)
    return
  }

  for (const target of targets) {
    shuffleElement(target)
  }
}
