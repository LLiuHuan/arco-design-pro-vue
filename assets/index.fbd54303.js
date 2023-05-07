import{d as e,g as t,k as o,o as n,_ as l,a2 as a,w as i,A as p,b as s,aR as r,H as d,ai as u,aS as c,aT as y,c as v,N as f,x,y as m,E as h,a0 as b,a4 as g,M as C,q as T,D as w,G as E,aP as k,F as B,aU as P,t as j,r as O,I as S,i as $,V as R,l as I,e as N,al as A}from"./index.e00e4771.js";import{I as H}from"./index.66073913.js";import{T as z}from"./index.a95af5cd.js";import{R as q}from"./resize-observer.0be7124b.js";import{u as D}from"./use-merge-state.14e72e16.js";import{c as M,r as F}from"./index.1a1aab71.js";import{P as _}from"./index.24b73bb5.js";var K=l(e({name:"TypographyEditContent",components:{Input:H},props:{text:{type:String,required:!0}},emits:["change","end","update:text"],setup(e,{emit:l}){const a=[`${t("typography")}-edit-content`],i=o();function p(){l("end")}return n((()=>{if(!i.value||!i.value.$el)return;const e=i.value.$el.querySelector("input");if(!e)return;e.focus&&e.focus();const{length:t}=e.value;e.setSelectionRange(t,t)})),{classNames:a,inputRef:i,onBlur:p,onChange:function(e){l("update:text",e),l("change",e)},onEnd:p}}}),[["render",function(e,t,o,n,l,u){const c=a("Input");return i(),p("div",{class:d(e.classNames)},[s(c,{ref:"inputRef","auto-size":"","model-value":e.text,onBlur:e.onBlur,onInput:e.onChange,onKeydown:r(e.onEnd,["enter"])},null,8,["model-value","onBlur","onInput","onKeydown"])],2)}]]);var V=l(e({name:"TypographyOperations",components:{Tooltip:z,IconCheckCircleFill:u,IconCopy:c,IconEdit:y},props:{editable:Boolean,copyable:Boolean,expandable:Boolean,isCopied:Boolean,isEllipsis:Boolean,expanded:Boolean,forceRenderExpand:Boolean,editTooltipProps:Object,copyTooltipProps:Object},emits:{edit:()=>!0,copy:()=>!0,expand:()=>!0},setup(e,{emit:o}){const n=t("typography"),l=v((()=>e.forceRenderExpand||e.expandable&&e.isEllipsis)),{t:a}=f();return{prefixCls:n,showExpand:l,t:a,onEditClick(){o("edit")},onCopyClick(){o("copy")},onExpandClick(){o("expand")}}}}),[["render",function(e,t,o,n,l,r){const u=a("IconEdit"),c=a("Tooltip"),y=a("IconCheckCircleFill"),v=a("IconCopy");return i(),p(B,null,[e.editable?(i(),x(c,g({key:0,content:e.t("typography.edit")},e.editTooltipProps),{default:m((()=>[h("span",{class:d(`${e.prefixCls}-operation-edit`),onClick:t[0]||(t[0]=b(((...t)=>e.onEditClick&&e.onEditClick(...t)),["stop"]))},[s(u)],2)])),_:1},16,["content"])):C("v-if",!0),e.copyable?(i(),x(c,k(g({key:1},e.copyTooltipProps)),{content:m((()=>[T(e.$slots,"copy-tooltip",{copied:e.isCopied},(()=>[w(E(e.isCopied?e.t("typography.copied"):e.t("typography.copy")),1)]))])),default:m((()=>[h("span",{class:d({[`${e.prefixCls}-operation-copied`]:e.isCopied,[`${e.prefixCls}-operation-copy`]:!e.isCopied}),onClick:t[1]||(t[1]=b(((...t)=>e.onCopyClick&&e.onCopyClick(...t)),["stop"]))},[T(e.$slots,"copy-icon",{copied:e.isCopied},(()=>[e.isCopied?(i(),x(y,{key:0})):(i(),x(v,{key:1}))]))],2)])),_:3},16)):C("v-if",!0),e.showExpand?(i(),p("a",{key:2,class:d(`${e.prefixCls}-operation-expand`),onClick:t[2]||(t[2]=b(((...t)=>e.onExpandClick&&e.onExpandClick(...t)),["stop"]))},[T(e.$slots,"expand-node",{expanded:e.expanded},(()=>[w(E(e.expanded?e.t("typography.collapse"):e.t("typography.expand")),1)]))],2)):C("v-if",!0)],64)}]]);let G;function L(e){if(!e)return 0;const t=e.match(/^\d*(\.\d*)?/);return t?Number(t[0]):0}var U=(e,t,o,n)=>{G||(G=document.createElement("div"),document.body.appendChild(G));const{rows:l,suffix:a,ellipsisStr:i}=t,p=window.getComputedStyle(e),r=(d=p,Array.prototype.slice.apply(d).map((e=>`${e}: ${d.getPropertyValue(e)};`)).join(""));var d;const u=L(p.lineHeight),c=Math.round(u*l+L(p.paddingTop)+L(p.paddingBottom));G.setAttribute("style",r),G.setAttribute("aria-hidden","true"),G.style.height="auto",G.style.minHeight="auto",G.style.maxHeight="auto",G.style.position="fixed",G.style.left="0",G.style.top="-99999999px",G.style.zIndex="-200",G.style.whiteSpace="normal";const y=P({render:()=>s("span",null,[o])});y.mount(G);const v=Array.prototype.slice.apply(G.childNodes[0].cloneNode(!0).childNodes);y.unmount(),G.innerHTML="";const f=document.createTextNode(`${i}${a}`);G.appendChild(f),v.forEach((e=>{G.appendChild(e)}));const x=document.createTextNode(n);function m(){return G.offsetHeight<=c}if(G.insertBefore(x,f),m())return{ellipsis:!1,text:n};return function e(t,o=0,l=n.length,a=0){const i=Math.floor((o+l)/2),p=n.slice(0,i);if(t.textContent=p,o>=l-1)for(let s=l;s>=o;s-=1){const e=n.slice(0,s);if(t.textContent=e,m()||!e)return}m()?e(t,i,l,i):e(t,o,i,a)}(x),{text:x.textContent,ellipsis:!0}};const J=e=>{return t=void 0,o=null,n=function*(){var t;if(null==(t=navigator.clipboard)?void 0:t.writeText)try{return void(yield navigator.clipboard.writeText(e))}catch(a){}const o=document.createElement("span");o.textContent=e,o.style.whiteSpace="pre",document.body.appendChild(o);const n=window.getSelection(),l=window.document.createRange();null==n||n.removeAllRanges(),l.selectNode(o),null==n||n.addRange(l);try{window.document.execCommand("copy")}catch(a){}null==n||n.removeAllRanges(),window.document.body.removeChild(o)},new Promise(((e,l)=>{var a=e=>{try{p(n.next(e))}catch(t){l(t)}},i=e=>{try{p(n.throw(e))}catch(t){l(t)}},p=t=>t.done?e(t.value):Promise.resolve(t.value).then(a,i);p((n=n.apply(t,o)).next())}));var t,o,n};let Q;var W=Object.defineProperty,X=Object.defineProperties,Y=Object.getOwnPropertyDescriptors,Z=Object.getOwnPropertySymbols,ee=Object.prototype.hasOwnProperty,te=Object.prototype.propertyIsEnumerable,oe=(e,t,o)=>t in e?W(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;function ne(e){return"function"==typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!N(e)}function le(e,t){const{mark:o}=e,n=function(e){const{bold:t,mark:o,underline:n,delete:l,code:a}=e,i=[];return t&&i.push("b"),n&&i.push("u"),l&&i.push("del"),a&&i.push("code"),o&&i.push("mark"),i}(e),l=$(o)&&o.color?{backgroundColor:o.color}:{};return n.reduce(((e,t)=>s(t,"mark"===t?{style:l}:{},ne(e)?e:{default:()=>[e]})),t)}function ae(e){const t=!!e.showTooltip,o=$(e.showTooltip)&&"popover"===e.showTooltip.type?_:z,n=$(e.showTooltip)&&e.showTooltip.props||{};return l=((e,t)=>{for(var o in t||(t={}))ee.call(t,o)&&oe(e,o,t[o]);if(Z)for(var o of Z(t))te.call(t,o)&&oe(e,o,t[o]);return e})({rows:1,suffix:"",ellipsisStr:"...",expandable:!1,css:!1},A(e,["showTooltip"])),X(l,Y({showTooltip:t,TooltipComponent:o,tooltipProps:n}));var l}var ie=e({name:"TypographyBase",inheritAttrs:!1,props:{component:{type:String,required:!0},type:{type:String},bold:{type:Boolean},mark:{type:[Boolean,Object],default:!1},underline:{type:Boolean},delete:{type:Boolean},code:{type:Boolean},disabled:{type:Boolean},editable:{type:Boolean},editing:{type:Boolean,default:void 0},defaultEditing:{type:Boolean},editText:{type:String},copyable:{type:Boolean},copyText:{type:String},copyDelay:{type:Number,default:3e3},ellipsis:{type:[Boolean,Object],default:!1},editTooltipProps:{type:Object},copyTooltipProps:{type:Object}},emits:{editStart:()=>!0,change:e=>!0,"update:editText":e=>!0,editEnd:()=>!0,"update:editing":e=>!0,copy:e=>!0,ellipsis:e=>!0,expand:e=>!0},setup(e,{slots:l,emit:a,attrs:i}){const{editing:p,defaultEditing:r,ellipsis:d,copyable:u,editable:c,copyText:y,editText:f,copyDelay:x,component:m}=j(e),h=t("typography"),b=v((()=>[h,{[`${h}-${e.type}`]:e.type,[`${h}-disabled`]:e.disabled}])),C=o(),T=o(""),[w,E]=D(r.value,O({value:p})),k=v((()=>c.value&&w.value));function B(){a("update:editing",!0),a("editStart"),E(!0)}function N(){w.value&&(a("update:editing",!1),a("editEnd"),E(!1))}const A=o(!1);let H=null;function z(){var e;const t=null!=(e=y.value)?e:T.value;J(t||""),A.value=!0,a("copy",t),H=setTimeout((()=>{A.value=!1}),x.value)}S((()=>{H&&clearTimeout(H),H=null}));const _=o(!1),G=o(!1),L=o(""),W=v((()=>ae($(d.value)&&d.value||{})));let X=null;function Y(){const e=!G.value;G.value=e,a("expand",e)}function Z(t=!1){return W.value.css?s(V,{editable:c.value,copyable:u.value,expandable:W.value.expandable,isCopied:A.value,isEllipsis:pe.value,expanded:G.value,forceRenderExpand:t||G.value,editTooltipProps:e.editTooltipProps,copyTooltipProps:e.copyTooltipProps,onEdit:B,onCopy:z,onExpand:Y},{"copy-tooltip":l["copy-tooltip"],"copy-icon":l["copy-icon"],"expand-node":l["expand-node"]}):s(V,{editable:c.value,copyable:u.value,expandable:W.value.expandable,isCopied:A.value,isEllipsis:_.value,expanded:G.value,forceRenderExpand:t,editTooltipProps:e.editTooltipProps,copyTooltipProps:e.copyTooltipProps,onEdit:B,onCopy:z,onExpand:Y},{"copy-tooltip":l["copy-tooltip"],"copy-icon":l["copy-icon"],"expand-node":l["expand-node"]})}function ee(){d.value&&!G.value&&(M(X),X=F((()=>{!function(){if(!C.value)return;const{ellipsis:e,text:t}=U(C.value,W.value,Z(!!W.value.expandable),T.value);_.value!==e&&(_.value=e,W.value.css||a("ellipsis",e)),L.value!==t&&(L.value=t||"")}()})))}S((()=>{M(X)})),R((()=>W.value.rows),(()=>{ee()})),R(d,(e=>{e?ee():_.value=!1}));let te=[];const oe=()=>{if(d.value||u.value||c.value){const e=function(e){if(!e)return"";Q||(Q=document.createElement("div"),Q.setAttribute("aria-hidden","true"),document.body.appendChild(Q));const t=P({render:()=>s("div",null,[e])});t.mount(Q);const o=Q.innerText;return t.unmount(),o}(te);e!==T.value&&(T.value=e,ee())}};n(oe),I(oe);const ie=o(),pe=o(!1),se=()=>{if(C.value&&ie.value){const e=ie.value.offsetHeight>C.value.offsetHeight;e!==pe.value&&(pe.value=e,a("ellipsis",e))}},re=v((()=>G.value?{}:{overflow:"hidden","text-overflow":"ellipsis",display:"-webkit-box","-webkit-line-clamp":W.value.rows,"-webkit-box-orient":"vertical"}));return()=>{var t,o;if(te=(null==(t=l.default)?void 0:t.call(l))||[],k.value){const e=null!=(o=f.value)?o:T.value;return s(K,{text:e,onChange:t=>{t!==e&&function(e){a("update:editText",e),a("change",e)}(t)},onEnd:N},null)}const{suffix:n,ellipsisStr:p,showTooltip:r,tooltipProps:d,TooltipComponent:u}=W.value,c=_.value&&!G.value,y=c&&!r?{title:T.value}:{},v=m.value;if(W.value.css){const t=le(e,te),o=s(v,g({class:b.value,ref:C,style:re.value},y,i),{default:()=>[s("span",{ref:ie},[t])]});return pe.value?s(u,g(d,{onResize:()=>se()}),{default:()=>[o],content:()=>T.value}):s(q,{onResize:()=>{se()}},ne(o)?o:{default:()=>[o]})}const x=le(e,c?L.value:te);return s(q,{onResize:()=>ee()},{default:()=>[s(v,g({class:b.value,ref:C},y,i),{default:()=>[c&&r?s(u,d,{default:()=>[s("span",null,[x])],content:()=>T.value}):x,c?p:null,n,Z()]})]})}}}),pe=e({name:"TypographyText",inheritAttrs:!1,props:{ellipsis:{type:[Boolean,Object],default:!1}},setup(e){const{ellipsis:t}=j(e);return{component:v((()=>(null==t?void 0:t.value)?"div":"span"))}},render(){const{ellipsis:e,component:t}=this;return s(ie,g(this.$attrs,{ellipsis:e,component:t}),this.$slots)}});export{pe as T};
