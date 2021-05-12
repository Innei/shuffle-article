# 逻辑打乱文字

不改变文字显示的原有顺序，而改变在 DOM 树中顺序。

![0511193628](https://cdn.jsdelivr.net/gh/Innei/img-bed@master/2021/0511193628.png)
![0512135651](https://cdn.jsdelivr.net/gh/Innei/img-bed@master/2021/0512135651.png)

Demo: <https://innei.github.io/shuffle-article/>

## Why

可以有效的防止用户复制文本。即便是复制了也是乱序的，打开控制台复制依然是乱序的。

**PS：道高一尺魔高一丈，依然可以通过 OCR 等方式解决**

## Usage

```sh
yarn add article-shuffle
```

```js
import { process } from 'article-shuffle'
const $article = document.querySelector('article')
$article.innerHTML = originHTML

$article.querySelectorAll('p').forEach(($p) => {
  process($p)
})
```

MIT
