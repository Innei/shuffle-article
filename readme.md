# Shuffle Article

Shuffle text in the DOM while preserving visual rendering — an anti-copy protection for web content.

在不改变视觉呈现的前提下，打乱 DOM 中的文字顺序，实现网页文本防复制保护。

## Demo

<https://innei.github.io/shuffle-article/>

![Visual rendering vs actual DOM](https://cdn.jsdelivr.net/gh/Innei/img-bed@master/2021/0511193628.png)
![Copy result is scrambled](https://cdn.jsdelivr.net/gh/Innei/img-bed@master/2021/0512135651.png)

## Why

用户即使复制文本，得到的也是乱序的内容；打开控制台复制 DOM 文本同样如此。

Even if a user copies the text, the result will be scrambled. Inspecting the DOM yields the same scrambled order.

> **PS**: 道高一尺魔高一丈，依然可以通过 OCR 等方式绕过。

## Install

```sh
npm install article-shuffle
```

## Usage

```ts
import { process, processAll } from 'article-shuffle'

// Process a single element
const el = document.querySelector('p')
process(el)

// Or process all <p> tags within a container
const article = document.querySelector('article')
processAll(article)
```

### How it works

1. Measures each character's position using [`@chenglou/pretext`](https://github.com/chenglou/pretext) for line-breaking and Canvas `measureText` for character offsets
2. Wraps each character in an absolutely-positioned `<span>`
3. Shuffles the DOM order of spans — visually unchanged, but the underlying text is scrambled

## License

MIT © [Innei](https://github.com/Innei)
