var t="object"==typeof global&&global&&global.Object===Object&&global,n="object"==typeof self&&self&&self.Object===Object&&self,r=t||n||Function("return this")(),e=r.Symbol,o=Object.prototype,i=o.hasOwnProperty,u=o.toString,a=e?e.toStringTag:void 0;var c=Object.prototype.toString;var f=e?e.toStringTag:void 0;function l(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":f&&f in Object(t)?function(t){var n=i.call(t,a),r=t[a];try{t[a]=void 0;var e=!0}catch(c){}var o=u.call(t);return e&&(n?t[a]=r:delete t[a]),o}(t):function(t){return c.call(t)}(t)}var v=/\s/;var s=/^\s+/;function b(t){return t?t.slice(0,function(t){for(var n=t.length;n--&&v.test(t.charAt(n)););return n}(t)+1).replace(s,""):t}function p(t){var n=typeof t;return null!=t&&("object"==n||"function"==n)}var d=/^[-+]0x[0-9a-f]+$/i,y=/^0b[01]+$/i,g=/^0o[0-7]+$/i,j=parseInt;function m(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return null!=t&&"object"==typeof t}(t)&&"[object Symbol]"==l(t)}(t))return NaN;if(p(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=p(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=b(t);var r=y.test(t);return r||g.test(t)?j(t.slice(2),r?2:8):d.test(t)?NaN:+t}var h=function(){return r.Date.now()},O=Math.max,T=Math.min;function x(t,n,r){var e,o,i,u,a,c,f=0,l=!1,v=!1,s=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function b(n){var r=e,i=o;return e=o=void 0,f=n,u=t.apply(i,r)}function d(t){return f=t,a=setTimeout(g,n),l?b(t):u}function y(t){var r=t-c;return void 0===c||r>=n||r<0||v&&t-f>=i}function g(){var t=h();if(y(t))return j(t);a=setTimeout(g,function(t){var r=n-(t-c);return v?T(r,i-(t-f)):r}(t))}function j(t){return a=void 0,s&&e?b(t):(e=o=void 0,u)}function x(){var t=h(),r=y(t);if(e=arguments,o=this,c=t,r){if(void 0===a)return d(c);if(v)return clearTimeout(a),a=setTimeout(g,n),b(c)}return void 0===a&&(a=setTimeout(g,n)),u}return n=m(n)||0,p(r)&&(l=!!r.leading,i=(v="maxWait"in r)?O(m(r.maxWait)||0,n):i,s="trailing"in r?!!r.trailing:s),x.cancel=function(){void 0!==a&&clearTimeout(a),f=0,e=c=o=a=void 0},x.flush=function(){return void 0===a?u:j(h())},x}export{x as d};
