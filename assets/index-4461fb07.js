/* empty css              */import{C as e}from"./index-6d823d09.js";import{_ as t}from"./WebSiteLink.vue_vue_type_script_setup_true_lang-bd515f5b.js";/* empty css              */import{a as n}from"./_commonjsHelpers-157f59fb.js";import{B as r}from"./index-25db428f.js";import{d as o,a as i,l as a,k as l,o as s,a9 as d}from"./runtime-core.esm-bundler-808dc7a8.js";import"./plugin-vue_export-helper-806773bb.js";import"./index-0a51ce0a.js";import"./use-size-9fed8212.js";import"./vue-utils-fe41050b.js";var c,u={};window,c=function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}({"./src/index.js":
/*!**********************!*\
            !*** ./src/index.js ***!
            \**********************/
/*! exports provided: default */function(e,t,n){n.r(t),n(
/*! ./sass/index.scss */
"./src/sass/index.scss");var r=n(
/*! ./js/init */
"./src/js/init.js").default.init;"undefined"!=typeof window&&(window.printJS=r),t.default=r},"./src/js/browser.js":
/*!***************************!*\
            !*** ./src/js/browser.js ***!
            \***************************/
/*! exports provided: default */function(e,t,n){n.r(t);var r={isFirefox:function(){return"undefined"!=typeof InstallTrigger},isIE:function(){return-1!==navigator.userAgent.indexOf("MSIE")||!!document.documentMode},isEdge:function(){return!r.isIE()&&!!window.StyleMedia},isChrome:function(){return!!(arguments.length>0&&void 0!==arguments[0]?arguments[0]:window).chrome},isSafari:function(){return Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0||-1!==navigator.userAgent.toLowerCase().indexOf("safari")},isIOSChrome:function(){return-1!==navigator.userAgent.toLowerCase().indexOf("crios")}};t.default=r},"./src/js/functions.js":
/*!*****************************!*\
            !*** ./src/js/functions.js ***!
            \*****************************/
/*! exports provided: addWrapper, capitalizePrint, collectStyles, addHeader, cleanUp, isRawHTML */function(e,t,n){n.r(t),n.d(t,"addWrapper",(function(){return a})),n.d(t,"capitalizePrint",(function(){return l})),n.d(t,"collectStyles",(function(){return s})),n.d(t,"addHeader",(function(){return c})),n.d(t,"cleanUp",(function(){return u})),n.d(t,"isRawHTML",(function(){return p}));var r=n(
/*! ./modal */
"./src/js/modal.js"),o=n(
/*! ./browser */
"./src/js/browser.js");function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){return'<div style="font-family:'+t.font+" !important; font-size: "+t.font_size+' !important; width:100%;">'+e+"</div>"}function l(e){return e.charAt(0).toUpperCase()+e.slice(1)}function s(e,t){for(var n="",r=(document.defaultView||window).getComputedStyle(e,""),o=0;o<r.length;o++)(-1!==t.targetStyles.indexOf("*")||-1!==t.targetStyle.indexOf(r[o])||d(t.targetStyles,r[o]))&&r.getPropertyValue(r[o])&&(n+=r[o]+":"+r.getPropertyValue(r[o])+";");return n+="max-width: "+t.maxWidth+"px !important; font-size: "+t.font_size+" !important;"}function d(e,t){for(var n=0;n<e.length;n++)if("object"===i(t)&&-1!==t.indexOf(e[n]))return!0;return!1}function c(e,t){var n=document.createElement("div");if(p(t.header))n.innerHTML=t.header;else{var r=document.createElement("h1"),o=document.createTextNode(t.header);r.appendChild(o),r.setAttribute("style",t.headerStyle),n.appendChild(r)}e.insertBefore(n,e.childNodes[0])}function u(e){e.showModal&&r.default.close(),e.onLoadingEnd&&e.onLoadingEnd(),(e.showModal||e.onLoadingStart)&&window.URL.revokeObjectURL(e.printable);var t="mouseover";(o.default.isChrome()||o.default.isFirefox())&&(t="focus"),window.addEventListener(t,(function n(){window.removeEventListener(t,n),e.onPrintDialogClose();var r=document.getElementById(e.frameId);r&&r.remove()}))}function p(e){return new RegExp("<([A-Za-z][A-Za-z0-9]*)\\b[^>]*>(.*?)</\\1>").test(e)}},"./src/js/html.js":
/*!************************!*\
            !*** ./src/js/html.js ***!
            \************************/
/*! exports provided: default */function(e,t,n){n.r(t);var r=n(
/*! ./functions */
"./src/js/functions.js"),o=n(
/*! ./print */
"./src/js/print.js");function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){for(var n=e.cloneNode(),o=Array.prototype.slice.call(e.childNodes),i=0;i<o.length;i++)if(-1===t.ignoreElements.indexOf(o[i].id)){var l=a(o[i],t);n.appendChild(l)}switch(t.scanStyles&&1===e.nodeType&&n.setAttribute("style",Object(r.collectStyles)(e,t)),e.tagName){case"SELECT":n.value=e.value;break;case"CANVAS":n.getContext("2d").drawImage(e,0,0)}return n}t.default={print:function(e,t){var n,l="object"===i(n=e.printable)&&n&&(n instanceof HTMLElement||1===n.nodeType)?e.printable:document.getElementById(e.printable);l?(e.printableElement=a(l,e),e.header&&Object(r.addHeader)(e.printableElement,e),o.default.send(e,t)):window.console.error("Invalid HTML element id: "+e.printable)}}},"./src/js/image.js":
/*!*************************!*\
            !*** ./src/js/image.js ***!
            \*************************/
