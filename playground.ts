import { process } from './src/process'
import { debounce } from 'lodash-es'

const editor = document.getElementById('editor')!

const handle = debounce((e: any) => {
  requestAnimationFrame(() => {
    const wp = document.getElementById('wp')!
    const raw = document.getElementById('raw')!
    wp.innerHTML = (e.target as any).innerHTML
    process(wp)
    requestAnimationFrame(() => {
      const wp = document.getElementById('wp')!
      raw.innerHTML = wp.innerHTML
    })
  })
}, 300)

// editor.onkeydown = handle
editor.onkeypress = handle
editor.onpaste = handle
