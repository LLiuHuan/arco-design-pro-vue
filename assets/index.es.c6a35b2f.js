function r(r,t){return void 0===t&&(t=15),+parseFloat(Number(r).toPrecision(t))}function t(r){var t=r.toString().split(/[eE]/),n=(t[0].split(".")[1]||"").length-+(t[1]||0);return n>0?n:0}function n(n){if(-1===n.toString().indexOf("e"))return Number(n.toString().replace(".",""));var e=t(n);return e>0?r(Number(n)*Math.pow(10,e)):Number(n)}function e(r){a&&(r>Number.MAX_SAFE_INTEGER||Number.MIN_SAFE_INTEGER)}function i(r,t){var n=r[0],e=r[1],i=r.slice(2),u=t(n,e);return i.forEach((function(r){u=t(u,r)})),u}function u(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];if(r.length>2)return i(r,u);var a=r[0],f=r[1],h=n(a),c=n(f),l=t(a)+t(f),v=h*c;return e(v),v/Math.pow(10,l)}function o(){for(var a=[],f=0;f<arguments.length;f++)a[f]=arguments[f];if(a.length>2)return i(a,o);var h=a[0],c=a[1],l=n(h),v=n(c);return e(l),e(v),u(l/v,r(Math.pow(10,t(c)-t(h))))}var a=!0;var f={strip:r,plus:function r(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];if(n.length>2)return i(n,r);var o=n[0],a=n[1],f=Math.pow(10,Math.max(t(o),t(a)));return(u(o,f)+u(a,f))/f},minus:function r(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];if(n.length>2)return i(n,r);var o=n[0],a=n[1],f=Math.pow(10,Math.max(t(o),t(a)));return(u(o,f)-u(a,f))/f},times:u,divide:o,round:function(r,t){var n=Math.pow(10,t),e=o(Math.round(Math.abs(u(r,n))),n);return r<0&&0!==e&&(e=u(e,-1)),e},digitLength:t,float2Fixed:n,enableBoundaryChecking:function(r){void 0===r&&(r=!0),a=r}};export{f as i};