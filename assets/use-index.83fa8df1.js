import{k as e,c as l,V as a,o as u,l as n,W as v}from"./index.4ccc7453.js";const r=({itemRef:r,selector:t,index:o,parentClassName:s})=>{const i=e(-1),c=l((()=>{var e;return null!=(e=null==o?void 0:o.value)?e:i.value})),d=e(),m=()=>{var e,l,a;let u=null!=(l=null==(e=r.value)?void 0:e.parentElement)?l:void 0;if(s)for(;u&&!u.className.includes(s);)u=null!=(a=u.parentElement)?a:void 0;return u},f=()=>{if(v(null==o?void 0:o.value)&&d.value&&r.value){const e=Array.from(d.value.querySelectorAll(t)).indexOf(r.value);e!==i.value&&(i.value=e)}};return a(r,(()=>{r.value&&!d.value&&(d.value=m())})),u((()=>{r.value&&(d.value=m()),f()})),n((()=>f())),{computedIndex:c}};export{r as u};
