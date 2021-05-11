function process(el: HTMLElement) {
  const $clone = el.cloneNode(true) as HTMLElement
  const originRect = el.getBoundingClientRect()

  for (const $child of $clone.childNodes) {
    nodeDFSProcssTextNode($child as HTMLElement)
    // $child.replaceWith($newEl)
  }

  $clone.style.overflow = 'hidden'
  $clone.style.transform = 'translateZ(0)'

  el.replaceWith($clone)

  const $textEls = ($clone as HTMLElement).querySelectorAll('[data-shuffle]')

  const $pEls = $clone.querySelectorAll('[data-shuffle-p]')
  const pElsPosRecord = [] as DOMRect[]
  $pEls // @ts-ignore
    .forEach(($el: HTMLElement) => {
      const rect = $el.getBoundingClientRect()
      pElsPosRecord.push(rect)
    })
  const textElPosRecord = [] as DOMRect[]
  $textEls
    // @ts-ignore
    .forEach(($el: HTMLElement) => {
      const rect = $el.getBoundingClientRect()
      textElPosRecord.push(rect)
    })

  $clone.style.display = 'none'
  $clone.style.transform = ''
  $textEls
    // @ts-ignore
    .forEach(($el: HTMLElement, i) => {
      $el.style.position = 'absolute'
      $el.style.left = textElPosRecord[i].left + 'px'
      $el.style.top = textElPosRecord[i].top + 'px'
    })

  $pEls.forEach(($p, i) => {
    shuffleSpanNodes($p as HTMLElement)
    ;($p as HTMLElement).style.height = pElsPosRecord[i].height + 'px'
  })
  $clone.style.height = originRect.height + 'px'
  $clone.style.display = ''
}

function nodeDFSProcssTextNode(el: HTMLElement) {
  if (!el) {
    return
  }

  const node = wrapTextNode(el)
  // if (node) {
  //   shuffleSpanNodes(node as HTMLElement)
  // }

  if (el.childNodes) {
    const len = el.childNodes.length
    for (let i = 0; i < len; i++) {
      const $child = el.childNodes.item(i) as HTMLElement
      nodeDFSProcssTextNode($child)
    }
  }
}

/**
 *
 * @param el 处理 Text Node 包裹 span
 * @param options
 * @returns
 */
function wrapTextNode(
  el: HTMLElement,
  options: { tagName: 'div' | 'p' | 'span' } = { tagName: 'span' },
) {
  if (el.nodeType != Node.TEXT_NODE) {
    return
  }
  if (el.textContent.trim().length == 0) {
    return
  }
  let html = ''
  for (const char of el.textContent) {
    if (char == '') {
      continue
    }
    html += `<span data-shuffle>${escapeHTML(char)}</span>`
  }
  const newEl = document.createElement(options.tagName)
  newEl.innerHTML = html
  newEl.setAttribute('data-shuffle-p', '')
  el.replaceWith(newEl)

  return newEl
  // if (el.parentNode.nodeType == Node.ELEMENT_NODE) {
  //   // console.log(el.parentNode)
  //   const parentNode = el.parentNode as HTMLElement
  //   parentNode.style.overflow = 'hidden'
  //   parentNode.innerHTML = html
  //   parentNode.setAttribute('data-shuffle-p', '')
  //   return parentNode
  //   // el.replaceWith()
  // } else {
  //   const newEl = document.createElement(options.tagName)
  //   newEl.innerHTML = html
  //   el.replaceWith(newEl)

  //   return newEl
  // }
  // const newEl = document.createElement(options.tagName)
  // newEl.style.overflow = 'hidden'
  // newEl.innerHTML = html
  // el.replaceWith(newEl)
  // return newEl
}

function shuffleSpanNodes(el: HTMLElement) {
  if (!el) return
  const spans = el.querySelectorAll('[data-shuffle]')
  if (spans.length != el.children.length) return
  const shuffled = shuffle([...spans])
  el.innerHTML = ''
  el.append(...shuffled)
}

function shuffle(arr: any[]) {
  let n = arr.length,
    random
  while (0 != n) {
    random = (Math.random() * n--) >>> 0
    ;[arr[n], arr[random]] = [arr[random], arr[n]]
  }
  return arr
}

function escapeHTML(t: string) {
  const lt = /</g,
    gt = />/g,
    ap = /'/g,
    ic = /"/g
  return t
    .toString()
    .replace(lt, '&lt;')
    .replace(gt, '&gt;')
    .replace(ap, '&#39;')
    .replace(ic, '&#34;')
}

const raf = requestAnimationFrame

function main() {
  const $article = document.querySelector('article') as HTMLElement
  $article.innerHTML = testDom
}

function shuffleTest() {
  const $article = document.querySelector('article') as HTMLElement
  $article.innerHTML = testDom
  process($article)

  const $raw = document.querySelector('article.raw')
  raf(() => {
    const $article = document.querySelector('article') as HTMLElement

    // $raw.textContent = $article.textContent

    $raw.innerHTML = $article.innerHTML
  })
}

document.getElementById('process').onclick = shuffleTest

const testDom = `
<p>    燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有再开的时候。但是，聪明的，你告诉我，我们的日子为什么一去不复返呢？——是有人偷了他们罢：那是谁？又藏在何处呢？是他们自己逃走了罢：现在又到了哪里呢？</p>
<p>　　我不知道他们给了我多少日子；但我的手确乎是渐渐空虚了。在默默里算着，八千多日子已经从我手中溜去；像针尖上一滴水滴在大海里，我的日子滴在时间的流里，没有声音，也没有影子。我不禁头涔涔而泪潸潸了。</p>
<p>　　去的尽管去了，来的尽管来着；去来的中间，又怎样地匆匆呢？早上我起来的时候，小屋里射进两三方斜斜的太阳。太阳他有脚啊，轻轻悄悄地挪移了；我也茫茫然跟着旋转。于是——洗手的时候，日子从水盆里过去；吃饭的时候，日子从饭碗里过去；默默时，便从凝然的双眼前过去。我觉察他去的匆匆了，伸出手遮挽时，他又从遮挽着的手边过去，天黑时，我躺在床上，他便伶伶俐俐地从我身上跨过，从我脚边飞去了。等我睁开眼和太阳再见，这算又溜走了一日。我掩着面叹息。但是新来的日子的影儿又开始在叹息里闪过了。</p>
<p>　　在逃去如飞的日子里，在千门万户的世界里的我能做些什么呢？只有徘徊罢了，只有匆匆罢了；在八千多日的匆匆里，除徘徊外，又剩些什么呢？过去的日子如轻烟，被微风吹散了，如薄雾，被初阳蒸融了；我留着些什么痕迹呢？我何曾留着像游丝样的痕迹呢？我赤裸裸来到这世界，转眼间也将赤裸裸的回去罢？但不能平的，为什么偏要白白走这一遭啊？</p>
<p>　　你聪明的，告诉我，我们的日子为什么一去不复返呢？</p>
`
main()
