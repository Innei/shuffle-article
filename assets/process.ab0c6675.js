function e(e){return e.toString().replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&#34;")}function t(e){const t=e.cloneNode(!0),o=e.getBoundingClientRect();for(const a of t.childNodes)n(a);e.replaceWith(t);const l=t.querySelectorAll("[data-shuffle]"),r=t.querySelectorAll("[data-shuffle-p]"),c=[];r.forEach((e=>{const t=e.getBoundingClientRect();c.push(t)}));const s=[];l.forEach((e=>{const t=e.getBoundingClientRect();s.push(t)})),t.style.display="none",l.forEach(((e,t)=>{e.style.position="absolute",e.style.left=s[t].left+"px",e.style.top=s[t].top+"px"})),r.forEach(((e,t)=>{!function(e){if(!e)return;const t=e.querySelectorAll("[data-shuffle]");if(t.length!=e.children.length)return;const n=function(e){let t,n=e.length;for(;0!=n;)t=Math.random()*n-->>>0,[e[n],e[t]]=[e[t],e[n]];return e}([...t]);e.innerHTML="",e.append(...n)}(e),e.style.height=c[t].height+"px"})),t.style.height=o.height+"px",t.style.display=""}function n(t){if(t&&(function(t,n={tagName:"span"}){if(t.nodeType!=Node.TEXT_NODE)return;if(0==t.textContent.trim().length)return;let o="";for(const r of t.textContent)""!=r&&(o+=`<span data-shuffle>${e(r)}</span>`);const l=document.createElement(n.tagName);l.innerHTML=o,l.setAttribute("data-shuffle-p",""),t.replaceWith(l)}(t),t.childNodes)){const e=t.childNodes.length;for(let o=0;o<e;o++){n(t.childNodes.item(o))}}}!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(n){const o=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((n,r)=>{const c=new URL(e,o);if(self[t].moduleMap[c])return n(self[t].moduleMap[c]);const s=new Blob([`import * as m from '${c}';`,`${t}.moduleMap['${c}']=m;`],{type:"text/javascript"}),a=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(s),onerror(){r(new Error(`Failed to import: ${e}`)),l(a)},onload(){n(self[t].moduleMap[c]),l(a)}});document.head.appendChild(a)})),self[t].moduleMap={}}}("assets/");export{t as p};
