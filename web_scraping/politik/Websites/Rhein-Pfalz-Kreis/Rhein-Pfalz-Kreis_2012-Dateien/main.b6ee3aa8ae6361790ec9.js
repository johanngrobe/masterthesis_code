!function(e){function webpackJsonpCallback(t){for(var n,o,i=t[0],c=t[1],u=t[2],d=0,l=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&l.push(r[o][0]),r[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);for(s&&s(t);l.length;)l.shift()();return a.push.apply(a,u||[]),checkDeferredModules()}function checkDeferredModules(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,i=1;i<n.length;i++){var c=n[i];0!==r[c]&&(o=!1)}o&&(a.splice(t--,1),e=__webpack_require__(__webpack_require__.s=n[0]))}return e}var t={},n={7:0},r={7:0},a=[];function __webpack_require__(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}__webpack_require__.e=function requireEnsure(e){var t=[];n[e]?t.push(n[e]):0!==n[e]&&{4:1,9:1,10:1,11:1,12:1,13:1,14:1,15:1,16:1,17:1,18:1,19:1,20:1,21:1,22:1,23:1,24:1,25:1,26:1,27:1,28:1,29:1,30:1,31:1,32:1,33:1}[e]&&t.push(n[e]=new Promise((function(t,r){for(var a="vendor."+{0:"31d6cfe0d16ae931b73c",1:"31d6cfe0d16ae931b73c",2:"31d6cfe0d16ae931b73c",3:"31d6cfe0d16ae931b73c",4:"bdda4390ba0e7c09b272",5:"31d6cfe0d16ae931b73c",6:"31d6cfe0d16ae931b73c",9:"19f9875dca25a2167aab",10:"6c29d3ae2b9cf0e83dfc",11:"119db56f9c34cbc9ffee",12:"3654025854cdd9517326",13:"2ed25440ef8bfea93933",14:"d9fb6a70c44a6b33521c",15:"f40dafe0f03044cdf471",16:"382f7032b1cb0c5f2135",17:"ac75f2801e408dac40da",18:"4f954ee4d664d6403572",19:"4f954ee4d664d6403572",20:"1669437d74ab5baf93db",21:"a71c1c1ce70e018eec9c",22:"b54b4c75e228dc0d9813",23:"6e710d57e8a1721e9319",24:"06523119febed31afb7a",25:"4ee884b1e3939bd709dc",26:"9cca9664fb1d4d938f98",27:"525f9f959df94e7406f4",28:"cc246f872412f664009b",29:"110dba51c46410b5a547",30:"1e79a61f70a3d3021386",31:"fed40242ae1351015b11",32:"6ffbeb9f6aec48e45f58",33:"259342979f3041b991bc"}[e]+".css",o=__webpack_require__.p+a,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var s=(d=i[c]).getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(s===a||s===o))return t()}var u=document.getElementsByTagName("style");for(c=0;c<u.length;c++){var d;if((s=(d=u[c]).getAttribute("data-href"))===a||s===o)return t()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=t,l.onerror=function(t){var a=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete n[e],l.parentNode.removeChild(l),r(i)},l.href=o,document.getElementsByTagName("head")[0].appendChild(l)})).then((function(){n[e]=0})));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var o=new Promise((function(t,n){a=r[e]=[t,n]}));t.push(a[2]=o);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,__webpack_require__.nc&&c.setAttribute("nonce",__webpack_require__.nc),c.src=function jsonpScriptSrc(e){return __webpack_require__.p+""+({}[e]||e)+"."+{0:"1481adda29b14ebabe75",1:"5029a05215ec41d6d694",2:"1da4095381727d8a8b4a",3:"503eb834d7573b0460f5",4:"4741db3a3a054ee0b5ae",5:"3c4c21d69daab942d2ed",6:"d3501ca687d5a649c0fa",9:"a8a8a52113ec40bc0518",10:"cff97fa8e3d3c0b506a8",11:"9b7ac67e19f2dcfb8218",12:"c28b0db809496d31fc41",13:"7aca082e55e82d464429",14:"10e1633c4f65385128dd",15:"03b666ca9d403267f4ac",16:"7a9a8c8f114067189fdb",17:"588cdf93042af8790505",18:"67ab4dc60c341265639f",19:"bde705c58d1d477c6dc5",20:"1b1892e847c208cbd3a1",21:"c2fcd606a3cac214e8b5",22:"70a0b1630dc82f580426",23:"ae3bb2abd1ca9db9988b",24:"50bbb75c0ab72e58013e",25:"0f2c3503680ffdfb144c",26:"6f3352f2c1a951791465",27:"fc27dcdf08f866bb9d07",28:"2d3968fa1be58f06c5b6",29:"e67f7bb87417b49b8ed0",30:"6a030c10ab3cb6258fa8",31:"7e0ae9c4fe2b20bfbf9c",32:"cb33acfc918c1d0ac8e9",33:"fd78fe4cdca0c8ad664a"}[e]+".js"}(e);var s=new Error;i=function(t){c.onerror=c.onload=null,clearTimeout(u);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+a+": "+o+")",s.name="ChunkLoadError",s.type=a,s.request=o,n[1](s)}r[e]=void 0}};var u=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(t)},__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,n){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(__webpack_require__.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)__webpack_require__.d(n,r,function(t){return e[t]}.bind(null,r));return n},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="/includes/js/dist/",__webpack_require__.oe=function(e){throw console.error(e),e};var o=window.webpackJsonp=window.webpackJsonp||[],i=o.push.bind(o);o.push=webpackJsonpCallback,o=o.slice();for(var c=0;c<o.length;c++)webpackJsonpCallback(o[c]);var s=i;a.push([406,8]),checkDeferredModules()}({375:function(e,t){window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach)},398:function(e,t){},406:function(e,t,n){"use strict";n.r(t);var r=n(57),a=n.n(r),o=n(25),i=n(58),c=n.n(i),s=(n(189),n(375),n(168)),u=n(29),d=n(1),l=n(75),f=n(32),b=n(169);u.c.add(l.b,l.c,l.a,d.n,d.m,d.D,d.E,d.M,d.K,d.i,d.F,d.O,d.q,d.C,d.I,d.w,d.x,d.N,d.G,f.a,f.b,d.A,d.k,d.L,d.h,d.B,d.p,d.l,d.o,d.c,d.e,d.v,d.z,d.r,d.u,d.j,d.s,d.g,d.f,d.J,d.t,d.H,d.d,d.a,d.b,d.y,f.g,f.d,f.e,f.c,f.f,b.a);var p=n(170),_={App:function App(){return Promise.all([n.e(0),n.e(3),n.e(28)]).then(n.bind(null,657))},Search:function Search(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(21)]).then(n.bind(null,658))},Profile:function Profile(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(4),n.e(10)]).then(n.bind(null,651))},UserEdit:function UserEdit(){return Promise.all([n.e(0),n.e(32),n.e(29)]).then(n.bind(null,662))},UserList:function UserList(){return Promise.all([n.e(0),n.e(25)]).then(n.bind(null,661))},Settings:function Settings(){return Promise.all([n.e(0),n.e(14)]).then(n.bind(null,663))},Calendar:function Calendar(){return Promise.all([n.e(0),n.e(1),n.e(27)]).then(n.bind(null,656))},PdfViewer:function PdfViewer(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(5),n.e(18)]).then(n.bind(null,646))},CustomPage:function CustomPage(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(6),n.e(11)]).then(n.bind(null,655))},Firstlogin:function Firstlogin(){return Promise.all([n.e(0),n.e(33)]).then(n.bind(null,664))},MeetingPage:function MeetingPage(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(9)]).then(n.bind(null,652))},PetitionPage:function PetitionPage(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(13)]).then(n.bind(null,659))},SubmissionPage:function SubmissionPage(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(24)]).then(n.bind(null,665))},PetitionOverview:function PetitionOverview(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(16)]).then(n.bind(null,564))},AgendaItemSidebar:function AgendaItemSidebar(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(26)]).then(n.bind(null,566))},StartPageVotables:function StartPageVotables(){return Promise.all([n.e(1),n.e(2),n.e(31)]).then(n.bind(null,666))},UserAdministration:function UserAdministration(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(23)]).then(n.bind(null,660))},StartPageLiveInfos:function StartPageLiveInfos(){return Promise.all([n.e(1),n.e(2),n.e(30)]).then(n.bind(null,667))},OrganizationDetails:function OrganizationDetails(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(12)]).then(n.bind(null,668))},GroupAdministration:function GroupAdministration(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(22)]).then(n.bind(null,669))},MeetingAdminOverview:function MeetingAdminOverview(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(3),n.e(15)]).then(n.bind(null,653))},CustomPageAdminOverview:function CustomPageAdminOverview(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(6),n.e(20)]).then(n.bind(null,670))}},m=n(166),w=n.n(m),h=n(167),g=n.n(h),v="/webservice-mobile/webservice.php",y=function(){function WebserviceClient(e){w()(this,WebserviceClient),this.params={json:!0,system:"ris",platform:"ris",v:"v3.0"},e&&null!==e&&""!==e&&(this.params.transid=e),this.instance=c.a.create({baseURL:v,params:this.params})}return g()(WebserviceClient,[{key:"getPath",value:function getPath(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=Object.keys(this.params).map((function(t){return"".concat(t,"=").concat(e.params[t])})).join("&");return null!==t&&(n+="&".concat(Object.keys(t).map((function(e){return"".concat(e,"=").concat(t[e])})).join("&"))),"".concat(v,"?").concat(n)}},{key:"post",value:function post(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=new FormData,a=function _loop(t){Object.prototype.hasOwnProperty.call(e,t)&&(Array.isArray(e[t])?0===e[t].length?r.append("".concat(t),[]):e[t].forEach((function(e){e instanceof File?r.append("".concat(t,"[]"),e):r.append("".concat(t,"[]"),"string"==typeof e?e:JSON.stringify(e))})):r.append(t,e[t]))};for(var o in e)a(o);return new Promise((function(e,a){t.instance.post("",r,n).then((function(t){void 0===t.data[0]||void 0===t.data[0].ErrorCode?e(t):e({data:[]})})).catch((function(e){a(e)}))}))}},{key:"get",value:function get(e){var t=this;return new Promise((function(n,r){t.instance.get("",{params:e}).then((function(e){void 0===e.data[0]||void 0===e.data[0].ErrorCode?n(e):n({data:[]})})).catch((function(e){r(e)}))}))}},{key:"refreshTransId",value:function refreshTransId(e){this.params.transid=e}}]),WebserviceClient}(),S=n(112),P=n.n(S),O=n(110);function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach((function(t){a()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}o.default.use(O.a);var E=new O.a.Store({state:{chromeBinaryCallable:!1,screen_type:"",user:{},meeting:{},userSettings:{agendaItemCompact:!1,collapseCustomPageSidebar:!1,pdfViewerZoomScale:1}},mutations:{SET_SCREEN_TYPE:function SET_SCREEN_TYPE(e,t){e.screen_type=t},SET_CURRENT_MEETING:function SET_CURRENT_MEETING(e,t){e.meeting=t},SET_USER_SETTINGS:function SET_USER_SETTINGS(e,t){for(var n=0,r=Object.entries(t);n<r.length;n++){var a=r[n],o=P()(a,2),i=o[0],c=o[1];e.userSettings[i]=c}}},actions:{setScreenType:function setScreenType(e,t){(0,e.commit)("SET_SCREEN_TYPE",t),console.log("setting screen type to",t)},setCurrentMeeting:function setCurrentMeeting(e,t){(0,e.commit)("SET_CURRENT_MEETING",t)},loadUserSettings:function loadUserSettings(e){var t=e.commit,n=localStorage.getItem("userSettings");null!==n&&t("SET_USER_SETTINGS",_objectSpread(_objectSpread({},this.state.userSettings),JSON.parse(n)))},setUserSettings:function setUserSettings(e,t){(0,e.commit)("SET_USER_SETTINGS",_objectSpread(_objectSpread({},this.state.userSettings),t)),localStorage.setItem("userSettings",JSON.stringify(this.state.userSettings))}},getters:{isAuthenticated:function isAuthenticated(e){return void 0!==e.user&&void 0!==e.user.id}}});n(405);function main_ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function main_objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?main_ownKeys(Object(n),!0).forEach((function(t){a()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):main_ownKeys(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}if(o.default.component("font-awesome-icon",p.a),window.eventBus=new o.default,o.default.prototype.eventBus=window.eventBus,o.default.prototype.$http=c.a.create({baseURL:"/webservice-mobile/webservice.php"}),o.default.prototype.$webservice=new y(window.transId),1===window.settings[9025]||1===window.settings[9038]){var j=!1;(window.location.host.includes("192.168")||window.location.host.includes("localhost")||window.location.host.includes("ris.test"))&&(j=!0);var k=j?"http://localhost:3000":"https://socket.gremien.info",T="vhost=".concat(window.location.host);window.transId&&(T+="&transid=".concat(window.transId)),window.userId&&(T+="&user_id=".concat(window.userId)),window.socket=s(k,{query:T})}document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll("[component]");e.length&&e.forEach((function(e){var t=e.attributes.component.value.split("__")[0];if(_[t]){var n={props:window.components[e.attributes.component.value].props};e.innerHTML&&(n.domProps={innerHTML:e.innerHTML}),window.components[e.attributes.component.value].vuex&&E.replaceState(main_objectSpread(main_objectSpread({},E.state),window.components[e.attributes.component.value].vuex)),new o.default({store:E,el:e,render:function render(e){return e(_[t],n)}})}else console.warn("Component with name '".concat(t,"' was found in the DOM, but was not registered in components.js!"))}));var t=document.getElementById("app");null!=t&&new o.default({store:E,el:"#app",render:function render(e){return e(_.App)}})}))}});