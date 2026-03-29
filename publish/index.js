import { prepareWithSegments as m, layoutWithLines as g } from "@chenglou/pretext";
function y(t) {
  let e = t.length;
  for (; e > 0; ) {
    const n = Math.random() * e-- >>> 0;
    [t[e], t[n]] = [t[n], t[e]];
  }
  return t;
}
let d = null;
function C() {
  return d || (d = document.createElement("canvas").getContext("2d")), d;
}
function v(t, e) {
  const n = C();
  return n.font = e, n.measureText(t).width;
}
function S(t, e, n, a) {
  const u = m(t, e), r = g(u, n, a), l = [], i = [];
  for (let s = 0; s < r.lines.length; s++) {
    const p = r.lines[s], f = s * a, c = p.text;
    let o = 0;
    for (const h of c)
      h !== `
` && (l.push(h), i.push({ x: o, y: f }), o += v(h, e));
  }
  return { chars: l, positions: i };
}
function x(t) {
  const e = getComputedStyle(t), n = e.font, a = parseFloat(e.lineHeight) || parseFloat(e.fontSize) * 1.2, u = t.clientWidth - parseFloat(e.paddingLeft) - parseFloat(e.paddingRight), r = t.textContent || "";
  if (r.trim().length === 0) return;
  const { chars: l, positions: i } = S(r, n, u, a);
  if (l.length === 0) return;
  const s = document.createElement("div");
  s.setAttribute("data-shuffle-p", ""), s.style.position = "relative", s.style.height = `${i[i.length - 1].y + a}px`;
  const p = [];
  for (let c = 0; c < l.length; c++) {
    const o = document.createElement("span");
    o.setAttribute("data-shuffle", ""), o.textContent = l[c], o.style.position = "absolute", o.style.left = `${i[c].x}px`, o.style.top = `${i[c].y}px`, p.push(o);
  }
  const f = y(p);
  s.append(...f), t.innerHTML = "", t.appendChild(s);
}
function E(t) {
  const e = t.querySelectorAll("p");
  e.length > 0 ? e.forEach((n) => x(n)) : x(t);
}
export {
  x as process,
  E as processAll
};
