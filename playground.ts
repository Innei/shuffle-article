import { process } from './src/process'

const editor = document.getElementById('editor')!
const wp = document.getElementById('wp')!
const raw = document.getElementById('raw')!

editor.innerHTML = `<p>燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？</p>`

function doShuffle(source: HTMLElement) {
  requestAnimationFrame(() => {
    wp.innerHTML = source.innerHTML
    const targets = wp.querySelectorAll('p')
    if (targets.length > 0) {
      targets.forEach((p) => process(p))
    } else {
      process(wp)
    }
    requestAnimationFrame(() => {
      raw.innerHTML = wp.innerHTML
    })
  })
}

// Debounce helper
function debounce(fn: () => void, ms: number) {
  let timer: ReturnType<typeof setTimeout>
  return () => {
    clearTimeout(timer)
    timer = setTimeout(fn, ms)
  }
}

const handleInput = debounce(() => doShuffle(editor), 300)

editor.addEventListener('input', handleInput)
editor.addEventListener('paste', () => {
  setTimeout(() => doShuffle(editor), 50)
})

window.addEventListener(
  'resize',
  debounce(() => doShuffle(editor), 200),
)

// Initial shuffle
doShuffle(editor)
