/* empty css              */import{C as a}from"./index.122671bf.js";import{S as e}from"./index.92f3dd58.js";import{I as t,b as i}from"./index.2efb3c78.js";/* empty css               */import{d as l,aQ as n,k as s,K as o,G as u,H as d,aR as r,x as m,b as f,M as c,aE as b,aS as p}from"./index.3bb732fb.js";import"./index.0880549f.js";import"./pick.47c8be66.js";const _=c("跳转Tab Detail"),x=c("跳转Tab Multi Detail 1"),v=c("跳转Tab Multi Detail 2"),j=c("设置当前Tab页标题"),T=l({__name:"index",setup(l){const{routerPush:c}=r(),T=n(),h=s("");function k(){c({name:b("function_tab-detail"),query:{name:"abc"},hash:"#DEMO_HASH"})}function H(a){c({name:b("function_tab-multi-detail"),query:{name:"abc",num:a},hash:"#DEMO_HASH"})}function C(){h.value?T.setActiveTabTitle(h.value):p.warning("请输入要设置的标题名称")}return(l,n)=>{const s=o,r=t,c=i,b=e,p=a;return m(),u(p,{title:"Tab Home",bordered:!1,size:"small",class:"shadow-sm rounded-16px w-full"},{default:d((()=>[f(b,{direction:"vertical",size:12},{default:d((()=>[f(s,{onClick:k},{default:d((()=>[_])),_:1}),f(s,{onClick:n[0]||(n[0]=a=>H(1))},{default:d((()=>[x])),_:1}),f(s,{onClick:n[1]||(n[1]=a=>H(2))},{default:d((()=>[v])),_:1}),f(c,null,{default:d((()=>[f(r,{"model-value":h.value,"onUpdate:model-value":n[2]||(n[2]=a=>h.value=a)},null,8,["model-value"]),f(s,{type:"primary",onClick:C},{default:d((()=>[j])),_:1})])),_:1})])),_:1})])),_:1})}}});export{T as default};
