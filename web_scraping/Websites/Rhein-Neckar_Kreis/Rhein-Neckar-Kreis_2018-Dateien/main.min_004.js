!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("@fullcalendar/core")):"function"==typeof define&&define.amd?define(["exports","@fullcalendar/core"],t):t((e=e||self).SSTFullCalendarDayGrid={},e.SSTFullCalendar)}(this,function(e,D){"use strict";var s=function(e,t){return(s=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(e,t){e.__proto__=t}:function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])}))(e,t)};function t(e,t){function r(){this.constructor=e}s(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}var r,n,i,c=function(){return(c=Object.assign||function(e){for(var t,r=1,s=arguments.length;r<s;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},o=(t(u,i=D.DateProfileGenerator),u.prototype.buildRenderRange=function(e,t,r){var s=this.dateEnv,e=i.prototype.buildRenderRange.call(this,e,t,r),r=e.start,e=e.end;return/^(year|month)$/.test(t)&&(r=s.startOfWeek(r),(t=s.startOfWeek(e)).valueOf()!==e.valueOf())&&(e=D.addWeeks(t,1)),this.options.monthMode&&this.options.fixedWeekCount&&(s=Math.ceil(D.diffWeeks(r,e)),e=D.addWeeks(e,6-s)),{start:r,end:e}},u),B=(p.prototype.show=function(){this.isHidden&&(this.el||this.render(),this.el.style.display="",this.position(),this.isHidden=!1,this.trigger("show"))},p.prototype.hide=function(){this.isHidden||(this.el.style.display="none",this.isHidden=!0,this.trigger("hide"))},p.prototype.render=function(){var t=this,e=this.options,r=this.el=D.createElement("div",{className:"sstfc-popover "+(e.className||""),style:{top:"0",left:"0"}});"function"==typeof e.content&&e.content(r),e.parentEl.appendChild(r),D.listenBySelector(r,"click",".sstfc-close",function(e){t.hide()}),e.autoHide&&document.addEventListener("mousedown",this.documentMousedown)},p.prototype.destroy=function(){this.hide(),this.el&&(D.removeElement(this.el),this.el=null),document.removeEventListener("mousedown",this.documentMousedown)},p.prototype.position=function(){var e=this.options,t=this.el,r=t.getBoundingClientRect(),s=D.computeRect(t.offsetParent),n=D.computeClippingRect(e.parentEl),i=e.top||0,e=void 0!==e.left?e.left:void 0!==e.right?e.right-r.width:0;i=Math.min(i,n.bottom-r.height-this.margin),i=Math.max(i,n.top+this.margin),e=Math.min(e,n.right-r.width-this.margin),e=Math.max(e,n.left+this.margin),D.applyStyle(t,{top:i-s.top,left:e-s.left})},p.prototype.trigger=function(e){this.options[e]&&this.options[e].apply(this,Array.prototype.slice.call(arguments,1))},p),l=(t(h,n=D.FgEventRenderer),h.prototype.renderSegHtml=function(e,t){var r=this.context,s=r.view,r=r.options,n=e.eventRange,i=n.def,o=n.ui,l=i.allDay,a=s.computeEventDraggable(i,o),d=l&&e.isStart&&s.computeEventStartResizable(i,o),l=l&&e.isEnd&&s.computeEventEndResizable(i,o),s=this.getSegClasses(e,a,d||l,t),a=D.cssToStr(this.getSkinCss(o)),t="";return s.unshift("sstfc-day-grid-event","sstfc-h-event"),e.isStart&&(o=this.getTimeText(n))&&(t='<span class="sstfc-time">'+D.htmlEscape(o)+"</span>"),e='<span class="sstfc-title">'+(D.htmlEscape(i.title||"")||"&nbsp;")+"</span>",'<a class="'+s.join(" ")+'"'+(i.url?' href="'+D.htmlEscape(i.url)+'"':"")+(a?' style="'+a+'"':"")+'><div class="sstfc-content">'+("rtl"===r.dir?e+" "+t:t+" "+e)+"</div>"+(d?'<div class="sstfc-resizer sstfc-start-resizer"></div>':"")+(l?'<div class="sstfc-resizer sstfc-end-resizer"></div>':"")+"</a>"},h.prototype.computeEventTimeFormat=function(){return{hour:"numeric",minute:"2-digit",omitZeroMinute:!0,meridiem:"narrow"}},h.prototype.computeDisplayEventEnd=function(){return!1},h),a=(t(d,r=l),d.prototype.attachSegs=function(e,t){var r=this.rowStructs=this.renderSegRows(e);this.dayGrid.rowEls.forEach(function(e,t){e.querySelector(".sstfc-content-skeleton > table").appendChild(r[t].tbodyEl)}),t||this.dayGrid.removeSegPopover()},d.prototype.detachSegs=function(){for(var e,t=this.rowStructs||[];e=t.pop();)D.removeElement(e.tbodyEl);this.rowStructs=null},d.prototype.renderSegRows=function(e){for(var t=[],r=this.groupSegRows(e),s=0;s<r.length;s++)t.push(this.renderSegRow(s,r[s]));return t},d.prototype.renderSegRow=function(e,t){var r,s,n,i,o,l,a=this.dayGrid,d=a.colCnt,c=a.isRtl,h=this.buildSegLevels(t),p=Math.max(1,h.length),u=document.createElement("tbody"),f=[],g=[],m=[];function y(e){for(;n<e;)(l=(m[r-1]||[])[n])?l.rowSpan=(l.rowSpan||1)+1:(l=document.createElement("td"),i.appendChild(l)),g[r][n]=l,m[r][n]=l,n++}for(r=0;r<p;r++){if(s=h[r],n=0,i=document.createElement("tr"),f.push([]),g.push([]),m.push([]),s)for(o=0;o<s.length;o++){var v=s[o],b=c?d-1-v.lastCol:v.firstCol,w=c?d-1-v.firstCol:v.lastCol;for(y(b),l=D.createElement("td",{className:"sstfc-event-container"},v.el),b!==w?l.colSpan=w-b+1:m[r][n]=l;n<=w;)g[r][n]=l,f[r][n]=v,n++;i.appendChild(l)}y(d);var S=a.renderProps.renderIntroHtml();S&&(a.isRtl?D.appendToElement(i,S):D.prependToElement(i,S)),u.appendChild(i)}return{row:e,tbodyEl:u,cellMatrix:g,segMatrix:f,segLevels:h,segs:t}},d.prototype.buildSegLevels=function(e){var t,r,s,n=this.dayGrid,i=n.isRtl,o=n.colCnt,l=[];for(e=this.sortEventSegs(e),t=0;t<e.length;t++){for(r=e[t],s=0;s<l.length&&function(e,t){var r,s;for(r=0;r<t.length;r++)if((s=t[r]).firstCol<=e.lastCol&&s.lastCol>=e.firstCol)return 1;return}(r,l[s]);s++);r.level=s,r.leftCol=i?o-1-r.lastCol:r.firstCol,r.rightCol=i?o-1-r.firstCol:r.lastCol,(l[s]||(l[s]=[])).push(r)}for(s=0;s<l.length;s++)l[s].sort(M);return l},d.prototype.groupSegRows=function(e){for(var t=[],r=0;r<this.dayGrid.rowCnt;r++)t.push([]);for(r=0;r<e.length;r++)t[e[r].row].push(e[r]);return t},d.prototype.computeDisplayEventEnd=function(){return 1===this.dayGrid.colCnt},d);function d(e){var t=r.call(this,e.context)||this;return t.dayGrid=e,t}function h(){return null!==n&&n.apply(this,arguments)||this}function p(e){var t=this;this.isHidden=!0,this.margin=10,this.documentMousedown=function(e){t.el&&!t.el.contains(e.target)&&t.hide()},this.options=e}function u(){return null!==i&&i.apply(this,arguments)||this}function M(e,t){return e.leftCol-t.leftCol}t(E,y=a),E.prototype.attachSegs=function(e,t){var n=t.sourceSeg,i=this.rowStructs=this.renderSegRows(e);this.dayGrid.rowEls.forEach(function(e,t){var r=D.htmlToElement('<div class="sstfc-mirror-skeleton"><table></table></div>'),s=n&&n.row===t?n.el:(s=e.querySelector(".sstfc-content-skeleton tbody"))||e.querySelector(".sstfc-content-skeleton table"),s=s.getBoundingClientRect().top-e.getBoundingClientRect().top;r.style.top=s+"px",r.querySelector("table").appendChild(i[t].tbodyEl),e.appendChild(r)})};var f,g,m,y,W=E,V=(t(C,m=D.FillRenderer),C.prototype.renderSegs=function(e,t){"bgEvent"===e&&(t=t.filter(function(e){return e.eventRange.def.allDay})),m.prototype.renderSegs.call(this,e,t)},C.prototype.attachSegs=function(e,t){for(var r,s,n=[],i=0;i<t.length;i++)r=t[i],s=this.renderFillRow(e,r),this.dayGrid.rowEls[r.row].appendChild(s),n.push(s);return n},C.prototype.renderFillRow=function(e,t){var r=this.dayGrid,s=r.colCnt,n=r.isRtl,i=n?s-1-t.lastCol:t.firstCol,n=(n?s-1-t.firstCol:t.lastCol)+1,e="businessHours"===e?"bgevent":e.toLowerCase(),o=(e=D.htmlToElement('<div class="sstfc-'+e+'-skeleton"><table><tr></tr></table></div>')).getElementsByTagName("tr")[0],i=(0<i&&D.appendToElement(o,new Array(i+1).join('<td style="pointer-events:none"></td>')),t.el.colSpan=n-i,o.appendChild(t.el),n<s&&D.appendToElement(o,new Array(s-n+1).join('<td style="pointer-events:none"></td>')),r.renderProps.renderIntroHtml());return i&&(r.isRtl?D.appendToElement(o,i):D.prependToElement(o,i)),e},C),_=(t(S,g=D.DateComponent),S.prototype.render=function(e){this.renderFrame(e.date),this.renderFgEvents(e.fgSegs),this.renderEventSelection(e.eventSelection),this.renderEventDrag(e.eventDragInstances),this.renderEventResize(e.eventResizeInstances)},S.prototype.destroy=function(){g.prototype.destroy.call(this),this.renderFrame.unrender(),this.calendar.unregisterInteractiveComponent(this)},S.prototype._renderFrame=function(e){var t=this.theme,e=this.dateEnv.format(e,D.createFormatter(this.opt("dayPopoverFormat")));this.el.innerHTML='<div class="sstfc-header '+t.getClass("popoverHeader")+'"><span class="sstfc-title">'+D.htmlEscape(e)+'</span><span class="sstfc-close '+t.getIconClass("close")+'"></span></div><div class="sstfc-body '+t.getClass("popoverContent")+'"><div class="sstfc-event-container"></div></div>',this.segContainerEl=this.el.querySelector(".sstfc-event-container")},S.prototype.queryHit=function(e,t,r,s){var n=this.props.date;if(e<r&&t<s)return{component:this,dateSpan:{allDay:!0,range:{start:n,end:D.addDays(n,1)}},dayEl:this.el,rect:{left:0,top:0,right:r,bottom:s},layer:1}},S),F=(t(w,f=l),w.prototype.attachSegs=function(e){for(var t=0,r=e;t<r.length;t++){var s=r[t];this.dayTile.segContainerEl.appendChild(s.el)}},w.prototype.detachSegs=function(e){for(var t=0,r=e;t<r.length;t++){var s=r[t];D.removeElement(s.el)}},w),v=(b.prototype.renderHtml=function(e){var t=[];e.renderIntroHtml&&t.push(e.renderIntroHtml());for(var r,s,n,i,o,l,a=0,d=e.cells;a<d.length;a++){var c=d[a];t.push((r=c.date,s=e.dateProfile,n=this.context,c=c.htmlAttrs,l=o=i=void 0,i=n.dateEnv,o=n.theme,l=D.rangeContainsMarker(s.activeRange,r),(s=D.getDayClasses(r,s,n)).unshift("sstfc-day",o.getClass("widgetContent")),'<td class="'+s.join(" ")+'"'+(l?' data-date="'+i.formatIso(r,{omitTime:!0})+'"':"")+(c?" "+c:"")+"></td>"))}return e.cells.length||t.push('<td class="sstfc-day '+this.context.theme.getClass("widgetContent")+'"></td>'),"rtl"===this.context.options.dir&&t.reverse(),"<tr>"+t.join("")+"</tr>"},b);function b(e){this.context=e}function w(e){var t=f.call(this,e.context)||this;return t.dayTile=e,t}function S(e,t){var t=g.call(this,e,t)||this,r=t.eventRenderer=new F(t),s=t.renderFrame=D.memoizeRendering(t._renderFrame);return t.renderFgEvents=D.memoizeRendering(r.renderSegs.bind(r),r.unrender.bind(r),[s]),t.renderEventSelection=D.memoizeRendering(r.selectByInstanceId.bind(r),r.unselectByInstanceId.bind(r),[t.renderFgEvents]),t.renderEventDrag=D.memoizeRendering(r.hideByHash.bind(r),r.showByHash.bind(r),[s]),t.renderEventResize=D.memoizeRendering(r.hideByHash.bind(r),r.showByHash.bind(r),[s]),e.calendar.registerInteractiveComponent(t,{el:t.el,useEventCenter:!1}),t}function C(e){var t=m.call(this,e.context)||this;return t.fillSegTag="td",t.dayGrid=e,t}function E(){return null!==y&&y.apply(this,arguments)||this}var R,H,O=D.createFormatter({day:"numeric"}),A=D.createFormatter({week:"numeric"}),P=(t(T,H=D.DateComponent),T.prototype.render=function(e){var t=e.cells;this.rowCnt=t.length,this.colCnt=t[0].length,this.renderCells(t,e.isRigid),this.renderBusinessHours(e.businessHourSegs),this.renderDateSelection(e.dateSelectionSegs),this.renderBgEvents(e.bgEventSegs),this.renderFgEvents(e.fgEventSegs),this.renderEventSelection(e.eventSelection),this.renderEventDrag(e.eventDrag),this.renderEventResize(e.eventResize),this.segPopoverTile&&this.updateSegPopoverTile()},T.prototype.destroy=function(){H.prototype.destroy.call(this),this.renderCells.unrender()},T.prototype.getCellRange=function(e,t){e=this.props.cells[e][t].date;return{start:e,end:D.addDays(e,1)}},T.prototype.updateSegPopoverTile=function(e,t){var r=this.props;this.segPopoverTile.receiveProps({date:e||this.segPopoverTile.props.date,fgSegs:t||this.segPopoverTile.props.fgSegs,eventSelection:r.eventSelection,eventDragInstances:r.eventDrag?r.eventDrag.affectedInstances:null,eventResizeInstances:r.eventResize?r.eventResize.affectedInstances:null})},T.prototype._renderCells=function(e,t){for(var r,s=this.view,n=this.dateEnv,i=this.rowCnt,o=this.colCnt,l="",a=0;a<i;a++)l+=this.renderDayRowHtml(a,t);for(this.el.innerHTML=l,this.rowEls=D.findElements(this.el,".sstfc-row"),this.cellEls=D.findElements(this.el,".sstfc-day, .sstfc-disabled-day"),this.isRtl&&this.cellEls.reverse(),this.rowPositions=new D.PositionCache(this.el,this.rowEls,!1,!0),this.colPositions=new D.PositionCache(this.el,this.cellEls.slice(0,o),!0,!1),a=0;a<i;a++)for(r=0;r<o;r++)this.publiclyTrigger("dayRender",[{date:n.toDate(e[a][r].date),el:this.getCellEl(a,r),view:s}]);this.isCellSizesDirty=!0},T.prototype._unrenderCells=function(){this.removeSegPopover()},T.prototype.renderDayRowHtml=function(e,t){var r=this.theme,s=["sstfc-row","sstfc-week",r.getClass("dayRow")],t=(t&&s.push("sstfc-rigid"),new v(this.context));return'<div class="'+s.join(" ")+'"><div class="sstfc-bg"><table class="'+r.getClass("tableGrid")+'">'+t.renderHtml({cells:this.props.cells[e],dateProfile:this.props.dateProfile,renderIntroHtml:this.renderProps.renderBgIntroHtml})+'</table></div><div class="sstfc-content-skeleton"><table>'+(this.getIsNumbersVisible()?"<thead>"+this.renderNumberTrHtml(e)+"</thead>":"")+"</table></div></div>"},T.prototype.getIsNumbersVisible=function(){return this.getIsDayNumbersVisible()||this.renderProps.cellWeekNumbersVisible||this.renderProps.colWeekNumbersVisible},T.prototype.getIsDayNumbersVisible=function(){return 1<this.rowCnt},T.prototype.renderNumberTrHtml=function(e){var t=this.renderProps.renderNumberIntroHtml(e,this);return"<tr>"+(this.isRtl?"":t)+this.renderNumberCellsHtml(e)+(this.isRtl?t:"")+"</tr>"},T.prototype.renderNumberCellsHtml=function(e){for(var t,r=[],s=0;s<this.colCnt;s++)t=this.props.cells[e][s].date,r.push(this.renderNumberCellHtml(t));return this.isRtl&&r.reverse(),r.join("")},T.prototype.renderNumberCellHtml=function(e){var t,r,s=this.view,n=this.dateEnv,i="",o=D.rangeContainsMarker(this.props.dateProfile.activeRange,e),l=this.getIsDayNumbersVisible()&&o;return l||this.renderProps.cellWeekNumbersVisible?((t=D.getDayClasses(e,this.props.dateProfile,this.context)).unshift("sstfc-day-top"),this.renderProps.cellWeekNumbersVisible&&(r=n.weekDow),i+='<td class="'+t.join(" ")+'"'+(o?' data-date="'+n.formatIso(e,{omitTime:!0})+'"':"")+">",this.renderProps.cellWeekNumbersVisible&&e.getUTCDay()===r&&(i+=D.buildGotoAnchorHtml(s,{date:e,type:"week"},{class:"sstfc-week-number"},n.format(e,A))),l&&(i+=D.buildGotoAnchorHtml(s,e,{class:"sstfc-day-number"},n.format(e,O))),i+"</td>"):"<td></td>"},T.prototype.updateSize=function(e){var t=this.fillRenderer,r=this.eventRenderer,s=this.mirrorRenderer;(e||this.isCellSizesDirty||this.view.calendar.isEventsUpdated)&&(this.buildPositionCaches(),this.isCellSizesDirty=!1),t.computeSizes(e),r.computeSizes(e),s.computeSizes(e),t.assignSizes(e),r.assignSizes(e),s.assignSizes(e)},T.prototype.buildPositionCaches=function(){this.buildColPositions(),this.buildRowPositions()},T.prototype.buildColPositions=function(){this.colPositions.build()},T.prototype.buildRowPositions=function(){this.rowPositions.build(),this.rowPositions.bottoms[this.rowCnt-1]+=this.bottomCoordPadding},T.prototype.positionToHit=function(e,t){var r=this.colPositions,s=this.rowPositions,e=r.leftToIndex(e),t=s.topToIndex(t);if(null!=t&&null!=e)return{row:t,col:e,dateSpan:{range:this.getCellRange(t,e),allDay:!0},dayEl:this.getCellEl(t,e),relativeRect:{left:r.lefts[e],right:r.rights[e],top:s.tops[t],bottom:s.bottoms[t]}}},T.prototype.getCellEl=function(e,t){return this.cellEls[e*this.colCnt+t]},T.prototype._renderEventDrag=function(e){e&&(this.eventRenderer.hideByHash(e.affectedInstances),this.fillRenderer.renderSegs("highlight",e.segs))},T.prototype._unrenderEventDrag=function(e){e&&(this.eventRenderer.showByHash(e.affectedInstances),this.fillRenderer.unrender("highlight"))},T.prototype._renderEventResize=function(e){e&&(this.eventRenderer.hideByHash(e.affectedInstances),this.fillRenderer.renderSegs("highlight",e.segs),this.mirrorRenderer.renderSegs(e.segs,{isResizing:!0,sourceSeg:e.sourceSeg}))},T.prototype._unrenderEventResize=function(e){e&&(this.eventRenderer.showByHash(e.affectedInstances),this.fillRenderer.unrender("highlight"),this.mirrorRenderer.unrender(e.segs,{isResizing:!0,sourceSeg:e.sourceSeg}))},T.prototype.removeSegPopover=function(){this.segPopover&&this.segPopover.hide()},T.prototype.limitRows=function(e){for(var t,r=this.eventRenderer.rowStructs||[],s=0;s<r.length;s++)this.unlimitRow(s),!1!==(t=!!e&&("number"==typeof e?e:this.computeRowLevelLimit(s)))&&this.limitRow(s,t)},T.prototype.computeRowLevelLimit=function(e){for(var t,r=this.rowEls[e].getBoundingClientRect().bottom,s=D.findChildren(this.eventRenderer.rowStructs[e].tbodyEl),n=0;n<s.length;n++)if((t=s[n]).classList.remove("sstfc-limited"),t.getBoundingClientRect().bottom>r)return n;return!1},T.prototype.limitRow=function(t,r){function e(e){for(;C<e;)(l=y.getCellSegs(t,C,r)).length&&(c=n[r-1][C],m=y.renderMoreLink(t,C,l),g=D.createElement("div",null,m),c.appendChild(g),S.push(g)),C++}var s,n,i,o,l,a,d,c,h,p,u,f,g,m,y=this,v=this.colCnt,b=this.isRtl,w=this.eventRenderer.rowStructs[t],S=[],C=0;if(r&&r<w.segLevels.length){for(s=w.segLevels[r-1],n=w.cellMatrix,(i=D.findChildren(w.tbodyEl).slice(r)).forEach(function(e){e.classList.add("sstfc-limited")}),o=0;o<s.length;o++){var E=s[o],R=b?v-1-E.lastCol:E.firstCol,H=b?v-1-E.firstCol:E.lastCol;for(e(R),d=[],a=0;C<=H;)l=this.getCellSegs(t,C,r),d.push(l),a+=l.length,C++;if(a){for(h=(c=n[r-1][R]).rowSpan||1,p=[],u=0;u<d.length;u++)f=D.createElement("td",{className:"sstfc-more-cell",rowSpan:h}),l=d[u],m=this.renderMoreLink(t,R+u,[E].concat(l)),g=D.createElement("div",null,m),f.appendChild(g),p.push(f),S.push(f);c.classList.add("sstfc-limited"),D.insertAfterElement(c,p),i.push(c)}}e(this.colCnt),w.moreEls=S,w.limitedEls=i}},T.prototype.unlimitRow=function(e){e=this.eventRenderer.rowStructs[e];e.moreEls&&(e.moreEls.forEach(D.removeElement),e.moreEls=null),e.limitedEls&&(e.limitedEls.forEach(function(e){e.classList.remove("sstfc-limited")}),e.limitedEls=null)},T.prototype.renderMoreLink=function(l,a,d){var c=this,h=this.view,p=this.dateEnv,e=D.createElement("a",{className:"sstfc-more"});return e.innerText=this.getMoreLinkText(d.length),e.addEventListener("click",function(e){var t=c.opt("eventLimitClick"),r=c.isRtl?c.colCnt-a-1:a,r=c.props.cells[l][r].date,s=e.currentTarget,n=c.getCellEl(l,a),i=c.getCellSegs(l,a),i=c.resliceDaySegs(i,r),o=c.resliceDaySegs(d,r);"popover"===(t="function"==typeof t?c.publiclyTrigger("eventLimitClick",[{date:p.toDate(r),allDay:!0,dayEl:n,moreEl:s,segs:i,hiddenSegs:o,jsEvent:e,view:h}]):t)?c.showSegPopover(l,a,s,i):"string"==typeof t&&h.calendar.zoomTo(r,t)}),e},T.prototype.showSegPopover=function(t,e,r,s){var n=this,i=this.calendar,o=this.view,l=this.theme,a=this.isRtl?this.colCnt-e-1:e,e=r.parentNode,r=1===this.rowCnt?o.el:this.rowEls[t],l={className:"sstfc-more-popover "+l.getClass("popover"),parentEl:o.el,top:D.computeRect(r).top,autoHide:!0,content:function(e){n.segPopoverTile=new _(n.context,e),n.updateSegPopoverTile(n.props.cells[t][a].date,s)},hide:function(){n.segPopoverTile.destroy(),n.segPopoverTile=null,n.segPopover.destroy(),n.segPopover=null}};this.isRtl?l.right=D.computeRect(e).right+1:l.left=D.computeRect(e).left-1,this.segPopover=new B(l),this.segPopover.show(),i.releaseAfterSizingTriggers()},T.prototype.resliceDaySegs=function(e,t){for(var r={start:t,end:D.addDays(t,1)},s=[],n=0,i=e;n<i.length;n++){var o=i[n],l=o.eventRange,a=l.range,d=D.intersectRanges(a,r);d&&s.push(c({},o,{eventRange:{def:l.def,ui:c({},l.ui,{durationEditable:!1}),instance:l.instance,range:d},isStart:o.isStart&&d.start.valueOf()===a.start.valueOf(),isEnd:o.isEnd&&d.end.valueOf()===a.end.valueOf()}))}return s},T.prototype.getMoreLinkText=function(e){var t=this.opt("eventLimitText");return"function"==typeof t?t(e):"+"+e+" "+t},T.prototype.getCellSegs=function(e,t,r){for(var s,n=this.eventRenderer.rowStructs[e].segMatrix,i=r||0,o=[];i<n.length;)(s=n[i][t])&&o.push(s),i++;return o},T),j=D.createFormatter({week:"numeric"}),l=(t(k,R=D.View),k.prototype.destroy=function(){R.prototype.destroy.call(this),this.dayGrid.destroy(),this.scroller.destroy()},k.prototype.renderSkeletonHtml=function(){var e=this.theme;return'<table class="'+e.getClass("tableGrid")+'">'+(this.opt("columnHeader")?'<thead class="sstfc-head"><tr><td class="sstfc-head-container '+e.getClass("widgetHeader")+'">&nbsp;</td></tr></thead>':"")+'<tbody class="sstfc-body"><tr><td class="'+e.getClass("widgetContent")+'"></td></tr></tbody></table>'},k.prototype.weekNumberStyleAttr=function(){return null!=this.weekNumberWidth?'style="width:'+this.weekNumberWidth+'px"':""},k.prototype.hasRigidRows=function(){var e=this.opt("eventLimit");return e&&"number"!=typeof e},k.prototype.updateSize=function(e,t,r){R.prototype.updateSize.call(this,e,t,r),this.dayGrid.updateSize(e)},k.prototype.updateBaseSize=function(e,t,r){var s,n=this.dayGrid,i=this.opt("eventLimit"),o=this.header?this.header.el:null;n.rowEls?(this.colWeekNumbersVisible&&(this.weekNumberWidth=D.matchCellWidths(D.findElements(this.el,".sstfc-week-number"))),this.scroller.clear(),o&&D.uncompensateScroll(o),n.removeSegPopover(),i&&"number"==typeof i&&n.limitRows(i),s=this.computeScrollerHeight(t),this.setGridHeight(s,r),i&&"number"!=typeof i&&n.limitRows(i),r||(this.scroller.setHeight(s),((n=this.scroller.getScrollbarWidths()).left||n.right)&&(o&&D.compensateScroll(o,n),s=this.computeScrollerHeight(t),this.scroller.setHeight(s)),this.scroller.lockOverflow(n))):r||(s=this.computeScrollerHeight(t),this.scroller.setHeight(s))},k.prototype.computeScrollerHeight=function(e){return e-D.subtractInnerElHeight(this.el,this.scroller.el)},k.prototype.setGridHeight=function(e,t){this.opt("monthMode")?(t&&(e*=this.dayGrid.rowCnt/6),D.distributeHeight(this.dayGrid.rowEls,e,!t)):t?D.undistributeHeight(this.dayGrid.rowEls):D.distributeHeight(this.dayGrid.rowEls,e,!0)},k.prototype.computeDateScroll=function(e){return{top:0}},k.prototype.queryDateScroll=function(){return{top:this.scroller.getScrollTop()}},k.prototype.applyDateScroll=function(e){void 0!==e.top&&this.scroller.setScrollTop(e.top)},k);function k(e,t,r,s){var n=R.call(this,e,t,r,s)||this,e=(n.renderHeadIntroHtml=function(){var e=n.theme;return n.colWeekNumbersVisible?'<th class="sstfc-week-number '+e.getClass("widgetHeader")+'" '+n.weekNumberStyleAttr()+"><span>"+D.htmlEscape(n.opt("weekLabel"))+"</span></th>":""},n.renderDayGridNumberIntroHtml=function(e,t){var r=n.dateEnv,e=t.props.cells[e][0].date;return n.colWeekNumbersVisible?'<td class="sstfc-week-number" '+n.weekNumberStyleAttr()+">"+D.buildGotoAnchorHtml(n,{date:e,type:"week",forceOff:1===t.colCnt},r.format(e,j))+"</td>":""},n.renderDayGridBgIntroHtml=function(){var e=n.theme;return n.colWeekNumbersVisible?'<td class="sstfc-week-number '+e.getClass("widgetContent")+'" '+n.weekNumberStyleAttr()+"></td>":""},n.renderDayGridIntroHtml=function(){return n.colWeekNumbersVisible?'<td class="sstfc-week-number" '+n.weekNumberStyleAttr()+"></td>":""},n.el.classList.add("sstfc-dayGrid-view"),n.el.innerHTML=n.renderSkeletonHtml(),n.scroller=new D.ScrollComponent("hidden","auto"),n.scroller.el);n.el.querySelector(".sstfc-body > tr > td").appendChild(e),e.classList.add("sstfc-day-grid-container");var i,t=D.createElement("div",{className:"sstfc-day-grid"});return e.appendChild(t),n.opt("weekNumbers")?n.opt("weekNumbersWithinDays")?n.colWeekNumbersVisible=!(i=!0):n.colWeekNumbersVisible=!(i=!1):i=n.colWeekNumbersVisible=!1,n.dayGrid=new P(n.context,t,{renderNumberIntroHtml:n.renderDayGridNumberIntroHtml,renderBgIntroHtml:n.renderDayGridBgIntroHtml,renderIntroHtml:n.renderDayGridIntroHtml,colWeekNumbersVisible:n.colWeekNumbersVisible,cellWeekNumbersVisible:i}),n}function T(e,t,r){var e=H.call(this,e,t)||this,t=(e.bottomCoordPadding=0,e.isCellSizesDirty=!1,e.eventRenderer=new a(e)),s=e.fillRenderer=new V(e),n=(e.mirrorRenderer=new W(e),e.renderCells=D.memoizeRendering(e._renderCells,e._unrenderCells));return e.renderBusinessHours=D.memoizeRendering(s.renderSegs.bind(s,"businessHours"),s.unrender.bind(s,"businessHours"),[n]),e.renderDateSelection=D.memoizeRendering(s.renderSegs.bind(s,"highlight"),s.unrender.bind(s,"highlight"),[n]),e.renderBgEvents=D.memoizeRendering(s.renderSegs.bind(s,"bgEvent"),s.unrender.bind(s,"bgEvent"),[n]),e.renderFgEvents=D.memoizeRendering(t.renderSegs.bind(t),t.unrender.bind(t),[n]),e.renderEventSelection=D.memoizeRendering(t.selectByInstanceId.bind(t),t.unselectByInstanceId.bind(t),[e.renderFgEvents]),e.renderEventDrag=D.memoizeRendering(e._renderEventDrag,e._unrenderEventDrag,[n]),e.renderEventResize=D.memoizeRendering(e._renderEventResize,e._unrenderEventResize,[n]),e.renderProps=r,e}l.prototype.dateProfileGeneratorClass=o;t(L,I=D.DateComponent),L.prototype.destroy=function(){I.prototype.destroy.call(this),this.calendar.unregisterInteractiveComponent(this)},L.prototype.render=function(e){var t=this.dayGrid,r=e.dateProfile,s=e.dayTable;t.receiveProps(c({},this.slicer.sliceProps(e,r,e.nextDayThreshold,t,s),{dateProfile:r,cells:s.cells,isRigid:e.isRigid}))},L.prototype.buildPositionCaches=function(){this.dayGrid.buildPositionCaches()},L.prototype.queryHit=function(e,t){e=this.dayGrid.positionToHit(e,t);if(e)return{component:this.dayGrid,dateSpan:e.dateSpan,dayEl:e.dayEl,rect:{left:e.relativeRect.left,right:e.relativeRect.right,top:e.relativeRect.top,bottom:e.relativeRect.bottom},layer:0}};var G,z,I,q=L,U=(t(x,z=D.Slicer),x.prototype.sliceRange=function(e,t){return t.sliceRange(e)},x),o=(t(N,G=l),N.prototype.destroy=function(){G.prototype.destroy.call(this),this.header&&this.header.destroy(),this.simpleDayGrid.destroy()},N.prototype.render=function(e){G.prototype.render.call(this,e);var t=this.props.dateProfile,r=this.dayTable=this.buildDayTable(t,this.dateProfileGenerator);this.header&&this.header.receiveProps({dateProfile:t,dates:r.headerDates,datesRepDistinctDays:1===r.rowCnt,renderIntroHtml:this.renderHeadIntroHtml}),this.simpleDayGrid.receiveProps({dateProfile:t,dayTable:r,businessHours:e.businessHours,dateSelection:e.dateSelection,eventStore:e.eventStore,eventUiBases:e.eventUiBases,eventSelection:e.eventSelection,eventDrag:e.eventDrag,eventResize:e.eventResize,isRigid:this.hasRigidRows(),nextDayThreshold:this.nextDayThreshold})},N);function N(e,t,r,s){e=G.call(this,e,t,r,s)||this;return e.buildDayTable=D.memoize(Z),e.opt("columnHeader")&&(e.header=new D.DayHeader(e.context,e.el.querySelector(".sstfc-head-container"))),e.simpleDayGrid=new q(e.context,e.dayGrid),e}function x(){return null!==z&&z.apply(this,arguments)||this}function L(e,t){var r=I.call(this,e,t.el)||this;return r.slicer=new U,r.dayGrid=t,e.calendar.registerInteractiveComponent(r,{el:r.dayGrid.el}),r}function Z(e,t){t=new D.DaySeries(e.renderRange,t);return new D.DayTable(t,/year|month|week/.test(e.currentRangeUnit))}var $=D.createPlugin({defaultView:"dayGridMonth",views:{dayGrid:o,dayGridDay:{type:"dayGrid",duration:{days:1}},dayGridWeek:{type:"dayGrid",duration:{weeks:1}},dayGridMonth:{type:"dayGrid",duration:{months:1},monthMode:!0,fixedWeekCount:!0}}});e.AbstractDayGridView=l,e.DayBgRow=v,e.DayGrid=P,e.DayGridSlicer=U,e.DayGridView=o,e.SimpleDayGrid=q,e.buildBasicDayTable=Z,e.default=$,Object.defineProperty(e,"__esModule",{value:!0})});