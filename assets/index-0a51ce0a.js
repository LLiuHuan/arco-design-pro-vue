import{g as s,c as i,s as e,a as t}from"./plugin-vue_export-helper-806773bb.js";import{I as n}from"./use-size-9fed8212.js";import{d as o,l,ac as a,c as r,Q as p,ak as d}from"./runtime-core.esm-bundler-808dc7a8.js";import{b as u}from"./vue-utils-fe41050b.js";var c=o({name:"DotLoading",props:{size:{type:Number}},setup(i){const e=s("dot-loading");return()=>{const s=i.size?{width:`${i.size}px`,height:`${i.size}px`}:{};return l("div",{class:e,style:{width:i.size?7*i.size+"px":void 0,height:i.size?`${i.size}px`:void 0}},[Array(5).fill(1).map(((i,t)=>l("div",{class:`${e}-item`,key:t,style:s},null)))])}}}),m=o({name:"Spin",props:{size:{type:Number},loading:Boolean,dot:Boolean,tip:String},setup(e,{slots:t}){const o=s("spin"),m=a(i,void 0),z=r((()=>[o,{[`${o}-loading`]:e.loading,[`${o}-with-tip`]:e.tip&&!t.default}])),v=()=>{if(t.icon){const s=u(t.icon());if(s)return d(s,{spin:!0})}return t.element?t.element():e.dot?l(c,{size:e.size},null):(null==m?void 0:m.slots.loading)?m.slots.loading():l(n,{spin:!0,size:e.size},null)},g=()=>{const s=e.size?{fontSize:`${e.size}px`}:void 0;return l(p,null,[l("div",{class:`${o}-icon`,style:s},[v()]),e.tip&&l("div",{class:`${o}-tip`},[e.tip])])};return()=>l("div",{class:z.value},[t.default?l(p,null,[t.default(),e.loading&&l("div",{class:`${o}-mask`},[l("div",{class:`${o}-mask-icon`},[g()])])]):g()])}});const z=Object.assign(m,{install:(s,i)=>{e(s,i);const n=t(i);s.component(n+m.name,m)}});export{z as S};
