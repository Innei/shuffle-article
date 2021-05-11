function shuffle(arr) {
    let n = arr.length, random;
    while (0 != n) {
        random = (Math.random() * n--) >>> 0;
        [arr[n], arr[random]] = [arr[random], arr[n]];
    }
    return arr;
}
function escapeHTML(t) {
    const lt = /</g, gt = />/g, ap = /'/g, ic = /"/g;
    return t
        .toString()
        .replace(lt, '&lt;')
        .replace(gt, '&gt;')
        .replace(ap, '&#39;')
        .replace(ic, '&#34;');
}

function process(el) {
    const $clone = el.cloneNode(true);
    const originRect = el.getBoundingClientRect();
    for (const $child of $clone.childNodes) {
        nodeDFSProcssTextNode($child);
        // $child.replaceWith($newEl)
    }
    // $clone.style.overflow = 'hidden'
    // $clone.style.transform = 'translateZ(0)'
    el.replaceWith($clone);
    const $textEls = $clone.querySelectorAll('[data-shuffle]');
    const $pEls = $clone.querySelectorAll('[data-shuffle-p]');
    const pElsPosRecord = [];
    $pEls // @ts-ignore
        .forEach(($el) => {
        const rect = $el.getBoundingClientRect();
        pElsPosRecord.push(rect);
    });
    const textElPosRecord = [];
    $textEls
        // @ts-ignore
        .forEach(($el) => {
        const rect = $el.getBoundingClientRect();
        textElPosRecord.push(rect);
    });
    $clone.style.display = 'none';
    // $clone.style.transform = ''
    $textEls
        // @ts-ignore
        .forEach(($el, i) => {
        $el.style.position = 'absolute';
        $el.style.left = textElPosRecord[i].left + 'px';
        $el.style.top = textElPosRecord[i].top + 'px';
    });
    $pEls.forEach(($p, i) => {
        shuffleSpanNodes($p);
        $p.style.height = pElsPosRecord[i].height + 'px';
    });
    $clone.style.height = originRect.height + 'px';
    $clone.style.display = '';
}
function nodeDFSProcssTextNode(el) {
    if (!el) {
        return;
    }
    wrapTextNode(el);
    // if (node) {
    //   shuffleSpanNodes(node as HTMLElement)
    // }
    if (el.childNodes) {
        const len = el.childNodes.length;
        for (let i = 0; i < len; i++) {
            const $child = el.childNodes.item(i);
            nodeDFSProcssTextNode($child);
        }
    }
}
/**
 *
 * @param el 处理 Text Node 包裹 span
 * @param options
 * @returns
 */
function wrapTextNode(el, options = { tagName: 'span' }) {
    if (el.nodeType != Node.TEXT_NODE) {
        return;
    }
    if (el.textContent.trim().length == 0) {
        return;
    }
    let html = '';
    for (const char of el.textContent) {
        if (char == '') {
            continue;
        }
        html += `<span data-shuffle>${escapeHTML(char)}</span>`;
    }
    const newEl = document.createElement(options.tagName);
    newEl.innerHTML = html;
    newEl.setAttribute('data-shuffle-p', '');
    el.replaceWith(newEl);
    return newEl;
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
function shuffleSpanNodes(el) {
    if (!el)
        return;
    const spans = el.querySelectorAll('[data-shuffle]');
    if (spans.length != el.children.length)
        return;
    const shuffled = shuffle([...spans]);
    el.innerHTML = '';
    el.append(...shuffled);
}

export { process };
//# sourceMappingURL=index.esm.js.map
