# article-shuffle

[![npm](https://img.shields.io/npm/v/article-shuffle)](https://www.npmjs.com/package/article-shuffle)

Shuffle text in the DOM while preserving visual rendering — a lightweight anti-copy protection technique.

## Install

```sh
pnpm add article-shuffle
```

## Usage

```ts
import { shuffleAll, shuffleElement } from 'article-shuffle'

// Shuffle a single element in place
const paragraph = document.querySelector('p')
if (paragraph) shuffleElement(paragraph)

// Shuffle all matching descendants inside a container
const article = document.querySelector('article')
if (article) shuffleAll(article)
```

### Custom renderer

Use `createShuffledLayout` when you need full control over rendering:

```ts
import { createShuffledLayout } from 'article-shuffle'

const blocks = createShuffledLayout(
  [{ text: 'Hello world' }, { text: 'Second paragraph' }],
  { font: '16px sans-serif', lineHeight: 24, maxWidth: 600 },
)

for (const block of blocks) {
  for (const char of block.characters) {
    // char.char, char.x, char.y — position each character yourself
  }
}
```

## API

| Function | Description |
| --- | --- |
| `shuffleElement(el)` | Shuffle one element in place while preserving its visual layout. |
| `shuffleAll(root, options?)` | Shuffle all matching descendants inside a container. Accepts `{ selector?: string }`. |
| `createShuffledLayout(inputs, options)` | Produce reusable shuffled layout data for custom renderers. |
| `createShuffleLayout(inputs, options)` | Alias of `createShuffledLayout`. |

### Types

```ts
interface ShuffledCharacter { char: string; x: number; y: number }
interface ShuffledBlock { characters: ShuffledCharacter[]; height: number; margin: string }
interface ShuffleLayoutInput { text: string; margin?: string }
interface ShuffleLayoutOptions { font: string; lineHeight: number; maxWidth: number; textIndent?: number }
interface ShuffleAllOptions { selector?: string }
```

> [!NOTE]
> `process(el)` and `processAll(root, options?)` are deprecated aliases kept for backward compatibility. Use `shuffleElement` and `shuffleAll` instead.

## Links

- [Live demo](https://shuffle-article.vercel.app)
- [GitHub repository](https://github.com/Innei/shuffle-article)