/*! exports provided: default */function(e,t,n){n.r(t);var r=n(
/*! ./functions */
"./src/js/functions.js"),o=n(
/*! ./print */
"./src/js/print.js"),i=n(
/*! ./browser */
"./src/js/browser.js");t.default={print:function(e,t){e.printable.constructor!==Array&&(e.printable=[e.printable]),e.printableElement=document.createElement("div"),e.printable.forEach((function(t){var n=document.createElement("img");if(n.setAttribute("style",e.imageStyle),n.src=t,i.default.isFirefox()){var r=n.src;n.src=r}var o=document.createElement("div");o.appendChild(n),e.printableElement.appendChild(o)})),e.header&&Object(r.addHeader)(e.printableElement,e),o.default.send(e,t)}}},"./src/js/init.js":
/*!************************!*\
            !*** ./src/js/init.js ***!
            \************************/
/*! exports provided: default */function(e,t,n){n.r(t);var r=n(
/*! ./browser */
"./src/js/browser.js"),o=n(
/*! ./modal */
"./src/js/modal.js"),i=n(
/*! ./pdf */
"./src/js/pdf.js"),a=n(
/*! ./html */
"./src/js/html.js"),l=n(
/*! ./raw-html */
"./src/js/raw-html.js"),s=n(
/*! ./image */
"./src/js/image.js"),d=n(
/*! ./json */
"./src/js/json.js");function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var u=["pdf","html","image","json","raw-html"];t.default={init:function(){var e={printable:null,fallbackPrintable:null,type:"pdf",header:null,headerStyle:"font-weight: 300;",maxWidth:800,properties:null,gridHeaderStyle:"font-weight: bold; padding: 5px; border: 1px solid #dddddd;",gridStyle:"border: 1px solid lightgray; margin-bottom: -1px;",showModal:!1,onError:function(e){throw e},onLoadingStart:null,onLoadingEnd:null,onPrintDialogClose:function(){},onIncompatibleBrowser:function(){},modalMessage:"Retrieving Document...",frameId:"printJS",printableElement:null,documentTitle:"Document",targetStyle:["clear","display","width","min-width","height","min-height","max-height"],targetStyles:["border","box","break","text-decoration"],ignoreElements:[],repeatTableHeader:!0,css:null,style:null,scanStyles:!0,base64:!1,onPdfOpen:null,font:"TimesNewRoman",font_size:"12pt",honorMarginPadding:!0,honorColor:!1,imageStyle:"max-width: 100%;"},t=arguments[0];if(void 0===t)throw new Error("printJS expects at least 1 attribute.");switch(c(t)){case"string":e.printable=encodeURI(t),e.fallbackPrintable=e.printable,e.type=arguments[1]||e.type;break;case"object":for(var n in e.printable=t.printable,e.fallbackPrintable=void 0!==t.fallbackPrintable?t.fallbackPrintable:e.printable,e.fallbackPrintable=e.base64?"data:application/pdf;base64,".concat(e.fallbackPrintable):e.fallbackPrintable,e)"printable"!==n&&"fallbackPrintable"!==n&&(e[n]=void 0!==t[n]?t[n]:e[n]);break;default:throw new Error('Unexpected argument type! Expected "string" or "object", got '+c(t))}if(!e.printable)throw new Error("Missing printable information.");if(!e.type||"string"!=typeof e.type||-1===u.indexOf(e.type.toLowerCase()))throw new Error("Invalid print type. Available types are: pdf, html, image and json.");e.showModal&&o.default.show(e),e.onLoadingStart&&e.onLoadingStart();var p=document.getElementById(e.frameId);p&&p.parentNode.removeChild(p);var f=document.createElement("iframe");switch(r.default.isFirefox()?f.setAttribute("style","width: 1px; height: 100px; position: fixed; left: 0; top: 0; opacity: 0; border-width: 0; margin: 0; padding: 0"):f.setAttribute("style","visibility: hidden; height: 0; width: 0; position: absolute; border: 0"),f.setAttribute("id",e.frameId),"pdf"!==e.type&&(f.srcdoc="<html><head><title>"+e.documentTitle+"</title>",e.css&&(Array.isArray(e.css)||(e.css=[e.css]),e.css.forEach((function(e){f.srcdoc+='<link rel="stylesheet" href="'+e+'">'}))),f.srcdoc+="</head><body></body></html>"),e.type){case"pdf":if(r.default.isIE())try{window.open(e.fallbackPrintable,"_blank").focus(),e.onIncompatibleBrowser()}catch(m){e.onError(m)}finally{e.showModal&&o.default.close(),e.onLoadingEnd&&e.onLoadingEnd()}else i.default.print(e,f);break;case"image":s.default.print(e,f);break;case"html":a.default.print(e,f);break;case"raw-html":l.default.print(e,f);break;case"json":d.default.print(e,f)}}}},"./src/js/json.js":
/*!************************!*\
            !*** ./src/js/json.js ***!
            \************************/
