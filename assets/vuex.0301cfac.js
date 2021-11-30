import{ae as F,aX as w,r as V,bp as H}from"./@vue.2024b520.js";/*!
 * vuex v4.0.2
 * (c) 2021 Evan You
 * @license MIT
 */var I="store";function at(e){return e===void 0&&(e=null),F(e!==null?e:I)}function _(e,t){Object.keys(e).forEach(function(i){return t(e[i],i)})}function U(e){return e!==null&&typeof e=="object"}function B(e){return e&&typeof e.then=="function"}function K(e,t){return function(){return e(t)}}function M(e,t,i){return t.indexOf(e)<0&&(i&&i.prepend?t.unshift(e):t.push(e)),function(){var r=t.indexOf(e);r>-1&&t.splice(r,1)}}function x(e,t){e._actions=Object.create(null),e._mutations=Object.create(null),e._wrappedGetters=Object.create(null),e._modulesNamespaceMap=Object.create(null);var i=e.state;b(e,i,[],e._modules.root,!0),C(e,i,t)}function C(e,t,i){var r=e._state;e.getters={},e._makeLocalGettersCache=Object.create(null);var n=e._wrappedGetters,o={};_(n,function(a,s){o[s]=K(a,e),Object.defineProperty(e.getters,s,{get:function(){return o[s]()},enumerable:!0})}),e._state=V({data:t}),e.strict&&z(e),r&&i&&e._withCommit(function(){r.data=null})}function b(e,t,i,r,n){var o=!i.length,a=e._modules.getNamespace(i);if(r.namespaced&&(e._modulesNamespaceMap[a],e._modulesNamespaceMap[a]=r),!o&&!n){var s=O(t,i.slice(0,-1)),f=i[i.length-1];e._withCommit(function(){s[f]=r.state})}var d=r.context=W(e,a,i);r.forEachMutation(function(c,u){var h=a+u;X(e,h,c,d)}),r.forEachAction(function(c,u){var h=c.root?u:a+u,l=c.handler||c;Y(e,h,l,d)}),r.forEachGetter(function(c,u){var h=a+u;q(e,h,c,d)}),r.forEachChild(function(c,u){b(e,t,i.concat(u),c,n)})}function W(e,t,i){var r=t==="",n={dispatch:r?e.dispatch:function(o,a,s){var f=y(o,a,s),d=f.payload,c=f.options,u=f.type;return(!c||!c.root)&&(u=t+u),e.dispatch(u,d)},commit:r?e.commit:function(o,a,s){var f=y(o,a,s),d=f.payload,c=f.options,u=f.type;(!c||!c.root)&&(u=t+u),e.commit(u,d,c)}};return Object.defineProperties(n,{getters:{get:r?function(){return e.getters}:function(){return T(e,t)}},state:{get:function(){return O(e.state,i)}}}),n}function T(e,t){if(!e._makeLocalGettersCache[t]){var i={},r=t.length;Object.keys(e.getters).forEach(function(n){if(n.slice(0,r)===t){var o=n.slice(r);Object.defineProperty(i,o,{get:function(){return e.getters[n]},enumerable:!0})}}),e._makeLocalGettersCache[t]=i}return e._makeLocalGettersCache[t]}function X(e,t,i,r){var n=e._mutations[t]||(e._mutations[t]=[]);n.push(function(a){i.call(e,r.state,a)})}function Y(e,t,i,r){var n=e._actions[t]||(e._actions[t]=[]);n.push(function(a){var s=i.call(e,{dispatch:r.dispatch,commit:r.commit,getters:r.getters,state:r.state,rootGetters:e.getters,rootState:e.state},a);return B(s)||(s=Promise.resolve(s)),e._devtoolHook?s.catch(function(f){throw e._devtoolHook.emit("vuex:error",f),f}):s})}function q(e,t,i,r){e._wrappedGetters[t]||(e._wrappedGetters[t]=function(o){return i(r.state,r.getters,o.state,o.getters)})}function z(e){w(function(){return e._state.data},function(){},{deep:!0,flush:"sync"})}function O(e,t){return t.reduce(function(i,r){return i[r]},e)}function y(e,t,i){return U(e)&&e.type&&(i=t,t=e,e=e.type),{type:e,payload:t,options:i}}var J="vuex bindings",A="vuex:mutations",E="vuex:actions",g="vuex",Q=0;function Z(e,t){H({id:"org.vuejs.vuex",app:e,label:"Vuex",homepage:"https://next.vuex.vuejs.org/",logo:"https://vuejs.org/images/icons/favicon-96x96.png",packageName:"vuex",componentStateTypes:[J]},function(i){i.addTimelineLayer({id:A,label:"Vuex Mutations",color:G}),i.addTimelineLayer({id:E,label:"Vuex Actions",color:G}),i.addInspector({id:g,label:"Vuex",icon:"storage",treeFilterPlaceholder:"Filter stores..."}),i.on.getInspectorTree(function(r){if(r.app===e&&r.inspectorId===g)if(r.filter){var n=[];D(n,t._modules.root,r.filter,""),r.rootNodes=n}else r.rootNodes=[N(t._modules.root,"")]}),i.on.getInspectorState(function(r){if(r.app===e&&r.inspectorId===g){var n=r.nodeId;T(t,n),r.state=rt(nt(t._modules,n),n==="root"?t.getters:t._makeLocalGettersCache,n)}}),i.on.editInspectorState(function(r){if(r.app===e&&r.inspectorId===g){var n=r.nodeId,o=r.path;n!=="root"&&(o=n.split("/").filter(Boolean).concat(o)),t._withCommit(function(){r.set(t._state.data,o,r.state.value)})}}),t.subscribe(function(r,n){var o={};r.payload&&(o.payload=r.payload),o.state=n,i.notifyComponentUpdate(),i.sendInspectorTree(g),i.sendInspectorState(g),i.addTimelineEvent({layerId:A,event:{time:Date.now(),title:r.type,data:o}})}),t.subscribeAction({before:function(r,n){var o={};r.payload&&(o.payload=r.payload),r._id=Q++,r._time=Date.now(),o.state=n,i.addTimelineEvent({layerId:E,event:{time:r._time,title:r.type,groupId:r._id,subtitle:"start",data:o}})},after:function(r,n){var o={},a=Date.now()-r._time;o.duration={_custom:{type:"duration",display:a+"ms",tooltip:"Action duration",value:a}},r.payload&&(o.payload=r.payload),o.state=n,i.addTimelineEvent({layerId:E,event:{time:Date.now(),title:r.type,groupId:r._id,subtitle:"end",data:o}})}})})}var G=8702998,tt=6710886,et=16777215,L={label:"namespaced",textColor:et,backgroundColor:tt};function $(e){return e&&e!=="root"?e.split("/").slice(-2,-1)[0]:"Root"}function N(e,t){return{id:t||"root",label:$(t),tags:e.namespaced?[L]:[],children:Object.keys(e._children).map(function(i){return N(e._children[i],t+i+"/")})}}function D(e,t,i,r){r.includes(i)&&e.push({id:r||"root",label:r.endsWith("/")?r.slice(0,r.length-1):r||"Root",tags:t.namespaced?[L]:[]}),Object.keys(t._children).forEach(function(n){D(e,t._children[n],i,r+n+"/")})}function rt(e,t,i){t=i==="root"?t:t[i];var r=Object.keys(t),n={state:Object.keys(e.state).map(function(a){return{key:a,editable:!0,value:e.state[a]}})};if(r.length){var o=it(t);n.getters=Object.keys(o).map(function(a){return{key:a.endsWith("/")?$(a):a,editable:!1,value:S(function(){return o[a]})}})}return n}function it(e){var t={};return Object.keys(e).forEach(function(i){var r=i.split("/");if(r.length>1){var n=t,o=r.pop();r.forEach(function(a){n[a]||(n[a]={_custom:{value:{},display:a,tooltip:"Module",abstract:!0}}),n=n[a]._custom.value}),n[o]=S(function(){return e[i]})}else t[i]=S(function(){return e[i]})}),t}function nt(e,t){var i=t.split("/").filter(function(r){return r});return i.reduce(function(r,n,o){var a=r[n];if(!a)throw new Error('Missing module "'+n+'" for path "'+t+'".');return o===i.length-1?a:a._children},t==="root"?e:e.root._children)}function S(e){try{return e()}catch(t){return t}}var v=function(t,i){this.runtime=i,this._children=Object.create(null),this._rawModule=t;var r=t.state;this.state=(typeof r=="function"?r():r)||{}},R={namespaced:{configurable:!0}};R.namespaced.get=function(){return!!this._rawModule.namespaced};v.prototype.addChild=function(t,i){this._children[t]=i};v.prototype.removeChild=function(t){delete this._children[t]};v.prototype.getChild=function(t){return this._children[t]};v.prototype.hasChild=function(t){return t in this._children};v.prototype.update=function(t){this._rawModule.namespaced=t.namespaced,t.actions&&(this._rawModule.actions=t.actions),t.mutations&&(this._rawModule.mutations=t.mutations),t.getters&&(this._rawModule.getters=t.getters)};v.prototype.forEachChild=function(t){_(this._children,t)};v.prototype.forEachGetter=function(t){this._rawModule.getters&&_(this._rawModule.getters,t)};v.prototype.forEachAction=function(t){this._rawModule.actions&&_(this._rawModule.actions,t)};v.prototype.forEachMutation=function(t){this._rawModule.mutations&&_(this._rawModule.mutations,t)};Object.defineProperties(v.prototype,R);var m=function(t){this.register([],t,!1)};m.prototype.get=function(t){return t.reduce(function(i,r){return i.getChild(r)},this.root)};m.prototype.getNamespace=function(t){var i=this.root;return t.reduce(function(r,n){return i=i.getChild(n),r+(i.namespaced?n+"/":"")},"")};m.prototype.update=function(t){P([],this.root,t)};m.prototype.register=function(t,i,r){var n=this;r===void 0&&(r=!0);var o=new v(i,r);if(t.length===0)this.root=o;else{var a=this.get(t.slice(0,-1));a.addChild(t[t.length-1],o)}i.modules&&_(i.modules,function(s,f){n.register(t.concat(f),s,r)})};m.prototype.unregister=function(t){var i=this.get(t.slice(0,-1)),r=t[t.length-1],n=i.getChild(r);!n||!n.runtime||i.removeChild(r)};m.prototype.isRegistered=function(t){var i=this.get(t.slice(0,-1)),r=t[t.length-1];return i?i.hasChild(r):!1};function P(e,t,i){if(t.update(i),i.modules)for(var r in i.modules){if(!t.getChild(r))return;P(e.concat(r),t.getChild(r),i.modules[r])}}function ct(e){return new p(e)}var p=function(t){var i=this;t===void 0&&(t={});var r=t.plugins;r===void 0&&(r=[]);var n=t.strict;n===void 0&&(n=!1);var o=t.devtools;this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new m(t),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._makeLocalGettersCache=Object.create(null),this._devtools=o;var a=this,s=this,f=s.dispatch,d=s.commit;this.dispatch=function(h,l){return f.call(a,h,l)},this.commit=function(h,l,k){return d.call(a,h,l,k)},this.strict=n;var c=this._modules.root.state;b(this,c,[],this._modules.root),C(this,c),r.forEach(function(u){return u(i)})},j={state:{configurable:!0}};p.prototype.install=function(t,i){t.provide(i||I,this),t.config.globalProperties.$store=this;var r=this._devtools!==void 0?this._devtools:!1;r&&Z(t,this)};j.state.get=function(){return this._state.data};j.state.set=function(e){};p.prototype.commit=function(t,i,r){var n=this,o=y(t,i,r),a=o.type,s=o.payload,f={type:a,payload:s},d=this._mutations[a];!d||(this._withCommit(function(){d.forEach(function(u){u(s)})}),this._subscribers.slice().forEach(function(c){return c(f,n.state)}))};p.prototype.dispatch=function(t,i){var r=this,n=y(t,i),o=n.type,a=n.payload,s={type:o,payload:a},f=this._actions[o];if(!!f){try{this._actionSubscribers.slice().filter(function(c){return c.before}).forEach(function(c){return c.before(s,r.state)})}catch{}var d=f.length>1?Promise.all(f.map(function(c){return c(a)})):f[0](a);return new Promise(function(c,u){d.then(function(h){try{r._actionSubscribers.filter(function(l){return l.after}).forEach(function(l){return l.after(s,r.state)})}catch{}c(h)},function(h){try{r._actionSubscribers.filter(function(l){return l.error}).forEach(function(l){return l.error(s,r.state,h)})}catch{}u(h)})})}};p.prototype.subscribe=function(t,i){return M(t,this._subscribers,i)};p.prototype.subscribeAction=function(t,i){var r=typeof t=="function"?{before:t}:t;return M(r,this._actionSubscribers,i)};p.prototype.watch=function(t,i,r){var n=this;return w(function(){return t(n.state,n.getters)},i,Object.assign({},r))};p.prototype.replaceState=function(t){var i=this;this._withCommit(function(){i._state.data=t})};p.prototype.registerModule=function(t,i,r){r===void 0&&(r={}),typeof t=="string"&&(t=[t]),this._modules.register(t,i),b(this,this.state,t,this._modules.get(t),r.preserveState),C(this,this.state)};p.prototype.unregisterModule=function(t){var i=this;typeof t=="string"&&(t=[t]),this._modules.unregister(t),this._withCommit(function(){var r=O(i.state,t.slice(0,-1));delete r[t[t.length-1]]}),x(this)};p.prototype.hasModule=function(t){return typeof t=="string"&&(t=[t]),this._modules.isRegistered(t)};p.prototype.hotUpdate=function(t){this._modules.update(t),x(this,!0)};p.prototype._withCommit=function(t){var i=this._committing;this._committing=!0,t(),this._committing=i};Object.defineProperties(p.prototype,j);export{ct as c,at as u};
