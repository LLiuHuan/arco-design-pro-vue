function J(e){return typeof e=="object"&&e!=null&&e.nodeType===1}function K(e,n){return(!n||e!=="hidden")&&e!=="visible"&&e!=="clip"}function B(e,n){if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){var o=getComputedStyle(e,null);return K(o.overflowY,n)||K(o.overflowX,n)||function(h){var r=function(t){if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(d){return null}}(h);return!!r&&(r.clientHeight<h.scrollHeight||r.clientWidth<h.scrollWidth)}(e)}return!1}function S(e,n,o,h,r,t,d,s){return t<e&&d>n||t>e&&d<n?0:t<=e&&s<=o||d>=n&&s>=o?t-e-h:d>n&&s<o||t<e&&s>o?d-n+r:0}function F(e,n){var o=window,h=n.scrollMode,r=n.block,t=n.inline,d=n.boundary,s=n.skipOverflowHiddenElements,I=typeof d=="function"?d:function(x){return x!==d};if(!J(e))throw new TypeError("Invalid target");for(var q=document.scrollingElement||document.documentElement,H=[],l=e;J(l)&&I(l);){if((l=l.parentElement)===q){H.push(l);break}l!=null&&l===document.body&&B(l)&&!B(document.documentElement)||l!=null&&B(l,s)&&H.push(l)}for(var w=o.visualViewport?o.visualViewport.width:innerWidth,p=o.visualViewport?o.visualViewport.height:innerHeight,v=window.scrollX||pageXOffset,b=window.scrollY||pageYOffset,m=e.getBoundingClientRect(),W=m.height,y=m.width,E=m.top,U=m.right,Z=m.bottom,M=m.left,u=r==="start"||r==="nearest"?E:r==="end"?Z:E+W/2,c=t==="center"?M+y/2:t==="end"?U:M,_=[],$=0;$<H.length;$++){var i=H[$],g=i.getBoundingClientRect(),L=g.height,N=g.width,V=g.top,P=g.right,j=g.bottom,C=g.left;if(h==="if-needed"&&E>=0&&M>=0&&Z<=p&&U<=w&&E>=V&&Z<=j&&M>=C&&U<=P)return _;var T=getComputedStyle(i),D=parseInt(T.borderLeftWidth,10),O=parseInt(T.borderTopWidth,10),X=parseInt(T.borderRightWidth,10),Y=parseInt(T.borderBottomWidth,10),a=0,f=0,Q="offsetWidth"in i?i.offsetWidth-i.clientWidth-D-X:0,R="offsetHeight"in i?i.offsetHeight-i.clientHeight-O-Y:0;if(q===i)a=r==="start"?u:r==="end"?u-p:r==="nearest"?S(b,b+p,p,O,Y,b+u,b+u+W,W):u-p/2,f=t==="start"?c:t==="center"?c-w/2:t==="end"?c-w:S(v,v+w,w,D,X,v+c,v+c+y,y),a=Math.max(0,a+b),f=Math.max(0,f+v);else{a=r==="start"?u-V-O:r==="end"?u-j+Y+R:r==="nearest"?S(V,j,L,O,Y+R,u,u+W,W):u-(V+L/2)+R/2,f=t==="start"?c-C-D:t==="center"?c-(C+N/2)+Q/2:t==="end"?c-P+X+Q:S(C,P,N,D,X+Q,c,c+y,y);var z=i.scrollLeft,A=i.scrollTop;u+=A-(a=Math.max(0,Math.min(A+a,i.scrollHeight-L+R))),c+=z-(f=Math.max(0,Math.min(z+f,i.scrollWidth-N+Q)))}_.push({el:i,top:a,left:f})}return _}export{F as c};
