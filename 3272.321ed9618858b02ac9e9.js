"use strict";(self.webpackChunknetflix=self.webpackChunknetflix||[]).push([[3272],{3272:(O,c,e)=>{e.r(c),e.d(c,{createSwipeBackGesture:()=>_});var h=e(2377),E=e(9461);e(960);const _=(a,D,M,m,g)=>{const r=a.ownerDocument.defaultView;return(0,E.createGesture)({el:a,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:t=>t.startX<=50&&D(),onStart:M,onMove:t=>{m(t.deltaX/r.innerWidth)},onEnd:t=>{const s=r.innerWidth,n=t.deltaX/s,o=t.velocityX,l=o>=0&&(o>.2||t.deltaX>s/2),d=(l?1-n:n)*s;let u=0;if(d>5){const C=d/Math.abs(o);u=Math.min(C,540)}g(l,n<=0?.01:(0,h.j)(0,n,.9999),u)}})}}}]);