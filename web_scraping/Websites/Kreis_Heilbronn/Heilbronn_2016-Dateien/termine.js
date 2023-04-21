var showHintGrid,showHintList,yearDropdown,monthDropdown,lastMonth,tooltipNS,tooltipEL,tooltipT,calendarScrolled=!1,earliestEvent=Number.MAX_VALUE,isIos=/iPhone|iPad|iPod/.test(navigator.platform);function setVariables(e,t,n,i,r,a,l){showHintGrid=e,showHintList=t,yearDropdown=n,monthDropdown=i,tooltipNS=r,tooltipEL=a,tooltipT=l}function loading(e){var t=$SST(".sstfc-view-container");e?($SST("#loading-animation")[0].style.display="",0<t.length&&(t[0].style.opacity=".2")):(calendarScrolled=!1,lastMonth=0,$SST("#loading-animation")[0].style.display="none",0<t.length&&(t[0].style.opacity=""))}function datesRender(e){e.view.context.calendar.el.getElementsByClassName("sstfc-toolbar")[0].setAttribute("role","navigation");for(var t=e.view.context.calendar.el.getElementsByClassName("sstfc-button"),n=0;n<t.length;n++){var i=t[n];i.setAttribute("aria-pressed",-1!=i.className.indexOf("sstfc-button-active"))}"listYear"==e.view.type||"listMonth"==e.view.type||"dayGridMonth"==e.view.type?e.view.calendar.setOption("contentHeight","auto"):"auto"==e.view.calendar.getOption("contentHeight")&&e.view.calendar.setOption("contentHeight","");for(n=0;n<yearDropdown.children.length;n++)yearDropdown.children[n].selected=yearDropdown.children[n].innerText==e.view.calendar.state.currentDate.getFullYear();"listYear"!=e.view.type?(monthDropdown.disabled=!1,monthDropdown.style.display="",monthDropdown.children[e.view.calendar.state.currentDate.getMonth()].selected=!0):(monthDropdown.disabled=!0,monthDropdown.style.display="none",monthDropdown.selectedIndex=12);var r="",a="";switch(e.view.type){case"timeGridDay":r="vorheriger Tag",a="nächster Tag";break;case"timeGridWeek":r="vorherige Woche",a="nächste Woche";break;case"dayGridMonth":case"listMonth":r="vorheriger Monat",a="nächster Monat";break;case"listYear":r="vorheriges Jahr",a="nächstes Jahr"}var l=e.view.context.calendar.theme.calendarOptions.header.center;-1!=l.indexOf("prev")&&e.view.context.calendar.el.getElementsByClassName("sstfc-prev-button")[0].setAttribute("aria-label",r),-1!=l.indexOf("next")&&e.view.context.calendar.el.getElementsByClassName("sstfc-next-button")[0].setAttribute("aria-label",a);var s=e.view.context.calendar.theme.calendarOptions.header.left;-1!=s.indexOf("dayGridMonth")&&e.view.context.calendar.el.getElementsByClassName("sstfc-dayGridMonth-button")[0].setAttribute("aria-label","Zur Monatsansicht wechseln"),-1!=s.indexOf("timeGridWeek")&&e.view.context.calendar.el.getElementsByClassName("sstfc-timeGridWeek-button")[0].setAttribute("aria-label","Zur Wochenansicht wechseln"),-1!=s.indexOf("timeGridDay")&&e.view.context.calendar.el.getElementsByClassName("sstfc-timeGridDay-button")[0].setAttribute("aria-label","Zur Tagesansicht wechseln"),-1!=s.indexOf("listMonth")&&e.view.context.calendar.el.getElementsByClassName("sstfc-listMonth-button")[0].setAttribute("aria-label","Zur Monatsliste wechseln"),-1!=s.indexOf("listYear")&&e.view.context.calendar.el.getElementsByClassName("sstfc-listYear-button")[0].setAttribute("aria-label","Zur Jahresliste wechseln");var o="";switch(e.view.type){case"timeGridDay":o="Zum heutigen Tag springen";break;case"timeGridWeek":o="Zur aktuellen Woche springen";break;case"dayGridMonth":case"listMonth":o="Zum aktuellen Monat springen";break;case"listYear":o="Zum aktuellen Jahr springen"}-1!=l.indexOf("today")&&e.view.context.calendar.el.getElementsByClassName("sstfc-today-button")[0].setAttribute("aria-label",o),"listYear"!=e.view.type&&"listMonth"!=e.view.type&&0<$SST(e.view.context.calendar.el).children("div.sstfc-placeholder").length&&$SST(e.view.context.calendar.el).children().first().hasClass("sstfc-placeholder")&&($SST(e.view.context.calendar.el).prepend($SST(e.view.context.calendar.el).children(".sstfc-header-toolbar").removeClass("sstfc-toolbar-notitle")),$SST(e.view.context.calendar.el).append($SST(e.view.context.calendar.el).children("div.sstfc-placeholder").height($SST(e.view.context.calendar.el).children(".sstfc-header-toolbar:last").height())))}function createIcon(e,t,n,i){var r=null;return e&&((r=document.createElement("span")).className="fa-icon ",null!=i&&(r.style.color=i,r.className+="fa-sst-small "),5<=t?(r.className+="tops-link tops-ns-link fa-sst-file",null==i&&(r.title=tooltipNS+" vom ")):5<=n?(r.className+="tops-link tops-el-link fa-sst-file",null==i&&(r.title=tooltipEL+" vom ")):(r.className+="tops-link tops-to-link fa-sst-file-alt",null==i&&(r.title=tooltipT+" vom ")),r.innerHTML='<i aria-hidden="true" class="letter_inside" '+(null!=i?'style="color: '+i+'"':"")+"></i>",r.setAttribute("aria-hidden",!0)),r}function setAriaLabel(e,t){e.setAttribute("aria-label",t)}function listViewMods(e,t){var n=e.el.children[0],i=showHintList,r=e.el.children[2],a=e.el.children[1],l=e.el.children[2].children[0];a.style.backgroundColor=a.children[0].style.backgroundColor,a.removeChild(a.children[0]),e.el.insertBefore(a,e.el.children[0]),setAriaLabel(l,e.event.extendedProps.ariaLabel),new Date(e.event.start).setHours(0,0,0,0)<new Date(e.event.end).setHours(0,0,0,0)?e.isStart&&!e.isEnd?(n.innerText=n.innerText.split("-")[0],n.innerText+=" Uhr"):e.isStart||e.isEnd?!e.isStart&&e.isEnd&&(e.event.extendedProps.ns<5?n.innerText="Mehrtägig":(n.innerText="Bis "+n.innerText.split("-")[1],n.innerText+=" Uhr")):n.innerText="Mehrtägig":(e.event.extendedProps.ns<5&&(n.innerText=n.innerText.split("-")[0]),n.innerText+=" Uhr");var s=document.createElement("div");s.className="sstfc-titleHint-display";var o=document.createElement("div");if(o.className="sstfc-event-place",o.innerText=e.event.extendedProps.place,s.appendChild(l),i){var d=document.createElement("div");d.className="span_hinweis",d.innerText=null!=e.event.extendedProps.hinweis?e.event.extendedProps.hinweis:"",s.appendChild(d)}var c=document.createElement("div");c.className="sstfc-flexContainer",c.appendChild(s),c.appendChild(o),r.appendChild(c),null!=t&&(t.title+=e.event.start.toLocaleString("de-DE",{weekday:"short",day:"numeric",month:"numeric",year:"numeric",hour:"numeric",minute:"numeric"})+" Uhr",n.appendChild(document.createElement("br")),n.appendChild(t))}function gridViewMods(r,e){var t,n=showHintGrid,i=r.el.children[0];if(t="timeGridWeek"!=r.view.type||r.event.allDay?i:r.el.children[0].children[1],setAriaLabel(r.el,r.event.extendedProps.ariaLabel),r.event.allDay&&(r.isStart||"dayGridMonth"!=r.view.type&&"timeGridWeek"!=r.view.type)){var a=document.createElement("span");if(a.className="sstfc-time sstfc-with-space","timeGridDay"==r.view.type){var l=new Date(r.view.calendar.state.currentDate).setHours(0,0,0,0),s=new Date(r.event.start).setHours(0,0,0,0),o=new Date(r.event.extendedProps.endB).setHours(0,0,0,0);l==s?a.innerText=new Date(r.event.extendedProps.startB).toLocaleTimeString("de-DE",{hour:"numeric",minute:"numeric"}):l==o&&5<=r.event.extendedProps.ns?a.innerText="Bis "+new Date(r.event.extendedProps.endB).toLocaleTimeString("de-DE",{hour:"numeric",minute:"numeric"}):a.innerText="Mehrtägig "}else a.innerText=new Date(r.event.extendedProps.startB).toLocaleTimeString("de-DE",{hour:"numeric",minute:"numeric"});i.insertBefore(a,i.children[0])}else"timeGridDay"==r.view.type&&(i.children[0].children[0].innerText+=" Uhr");null!=e&&i.insertBefore(e,i.children[0]);var d=document.createElement("span");d.className="span_hinweis",n||"timeGridDay"==r.view.type?(d.innerText=null!=r.event.extendedProps.hinweis?r.event.extendedProps.hinweis:"",t.appendChild(document.createElement("br"))):d.innerHTML=null!=r.event.extendedProps.hinweis?'<span aria-hidden="true" class="fa-icon fa-sst-tiny" style="color: '+r.event.textColor+'"></span>':"",t.appendChild(d);var c=0,p=tippy(r.el,{followCursor:!0,content:r.event.extendedProps.description,appendTo:document.body,render:function(e){var t=document.createElement("div");t.className="sst-tooltip",t.setAttribute("role","tooltip"),t.addEventListener("click",function(e){window.location.href=r.el.getAttribute("href")});var n=document.createElement("div");n.className="tooltip-arrow",n.setAttribute("data-popper-arrow",null),t.appendChild(n);var i=document.createElement("div");return i.className="tooltip-inner",i.innerHTML=e.props.content,t.appendChild(i),{popper:t}},onHide:function(e){e.setProps({followCursor:!0}),e.setProps({interactive:!1}),c=0},trigger:"mouseenter",placement:"top"});r.el.addEventListener("click",function(e){2!=++c&&!isIos&&tippy.currentInput.isTouch&&(e.preventDefault(),p.hide(),p.setProps({followCursor:"initial",interactive:!0}),p.show())})}function eventRender(e){"listMonth"==e.view.type||"listYear"==e.view.type?listViewMods(e,createIcon(e.event.extendedProps.showIcon,e.event.extendedProps.ns,e.event.extendedProps.el)):gridViewMods(e,createIcon(e.event.extendedProps.showIcon,e.event.extendedProps.ns,e.event.extendedProps.el,e.event.textColor,!0))}function eventPositioned(e){if(""==e.el.href&&(e.el.href="javascript:void(0);"),"listYear"==e.view.type&&-1<e.el.previousElementSibling.children[0].className.indexOf("sstfc-widget-header")){var t=new Date(e.el.previousElementSibling.dataset.date).getMonth();if(lastMonth<t||null==e.el.previousElementSibling.previousElementSibling){var n=document.createElement("tr");n.className="sstfc-list-seperator sstfc-list-heading";var i=document.createElement("td");i.colSpan=3,i.className="sstfc-widget-header",i.innerText=new Date(e.el.previousElementSibling.dataset.date).toLocaleDateString("de-DE",{month:"long"}),n.appendChild(i),e.el.parentElement.insertBefore(n,e.el.previousElementSibling),lastMonth=t}}var r=new Date;"listYear"==e.view.type&&e.event.start.getFullYear()==r.getFullYear()&&e.event.start.getMonth()>=r.getMonth()&&!calendarScrolled?($SST(window).scrollTop($SST(e.el.previousElementSibling.previousElementSibling).offset().top),calendarScrolled=!0):"timeGridWeek"!=e.view.type&&"timeGridDay"!=e.view.type||e.event.allDay||(earliestEvent>e.el.offsetTop&&(earliestEvent=e.el.offsetTop),$SST(".sstfc-scroller").scrollTop(earliestEvent))}function handleCalendarCheckboxes(e,t){t?$SST("#div-tabbody-"+e+" input.filteritem").prop("checked",!0):$SST("#div-tabbody-"+e+" input.filteritem").prop("checked",!1)}function reloadTermine(e,t){var n="persoenlichetermine";-1==t.indexOf(n)&&(n="termine");var i={method:"getTerminefilterUrl",gids:getTerminefilterCheckboxes("gremien"),fids:getTerminefilterCheckboxes("fraktionen"),sids:getTerminefilterCheckboxes("sonstige"),program:n};$SST.ajax({url:e,type:"GET",data:i,dataType:"json",headers:{"X-CSRF-Token":sessionStorage.getItem("csrfToken")},success:function(e){window.location.replace(e)}})}function getTerminefilterCheckboxes(e){var t=0,n=new Array;return $SST("#div-tabbody-"+e+"filter input.filteritem").each(function(){t++,$SST(this).is(":checked")&&n.push($SST(this).attr("value"))}),0<t&&n.length==t?n=[-1]:0==n.length&&(n=[0]),n}function toggleTerminefilter(){return $SST("#terminefilter-btn").toggleClass("button-active sstfc-button-active"),$SST("#terminefilter-btn").attr("aria-pressed",!!$SST("#terminefilter-btn").attr("aria-pressed")),$SST("#terminefilter").toggleClass("displaynone"),!1}