import{d as y,l as v,r as d,c as b,w as g,o as A,a as E,A as k,b as R,e as w,f as L,g as O}from"./vendor.6c5f1e9e.js";const $=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}};$();var C=(t,r)=>{for(const[s,o]of r)t[s]=o;return t};const P=y({name:"App",setup(){return document.body.setAttribute("arco-theme","dark"),{zhCN:v}}});function N(t,r,s,o,e,n){const a=d("RouterView"),c=d("a-config-provider");return A(),b(c,{locale:t.zhCN},{default:g(()=>[E(a)]),_:1},8,["locale"])}var S=C(P,[["render",N]]);function V(t){t.use(k),t.use(R)}const j="modulepreload",p={},x="/",f=function(r,s){return!s||s.length===0?r():Promise.all(s.map(o=>{if(o=`${x}${o}`,o in p)return;p[o]=!0;const e=o.endsWith(".css"),n=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${n}`))return;const a=document.createElement("link");if(a.rel=e?"stylesheet":j,e||(a.as="script",a.crossOrigin=""),a.href=o,document.head.appendChild(a),e)return new Promise((c,h)=>{a.addEventListener("load",c),a.addEventListener("error",h)})})).then(()=>r())},B=()=>f(()=>import("./index.ca62a593.js"),["assets/index.ca62a593.js","assets/index.61c34208.css","assets/vendor.6c5f1e9e.js"]),m="dashboard",D=[{path:"/dashboard",name:m,redirect:"/dashboard/workplace",component:B,meta:{title:"Dashboard",icon:"",permissions:["dashboard_workplace"],sort:0},children:[{path:"workplace",name:`${m}_workplace`,meta:{title:"\u5DE5\u4F5C\u53F0",permissions:["dashboard_workplace"]},component:()=>f(()=>import("./workplace.8b291f35.js"),["assets/workplace.8b291f35.js","assets/vendor.6c5f1e9e.js"])}]}];var I=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:D}),i;(function(t){t.BASE_HOME="/dashboard"})(i||(i={}));const _={"./modules/dashboard.ts":I},u=[];Object.keys(_).forEach(t=>{const r=_[t].default||{},s=Array.isArray(r)?[...r]:r;u.push(...s)});function M(t,r){var s,o;return(((s=t.meta)==null?void 0:s.sort)||0)-(((o=r.meta)==null?void 0:o.sort)||0)}u.sort(M);const z={path:"/",name:"Root",redirect:i.BASE_HOME,meta:{title:"Root"}},F=[...u],H=[...F,z],T=w({history:L(""),routes:H,strict:!0,scrollBehavior:()=>({left:0,top:0})});function q(t){t.use(T)}const l=O(S);V(l);q(l);l.mount("#app");export{C as _};
