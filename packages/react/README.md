# react-article-shuffle

[![npm](https://img.shields.io/npm/v/react-article-shuffle)](https://www.npmjs.com/package/react-article-shuffle)

React component and hook for [`article-shuffle`](https://www.npmjs.com/package/article-shuffle) — shuffle text in the DOM while preserving visual rendering.

## Install

```sh
pnpm add react-article-shuffle
```

> [!NOTE]
> Requires **React 18.2+** or **React 19** as a peer dependency.

## Usage

### `ShuffleText` component

```tsx
import { ShuffleText } from 'react-article-shuffle'

export function ArticlePreview() {
  return (
    <ShuffleText
      blocks={[
        'The first paragraph stays visually readable.',
        'The copied result no longer follows the original reading order.',
      ]}
      blockAs="p"
      className="article-preview"
    />
  )
}
```

You can also pass a single string via the `text` prop:

```tsx
<ShuffleText text="A single paragraph of shuffled text." />
```

### `useShuffleLayout` hook

For full control over rendering, use the hook directly:

```tsx
import { useShuffleLayout } from 'react-article-shuffle'

function CustomRenderer() {
  const { blocks, rootRef, registerBlock } = useShuffleLayout({
    blocks: ['First block', 'Second block'],
  })

  return (
    <div ref={rootRef}>
      {blocks?.map((block, i) => (
        <p key={i} ref={registerBlock(i)} style={{ position: 'relative', height: block.height }}>
          {block.characters.map((char, j) => (
            <span key={j} style={{ position: 'absolute', left: char.x, top: char.y }}>
              {char.char}
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}
```

## API

### `ShuffleText` props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `blocks` | `readonly string[]` | — | Array of text blocks to shuffle. |
| `text` | `string` | — | Single text string (alternative to `blocks`). |
| `as` | `string` | `'div'` | Wrapper element tag. |
| `blockAs` | `string` | `'p'` | Tag for each block element. |
| `blockClassName` | `string` | — | CSS class applied to each block. |
| `blockStyle` | `CSSProperties` | — | Inline styles for each block. |
| `enabled` | `boolean` | `true` | Enable or disable shuffling. |
| `width` | `number` | — | Fixed width for layout calculation. |

All standard `HTMLAttributes` are also forwarded to the wrapper element.

### `useShuffleLayout` options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `blocks` | `readonly string[]` | — | Text blocks to shuffle. |
| `enabled` | `boolean` | `true` | Enable or disable shuffling. |
| `width` | `number` | — | Fixed width override. |

Returns `{ blocks, rootRef, registerBlock }`.

## Links

- [Live demo](https://shuffle-article.vercel.app)
- [GitHub repository](https://github.com/Innei/shuffle-article)
