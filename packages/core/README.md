# article-shuffle

Shuffle text in the DOM while preserving visual rendering for lightweight anti-copy protection.

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
| `shuffleElement(el)` | Shuffle one element in place while preserving visual layout. |
| `shuffleAll(root, options?)` | Shuffle matching descendants inside a container. |
| `createShuffledLayout(inputs, options)` | Create reusable shuffled layout data for custom renderers. |
| `createShuffleLayout(inputs, options)` | Legacy-compatible alias of `createShuffledLayout`. |
| `process(el)` / `processAll(root, options?)` | Legacy aliases kept for compatibility. |

## Repository

- GitHub: <https://github.com/Innei/shuffle-article>
