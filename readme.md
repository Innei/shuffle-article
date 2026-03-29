# Shuffle Article

[![article-shuffle on npm](https://img.shields.io/npm/v/article-shuffle?label=article-shuffle)](https://www.npmjs.com/package/article-shuffle)
[![react-article-shuffle on npm](https://img.shields.io/npm/v/react-article-shuffle?label=react-article-shuffle)](https://www.npmjs.com/package/react-article-shuffle)
[![Live Demo](https://img.shields.io/badge/demo-vercel-black?logo=vercel)](https://shuffle-article.vercel.app)

Shuffle text in the DOM while preserving visual rendering — a lightweight anti-copy protection technique.

在不改变视觉呈现的前提下，打乱 DOM 中的文本顺序，以降低直接复制文本的可用性。

![Demo overview](./assets/demo-overview.png)

## How it works

1. Read typography metrics (font, line-height, available width) from the target element
2. Compute per-character positions using [`@chenglou/pretext`](https://github.com/chenglou/pretext) and `canvas.measureText`
3. Wrap each character in an absolutely-positioned `<span>`
4. Randomise the DOM order while keeping absolute positions intact

The result: text **looks** the same but the underlying DOM (and therefore clipboard content) is scrambled.

## Packages

| Package | Description | README |
| --- | --- | --- |
| [`article-shuffle`](https://www.npmjs.com/package/article-shuffle) | Core DOM APIs and layout utilities | [packages/core](./packages/core/README.md) |
| [`react-article-shuffle`](https://www.npmjs.com/package/react-article-shuffle) | React component and hook | [packages/react](./packages/react/README.md) |

## Quick start

### Vanilla

```sh
pnpm add article-shuffle
```

```ts
import { shuffleAll, shuffleElement } from 'article-shuffle'

// Shuffle a single element
shuffleElement(document.querySelector('p')!)

// Shuffle all matching descendants
shuffleAll(document.querySelector('article')!)
```

### React

```sh
pnpm add react-article-shuffle
```

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

## Demo

| Page | Link |
| --- | --- |
| Main demo | <https://shuffle-article.vercel.app> |
| Playground | <https://shuffle-article.vercel.app/playground> |

| Main demo | Playground |
| --- | --- |
| ![Main demo](./assets/demo-overview.png) | ![Playground](./assets/playground-overview.png) |

## Development

> [!NOTE]
> Requires **Node.js ≥ 20** and **pnpm 10**.

```sh
pnpm install     # install dependencies
pnpm dev         # start demo dev server
pnpm check       # type-check the workspace
pnpm test        # run tests
pnpm build       # full verification build (check → test → packages → demo)
```

### Workspace layout

```
shuffle-article/
├── packages/core       # publishable core library
├── packages/react      # publishable React wrapper
└── apps/demo           # Vite demo app
```
