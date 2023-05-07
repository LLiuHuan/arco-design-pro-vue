import{d as e,ad as l,an as s,bq as a,ai as o,aj as t,ak as i,g as n,k as c,c as r,_ as f,a2 as p,w as d,x as v,y,A as C,H as $,q as b,M as u,E as k,D as m,G as x,b as h,a5 as I,s as A,v as g}from"./index.e00e4771.js";var w=f(e({name:"Alert",components:{IconHover:l,IconClose:s,IconInfoCircleFill:a,IconCheckCircleFill:o,IconExclamationCircleFill:t,IconCloseCircleFill:i},props:{type:{type:String,default:"info"},showIcon:{type:Boolean,default:!0},closable:{type:Boolean,default:!1},title:String,banner:{type:Boolean,default:!1}},emits:{close:e=>!0,afterClose:()=>!0},setup(e,{slots:l,emit:s}){const a=n("alert"),o=c(!0),t=r((()=>[a,`${a}-${e.type}`,{[`${a}-with-title`]:Boolean(e.title||l.title),[`${a}-banner`]:e.banner}]));return{prefixCls:a,cls:t,visible:o,handleClose:e=>{o.value=!1,s("close",e)},handleAfterLeave:()=>{s("afterClose")}}}}),[["render",function(e,l,s,a,o,t){const i=p("icon-info-circle-fill"),n=p("icon-check-circle-fill"),c=p("icon-exclamation-circle-fill"),r=p("icon-close-circle-fill"),f=p("icon-close"),A=p("icon-hover");return d(),v(I,{name:"zoom-in-top",onAfterLeave:e.handleAfterLeave},{default:y((()=>[e.visible?(d(),C("div",{key:0,role:"alert",class:$(e.cls)},[e.showIcon&&("normal"!==e.type||e.$slots.icon)?(d(),C("div",{key:0,class:$(`${e.prefixCls}-icon`)},[b(e.$slots,"icon",{},(()=>["info"===e.type?(d(),v(i,{key:0})):"success"===e.type?(d(),v(n,{key:1})):"warning"===e.type?(d(),v(c,{key:2})):"error"===e.type?(d(),v(r,{key:3})):u("v-if",!0)]))],2)):u("v-if",!0),k("div",{class:$(`${e.prefixCls}-body`)},[e.title||e.$slots.title?(d(),C("div",{key:0,class:$(`${e.prefixCls}-title`)},[b(e.$slots,"title",{},(()=>[m(x(e.title),1)]))],2)):u("v-if",!0),k("div",{class:$(`${e.prefixCls}-content`)},[b(e.$slots,"default")],2)],2),e.$slots.action?(d(),C("div",{key:1,class:$(`${e.prefixCls}-action`)},[b(e.$slots,"action")],2)):u("v-if",!0),e.closable?(d(),C("div",{key:2,tabindex:"-1",role:"button","aria-label":"Close",class:$(`${e.prefixCls}-close-btn`),onClick:l[0]||(l[0]=(...l)=>e.handleClose&&e.handleClose(...l))},[b(e.$slots,"close-element",{},(()=>[h(A,null,{default:y((()=>[h(f)])),_:1})]))],2)):u("v-if",!0)],2)):u("v-if",!0)])),_:3},8,["onAfterLeave"])}]]);const B=Object.assign(w,{install:(e,l)=>{A(e,l);const s=g(l);e.component(s+w.name,w)}});export{B as A};
