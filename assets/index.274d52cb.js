/* empty css              */import{R as e,C as t}from"./index.b63d0d81.js";import{E as a}from"./index.5110b70c.js";import{g as s,f as l,T as i}from"./github.542947d1.js";/* empty css               */import{I as n,S as r,u as o,a as p,b as u,V as d}from"./index.e5e2152e.js";/* empty css               */import"./index.04994d66.js";import{C as c,b as m}from"./index.26358cac.js";import{S as g}from"./index.b93133fd.js";import{S as f}from"./index.a7c20c58.js";import{A as b}from"./index.b53993f4.js";import{d as v,g as h,c as y,_ as x,w as S,A as C,q as $,D as z,G as w,H as j,J as k,aD as P,aE as N,a2 as O,x as _,y as B,a3 as I,a$ as M,b as L,N as q,k as R,V,a7 as A,M as H,F as J,E as T,a4 as F,t as E,u as G,r as U,K as D,s as Y,v as K,i as Q,o as X,a as W,al as Z,e as ee,z as te,b0 as ae,X as se,C as le,aP as ie,aQ as ne,aI as re,aJ as oe,Y as pe}from"./index.e00e4771.js";import{S as ue}from"./index.1b0c38eb.js";import{G as de}from"./index.52670c97.js";import"./responsive-observe.c0c2b15e.js";import"./pick.50d21532.js";import"./index.es.e529bc35.js";import"./index.66073913.js";import"./input-search.7a505953.js";import"./index.1a1aab71.js";import"./ResizeObserver.es.c7f27d01.js";import"./resize-observer.0be7124b.js";import"./use-index.96c5958d.js";import"./index.24b73bb5.js";var ce=x(v({name:"Pager",props:{pageNumber:{type:Number},current:{type:Number},disabled:{type:Boolean,default:!1},style:{type:Object},activeStyle:{type:Object}},emits:["click"],setup(e,{emit:t}){const a=h("pagination-item"),s=y((()=>e.current===e.pageNumber)),l=y((()=>[a,{[`${a}-active`]:s.value}])),i=y((()=>s.value?e.activeStyle:e.style));return{prefixCls:a,cls:l,mergedStyle:i,handleClick:a=>{e.disabled||t("click",e.pageNumber,a)}}}}),[["render",function(e,t,a,s,l,i){return S(),C("li",{class:j(e.cls),style:k(e.mergedStyle),onClick:t[0]||(t[0]=(...t)=>e.handleClick&&e.handleClick(...t))},[$(e.$slots,"default",{page:e.pageNumber},(()=>[z(w(e.pageNumber),1)]))],6)}]]);const me=(e,{min:t,max:a})=>e<t?t:e>a?a:e;var ge=x(v({name:"StepPager",components:{IconLeft:P,IconRight:N},props:{pages:{type:Number,required:!0},current:{type:Number,required:!0},type:{type:String,required:!0},disabled:{type:Boolean,default:!1},simple:{type:Boolean,default:!1}},emits:["click"],setup(e,{emit:t}){const a=h("pagination-item"),s="next"===e.type,l=y((()=>e.disabled?e.disabled:!e.pages||(!(!s||e.current!==e.pages)||!s&&e.current<=1))),i=y((()=>me(e.current+(s?1:-1),{min:1,max:e.pages}))),n=y((()=>[a,`${a}-${e.type}`,{[`${a}-disabled`]:l.value}]));return{prefixCls:a,cls:n,isNext:s,handleClick:e=>{l.value||t("click",i.value)}}}}),[["render",function(e,t,a,s,l,i){const n=O("icon-right"),r=O("icon-left");return S(),_(I(e.simple?"span":"li"),{class:j(e.cls),onClick:e.handleClick},{default:B((()=>[$(e.$slots,"default",{type:e.isNext?"next":"previous"},(()=>[e.isNext?(S(),_(n,{key:0})):(S(),_(r,{key:1}))]))])),_:3},8,["class","onClick"])}]]);var fe=x(v({name:"EllipsisPager",components:{IconMore:M},props:{current:{type:Number,required:!0},step:{type:Number,default:5},pages:{type:Number,required:!0}},emits:["click"],setup(e,{emit:t}){const a=h("pagination-item"),s=y((()=>me(e.current+e.step,{min:1,max:e.pages}))),l=y((()=>[a,`${a}-ellipsis`]));return{prefixCls:a,cls:l,handleClick:e=>{t("click",s.value)}}}}),[["render",function(e,t,a,s,l,i){const n=O("icon-more");return S(),C("li",{class:j(e.cls),onClick:t[0]||(t[0]=(...t)=>e.handleClick&&e.handleClick(...t))},[$(e.$slots,"default",{},(()=>[L(n)]))],2)}]]);var be=x(v({name:"PageJumper",components:{InputNumber:n},props:{current:{type:Number,required:!0},simple:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},pages:{type:Number,required:!0},size:{type:String},onChange:{type:Function}},emits:["change"],setup(e,{emit:t}){const a=h("pagination-jumper"),{t:s}=q(),l=R(e.simple?e.current:void 0);V((()=>e.current),(t=>{e.simple&&t!==l.value&&(l.value=t)}));const i=y((()=>[a,{[`${a}-simple`]:e.simple}]));return{prefixCls:a,cls:i,t:s,inputValue:l,handleChange:a=>{t("change",l.value),A((()=>{e.simple||(l.value=void 0)}))},handleFormatter:e=>{const t=parseInt(e.toString(),10);return Number.isNaN(t)?void 0:String(t)}}}}),[["render",function(e,t,a,s,l,i){const n=O("input-number");return S(),C("span",{class:j(e.cls)},[e.simple?H("v-if",!0):(S(),C("span",{key:0,class:j([`${e.prefixCls}-prepend`,`${e.prefixCls}-text-goto`])},[$(e.$slots,"jumper-prepend",{},(()=>[z(w(e.t("pagination.goto")),1)]))],2)),L(n,{modelValue:e.inputValue,"onUpdate:modelValue":t[0]||(t[0]=t=>e.inputValue=t),class:j(`${e.prefixCls}-input`),min:1,max:e.pages,size:e.size,disabled:e.disabled,"hide-button":"",formatter:e.handleFormatter,onChange:e.handleChange},null,8,["modelValue","class","max","size","disabled","formatter","onChange"]),e.$slots["jumper-append"]?(S(),C("span",{key:1,class:j(`${e.prefixCls}-append`)},[$(e.$slots,"jumper-append")],2)):H("v-if",!0),e.simple?(S(),C(J,{key:2},[T("span",{class:j(`${e.prefixCls}-separator`)},"/",2),T("span",{class:j(`${e.prefixCls}-total-page`)},w(e.pages),3)],64)):H("v-if",!0)],2)}]]);var ve=x(v({name:"PageOptions",components:{ArcoSelect:r},props:{sizeOptions:{type:Array,required:!0},pageSize:Number,disabled:Boolean,size:{type:String},onChange:{type:Function},selectProps:{type:Object}},emits:["change"],setup(e,{emit:t}){const a=h("pagination-options"),{t:s}=q();return{prefixCls:a,options:y((()=>e.sizeOptions.map((e=>({value:e,label:`${e} ${s("pagination.countPerPage")}`}))))),handleChange:e=>{t("change",e)}}}}),[["render",function(e,t,a,s,l,i){const n=O("arco-select");return S(),C("span",{class:j(e.prefixCls)},[L(n,F({"model-value":e.pageSize,options:e.options,size:e.size,disabled:e.disabled},e.selectProps,{onChange:e.handleChange}),null,16,["model-value","options","size","disabled","onChange"])],2)}]]),he=v({name:"Pagination",props:{total:{type:Number,required:!0},current:Number,defaultCurrent:{type:Number,default:1},pageSize:Number,defaultPageSize:{type:Number,default:10},disabled:{type:Boolean,default:!1},hideOnSinglePage:{type:Boolean,default:!1},simple:{type:Boolean,default:!1},showTotal:{type:Boolean,default:!1},showMore:{type:Boolean,default:!1},showJumper:{type:Boolean,default:!1},showPageSize:{type:Boolean,default:!1},pageSizeOptions:{type:Array,default:()=>[10,20,30,40,50]},pageSizeProps:{type:Object},size:{type:String},pageItemStyle:{type:Object},activePageItemStyle:{type:Object},baseSize:{type:Number,default:6},bufferSize:{type:Number,default:2},autoAdjust:{type:Boolean,default:!0}},emits:{"update:current":e=>!0,"update:pageSize":e=>!0,change:e=>!0,pageSizeChange:e=>!0},setup(e,{emit:t,slots:a}){const s=h("pagination"),{t:l}=q(),{disabled:i,pageItemStyle:n,activePageItemStyle:r,size:o}=E(e),{mergedSize:p}=G(o),u=R(e.defaultCurrent),d=R(e.defaultPageSize),c=y((()=>{var t;return null!=(t=e.current)?t:u.value})),m=y((()=>{var t;return null!=(t=e.pageSize)?t:d.value})),g=y((()=>Math.ceil(e.total/m.value))),f=a=>{a!==c.value&&D(a)&&!e.disabled&&(u.value=a,t("update:current",a),t("change",a))},b=e=>{d.value=e,t("update:pageSize",e),t("pageSizeChange",e)},v=U({current:c,pages:g,disabled:i,style:n,activeStyle:r,onClick:f}),x=(e,t={})=>"more"===e?L(fe,F(t,v),{default:a["page-item-ellipsis"]}):"previous"===e?L(ge,F({type:"previous"},t,v),{default:a["page-item-step"]}):"next"===e?L(ge,F({type:"next"},t,v),{default:a["page-item-step"]}):L(ce,F(t,v),{default:a["page-item"]}),S=y((()=>{const t=[];if(g.value<e.baseSize+2*e.bufferSize)for(let e=1;e<=g.value;e++)t.push(x("page",{key:e,pageNumber:e}));else{let a=1,s=g.value,l=!1,i=!1;c.value>2+e.bufferSize&&(l=!0,a=Math.min(c.value-e.bufferSize,g.value-2*e.bufferSize)),c.value<g.value-(e.bufferSize+1)&&(i=!0,s=Math.max(c.value+e.bufferSize,2*e.bufferSize+1)),l&&(t.push(x("page",{key:1,pageNumber:1})),t.push(x("more",{key:"left-ellipsis-pager",step:-(2*e.bufferSize+1)})));for(let e=a;e<=s;e++)t.push(x("page",{key:e,pageNumber:e}));i&&(t.push(x("more",{key:"right-ellipsis-pager",step:2*e.bufferSize+1})),t.push(x("page",{key:g.value,pageNumber:g.value})))}return t}));V(m,((a,s)=>{if(e.autoAdjust&&a!==s&&c.value>1){const e=s*(c.value-1)+1,l=Math.ceil(e/a);l!==c.value&&(u.value=l,t("update:current",l),t("change",l))}})),V(g,((a,s)=>{e.autoAdjust&&a!==s&&c.value>1&&c.value>a&&(u.value=a,t("update:current",a),t("change",a))}));const C=y((()=>[s,`${s}-size-${p.value}`,{[`${s}-simple`]:e.simple,[`${s}-disabled`]:e.disabled}]));return()=>{var t,i;return e.hideOnSinglePage&&g.value<=1?null:L("div",{class:C.value},[e.showTotal&&L("span",{class:`${s}-total`},[null!=(i=null==(t=a.total)?void 0:t.call(a,{total:e.total}))?i:l("pagination.total",e.total)]),e.simple?L("span",{class:`${s}-simple`},[x("previous",{simple:!0}),L(be,{disabled:e.disabled,current:c.value,size:p.value,pages:g.value,simple:!0,onChange:f},null),x("next",{simple:!0})]):L("ul",{class:`${s}-list`},[x("previous",{simple:!0}),S.value,e.showMore&&x("more",{key:"more",step:2*e.bufferSize+1}),x("next",{simple:!0})]),e.showPageSize&&L(ve,{disabled:e.disabled,sizeOptions:e.pageSizeOptions,pageSize:m.value,size:p.value,onChange:b,selectProps:e.pageSizeProps},null),!e.simple&&e.showJumper&&L(be,{disabled:e.disabled,current:c.value,pages:g.value,size:p.value,onChange:f},{"jumper-prepend":a["jumper-prepend"],"jumper-append":a["jumper-append"]})])}}});const ye=Object.assign(he,{install:(e,t)=>{Y(e,t);const a=K(t);e.component(a+he.name,he)}});function xe(e){return"function"==typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!ee(e)}var Se=v({name:"List",props:{data:{type:Array},size:{type:String,default:"medium"},bordered:{type:Boolean,default:!0},split:{type:Boolean,default:!0},loading:{type:Boolean,default:!1},hoverable:{type:Boolean,default:!1},paginationProps:{type:Object},gridProps:{type:Object},maxHeight:{type:Number,default:0},bottomOffset:{type:Number,default:0},virtualListProps:{type:Object},scrollbar:{type:[Object,Boolean],default:!0}},emits:{scroll:()=>!0,reachBottom:()=>!0,pageChange:e=>!0,pageSizeChange:e=>!0},setup(e,{emit:t,slots:s}){const{scrollbar:l}=E(e),i=h("list"),{componentRef:n,elementRef:r}=o("containerRef"),c=y((()=>e.virtualListProps)),{displayScrollbar:m,scrollbarProps:g}=p(l),f=a=>{const{scrollTop:s,scrollHeight:l,offsetHeight:i}=a.target;Math.floor(l-(s+i))<=e.bottomOffset&&t("reachBottom"),t("scroll")};X((()=>{if(r.value){const{scrollTop:e,scrollHeight:a,offsetHeight:s}=r.value;a<=e+s&&t("reachBottom")}}));const{current:b,pageSize:v,handlePageChange:x,handlePageSizeChange:S}=((e,{emit:t})=>{var a,s;const l=R(Q(e.paginationProps)&&null!=(a=e.paginationProps.defaultCurrent)?a:1),i=R(Q(e.paginationProps)&&null!=(s=e.paginationProps.defaultPageSize)?s:10);return{current:y((()=>{var t;return Q(e.paginationProps)&&null!=(t=e.paginationProps.current)?t:l.value})),pageSize:y((()=>{var t;return Q(e.paginationProps)&&null!=(t=e.paginationProps.pageSize)?t:i.value})),handlePageChange:e=>{l.value=e,t("pageChange",e)},handlePageSizeChange:e=>{i.value=e,t("pageSizeChange",e)}}})(e,{emit:t}),C=t=>{if(!e.paginationProps)return t;const a=(b.value-1)*v.value;return t.slice(a,a+v.value)},$=()=>{const t=s.default?W(s.default()):e.data;return t&&t.length>0?e.gridProps?(t=>{let a;if(!e.gridProps)return null;const l=C(t);if(e.gridProps.span){const t=[],a=24/e.gridProps.span;for(let n=0;n<l.length;n+=a){let r;const o=n+a,p=Math.floor(n/a);t.push(L(de.Row,{key:p,class:`${i}-row`,gutter:e.gridProps.gutter},xe(r=l.slice(n,o).map(((t,a)=>{var l;return L(de.Col,{key:`${p}-${a}`,class:`${i}-col`,span:null==(l=e.gridProps)?void 0:l.span},{default:()=>{var e;return[ee(t)?t:null==(e=s.item)?void 0:e.call(s,{item:t,index:a})]}})})))?r:{default:()=>[r]}))}return t}return L(de.Row,{class:`${i}-row`,gutter:e.gridProps.gutter},xe(a=l.map(((t,a)=>L(de.Col,F({key:a,class:`${i}-col`},Z(e.gridProps,["gutter"])),{default:()=>{var e;return[ee(t)?t:null==(e=s.item)?void 0:e.call(s,{item:t,index:a})]}}))))?a:{default:()=>[a]})})(t):(e=>C(e).map(((e,t)=>{var a;return ee(e)?e:null==(a=s.item)?void 0:a.call(s,{item:e,index:t})})))(t):_()},z=()=>{if(!e.paginationProps)return null;const t=Z(e.paginationProps,["current","pageSize","defaultCurrent","defaultPageSize"]);return L(ye,F({class:`${i}-pagination`},t,{current:b.value,pageSize:v.value,onChange:x,onPageSizeChange:S}),null)},w=y((()=>[i,`${i}-${e.size}`,{[`${i}-bordered`]:e.bordered,[`${i}-split`]:e.split,[`${i}-hover`]:e.hoverable}])),j=y((()=>{if(e.maxHeight>0)return{maxHeight:`${e.maxHeight}px`,overflowY:"auto"}})),k=y((()=>[`${i}-content`,{[`${i}-virtual`]:c.value}])),P=R(),N=()=>{var t;const a=C(null!=(t=e.data)?t:[]);return a.length?L(d,F({ref:P,class:k.value,data:a},e.virtualListProps,{onScroll:f}),{item:({item:e,index:t})=>{var a;return null==(a=s.item)?void 0:a.call(s,{item:e,index:t})}}):_()},O=()=>s["scroll-loading"]?L("div",{class:[`${i}-item`,`${i}-scroll-loading`]},[s["scroll-loading"]()]):null,_=()=>{var e,t;return s["scroll-loading"]?null:null!=(t=null==(e=s.empty)?void 0:e.call(s))?t:L(a,null,null)};return{virtualListRef:P,render:()=>{const t=m.value?u:"div";return L("div",{class:`${i}-wrapper`},[L(ue,{class:`${i}-spin`,loading:e.loading},{default:()=>[L(t,F({ref:n,class:w.value,style:j.value},g.value,{onScroll:f}),{default:()=>[L("div",{class:`${i}-content-wrapper`},[s.header&&L("div",{class:`${i}-header`},[s.header()]),c.value&&!e.gridProps?L(J,null,[N(),O()]):L("div",{role:"list",class:k.value},[$(),O()]),s.footer&&L("div",{class:`${i}-footer`},[s.footer()])])]}),z()]})])}}},methods:{scrollIntoView(e){this.virtualListRef&&this.virtualListRef.scrollTo(e)}},render(){return this.render()}}),Ce=v({name:"ListItem",props:{actionLayout:{type:String,default:"horizontal"}},setup(e,{slots:t}){const a=h("list-item"),s=()=>{var e;const s=null==(e=t.actions)?void 0:e.call(t);return s&&s.length?L("ul",{class:`${a}-action`},[s.map(((e,t)=>L("li",{key:`${a}-action-${t}`},[e])))]):null};return()=>{var l,i;return L("div",{role:"listitem",class:a},[L("div",{class:`${a}-main`},[null==(l=t.meta)?void 0:l.call(t),L("div",{class:`${a}-content`},[null==(i=t.default)?void 0:i.call(t)]),"vertical"===e.actionLayout&&s()]),"horizontal"===e.actionLayout&&s(),t.extra&&L("div",{class:`${a}-extra`},[t.extra()])])}}});var $e=x(v({name:"ListItemMeta",props:{title:String,description:String},setup:(e,{slots:t})=>({prefixCls:h("list-item-meta"),hasContent:Boolean(e.title||e.description||t.title||t.description)})}),[["render",function(e,t,a,s,l,i){return S(),C("div",{class:j(e.prefixCls)},[e.$slots.avatar?(S(),C("div",{key:0,class:j(`${e.prefixCls}-avatar`)},[$(e.$slots,"avatar")],2)):H("v-if",!0),e.hasContent?(S(),C("div",{key:1,class:j(`${e.prefixCls}-content`)},[e.$slots.title||e.title?(S(),C("div",{key:0,class:j(`${e.prefixCls}-title`)},[$(e.$slots,"title",{},(()=>[z(w(e.title),1)]))],2)):H("v-if",!0),e.$slots.description||e.description?(S(),C("div",{key:1,class:j(`${e.prefixCls}-description`)},[$(e.$slots,"description",{},(()=>[z(w(e.description),1)]))],2)):H("v-if",!0)],2)):H("v-if",!0)],2)}]]);const ze=Object.assign(Se,{Item:Object.assign(Ce,{Meta:$e}),install:(e,t)=>{Y(e,t);const a=K(t);e.component(a+Se.name,Se),e.component(a+Ce.name,Ce),e.component(a+$e.name,$e)}}),we={class:"flex-y-center"},je={class:"pl-12px text-18px font-semibold"},ke={class:"py-8px h-56px text-[#999]"},Pe={class:"flex justify-end"},Ne=v({__name:"TechnologyCard",props:{name:null,description:null,author:null,site:null,icon:null,iconColor:null},setup(e){const t=e;function a(){window.open(t.site,"_blank")}return(t,s)=>(S(),C("div",{class:"p-4px dark:border-[#ffffff17] rounded-4px cursor-pointer",onClick:a},[T("header",we,[L(te(ae),{icon:e.icon,style:k({color:e.iconColor}),class:"text-30px"},null,8,["icon","style"]),T("h3",je,w(e.name),1)]),T("p",ke,w(e.description),1),T("div",Pe,[T("span",null,w(e.author),1)])]))}}),Oe={class:"flex-y-center justify-between"},_e={class:"flex-y-center"},Be=(e=>(re("data-v-11ce06c7"),e=e(),oe(),e))((()=>T("img",{src:"/arco-design-pro-vue/assets/schoolboy.9f04cdf7.png",alt:""},null,-1))),Ie={class:"pl-12px"},Me={class:"text-18px font-semibold"},Le={class:"leading-30px text-[#999]"},qe=["src"],Re={class:"message w-full"},Ve=pe(v({__name:"index",setup(n){const r=se(),o=[{id:0,title:"dashboard.workbench.items",value:25},{id:1,title:"dashboard.workbench.abeyance",value:4},{id:2,title:"dashboard.workbench.news",value:12}],p=[{id:0,name:"Golang",description:"Google开发的一种编程语言",author:"Google",site:"https://github.com/",icon:"fa6-brands:golang"},{id:1,name:"Vue",description:"一套用于构建用户界面的渐进式框架",author:"尤雨溪",site:"https://v3.cn.vuejs.org/",icon:"vscode-icons:file-type-vue"},{id:2,name:"JetBrains",description:"一家致力于将专业的软件开发变成生产力更高、更愉悦的体验的公司。致谢其对教育及开源项目的支持。",author:"JetBrains",site:"https://www.jetbrains.com/",icon:"logos:jetbrains"},{id:3,name:"Vite",description:"下一代前端开发与构建工具",author:"尤雨溪",site:"https://vitejs.cn/",icon:"vscode-icons:file-type-vite"},{id:4,name:"UnoCSS",description:"下一代实用优先的CSS框架",author:"Anthony Fu",site:"https://uno.antfu.me/?s=",icon:"logos:unocss",iconColor:"#48b0f1"},{id:5,name:"Pinia",description:"vue状态管理框架，支持vue2、vue3",author:"Posva",site:"https://pinia.esm.dev/",icon:"mdi:fruit-pineapple",iconColor:"#fecf48"}],u=R([]),d=R([{title:"刚才把工作台页面随便写了以下，勉强能看了。",description:"2022-07:24 11:11:11",logo:"https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"},{title:"刚才把工作台页面随便写了以下，勉强能看了。",description:"2022-07:24 11:11:11",logo:"https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"},{title:"刚才把工作台页面随便写了以下，勉强能看了。",description:"2022-07:24 11:11:11",logo:"https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"},{title:"刚才把工作台页面随便写了以下，勉强能看了。",description:"2022-07:24 11:11:11",logo:"https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"},{title:"刚才把工作台页面随便写了以下，勉强能看了。",description:"2022-07:24 11:11:11",logo:"https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"}]);return s(0).then((({data:e})=>{e.forEach(((e,t)=>{e.commit.message&&t<10&&u.value.push({date:l(new Date(e.commit.author.date),"yyyy-MM-dd"),message:e.commit.message,messageUrl:e.html_url})}))})),(s,l)=>{const n=b,v=f,h=g,y=c,x=m,$=$e,z=Ce,j=ze,P=t,N=i,O=a,I=e;return S(),C("div",null,[L(y,{bordered:!1,class:"rounded-16px shadow-sm"},{default:B((()=>[T("div",Oe,[T("div",_e,[L(n,{size:60},{default:B((()=>[Be])),_:1}),T("div",Ie,[T("h3",Me,w(s.$t("dashboard.workbench.good-morning"))+"，"+w(te(r).userInfo.userName)+", "+w(s.$t("dashboard.workbench.start-day")),1),T("p",Le,w(s.$t("dashboard.workbench.weather")),1)])]),L(h,{size:24,wrap:!1},{default:B((()=>[(S(),C(J,null,le(o,(e=>L(v,{key:e.id,class:"whitespace-nowrap",title:s.$t(e.title),value:e.value},null,8,["title","value"]))),64))])),_:1})])])),_:1}),L(I,{gutter:10},{default:B((()=>[L(P,{span:18},{default:B((()=>[L(y,{title:s.$t("dashboard.workbench.project"),bordered:!1,class:"rounded-16px shadow-sm mt-15px"},{default:B((()=>[(S(),C(J,null,le(p,((e,t)=>L(x,{key:t,hoverable:"",style:k({width:"33.3%"})},{default:B((()=>[L(y,{bordered:!1},{default:B((()=>[L(te(Ne),ie(ne(e)),null,16)])),_:2},1024)])),_:2},1032,["style"]))),64))])),_:1},8,["title"]),L(y,{title:s.$t("dashboard.workbench.dynamic"),bordered:!1,class:"rounded-16px shadow-sm mt-15px"},{default:B((()=>[L(j,{bordered:!1},{default:B((()=>[(S(!0),C(J,null,le(d.value,((e,t)=>(S(),_(z,{key:t},{default:B((()=>[L($,{title:e.title,description:e.description},{avatar:B((()=>[L(n,{shape:"square"},{default:B((()=>[T("img",{alt:"avatar",src:e.logo},null,8,qe)])),_:2},1024)])),_:2},1032,["title","description"])])),_:2},1024)))),128))])),_:1})])),_:1},8,["title"])])),_:1}),L(P,{span:6},{default:B((()=>[L(y,{class:"rounded-16px shadow-sm mt-15px",title:s.$t("dashboard.workbench.progress")},{default:B((()=>[(S(!0),C(J,null,le(u.value,(e=>(S(),_(N,{key:e.messageUrl,label:e.date},{default:B((()=>[T("span",Re,w(e.message),1)])),_:2},1032,["label"])))),128)),0===u.value.length?(S(),_(O,{key:0})):H("",!0)])),_:1},8,["title"])])),_:1})])),_:1})])}}}),[["__scopeId","data-v-11ce06c7"]]);export{Ve as default};
