import { layoutWithLines as e, prepareWithSegments as t } from "@chenglou/pretext";
//#region src/utils/index.ts
function n(e) {
	let t = e.length;
	for (; t > 0;) {
		let n = Math.random() * t-- >>> 0;
		[e[t], e[n]] = [e[n], e[t]];
	}
	return e;
}
//#endregion
//#region src/process.ts
var r = null;
function i() {
	return r ||= document.createElement("canvas").getContext("2d"), r;
}
function a(e, t) {
	let n = i();
	return n.font = t, n.measureText(e).width;
}
function o(n, r, i, o) {
	let s = e(t(n, r), i, o), c = [], l = [];
	for (let e = 0; e < s.lines.length; e++) {
		let t = s.lines[e], n = e * o, i = t.text, u = 0;
		for (let e of i) e !== "\n" && (c.push(e), l.push({
			x: u,
			y: n
		}), u += a(e, r));
	}
	return {
		chars: c,
		positions: l
	};
}
function s(e) {
	let t = getComputedStyle(e), r = t.font, i = parseFloat(t.lineHeight) || parseFloat(t.fontSize) * 1.2, a = e.clientWidth - parseFloat(t.paddingLeft) - parseFloat(t.paddingRight), s = e.textContent || "";
	if (s.trim().length === 0) return;
	let { chars: c, positions: l } = o(s, r, a, i);
	if (c.length === 0) return;
	let u = document.createElement("div");
	u.setAttribute("data-shuffle-p", ""), u.style.position = "relative", u.style.height = `${l[l.length - 1].y + i}px`;
	let d = [];
	for (let e = 0; e < c.length; e++) {
		let t = document.createElement("span");
		t.setAttribute("data-shuffle", ""), t.textContent = c[e], t.style.position = "absolute", t.style.left = `${l[e].x}px`, t.style.top = `${l[e].y}px`, d.push(t);
	}
	let f = n(d);
	u.append(...f), e.innerHTML = "", e.appendChild(u);
}
function c(e) {
	let t = e.querySelectorAll("p");
	t.length > 0 ? t.forEach((e) => s(e)) : s(e);
}
//#endregion
export { s as process, c as processAll };
