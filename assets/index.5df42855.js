import{d as s,g as i,V as l,i as t,P as a,a as n,W as e,s as o,j as r}from"./index.5a5bffac.js";var c=s({name:"Empty",props:{description:String,imgSrc:String},setup(s,{slots:o}){const r=i("empty"),{t:c}=l(),m=t(a,void 0);return()=>{var i,l,t,a;return(null==m?void 0:m.slots.empty)?m.slots.empty():n("div",{class:r},[n("div",{class:`${r}-image`},[null!=(l=null==(i=o.image)?void 0:i.call(o))?l:s.imgSrc?n("img",{src:s.imgSrc,alt:s.description||"empty"},null):n(e,null,null)]),n("div",{class:`${r}-description`},[null!=(a=null==(t=o.default)?void 0:t.call(o))?a:s.description||c("empty.description")])])}}});const m=Object.assign(c,{install:(s,i)=>{o(s,i);const l=r(i);s.component(l+c.name,c)}});export{m as E};
