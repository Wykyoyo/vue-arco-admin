import{g as f}from"./utils.25ddbb72.js";import{a as _}from"./axios.af5183e7.js";import{u as F,e as b,c as h,a as E,f as C,i as B,d as g,r as v}from"./echarts.44ce2e7e.js";import{f as A,a as D,o as k,z as N,j as x,k as w,p as y}from"./@vue.b44b92d2.js";import"./axios.b6599a80.js";import"./index.e4165236.js";import"./pinia.7e145a7d.js";import"./vue-router.f2cb4f5d.js";import"./@arco-design.bf2d84a3.js";import"./b-validate.79bb21bc.js";import"./lodash.isequal.2aa59b76.js";import"./resize-observer-polyfill.8deb1e21.js";import"./scroll-into-view-if-needed.5191fdbf.js";import"./compute-scroll-into-view.6058b3be.js";import"./number-precision.08b8c2db.js";import"./lodash-es.2f4ef74c.js";import"./mockjs.8476dd54.js";import"./tslib.60310f1a.js";import"./zrender.49897614.js";const M=c=>_.post("/home/getMapData",c);const J={class:"h-full px-0 py-0"},$=y("div",{id:"map_echar",class:"w-full h-full"},null,-1),z=[$],ea=A({setup(c){F([b,h,E,C,B]);const u=D({geoJson:null,mapData:[]}),p=(o,r,t,s)=>{const a=document.getElementById("map_echar");if(a){const m=g(a);v("map",u.geoJson);const n="map",d={grid:{left:"0%",top:"0%",right:"0%",bottom:"0%"},tooltip:{trigger:"item",formatter:e=>`
                        <div class="map_tooltip">
                            <div class="map_tooltip_content_item">
                                <span class="content_item_point" style="color:#1AFFBF;">\u25CF</span>
                                <span class="content_item_name">\u6B63\u5E38\u6570\u636E</span>
                                <span class="content_item_value">${e.data.count.normalNumber}</span>
                            </div>
                            <div class="map_tooltip_content_item">
                                <span class="content_item_point" style="color:#FF6132;">\u25CF</span>
                                <span class="content_item_name">\u7F3A\u9677\u6570\u636E</span>
                                <span class="content_item_value">${e.data.count.abnormalNumber}</span>
                            </div>
                        </div>
                    `,backgroundColor:"rgba(0, 0, 0, 0.65)",borderColor:"rgba(0, 0, 0, 0.65)"},geo:{map:n,zoom:1,roam:!0,center:[104.37,35.52],label:{normal:{show:!0,color:"#ffffff",formatter:e=>{switch(e.name){case"\u5185\u8499\u53E4\u81EA\u6CBB\u533A":e.name="\u5185\u8499\u53E4";break;case"\u897F\u85CF\u81EA\u6CBB\u533A":e.name="\u897F\u85CF";break;case"\u65B0\u7586\u7EF4\u543E\u5C14\u81EA\u6CBB\u533A":e.name="\u65B0\u7586";break;case"\u5B81\u590F\u56DE\u65CF\u81EA\u6CBB\u533A":e.name="\u5B81\u590F";break;case"\u5E7F\u897F\u58EE\u65CF\u81EA\u6CBB\u533A":e.name="\u5E7F\u897F";break;case"\u9999\u6E2F\u7279\u522B\u884C\u653F\u533A":e.name="\u9999\u6E2F";break;case"\u6FB3\u95E8\u7279\u522B\u884C\u653F\u533A":e.name="\u6FB3\u95E8";break}return e.name}},emphasis:{show:!0,color:"#ffffff"}},itemStyle:{normal:{areaColor:"#24CFF4",borderColor:"#53D9FF",borderWidth:1.3,shadowBlur:15,shadowColor:"rgb(58,115,192)",shadowOffsetX:7,shadowOffsetY:6},emphasis:{areaColor:"#8dd7fc",borderWidth:1.6,shadowBlur:25}}},visualMap:{min:t,max:s,left:"1%",bottom:"10%",calculable:!0,seriesIndex:[0],inRange:{color:["#24CFF4","#2E98CA","#1E62AC"]},textStyle:{color:"#24CFF4"}},series:[{name:"\u5730\u56FE",type:"map",geoIndex:0,map:n,roam:!0,zoom:1.3,selectedMode:!1,data:o}]};m.setOption(d)}},i=()=>{f(1e5).then(o=>{const r=o.features.map(t=>({name:t.properties.name,adcode:t.properties.adcode,center:t.properties.center,normalNumber:0,abnormalNumber:0}));M(r).then(t=>{const{code:s,data:a}=t;if(s===200){const{mapData:m}=a;u.mapData=m}u.geoJson=o,l()}).catch(()=>{u.geoJson=o,l()})})},l=()=>{let o=0,r=1;const t=[],s=[];u.mapData.forEach((a,m)=>{const n=a.normalNumber+a.abnormalNumber;m===0&&(o=n,r=n),n<o?o=n:n>r&&(r=n),t.push({name:a.name,value:n,adcode:a.adcode,count:{normalNumber:a.normalNumber,abnormalNumber:a.abnormalNumber}}),a.center&&s.push({name:a.name,value:[a.center[0],a.center[1],a.normalNumber],adcode:a.adcode})}),p(t,s,o,r)};return k(()=>{N(()=>{i()})}),(o,r)=>(x(),w("div",J,z))}});export{ea as default};
