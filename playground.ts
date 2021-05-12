import { process } from './src/process'
import { debounce, throttle } from 'lodash-es'

const editor = document.getElementById('editor')!
editor.innerHTML = `<div class="css_code_panel--cssLine--3U0SJ" style="margin: 0px;border: 0px;font-variant-numeric: inherit;font-variant-east-asian: inherit;font-stretch: inherit;line-height: inherit;vertical-align: inherit;outline: none;cursor: inherit;text-indent: -2em;user-select: auto;background-color: rgb(255, 255, 255);"><div class="css_code_panel--cssLine--3U0SJ" style="margin: 0px; padding: 0px 0px 0px 2em; border: 0px; font-variant-numeric: inherit; font-variant-east-asian: inherit; font-stretch: inherit; line-height: inherit; vertical-align: inherit; outline: none; cursor: inherit; text-indent: -2em; user-select: auto;"><div style="background-color: rgb(253, 240, 237); line-height: 23px;"><div style="line-height: 23px;"><div style="background-color: rgb(255, 255, 255); line-height: 23px;"><div style="background-color: rgb(36, 41, 46); line-height: 23px;"><div style="color: rgb(36, 41, 46); background-color: rgb(255, 255, 255); font-family: &quot;operator mono SSm Lig&quot;, &quot;FantasqueSansMono Nerd Font Mono&quot;, &quot;operator mono&quot;, &quot;Hannotate SC&quot;, &quot;PingFang SC&quot;, -apple-system, Menlo, Monaco, &quot;Courier New&quot;, monospace; font-size: 15px; line-height: 23px; white-space: pre;"><span style="color: #005cc5;">     console</span>.<span style="color: #6f42c1;">log</span>(<span style="color: #032f62;">'hello, world!'</span>)</div><div style="color: rgb(36, 41, 46); background-color: rgb(255, 255, 255); font-family: &quot;operator mono SSm Lig&quot;, &quot;FantasqueSansMono Nerd Font Mono&quot;, &quot;operator mono&quot;, &quot;Hannotate SC&quot;, &quot;PingFang SC&quot;, -apple-system, Menlo, Monaco, &quot;Courier New&quot;, monospace; font-size: 15px; line-height: 23px; white-space: pre;"><div style="line-height: 23px;"><span style="color: #d73a49;">     const</span> <span style="color: #6f42c1;">pluckDeep</span> <span style="color: #d73a49;">=</span> <span style="color: #e36209;">key</span> <span style="color: #d73a49;">=&gt;</span> <span style="color: #e36209;">obj</span> <span style="color: #d73a49;">=&gt;</span> <span style="color: #e36209;">key</span>.<span style="color: #6f42c1;">split</span>(<span style="color: #032f62;">'.'</span>).<span style="color: #6f42c1;">reduce</span>((<span style="color: #e36209;">accum</span>, <span style="color: #e36209;">key</span>) <span style="color: #d73a49;">=&gt;</span> <span style="color: #e36209;">accum</span>[<span style="color: #e36209;">key</span>], <span style="color: #e36209;">obj</span>)</div></div></div></div></div></div></div></div>`
const handle = debounce(
  (e: any) => {
    shuffle(e.target)
  },
  300,
  { leading: true, trailing: true },
)

editor.onkeydown = handle
editor.onkeyup = handle
editor.onkeypress = handle
editor.onpaste = handle
window.onresize = throttle(
  () => {
    shuffle(editor)
  },
  300,
  { leading: true, trailing: true },
)
shuffle(editor)

function shuffle($el: HTMLElement) {
  requestAnimationFrame(() => {
    const wp = document.getElementById('wp')!
    const raw = document.getElementById('raw')!
    wp.innerHTML = $el.innerHTML
    process(wp)
    requestAnimationFrame(() => {
      const wp = document.getElementById('wp')!
      raw.innerHTML = wp.innerHTML
    })
  })
}
