# react-article-shuffle

React components for `article-shuffle`.

## Install

```sh
pnpm add react-article-shuffle article-shuffle
```

## Usage

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
    />
  )
}
```

## Exports

| Export | Description |
| --- | --- |
| `ShuffleText` | Ready-to-use React component for shuffled text blocks. |
| `useShuffleLayout` | Hook for building custom renderers on top of `article-shuffle`. |

## Repository

- GitHub: <https://github.com/Innei/shuffle-article>
- Live demo: <https://shuffle-article.vercel.app>
