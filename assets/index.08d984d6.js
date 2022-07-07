import{k as e,c as t,i as a,o as r,w as s,d as l,t as u,g as n,p as o,r as i,_ as p,x as v,y as c,q as f,A as m,B as y,N as d,j as b,O as $,C as x}from"./index.4a645510.js";import{r as g,a as j}from"./responsive-observe.713f71c2.js";import{p as N}from"./pick.47c8be66.js";function O(e){return a(e)}function w(a,l,u=!1){const n=e({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),o=t((()=>{let e=l;if(O(a.value))for(let t=0;t<g.length;t++){const r=g[t];if((n.value[r]||"xs"===r&&u)&&void 0!==a.value[r]){e=a.value[r];break}}else e=a.value;return e}));let i="";return r((()=>{i=j.subscribe((e=>{O(a.value)&&(n.value=e)}))})),s((()=>{i&&j.unsubscribe(i)})),o}const A=Symbol("RowContextInjectionKey");var k=p(l({name:"Row",props:{gutter:{type:[Number,Object,Array],default:0},justify:{type:String,default:"start"},align:{type:String,default:"start"},div:{type:Boolean},wrap:{type:Boolean,default:!0}},setup(e){const{gutter:a,align:r,justify:s,div:l,wrap:p}=u(e),v=n("row"),c=t((()=>({[`${v}`]:!l.value,[`${v}-nowrap`]:!p.value,[`${v}-align-${r.value}`]:r.value,[`${v}-justify-${s.value}`]:s.value}))),f=t((()=>Array.isArray(a.value)?a.value[0]:a.value)),m=t((()=>Array.isArray(a.value)?a.value[1]:0)),y=w(f,0),d=w(m,0),b=t((()=>{const e={};if((y.value||d.value)&&!l.value){const t=-y.value/2,a=-d.value/2;t&&(e.marginLeft=`${t}px`,e.marginRight=`${t}px`),a&&(e.marginTop=`${a}px`,e.marginBottom=`${a}px`)}return e})),$=t((()=>[y.value,d.value]));return o(A,i({gutter:$,div:l})),{classNames:c,styles:b}}}),[["render",function(e,t,a,r,s,l){return v(),c("div",{class:m(e.classNames),style:y(e.styles)},[f(e.$slots,"default")],6)}]]);var h=Object.defineProperty,B=Object.getOwnPropertySymbols,R=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable,C=(e,t,a)=>t in e?h(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,E=(e,t)=>{for(var a in t||(t={}))R.call(t,a)&&C(e,a,t[a]);if(B)for(var a of B(t))S.call(t,a)&&C(e,a,t[a]);return e};var P=p(l({name:"Col",props:{span:{type:Number,default:24},offset:{type:Number},order:{type:Number},xs:{type:[Number,Object]},sm:{type:[Number,Object]},md:{type:[Number,Object]},lg:{type:[Number,Object]},xl:{type:[Number,Object]},xxl:{type:[Number,Object]},flex:{type:[Number,String]}},setup(e){const r=n("col"),s=b(A,{}),l=t((()=>function(e){return $(e)&&(["initial","auto","none"].includes(e)||/^\d+$/.test(e))||d(e)?e:$(e)&&/^\d+(px|em|rem|%)$/.test(e)?`0 0 ${e}`:void 0}(e.flex))),u=t((()=>{const{div:t}=s,{span:l,offset:u,order:n,xs:o,sm:i,md:p,lg:v,xl:c,xxl:f}=e,m={[`${r}`]:!t,[`${r}-order-${n}`]:n,[`${r}-${l}`]:!(t||o||i||p||v||c||f),[`${r}-offset-${u}`]:u&&u>0},y={xs:o,sm:i,md:p,lg:v,xl:c,xxl:f};return Object.keys(y).forEach((e=>{const t=y[e];t&&d(t)?m[`${r}-${e}-${t}`]=!0:t&&a(t)&&(m[`${r}-${e}-${t.span}`]=t.span,m[`${r}-${e}-offset-${t.offset}`]=t.offset,m[`${r}-${e}-order-${t.order}`]=t.order)})),m})),o=t((()=>l.value?r:u.value)),i=t((()=>{const{gutter:e,div:t}=s,a={};if(Array.isArray(e)&&!t){const t=e[0]&&e[0]/2||0,r=e[1]&&e[1]/2||0;t&&(a.paddingLeft=`${t}px`,a.paddingRight=`${t}px`),r&&(a.paddingTop=`${r}px`,a.paddingBottom=`${r}px`)}return a})),p=t((()=>l.value?{flex:l.value}:{})),v=t((()=>N(e,g))),c=function(e){return t((()=>{const{val:t,key:r,xs:s,sm:l,md:u,lg:n,xl:o,xxl:i}=e.value;if(!(s||l||u||n||o||i))return t;const p={};return g.forEach((t=>{const s=e.value[t];d(s)?p[t]=s:a(s)&&d(s[r])&&(p[t]=s[r])})),p}))}(t((()=>E({val:e.span,key:"span"},v.value)))),f=w(c,24,!0);return{visible:t((()=>!!f.value)),classNames:o,styles:t((()=>E(E({},i.value),p.value)))}}}),[["render",function(e,t,a,r,s,l){return e.visible?(v(),c("div",{key:0,class:m(e.classNames),style:y(e.styles)},[f(e.$slots,"default")],6)):x("v-if",!0)}]]);export{P as C,k as R,w as u};
