import{ac as r,g as e}from"./runtime-core.esm-bundler-808dc7a8.js";const o=Object.prototype.toString;function t(r){return"[object Array]"===o.call(r)}function n(r){return"[object Null]"===o.call(r)}function l(r){return"[object Boolean]"===o.call(r)}function c(r){return"[object Object]"===o.call(r)}const a=r=>"[object Promise]"===o.call(r);function i(r){return"[object String]"===o.call(r)}function s(r){return"[object Number]"===o.call(r)&&r==r}function u(r){return void 0===r}function f(r){return"function"==typeof r}function b(r){return c(r)&&0===Object.keys(r).length}const p=r=>void 0!==(null==r?void 0:r.$),j=Symbol("ArcoConfigProvider");var v=Object.defineProperty,g=Object.defineProperties,P=Object.getOwnPropertyDescriptors,d=Object.getOwnPropertySymbols,y=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable,O=(r,e,o)=>e in r?v(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o;const x="$arco",w=r=>{var e;return null!=(e=null==r?void 0:r.componentPrefix)?e:"A"},S=(r,e)=>{var o,t,n;e&&e.classPrefix&&(r.config.globalProperties[x]=(t=((r,e)=>{for(var o in e||(e={}))y.call(e,o)&&O(r,o,e[o]);if(d)for(var o of d(e))m.call(e,o)&&O(r,o,e[o]);return r})({},null!=(o=r.config.globalProperties[x])?o:{}),n={classPrefix:e.classPrefix},g(t,P(n))))},$=o=>{var t,n,l;const c=e(),a=r(j,void 0),i=null!=(l=null!=(n=null==a?void 0:a.prefixCls)?n:null==(t=null==c?void 0:c.appContext.config.globalProperties[x])?void 0:t.classPrefix)?l:"arco";return o?`${i}-${o}`:i};var h=(r,e)=>{for(const[o,t]of e)r[o]=t;return r};export{h as _,w as a,i as b,j as c,f as d,a as e,l as f,$ as g,t as h,s as i,u as j,c as k,n as l,p as m,b as n,S as s};
