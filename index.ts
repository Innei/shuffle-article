import { process } from './src'
const raf = requestAnimationFrame

const $raw = document.querySelector('article.raw')!
const $article = document.querySelector('article') as HTMLElement
const originHTML = $article.innerHTML
function main() {
  $article.innerHTML = originHTML
}
let flag = false
function shuffleTest() {
  if (flag) {
    return
  }
  const $article = document.querySelector('article') as HTMLElement
  $article.innerHTML = originHTML

  $article.querySelectorAll('p').forEach(($p) => {
    process($p)
  })

  raf(() => {
    const $article = document.querySelector('article') as HTMLElement

    // $raw.textContent = $article.textContent

    $raw.innerHTML = $article.innerHTML
    flag = true
  })
}

document.getElementById('process')!.onclick = shuffleTest

window.onresize = () => {
  if (flag) {
    flag = false
  }
  shuffleTest()
}
document.getElementById('restore')!.onclick = () => {
  if (!flag) {
    return
  }
  $article.innerHTML = originHTML
  $raw.innerHTML = originHTML
  flag = false
}
main()
