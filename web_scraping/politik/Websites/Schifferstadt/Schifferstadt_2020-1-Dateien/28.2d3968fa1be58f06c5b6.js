/*! For license information please see 28.2d3968fa1be58f06c5b6.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{494:function(l,f,d){},495:function(l,f,d){},570:function(l,f,d){(function(f){l.exports=function(){"use strict";var l={errors:{incompatible:"".concat("PushError:"," Push.js is incompatible with browser."),invalid_plugin:"".concat("PushError:"," plugin class missing from plugin manifest (invalid plugin). Please check the documentation."),invalid_title:"".concat("PushError:"," title of notification must be a string"),permission_denied:"".concat("PushError:"," permission request declined"),sw_notification_error:"".concat("PushError:"," could not show a ServiceWorker notification due to the following reason: "),sw_registration_error:"".concat("PushError:"," could not register the ServiceWorker due to the following reason: "),unknown_interface:"".concat("PushError:"," unable to create notification: unknown interface")}};function t(l){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(l){return typeof l}:function(l){return l&&"function"==typeof Symbol&&l.constructor===Symbol&&l!==Symbol.prototype?"symbol":typeof l})(l)}function n(l,f){if(!(l instanceof f))throw new TypeError("Cannot call a class as a function")}function e(l,f){for(var d=0;d<f.length;d++){var h=f[d];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(l,h.key,h)}}function o(l,f,d){return f&&e(l.prototype,f),d&&e(l,d),l}function r(l,f){if("function"!=typeof f&&null!==f)throw new TypeError("Super expression must either be null or a function");l.prototype=Object.create(f&&f.prototype,{constructor:{value:l,writable:!0,configurable:!0}}),f&&c(l,f)}function s(l){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(l){return l.__proto__||Object.getPrototypeOf(l)})(l)}function c(l,f){return(c=Object.setPrototypeOf||function(l,f){return l.__proto__=f,l})(l,f)}function a(l,f){return!f||"object"!=typeof f&&"function"!=typeof f?function(l){if(void 0===l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l}(l):f}var d=function(){function i(l){n(this,i),this._win=l,this.GRANTED="granted",this.DEFAULT="default",this.DENIED="denied",this._permissions=[this.GRANTED,this.DEFAULT,this.DENIED]}return o(i,[{key:"request",value:function(l,f){return arguments.length>0?this._requestWithCallback.apply(this,arguments):this._requestAsPromise()}},{key:"_requestWithCallback",value:function(l,f){var d,h=this,p=this.get(),w=!1,s=function(){var d=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h._win.Notification.permission;w||(w=!0,void 0===d&&h._win.webkitNotifications&&(d=h._win.webkitNotifications.checkPermission()),d===h.GRANTED||0===d?l&&l():f&&f())};p!==this.DEFAULT?s(p):this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission?this._win.webkitNotifications.requestPermission(s):this._win.Notification&&this._win.Notification.requestPermission?(d=this._win.Notification.requestPermission(s))&&d.then&&d.then(s).catch((function(){f&&f()})):l&&l()}},{key:"_requestAsPromise",value:function(){var l=this,f=this.get(),d=f!==this.DEFAULT,h=this._win.Notification&&this._win.Notification.requestPermission,p=this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission;return new Promise((function(w,v){var g,m=!1,u=function(f){m||(m=!0,function(f){return f===l.GRANTED||0===f}(f)?w():v())};d?u(f):p?l._win.webkitNotifications.requestPermission((function(l){u(l)})):h?(g=l._win.Notification.requestPermission(u))&&g.then&&g.then(u).catch(v):w()}))}},{key:"has",value:function(){return this.get()===this.GRANTED}},{key:"get",value:function(){return this._win.Notification&&this._win.Notification.permission?this._win.Notification.permission:this._win.webkitNotifications&&this._win.webkitNotifications.checkPermission?this._permissions[this._win.webkitNotifications.checkPermission()]:navigator.mozNotification?this.GRANTED:this._win.external&&this._win.external.msIsSiteMode?this._win.external.msIsSiteMode()?this.GRANTED:this.DEFAULT:this.GRANTED}}]),i}(),h=function(){function i(){n(this,i)}return o(i,null,[{key:"isUndefined",value:function(l){return void 0===l}},{key:"isNull",value:function(l){return null===obj}},{key:"isString",value:function(l){return"string"==typeof l}},{key:"isFunction",value:function(l){return l&&"[object Function]"==={}.toString.call(l)}},{key:"isObject",value:function(l){return"object"===t(l)}},{key:"objectMerge",value:function(l,f){for(var d in f)l.hasOwnProperty(d)&&this.isObject(l[d])&&this.isObject(f[d])?this.objectMerge(l[d],f[d]):l[d]=f[d]}}]),i}(),p=function i(l){n(this,i),this._win=l},w=function(l){function t(){return n(this,t),a(this,s(t).apply(this,arguments))}return r(t,p),o(t,[{key:"isSupported",value:function(){return void 0!==this._win.Notification}},{key:"create",value:function(l,f){return new this._win.Notification(l,{icon:h.isString(f.icon)||h.isUndefined(f.icon)||h.isNull(f.icon)?f.icon:f.icon.x32,body:f.body,tag:f.tag,requireInteraction:f.requireInteraction})}},{key:"close",value:function(l){l.close()}}]),t}(),v=function(f){function e(){return n(this,e),a(this,s(e).apply(this,arguments))}return r(e,p),o(e,[{key:"isSupported",value:function(){return void 0!==this._win.navigator&&void 0!==this._win.navigator.serviceWorker}},{key:"getFunctionBody",value:function(l){var f=l.toString().match(/function[^{]+{([\s\S]*)}$/);return null!=f&&f.length>1?f[1]:null}},{key:"create",value:function(f,d,p,w,v){var g=this;this._win.navigator.serviceWorker.register(w),this._win.navigator.serviceWorker.ready.then((function(w){var m={id:f,link:p.link,origin:document.location.href,onClick:h.isFunction(p.onClick)?g.getFunctionBody(p.onClick):"",onClose:h.isFunction(p.onClose)?g.getFunctionBody(p.onClose):""};void 0!==p.data&&null!==p.data&&(m=Object.assign(m,p.data)),w.showNotification(d,{icon:p.icon,body:p.body,vibrate:p.vibrate,tag:p.tag,data:m,requireInteraction:p.requireInteraction,silent:p.silent}).then((function(){w.getNotifications().then((function(l){w.active.postMessage(""),v(l)}))})).catch((function(f){throw new Error(l.errors.sw_notification_error+f.message)}))})).catch((function(f){throw new Error(l.errors.sw_registration_error+f.message)}))}},{key:"close",value:function(){}}]),e}(),g=function(l){function t(){return n(this,t),a(this,s(t).apply(this,arguments))}return r(t,p),o(t,[{key:"isSupported",value:function(){return void 0!==this._win.navigator.mozNotification}},{key:"create",value:function(l,f){var d=this._win.navigator.mozNotification.createNotification(l,f.body,f.icon);return d.show(),d}}]),t}(),m=function(l){function t(){return n(this,t),a(this,s(t).apply(this,arguments))}return r(t,p),o(t,[{key:"isSupported",value:function(){return void 0!==this._win.external&&void 0!==this._win.external.msIsSiteMode}},{key:"create",value:function(l,f){return this._win.external.msSiteModeClearIconOverlay(),this._win.external.msSiteModeSetIconOverlay(h.isString(f.icon)||h.isUndefined(f.icon)?f.icon:f.icon.x16,l),this._win.external.msSiteModeActivate(),null}},{key:"close",value:function(){this._win.external.msSiteModeClearIconOverlay()}}]),t}(),y=function(l){function t(){return n(this,t),a(this,s(t).apply(this,arguments))}return r(t,p),o(t,[{key:"isSupported",value:function(){return void 0!==this._win.webkitNotifications}},{key:"create",value:function(l,f){var d=this._win.webkitNotifications.createNotification(f.icon,l,f.body);return d.show(),d}},{key:"close",value:function(l){l.cancel()}}]),t}();return new(function(){function t(l){n(this,t),this._currentId=0,this._notifications={},this._win=l,this.Permission=new d(l),this._agents={desktop:new w(l),chrome:new v(l),firefox:new g(l),ms:new m(l),webkit:new y(l)},this._configuration={serviceWorker:"/serviceWorker.min.js",fallback:function(l){}}}return o(t,[{key:"_closeNotification",value:function(f){var d=!0,h=this._notifications[f];if(void 0!==h){if(d=this._removeNotification(f),this._agents.desktop.isSupported())this._agents.desktop.close(h);else if(this._agents.webkit.isSupported())this._agents.webkit.close(h);else{if(!this._agents.ms.isSupported())throw d=!1,new Error(l.errors.unknown_interface);this._agents.ms.close()}return d}return!1}},{key:"_addNotification",value:function(l){var f=this._currentId;return this._notifications[f]=l,this._currentId++,f}},{key:"_removeNotification",value:function(l){var f=!1;return this._notifications.hasOwnProperty(l)&&(delete this._notifications[l],f=!0),f}},{key:"_prepareNotification",value:function(l,f){var d,h=this;return d={get:function(){return h._notifications[l]},close:function(){h._closeNotification(l)}},f.timeout&&setTimeout((function(){d.close()}),f.timeout),d}},{key:"_serviceWorkerCallback",value:function(l,f,d){var h=this,p=this._addNotification(l[l.length-1]);navigator&&navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",(function(l){var f=JSON.parse(l.data);"close"===f.action&&Number.isInteger(f.id)&&h._removeNotification(f.id)})),d(this._prepareNotification(p,f))),d(null)}},{key:"_createCallback",value:function(l,f,d){var p,w=this,v=null;if(f=f||{},p=function(l){w._removeNotification(l),h.isFunction(f.onClose)&&f.onClose.call(w,v)},this._agents.desktop.isSupported())try{v=this._agents.desktop.create(l,f)}catch(p){var g=this._currentId,m=this.config().serviceWorker;this._agents.chrome.isSupported()&&this._agents.chrome.create(g,l,f,m,(function(l){return w._serviceWorkerCallback(l,f,d)}))}else this._agents.webkit.isSupported()?v=this._agents.webkit.create(l,f):this._agents.firefox.isSupported()?this._agents.firefox.create(l,f):this._agents.ms.isSupported()?v=this._agents.ms.create(l,f):(f.title=l,this.config().fallback(f));if(null!==v){var y=this._addNotification(v),_=this._prepareNotification(y,f);h.isFunction(f.onShow)&&v.addEventListener("show",f.onShow),h.isFunction(f.onError)&&v.addEventListener("error",f.onError),h.isFunction(f.onClick)&&v.addEventListener("click",f.onClick),v.addEventListener("close",(function(){p(y)})),v.addEventListener("cancel",(function(){p(y)})),d(_)}d(null)}},{key:"create",value:function(f,d){var p,w=this;if(!h.isString(f))throw new Error(l.errors.invalid_title);return p=this.Permission.has()?function(l,h){try{w._createCallback(f,d,l)}catch(l){h(l)}}:function(h,p){w.Permission.request().then((function(){w._createCallback(f,d,h)})).catch((function(){p(l.errors.permission_denied)}))},new Promise(p)}},{key:"count",value:function(){var l,f=0;for(l in this._notifications)this._notifications.hasOwnProperty(l)&&f++;return f}},{key:"close",value:function(l){var f;for(f in this._notifications)if(this._notifications.hasOwnProperty(f)&&this._notifications[f].tag===l)return this._closeNotification(f)}},{key:"clear",value:function(){var l,f=!0;for(l in this._notifications)this._notifications.hasOwnProperty(l)&&(f=f&&this._closeNotification(l));return f}},{key:"supported",value:function(){var l=!1;for(var f in this._agents)this._agents.hasOwnProperty(f)&&(l=l||this._agents[f].isSupported());return l}},{key:"config",value:function(l){return(void 0!==l||null!==l&&h.isObject(l))&&h.objectMerge(this._configuration,l),this._configuration}},{key:"extend",value:function(f){var d,p={}.hasOwnProperty;if(!p.call(f,"plugin"))throw new Error(l.errors.invalid_plugin);for(var w in p.call(f,"config")&&h.isObject(f.config)&&null!==f.config&&this.config(f.config),d=new(0,f.plugin)(this.config()))p.call(d,w)&&h.isFunction(d[w])&&(this[w]=d[w])}}]),t}())("undefined"!=typeof window?window:f)}()}).call(this,d(33))},574:function(l,f,d){"use strict";d(494)},575:function(l,f,d){"use strict";d(495)},657:function(l,f,d){"use strict";d.r(f);var h=d(57),p=d.n(h),w=d(431),v=d(570),g=d.n(v),m=d(408),y=d(58),_=d.n(y),b={components:{Modal:m.i,PdfViewer:function PdfViewer(){return Promise.all([d.e(1),d.e(2),d.e(5),d.e(19)]).then(d.bind(null,646))}},props:{show:Boolean,src:{type:[String,File],default:""},type:{type:String,default:"pdf"},filename:{type:String,default:""},fileSize:{type:[String,Number],required:!1,default:0}},data:function data(){return{supportedAudioFormats:["mp3"],supportedVideoFormats:["mp4","mov","webm","ogg"],loading:!1,base64FileData:"",arrayBufferFileData:null}},computed:{isMobile:function isMobile(){return"mobile"===this.$store.state.screen_type},isFileObject:function isFileObject(){return this.src instanceof File},searchStringFromUrl:function searchStringFromUrl(){var l=new URLSearchParams(window.location.href);return l.has("suchbegriffe")?l.get("suchbegriffe").toLowerCase():""},fileViewerButtons:function fileViewerButtons(){var fileViewerButtons=[];return"pdf"!==this.fileType&&fileViewerButtons.push({text:"Download",action:this.downloadFile}),fileViewerButtons},isTable:function isTable(){return["xlsx","xlsb","xlsm","xls","xml","csv","txt"].includes(this.fileType)},isImage:function isImage(){return["img","jpeg","jpg","png","svg","bmp"].includes(this.fileType)},fileType:function fileType(){return this.type.toLowerCase()}},watch:{show:async function show(){this.show&&this.isFileObject&&(this.loading=!0,this.isImage&&(this.base64FileData="data:image/jpg;base64, ".concat(await this.getBase64FromFileSrc())),"pdf"===this.fileType&&(this.arrayBufferFileData=await this.readFileAsync(this.src)),this.loading=!1),!this.show&&"pdf"===this.fileType&&this.$refs.pdfviewer&&this.$refs.pdfviewer.cancelRunningRequest()}},methods:{getBase64FromFileSrc:async function getBase64FromFileSrc(){return this.arrayBufferToBase64(await this.readFileAsync(this.src))},arrayBufferToBase64:function arrayBufferToBase64(l){for(var f="",d=new Uint8Array(l),h=d.byteLength,p=0;p<h;p++)f+=String.fromCharCode(d[p]);return window.btoa(f)},readFileAsync:async function readFileAsync(l){return new Promise((function(f,d){var h=new FileReader;h.onload=function(){f(h.result)},h.onerror=d,h.readAsArrayBuffer(l)}))},arrayBufferToString:function arrayBufferToString(l){var f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"utf-8",d=new TextDecoder(f);return d.decode(l)},downloadFile:function downloadFile(){console.log("downloading","".concat(this.filename,".").concat(this.fileType));var l=document.createElement("a");l.download="".concat(this.filename,".").concat(this.fileType),l.href=this.src,document.body.appendChild(l),l.click(),document.body.removeChild(l)}}},k=(d(574),d(407)),S=Object(k.a)(b,(function(){var l=this,f=l.$createElement,d=l._self._c||f;return d("div",{staticClass:"file-viewer-modal-wrapper"},[d("modal",{staticClass:"file-viewer-modal",class:[{"file-viewer-modal-image":l.isImage},{"file-viewer-modal-document":"pdf"===l.fileType}],attrs:{show:l.show,buttons:l.fileViewerButtons,loading:l.loading,title:l.isImage||l.supportedAudioFormats.concat(l.supportedVideoFormats).includes(l.fileType)?l.filename:"","has-close-button":l.isImage},on:{close:function(f){return l.$emit("update:show",!1)}}},[d("div",[l.isImage?d("div",[d("img",{staticClass:"file-viewer-modal-image",attrs:{src:l.isFileObject?l.base64FileData:l.src}})]):"pdf"===l.fileType?d("div",{staticClass:"file-viewer-modal-document-content-wrapper"},[d("pdf-viewer",{ref:"pdfviewer",staticClass:"file-viewer-modal-document-content",attrs:{"file-size":l.fileSize,src:l.isFileObject?l.arrayBufferFileData:l.src,filename:l.filename,"search-string":l.searchStringFromUrl},on:{close:function(f){l.$emit("close"),l.$emit("update:show",!1)}}})],1):l.supportedAudioFormats.includes(l.fileType)?d("div",[d("audio",{attrs:{controls:"",controlsList:"nodownload"}},[d("source",{attrs:{src:l.src,type:"audio/mpeg"}}),l._v("\n          Ihr Browser unterstützt kein HTML5 audio-player\n        ")])]):l.supportedVideoFormats.includes(l.fileType)?d("div",[d("video",{attrs:{width:l.isMobile?320:480,height:l.isMobile?240:360,src:l.src,autobuffer:"",controls:""}},[l._v("\n          Ihr Browser unterstützt kein HTML5 video-player.\n        ")])]):d("div",{staticClass:"file-viewer-modal-placeholder"},[d("div",[l._v('Es kann keine Vorschau zu dem Dateiformat "'+l._s(l.fileType)+'" erstellt werden.')]),l._v(" "),d("div",[l._v("Sie können sich das Dokument stattdessen herunterladen")])])])])],1)}),[],!1,null,"37396882",null).exports;function ownKeys(l,f){var d=Object.keys(l);if(Object.getOwnPropertySymbols){var h=Object.getOwnPropertySymbols(l);f&&(h=h.filter((function(f){return Object.getOwnPropertyDescriptor(l,f).enumerable}))),d.push.apply(d,h)}return d}function _objectSpread(l){for(var f=1;f<arguments.length;f++){var d=null!=arguments[f]?arguments[f]:{};f%2?ownKeys(Object(d),!0).forEach((function(f){p()(l,f,d[f])})):Object.getOwnPropertyDescriptors?Object.defineProperties(l,Object.getOwnPropertyDescriptors(d)):ownKeys(Object(d)).forEach((function(f){Object.defineProperty(l,f,Object.getOwnPropertyDescriptor(d,f))}))}return l}var N={name:"App",components:{SnackbarManager:m.l,FileViewerModal:S},data:function data(){return{declinedNotifications:!0,snackbarMessages:[],socketConnectionChanged:!1,fileViewer:{show:!1,src:"",type:"pdf",filename:"",fileSize:0},axios:_.a}},mounted:function mounted(){window.socket&&window.socket.on("connection-changed",(function(){console.warn("Connection change triggered")}));var l=this.$refs.snackbarManager;this.eventBus.$on("update-notification",(function(f){l.updateMessage(f.key,_objectSpread(_objectSpread({},f),{},{key:f.key}))}))},created:function created(){var l=this;this.$store.dispatch("loadUserSettings"),this.setScreenType(),window.socket&&window.socket.on("new-live-info",(function(){l.fetchLiveInfos()}));var f={src:"",type:"pdf",filename:"",fileSize:0,preventDownload:!1};this.eventBus.$on("open-file",(function(d){if(1!=window.settings[9060]||d.src.length>1500||d.preventDownload)d.src.length>1500&&1==window.settings[9060]&&l.eventBus.$emit("show-notification",{text:"Dieses Dokument konnte nicht direkt heruntergeladen werden, stattdessen wird es im integrierten Viewer angezeigt"}),l.fileViewer=_objectSpread(_objectSpread(_objectSpread({},f),d),{},{show:!0});else{var h=document.createElement("a");h.href=d.src.replace("&inline",""),h.target="_blank",document.body.appendChild(h),h.click(),h.parentNode.removeChild(h)}})),this.eventBus.$on("show-notification",(function(f){"download"!==f.type?(f.actionTitle||(f.actionTitle="OK"),f.action||(f.action=function(){}),void 0===f.duration&&0!==f.duration&&(f.duration=4e3),l.snackbarMessages.push(f)):l.snackbarMessages.push(f)})),document.addEventListener("beforeunload",(function(){window.socket&&window.socket.emit("disconnect")})),window.addEventListener("resize",(function(){l.setScreenType()})),1===window.settings[9025]&&(Object.prototype.hasOwnProperty.call(localStorage,"seenLiveInfos")||localStorage.setItem("seenLiveInfos",""),g.a.Permission.request(this.onGrantedNotifications,this.onDeniedNotifications),this.fetchLiveInfos())},methods:{setScreenType:function setScreenType(){var l="mobile";window.outerWidth>=768&&window.outerWidth<1200?l="tablet":window.outerWidth>=1200&&(l="desktop"),this.$store.dispatch("setScreenType",l)},onDeniedNotifications:function onDeniedNotifications(){localStorage.setItem("declinedNotifications","true"),this.declinedNotifications=!0},onGrantedNotifications:function onGrantedNotifications(){this.declinedNotifications=!1,localStorage.setItem("declinedNotifications","false")},fetchLiveInfos:function fetchLiveInfos(){var l=this;this.$http.request({method:"POST",params:{id:111,transid:window.transId,json:!0,system:"ris",platform:"ris",v:"v3.0"}}).then((function(f){if(!Object.prototype.hasOwnProperty.call(f.data[0],"ErrorCode")){var d=[].concat.apply([],Object(w.map)(f.data,"agenda_items")),h=Object(w.map)(d,"id"),p=[];if(h.forEach((function(l){var f=[];localStorage.getItem("seenLiveInfos").length&&(f=JSON.parse(localStorage.getItem("seenLiveInfos"))),f.includes(l)||(f.push(l),p.push(l),localStorage.setItem("seenLiveInfos",JSON.stringify(f)))})),p.length){var v="Es existiert eine neue Live-Info!";p.length>1&&(v="Es existieren ".concat(p.length," neue Live-Infos!")),l.declinedNotifications?l.eventBus.$emit("show-notification",{duration:4e3,text:v,actionTitle:"Zur Startseite",action:function action(){"/index.php"!==window.location.pathname&&"/"!==window.location.pathname&&window.open("index.php")}}):g.a.create("Neue Live-Infos",{body:v,onClick:function onClick(){"/index.php"!==window.location.pathname&&"/"!==window.location.pathname&&window.open("index.php"),this.close()}})}}}))}}},O=(d(575),Object(k.a)(N,(function(){var l=this,f=l.$createElement,d=l._self._c||f;return d("div",{attrs:{id:"main"}},[l.socketConnectionChanged?d("div",{staticClass:"socket-connection-changed-overlay"},[d("div",{staticClass:"socket-connection-changed-overlay-close-button",on:{click:function(f){l.socketConnectionChanged=!1}}},[d("font-awesome-icon",{attrs:{icon:"times"}})],1),l._v(" "),l._m(0)]):l._e(),l._v(" "),d("snackbar-manager",{ref:"snackbarManager",attrs:{axios:l.axios},model:{value:l.snackbarMessages,callback:function(f){l.snackbarMessages=f},expression:"snackbarMessages"}}),l._v(" "),d("file-viewer-modal",{staticClass:"global-file-viewer-modal",class:{"global-file-viewer-modal--no-download":l.fileViewer.preventDownload},attrs:{src:l.fileViewer.src,filename:l.fileViewer.filename,show:l.fileViewer.show,type:l.fileViewer.type},on:{"update:show":function(f){return l.$set(l.fileViewer,"show",f)}}})],1)}),[function(){var l=this,f=l.$createElement,d=l._self._c||f;return d("div",[l._v("\n      Sie haben sich von einem neuen Gerät oder Tab mit dem Live-Server verbunden. Ihre Live-Verbindung zum Server wurde getrennt."),d("div")])}],!1,null,null,null));f.default=O.exports}}]);