/*! exports provided: default */function(e,t,n){n.r(t);var r=n(
/*! ./functions */
"./src/js/functions.js"),o=n(
/*! ./print */
"./src/js/print.js");function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}t.default={print:function(e,t){if("object"!==i(e.printable))throw new Error("Invalid javascript data object (JSON).");if("boolean"!=typeof e.repeatTableHeader)throw new Error("Invalid value for repeatTableHeader attribute (JSON).");if(!e.properties||!Array.isArray(e.properties))throw new Error("Invalid properties array for your JSON data.");e.properties=e.properties.map((function(t){return{field:"object"===i(t)?t.field:t,displayName:"object"===i(t)?t.displayName:t,columnSize:"object"===i(t)&&t.columnSize?t.columnSize+";":100/e.properties.length+"%;"}})),e.printableElement=document.createElement("div"),e.header&&Object(r.addHeader)(e.printableElement,e),e.printableElement.innerHTML+=function(e){var t=e.printable,n=e.properties,o='<table style="border-collapse: collapse; width: 100%;">';e.repeatTableHeader&&(o+="<thead>"),o+="<tr>";for(var i=0;i<n.length;i++)o+='<th style="width:'+n[i].columnSize+";"+e.gridHeaderStyle+'">'+Object(r.capitalizePrint)(n[i].displayName)+"</th>";o+="</tr>",e.repeatTableHeader&&(o+="</thead>"),o+="<tbody>";for(var a=0;a<t.length;a++){o+="<tr>";for(var l=0;l<n.length;l++){var s=t[a],d=n[l].field.split(".");if(d.length>1)for(var c=0;c<d.length;c++)s=s[d[c]];else s=s[n[l].field];o+='<td style="width:'+n[l].columnSize+e.gridStyle+'">'+s+"</td>"}o+="</tr>"}return o+="</tbody></table>"}(e),o.default.send(e,t)}}},"./src/js/modal.js":
/*!*************************!*\
            !*** ./src/js/modal.js ***!
            \*************************/
/*! exports provided: default */function(e,t,n){n.r(t);var r={show:function(e){var t=document.createElement("div");t.setAttribute("style","font-family:sans-serif; display:table; text-align:center; font-weight:300; font-size:30px; left:0; top:0;position:fixed; z-index: 9990;color: #0460B5; width: 100%; height: 100%; background-color:rgba(255,255,255,.9);transition: opacity .3s ease;"),t.setAttribute("id","printJS-Modal");var n=document.createElement("div");n.setAttribute("style","display:table-cell; vertical-align:middle; padding-bottom:100px;");var o=document.createElement("div");o.setAttribute("class","printClose"),o.setAttribute("id","printClose"),n.appendChild(o);var i=document.createElement("span");i.setAttribute("class","printSpinner"),n.appendChild(i);var a=document.createTextNode(e.modalMessage);n.appendChild(a),t.appendChild(n),document.getElementsByTagName("body")[0].appendChild(t),document.getElementById("printClose").addEventListener("click",(function(){r.close()}))},close:function(){var e=document.getElementById("printJS-Modal");e&&e.parentNode.removeChild(e)}};t.default=r},"./src/js/pdf.js":
/*!***********************!*\
            !*** ./src/js/pdf.js ***!
            \***********************/
