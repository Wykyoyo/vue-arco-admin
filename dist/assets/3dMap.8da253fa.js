import{g as m}from"./utils.25ddbb72.js";import{u as f,e as p,c as d,d as h,r as g}from"./echarts.84531849.js";import{f as u,a as _,a9 as b,o as w,z as y,h as C,j as z,k as O,p as v}from"./@vue.d477cf44.js";import"./tslib.60310f1a.js";import"./zrender.07183df1.js";const x={class:"h-full px-0 py-0"},E=v("div",{id:"map_echar",class:"w-full h-full"},null,-1),S=[E],X=u({setup(B){f([p,d]);const s=_({geoJson:null}),t=b({echarts:[]}),n=()=>{const o=document.getElementById("map_echar");if(o){const a=h(o);t.echarts.push(a),g("map",s.geoJson);const r="map",i={geo:{map:r,zoom:1,roam:!0,animation:!1,itemStyle:{areaColor:{type:"radial",x:.5,y:.5,r:.8,colorStops:[{offset:0,color:"rgba(147, 235, 248, 1)"},{offset:1,color:"rgba(2, 99, 206, 1)"}],globalCoord:!1},shadowColor:"#105781",shadowOffsetX:0,shadowOffsetY:10}},series:[{name:"map",type:"map",map:r,selectedMode:!1,roam:!0,label:{show:!0,color:"#000a3c"},animation:!1,zlevel:1,itemStyle:{areaColor:{type:"radial",x:.5,y:.5,r:3,colorStops:[{offset:0,color:"rgba(223, 231, 242, 1)"},{offset:1,color:"rgba(2, 99, 206, 1)"}]},borderWidth:1,borderColor:"rgba(104, 152, 190, 1)",shadowColor:"rgba(128, 217, 248, 1)",shadowOffsetX:-2,shadowOffsetY:2,shadowBlur:10},emphasis:{label:{color:"#ffffff"},itemStyle:{areaColor:"#a5d4fe"}}}]};a.setOption(i),a.on("georoam",l=>{const e=a.getOption();l.zoom!=null&&l.zoom!==void 0&&(e.geo[0].zoom=e.series[0].zoom),e.geo[0].center=e.series[0].center,a.setOption(e)})}},c=()=>{m(1e5).then(o=>{s.geoJson=o,n()})};return w(()=>{y(()=>{c()})}),C(()=>{t.echarts.forEach(o=>{o.dispose()})}),(o,a)=>(z(),O("div",x,S))}});export{X as default};