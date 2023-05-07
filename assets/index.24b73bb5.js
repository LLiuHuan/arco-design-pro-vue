import{d as t,g as e,k as o,c as s,_ as p,a2 as n,w as a,x as i,y as r,E as l,H as u,q as c,D as g,G as b,s as d,v as y}from"./index.e00e4771.js";import{T as f}from"./index.1a1aab71.js";var C=p(t({name:"Popover",components:{Trigger:f},props:{popupVisible:{type:Boolean,default:void 0},defaultPopupVisible:{type:Boolean,default:!1},title:String,content:String,trigger:{type:[String,Array],default:"hover"},position:{type:String,default:"top"},contentClass:{type:[String,Array,Object]},contentStyle:{type:Object},arrowClass:{type:[String,Array,Object]},arrowStyle:{type:Object},popupContainer:{type:[String,Object]}},emits:{"update:popupVisible":t=>!0,popupVisibleChange:t=>!0},setup(t,{emit:p}){const n=e("popover"),a=o(t.defaultPopupVisible),i=s((()=>{var e;return null!=(e=t.popupVisible)?e:a.value})),r=s((()=>[`${n}-popup-content`,t.contentClass])),l=s((()=>[`${n}-popup-arrow`,t.arrowClass]));return{prefixCls:n,computedPopupVisible:i,contentCls:r,arrowCls:l,handlePopupVisibleChange:t=>{a.value=t,p("update:popupVisible",t),p("popupVisibleChange",t)}}}}),[["render",function(t,e,o,s,p,d){const y=n("trigger");return a(),i(y,{class:u(t.prefixCls),trigger:t.trigger,position:t.position,"popup-visible":t.computedPopupVisible,"popup-offset":10,"content-class":t.contentCls,"content-style":t.contentStyle,"arrow-class":t.arrowCls,"arrow-style":t.arrowStyle,"show-arrow":"","popup-container":t.popupContainer,"animation-name":"zoom-in-fade-out","auto-fit-transform-origin":"",onPopupVisibleChange:t.handlePopupVisibleChange},{content:r((()=>[l("div",{class:u(`${t.prefixCls}-title`)},[c(t.$slots,"title",{},(()=>[g(b(t.title),1)]))],2),l("div",{class:u(`${t.prefixCls}-content`)},[c(t.$slots,"content",{},(()=>[g(b(t.content),1)]))],2)])),default:r((()=>[c(t.$slots,"default")])),_:3},8,["class","trigger","position","popup-visible","content-class","content-style","arrow-class","arrow-style","popup-container","onPopupVisibleChange"])}]]);const m=Object.assign(C,{install:(t,e)=>{d(t,e);const o=y(e);t.component(o+C.name,C)}});export{m as P};