/*! exports provided: default */function(e,t,n){n.r(t);var r=n(
/*! ./print */
"./src/js/print.js"),o=n(
/*! ./functions */
"./src/js/functions.js");function i(e,t,n){var o=new window.Blob([n],{type:"application/pdf"});o=window.URL.createObjectURL(o),t.setAttribute("src",o),r.default.send(e,t)}t.default={print:function(e,t){if(e.base64){var n=Uint8Array.from(atob(e.printable),(function(e){return e.charCodeAt(0)}));i(e,t,n)}else{e.printable=/^(blob|http|\/\/)/i.test(e.printable)?e.printable:window.location.origin+("/"!==e.printable.charAt(0)?"/"+e.printable:e.printable);var r=new window.XMLHttpRequest;r.responseType="arraybuffer",r.addEventListener("error",(function(){Object(o.cleanUp)(e),e.onError(r.statusText,r)})),r.addEventListener("load",(function(){if(-1===[200,201].indexOf(r.status))return Object(o.cleanUp)(e),void e.onError(r.statusText,r);i(e,t,r.response)})),r.open("GET",e.printable,!0),r.send()}}}},"./src/js/print.js":
/*!*************************!*\
            !*** ./src/js/print.js ***!
            \*************************/
/*! exports provided: default */function(e,t,n){n.r(t);var r=n(
/*! ./browser */
"./src/js/browser.js"),o=n(
/*! ./functions */
"./src/js/functions.js"),i={send:function(e,t){document.getElementsByTagName("body")[0].appendChild(t);var n=document.getElementById(e.frameId);n.onload=function(){if("pdf"!==e.type){var t=n.contentWindow||n.contentDocument;if(t.document&&(t=t.document),t.body.appendChild(e.printableElement),"pdf"!==e.type&&e.style){var o=document.createElement("style");o.innerHTML=e.style,t.head.appendChild(o)}var i=t.getElementsByTagName("img");i.length>0?function(e){var t=e.map((function(e){if(e.src&&e.src!==window.location.href)return function(e){return new Promise((function(t){!function n(){e&&void 0!==e.naturalWidth&&0!==e.naturalWidth&&e.complete?t():setTimeout(n,500)}()}))}(e)}));return Promise.all(t)}(Array.from(i)).then((function(){return a(n,e)})):a(n,e)}else r.default.isFirefox()?setTimeout((function(){return a(n,e)}),1e3):a(n,e)}}};function a(e,t){try{if(e.focus(),r.default.isEdge()||r.default.isIE())try{e.contentWindow.document.execCommand("print",!1,null)}catch(n){e.contentWindow.print()}else e.contentWindow.print()}catch(i){t.onError(i)}finally{r.default.isFirefox()&&(e.style.visibility="hidden",e.style.left="-1px"),Object(o.cleanUp)(t)}}t.default=i},"./src/js/raw-html.js":
/*!****************************!*\
            !*** ./src/js/raw-html.js ***!
            \****************************/
/*! exports provided: default */function(e,t,n){n.r(t);var r=n(
/*! ./print */
"./src/js/print.js");t.default={print:function(e,t){e.printableElement=document.createElement("div"),e.printableElement.setAttribute("style","width:100%"),e.printableElement.innerHTML=e.printable,r.default.send(e,t)}}},"./src/sass/index.scss":
/*!*****************************!*\
            !*** ./src/sass/index.scss ***!
            \*****************************/
/*! no static exports found */function(e,t,n){},0:
/*!****************************!*\
            !*** multi ./src/index.js ***!
            \****************************/
/*! no static exports found */function(e,t,n){e.exports=n(
/*! ./src/index.js */
"./src/index.js")}}).default},{get exports(){return u},set exports(e){u=e}}.exports=c();const p=n(u),f={class:"h-full"},m=o({__name:"index",setup(n){function o(){p({printable:[{"姓名":"小红","年龄":"13","备注":"小红小红小小红"},{"姓名":"小明","年龄":"15","备注":"小明小明小小明"},{"姓名":"小刚","年龄":"18","备注":"小刚小刚小小刚"}],properties:["姓名","年龄","备注"],type:"json"})}function c(){p({printable:["https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp","https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"],type:"image",header:"Multiple Images",imageStyle:"width:100%;"})}return(n,u)=>{const p=r,m=t,b=e;return s(),i("div",f,[a(b,{title:"打印",class:"shadow-sm rounded-16px"},{actions:l((()=>[a(m,{label:"printJS：",link:"https://github.com/crabbly/Print.js",class:"mt-10px"})])),default:l((()=>[a(p,{type:"primary",class:"mr-10px",onClick:o},{default:l((()=>[d("打印表格")])),_:1}),a(p,{type:"primary",onClick:c},{default:l((()=>[d("打印图片")])),_:1})])),_:1})])}}});export{m as default};
