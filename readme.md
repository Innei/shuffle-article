# 逻辑打乱文字

不改变文字显示的原有顺序,而改变在 DOM 树中顺序.

![0511193628](https://cdn.jsdelivr.net/gh/Innei/img-bed@master/2021/0511193628.png)

Demo: <https://innei.github.io/shuffle-article/>

## 使用

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
