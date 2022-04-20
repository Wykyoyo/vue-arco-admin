import{W as F,r as V,X as E,g as H,i as K,w as Q,a as $,R as I,Y as W,Z as G,h as T,z as M,v as tt,c as et}from"./@vue.d477cf44.js";var st=!1;/*!
  * pinia v2.0.12
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */let z;const O=t=>z=t,B=Symbol();function x(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var k;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(k||(k={}));function at(){const t=F(!0),u=t.run(()=>V({}));let s=[],e=[];const o=E({install(r){O(o),o._a=r,r.provide(B,o),r.config.globalProperties.$pinia=o,e.forEach(l=>s.push(l)),e=[]},use(r){return!this._a&&!st?e.push(r):s.push(r),this},_p:s,_a:null,_e:t,_s:new Map,state:u});return o}const J=()=>{};function A(t,u,s,e=J){t.push(u);const o=()=>{const r=t.indexOf(u);r>-1&&(t.splice(r,1),e())};return!s&&H()&&T(o),o}function _(t,...u){t.slice().forEach(s=>{s(...u)})}function C(t,u){for(const s in u){const e=u[s],o=t[s];x(o)&&x(e)&&!I(e)&&!W(e)?t[s]=C(o,e):t[s]=e}return t}const nt=Symbol();function ot(t){return!x(t)||!t.hasOwnProperty(nt)}const{assign:h}=Object;function ct(t){return!!(I(t)&&t.effect)}function rt(t,u,s,e){const{state:o,actions:r,getters:l}=u,a=s.state.value[t];let S;function b(){a||(s.state.value[t]=o?o():{});const y=tt(s.state.value[t]);return h(y,r,Object.keys(l||{}).reduce((v,p)=>(v[p]=E(et(()=>{O(s);const d=s._s.get(t);return l[p].call(d,d)})),v),{}))}return S=N(t,b,u,s),S.$reset=function(){const v=o?o():{};this.$patch(p=>{h(p,v)})},S}function N(t,u,s={},e,o){let r;const l=s.state,a=h({actions:{}},s),S={deep:!0};let b,y,v=E([]),p=E([]),d;const g=e.state.value[t];!l&&!g&&(e.state.value[t]={}),V({});function L(c){let n;b=y=!1,typeof c=="function"?(c(e.state.value[t]),n={type:k.patchFunction,storeId:t,events:d}):(C(e.state.value[t],c),n={type:k.patchObject,payload:c,storeId:t,events:d}),M().then(()=>{b=!0}),y=!0,_(v,n,e.state.value[t])}const U=J;function X(){r.stop(),v=[],p=[],e._s.delete(t)}function Y(c,n){return function(){O(e);const m=Array.from(arguments),P=[],w=[];function q(f){P.push(f)}function D(f){w.push(f)}_(p,{args:m,name:c,store:i,after:q,onError:D});let R;try{R=n.apply(this&&this.$id===t?this:i,m)}catch(f){throw _(w,f),f}return R instanceof Promise?R.then(f=>(_(P,f),f)).catch(f=>(_(w,f),Promise.reject(f))):(_(P,R),R)}}const Z={_p:e,$id:t,$onAction:A.bind(null,p),$patch:L,$reset:U,$subscribe(c,n={}){const m=A(v,c,n.detached,()=>P()),P=r.run(()=>Q(()=>e.state.value[t],w=>{(n.flush==="sync"?y:b)&&c({storeId:t,type:k.direct,events:d},w)},h({},S,n)));return m},$dispose:X},i=$(h({},Z));e._s.set(t,i);const j=e._e.run(()=>(r=F(),r.run(()=>u())));for(const c in j){const n=j[c];if(I(n)&&!ct(n)||W(n))l||(g&&ot(n)&&(I(n)?n.value=g[c]:C(n,g[c])),e.state.value[t][c]=n);else if(typeof n=="function"){const m=Y(c,n);j[c]=m,a.actions[c]=n}}return h(i,j),h(G(i),j),Object.defineProperty(i,"$state",{get:()=>e.state.value[t],set:c=>{L(n=>{h(n,c)})}}),e._p.forEach(c=>{h(i,r.run(()=>c({store:i,app:e._a,pinia:e,options:a})))}),g&&l&&s.hydrate&&s.hydrate(i.$state,g),b=!0,y=!0,i}function ft(t,u,s){let e,o;const r=typeof u=="function";typeof t=="string"?(e=t,o=r?s:u):(o=t,e=t.id);function l(a,S){const b=H();return a=a||b&&K(B),a&&O(a),a=z,a._s.has(e)||(r?N(e,u,o,a):rt(e,o,a)),a._s.get(e)}return l.$id=e,l}export{at as c,ft as d};