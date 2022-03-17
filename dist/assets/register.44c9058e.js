import{u as k}from"./vue-router.f2cb4f5d.js";import{B as L}from"./bg.7c5d3359.js";import{F as g,I as C,B as x,R as N,h as D,C as T,D as U}from"./@arco-design.bf2d84a3.js";import{f as w,r as A,a as S,j as f,k as E,s as h,B as o,d as l,ac as e,y as F,L as b,p as r,m as R}from"./@vue.b44b92d2.js";import"./b-validate.79bb21bc.js";import"./lodash.isequal.2aa59b76.js";import"./axios.b6599a80.js";import"./resize-observer-polyfill.8deb1e21.js";import"./scroll-into-view-if-needed.5191fdbf.js";import"./compute-scroll-into-view.6058b3be.js";import"./number-precision.08b8c2db.js";const W={class:"mt-25px"},Z=r("svg",{class:"icon","aria-hidden":"true"},[r("use",{"xlink:href":"#icon-mobile"})],-1),G=r("svg",{class:"icon","aria-hidden":"true"},[r("use",{"xlink:href":"#icon-safetycertificate-f"})],-1),M=F(" \u4E0B\u4E00\u6B65 "),q=r("svg",{class:"icon","aria-hidden":"true"},[r("use",{"xlink:href":"#icon-user"})],-1),H=r("svg",{class:"icon","aria-hidden":"true"},[r("use",{"xlink:href":"#icon-lock-fill"})],-1),J=r("svg",{class:"icon","aria-hidden":"true"},[r("use",{"xlink:href":"#icon-lock-fill"})],-1),K=F(" \u5FEB\u901F\u6CE8\u518C "),O=r("div",null,"\u6CE8\u518C\u6210\u529F!",-1),Q=w({props:{currentStep:{default:1}},emits:["click-next"],setup(_,{emit:n}){const d=k(),i=g.Item,{Password:p}=C,c=A(),B=A(),m=/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,t=S({formSms:{mobile:"",smscode:""},getSms:{text:"\u83B7\u53D6\u9A8C\u8BC1\u7801",disabled:!1},formAccount:{username:"",password:"",confirmPassword:""},jumpLoginTime:5}),v=()=>{c.value.validateField("mobile",s=>{if(s===void 0){t.getSms.disabled=!0;let u=60;t.getSms.text=`${u} \u79D2\u540E\u91CD\u65B0\u83B7\u53D6`;const a=setInterval(()=>{u-=1,u<=0?(clearInterval(a),t.getSms.disabled=!1,t.getSms.text="\u91CD\u65B0\u83B7\u53D6\u9A8C\u8BC1\u7801"):t.getSms.text=`${u} \u79D2\u540E\u91CD\u65B0\u83B7\u53D6`},1e3)}})},$=()=>{c.value.validate(s=>{s===void 0&&n("click-next",2)})},V=()=>{B.value.validate(s=>{if(s===void 0){n("click-next",3);const u=setInterval(()=>{t.jumpLoginTime-=1,t.jumpLoginTime<=0&&(clearInterval(u),d.push("/login"))},1e3)}})},y=()=>{d.push("/login")},z=[{validator:(s,u)=>{(s!=null?s:"")===""&&u("\u8BF7\u8F93\u5165\u624B\u673A\u53F7")}}],P=[{validator:(s,u)=>{(s!=null?s:"")===""&&u("\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801")}}],I=[{validator:(s,u)=>{(s!=null?s:"")===""?u("\u8BF7\u8F93\u5165\u5BC6\u7801"):t.formAccount.confirmPassword&&t.formAccount.confirmPassword!==s?u("\u5BC6\u7801\u8DDF\u786E\u8BA4\u5BC6\u7801\u4E0D\u4E00\u81F4"):m.test(s)?s.length<8&&u("\u5BC6\u7801\u957F\u5EA6\u6700\u5C118\u4F4D"):u("\u201C\u5927\u5199\u5B57\u6BCD\uFF0C\u5C0F\u5199\u5B57\u6BCD\uFF0C\u6570\u5B57\uFF0C\u7279\u6B8A\u5B57\u7B26\u201D\u56DB\u9879\u4E2D\u7684\u81F3\u5C11\u4E09\u9879")}}],j=[{validator:(s,u)=>{(s!=null?s:"")===""?u("\u8BF7\u518D\u6B21\u786E\u8BA4\u5BC6\u7801"):t.formAccount.password&&t.formAccount.password!==s?u("\u5BC6\u7801\u8DDF\u786E\u8BA4\u5BC6\u7801\u4E0D\u4E00\u81F4"):m.test(s)?s.length<8&&u("\u5BC6\u7801\u957F\u5EA6\u6700\u5C118\u4F4D"):u("\u201C\u5927\u5199\u5B57\u6BCD\uFF0C\u5C0F\u5199\u5B57\u6BCD\uFF0C\u6570\u5B57\uFF0C\u7279\u6B8A\u5B57\u7B26\u201D\u56DB\u9879\u4E2D\u7684\u81F3\u5C11\u4E09\u9879")}}];return(s,u)=>(f(),E("div",W,[_.currentStep===1?(f(),h(e(g),{key:0,model:e(t).formSms,class:"!w-full !sm:max-w-380px",ref_key:"refFormSms",ref:c},{default:o(()=>[l(e(i),{field:"mobile","hide-label":"",rules:z,"validate-trigger":"blur"},{default:o(()=>[l(e(C),{placeholder:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7",modelValue:e(t).formSms.mobile,"onUpdate:modelValue":u[0]||(u[0]=a=>e(t).formSms.mobile=a),size:"large"},{prefix:o(()=>[Z]),_:1},8,["modelValue"])]),_:1}),l(e(i),{field:"smscode","hide-label":"",rules:P,"validate-trigger":"blur"},{default:o(()=>[l(e(C),{placeholder:"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801",modelValue:e(t).formSms.smscode,"onUpdate:modelValue":u[1]||(u[1]=a=>e(t).formSms.smscode=a),size:"large","invisible-button":!1},{prefix:o(()=>[G]),_:1},8,["modelValue"]),l(e(x),{size:"large",type:"outline",class:"w-250px ml-10px",disabled:e(t).getSms.disabled,onClick:v},{default:o(()=>[F(b(e(t).getSms.text),1)]),_:1},8,["disabled"])]),_:1}),l(e(i),{"hide-label":""},{default:o(()=>[l(e(x),{class:"w-full",type:"primary",size:"large",onClick:$},{default:o(()=>[M]),_:1})]),_:1})]),_:1},8,["model"])):_.currentStep===2?(f(),h(e(g),{key:1,model:e(t).formAccount,class:"!w-full !sm:max-w-380px",ref_key:"refFormAccount",ref:B},{default:o(()=>[l(e(i),{field:"username","hide-label":""},{default:o(()=>[l(e(C),{placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",modelValue:e(t).formAccount.username,"onUpdate:modelValue":u[2]||(u[2]=a=>e(t).formAccount.username=a),size:"large"},{prefix:o(()=>[q]),_:1},8,["modelValue"])]),_:1}),l(e(i),{field:"password","hide-label":"",rules:I,"validate-trigger":"blur"},{default:o(()=>[l(e(p),{placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",modelValue:e(t).formAccount.password,"onUpdate:modelValue":u[3]||(u[3]=a=>e(t).formAccount.password=a),size:"large"},{prefix:o(()=>[H]),_:1},8,["modelValue"])]),_:1}),l(e(i),{field:"confirmPassword","hide-label":"",rules:j,"validate-trigger":"blur"},{default:o(()=>[l(e(p),{placeholder:"\u8BF7\u518D\u6B21\u786E\u8BA4\u5BC6\u7801",modelValue:e(t).formAccount.confirmPassword,"onUpdate:modelValue":u[4]||(u[4]=a=>e(t).formAccount.confirmPassword=a),size:"large"},{prefix:o(()=>[J]),_:1},8,["modelValue"])]),_:1}),l(e(i),{"hide-label":""},{default:o(()=>[l(e(x),{class:"w-full",type:"primary",size:"large",onClick:V},{default:o(()=>[K]),_:1})]),_:1})]),_:1},8,["model"])):(f(),h(e(N),{key:2,status:"success"},{subtitle:o(()=>[O,r("div",null,[F(b(e(t).jumpLoginTime)+"s\u540E\u81EA\u52A8\u8DF3\u8F6C\u5230 ",1),r("a",{class:"text-[#3C7EFF] cursor-pointer",onClick:y}," \u767B\u5F55\u9875 ")])]),_:1}))]))}}),X={class:"flex flex-col items-center"},Y=r("div",{class:"mt-24px text-size-24px font-600"},[r("span",null,"\u6CE8\u518C\u7528\u6237")],-1),ee={class:"mt-45px"},ue=r("span",{class:"w-55px block"},"1",-1),se=r("span",{class:"w-55px block"},"2",-1),te=r("span",{class:"w-55px block"},"3",-1),oe={class:"login_footer select-none"},Ce=w({setup(_){const{Step:n}=D,d=k(),i=S({currentStep:1}),p=m=>{i.currentStep=m},c=()=>{d.push("/login")},B=()=>{d.push("/forgot")};return(m,t)=>(f(),E("div",{style:R(`background-image: url(${e(L)})`),class:"min-h-100vh flex items-center justify-center dark:bg-[#232324]"},[l(e(T),{class:"w-450px h-650px select-none bg-[#00000000] border-0px sm:bg-[var(--color-bg-2)] sm:border-1px sm:shadow-xl"},{default:o(()=>[r("div",X,[Y,r("div",ee,[l(e(D),{current:e(i).currentStep,type:"arrow",small:!0},{default:o(()=>[l(e(n),null,{default:o(()=>[ue]),_:1}),l(e(n),null,{default:o(()=>[se]),_:1}),l(e(n),null,{default:o(()=>[te]),_:1})]),_:1},8,["current"])]),l(Q,{"current-step":e(i).currentStep,onClickNext:p},null,8,["current-step"]),r("div",oe,[r("a",{class:"cursor-pointer text-[#4080FF]",onClick:c}," \u767B\u5F55 "),l(e(U),{direction:"vertical"}),r("a",{class:"cursor-pointer text-[#4080FF]",onClick:B}," \u5FD8\u8BB0\u5BC6\u7801 ")])])]),_:1})],4))}});export{Ce as default};
