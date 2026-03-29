import { process } from './src'

const $raw = document.querySelector('article.raw')!
const $article = document.querySelector('article#write') as HTMLElement
const originHTML = $article.innerHTML

let shuffled = false

function doShuffle() {
  if (shuffled) return

  $article.innerHTML = originHTML
  $article.querySelectorAll('p').forEach((p) => process(p))

  requestAnimationFrame(() => {
    $raw.innerHTML = $article.innerHTML
    shuffled = true
  })
}

function restore() {
  if (!shuffled) return
  $article.innerHTML = originHTML
  $raw.innerHTML = originHTML
  shuffled = false
}

document.getElementById('process')!.onclick = doShuffle
document.getElementById('restore')!.onclick = restore

let resizeTimer: ReturnType<typeof setTimeout>
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    if (shuffled) {
      shuffled = false
      doShuffle()
    }
  }, 200)
})
