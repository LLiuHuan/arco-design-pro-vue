import{d as e,b as l,aq as a,t as u,g as n,k as d,j as o,ar as t,c as s,af as c,S as v,ak as r,O as i,N as p,p as h,r as b,h as m,s as k,v as f}from"./index.0d5f6591.js";var g=e({name:"IconCheck",render:()=>l("svg",{"aria-hidden":"true",focusable:"false",viewBox:"0 0 1024 1024",width:"200",height:"200",fill:"currentColor"},[l("path",{d:"M877.44815445 206.10060629a64.72691371 64.72691371 0 0 0-95.14856334 4.01306852L380.73381888 685.46812814 235.22771741 533.48933518a64.72691371 64.72691371 0 0 0-92.43003222-1.03563036l-45.82665557 45.82665443a64.72691371 64.72691371 0 0 0-0.90617629 90.61767965l239.61903446 250.10479331a64.72691371 64.72691371 0 0 0 71.19960405 15.14609778 64.33855261 64.33855261 0 0 0 35.08198741-21.23042702l36.24707186-42.71976334 40.5190474-40.77795556-3.36579926-3.49525333 411.40426297-486.74638962a64.72691371 64.72691371 0 0 0-3.88361443-87.64024149l-45.3088404-45.43829334z","p-id":"840"},null)])});const y=Symbol("ArcoCheckboxGroup");var C=e({name:"Checkbox",components:{IconCheck:g,IconHover:a},props:{modelValue:{type:[Boolean,Array],default:void 0},defaultChecked:{type:Boolean,default:!1},value:{type:[String,Number]},disabled:{type:Boolean,default:!1},indeterminate:{type:Boolean,default:!1},uninjectGroupContext:{type:Boolean,default:!1}},emits:{"update:modelValue":e=>!0,change:(e,l)=>!0},setup(e,{emit:i,slots:p}){const{disabled:h}=u(e),b=n("checkbox"),m=d(),k=e.uninjectGroupContext?void 0:o(y,void 0),f="ArcoCheckboxGroup"===(null==k?void 0:k.name),{mergedDisabled:C,eventHandlers:x}=t({disabled:h}),V=s((()=>(null==k?void 0:k.disabled)||(null==C?void 0:C.value))),$=d(e.defaultChecked),B=s((()=>{var l;return f?null==k?void 0:k.computedValue:null!=(l=e.modelValue)?l:$.value})),A=s((()=>{var l;return c(B.value)?B.value.includes(null==(l=e.value)||l):B.value})),G=e=>{e.stopPropagation()},j=l=>{var a,u,n,d;const{checked:o}=l.target;let t=o;if(c(B.value)){const l=new Set(B.value);o?l.add(null==(a=e.value)||a):l.delete(null==(u=e.value)||u),t=Array.from(l)}$.value=o,f&&c(t)?null==k||k.handleChange(t,l):(i("update:modelValue",t),i("change",t,l),null==(d=null==(n=x.value)?void 0:n.onChange)||d.call(n,l)),r((()=>{m.value&&m.value.checked!==A.value&&(m.value.checked=A.value)}))},S=s((()=>[b,{[`${b}-checked`]:A.value,[`${b}-indeterminate`]:e.indeterminate,[`${b}-disabled`]:V.value}])),w=e=>{var l,a;null==(a=null==(l=x.value)?void 0:l.onFocus)||a.call(l,e)},H=e=>{var l,a;null==(a=null==(l=x.value)?void 0:l.onBlur)||a.call(l,e)};return v(B,(l=>{var a;let u;u=c(l)?l.includes(null==(a=e.value)||a):l,$.value!==u&&($.value=u),m.value&&m.value.checked!==u&&(m.value.checked=u)})),()=>{var u,n,d,o,t;return l("label",{"aria-disabled":V.value,class:S.value},[l("input",{ref:m,type:"checkbox",checked:A.value,value:e.value,class:`${b}-target`,disabled:V.value,onClick:G,onChange:j,onFocus:w,onBlur:H},null),null!=(t=null!=(o=null==(u=p.checkbox)?void 0:u.call(p,{checked:A.value,disabled:V.value}))?o:null==(d=null==k?void 0:(n=k.slots).checkbox)?void 0:d.call(n,{checked:A.value,disabled:V.value}))?t:l(a,{class:`${b}-icon-hover`,disabled:V.value||A.value},{default:()=>[l("div",{class:`${b}-icon`},[A.value&&l(g,{class:`${b}-icon-check`},null)])]}),p.default&&l("span",{class:`${b}-label`},[p.default()])])}}}),x=e({name:"CheckboxGroup",props:{modelValue:{type:Array,default:void 0},defaultValue:{type:Array,default:()=>[]},options:{type:Array},direction:{type:String,default:"horizontal"},disabled:{type:Boolean,default:!1}},emits:{"update:modelValue":e=>!0,change:(e,l)=>!0},setup(e,{emit:a,slots:o}){const{disabled:c}=u(e),r=n("checkbox-group"),{mergedDisabled:k,eventHandlers:f}=t({disabled:c}),g=d(e.defaultValue),x=s((()=>{var l;return null!=(l=e.modelValue)?l:g.value})),V=s((()=>{var l;return(null!=(l=e.options)?l:[]).map((e=>i(e)||p(e)?{label:e,value:e}:e))}));h(y,b({name:"ArcoCheckboxGroup",computedValue:x,disabled:k,slots:o,handleChange:(e,l)=>{var u,n;g.value=e,a("update:modelValue",e),a("change",e,l),null==(n=null==(u=f.value)?void 0:u.onChange)||n.call(u,l)}}));const $=s((()=>[r,`${r}-direction-${e.direction}`]));v((()=>e.modelValue),(e=>{e&&(g.value=[...e])}));return()=>{var e;return l("span",{class:$.value},[V.value.length>0?V.value.map(((e,a)=>l(C,{key:e.value,value:e.value,disabled:e.disabled,indeterminate:e.indeterminate,modelValue:x.value.includes(e.value)},{default:()=>[o.label?o.label({data:e}):m(e.label)?e.label():e.label]}))):null==(e=o.default)?void 0:e.call(o)])}}});const V=Object.assign(C,{Group:x,install:(e,l)=>{k(e,l);const a=f(l);e.component(a+C.name,C),e.component(a+x.name,x)}});export{V as C};
