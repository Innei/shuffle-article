# Shuffle Article

Shuffle text in the DOM while preserving visual rendering for lightweight anti-copy protection.

在不改变视觉呈现的前提下，打乱 DOM 中的文本顺序，以降低直接复制文本的可用性。

## Demo

| Page | Link | Purpose |
| --- | --- | --- |
| Main demo | <https://innei.github.io/shuffle-article/> | Compare visual rendering with the actual DOM order |
| Playground | <https://innei.github.io/shuffle-article/playground> | Type or paste content and inspect the shuffled result |

## Screenshots

| Main demo | Playground |
| --- | --- |
| ![Main demo overview](./assets/demo-overview.png) | ![Playground overview](./assets/playground-overview.png) |

## Why

- The page remains visually readable after shuffling.
- Copying rendered text yields scrambled content.
- Reading text directly from the DOM yields the same scrambled order.

> This is a deterrence layer rather than DRM. OCR, screenshot-based extraction, or custom reconstruction scripts can still bypass it.

## Install

```sh
pnpm add article-shuffle
```

## Usage

```ts
import { shuffleAll, shuffleElement } from 'article-shuffle'

const paragraph = document.querySelector('p')
if (paragraph) {
  shuffleElement(paragraph)
}

const article = document.querySelector('article')
if (article) {
  shuffleAll(article)
}
```

## API

| API | Description |
| --- | --- |
| `shuffleElement(el)` | Shuffle one element in place while preserving its visual layout. |
| `shuffleAll(root, options?)` | Shuffle all matching descendants inside a container. The default selector is `<p>`. |
| `createShuffleLayout(inputs, options)` | Produce reusable shuffled layout data for custom renderers such as React views or previews. |
| `process(el)` | Legacy alias of `shuffleElement`. |
| `processAll(root, options?)` | Legacy alias of `shuffleAll`. |

## Development

| Task | Command |
| --- | --- |
| Install dependencies | `pnpm install` |
| Start demo | `pnpm dev` |
| Type-check | `pnpm check` |
| Run tests | `pnpm test` |
| Build demo | `pnpm build:demo` |
| Build library | `pnpm build:lib` |
| Run the full verification build | `pnpm build` |

## How It Works

```text
[Original text block]
          |
          v
[Read text + computed typography]
          |
          v
[Compute per-character positions]
  using @chenglou/pretext + canvas.measureText
          |
          v
[Wrap each character in an absolutely positioned <span>]
          |
          v
[Shuffle span order in the DOM]
          |
          v
[Visual layout stays stable, copied text becomes scrambled]
```

- Character layout is computed without relying on repeated `getBoundingClientRect` measurements.
- The rendered position of each character is preserved through absolute positioning.
- Only the DOM order changes, so the copied text no longer follows the original reading order.

## License

MIT © [Innei](https://github.com/Innei)
