/*1676284974000*/
var pdfName=null;var currentDocUrl=null;var pspdfkitInstance=null;var xClicked=false;var disabledPages=null;var saveClicked=false;var saveButtonClicked=true;
function loadPDF(docUrl,annotationUrl,viewerObj){$(".close").on("click",function(){$("body").removeClass("pspdfkit-open")});$("#addFavoriteDoc").hide();$("#lastUpdated").hide();if(JSON.parse(viewerObj.useViewer)){$("body").addClass("pspdfkit-open");$("#pdfviewerModal").modal();$("#pdfviewer").css({"height":"calc(100vh - 120px)","width":"100%"}).html("");$("#pdfviewerModalLabel").html(viewerObj.documentName);$("#addFavoriteDoc").data("entity-id",viewerObj.documentId);$("#addFavoriteDoc").data("sessionid",
viewerObj.sessionid)}else{window.open(docUrl);return}currentDocUrl=docUrl;var psPdfconfig=getPsPdfKitConfig(viewerObj.imgPath,viewerObj.cssPath,viewerObj.licenseKey,docUrl);PSPDFKit.load(psPdfconfig).then(function(instance){pspdfkitInstance=instance;instance.addEventListener("annotations.didSave",function(){instance.exportInstantJSON().then(function(instantJSON){handleAnnotation(docUrl,annotationUrl,false,"setAnnotation",instantJSON,viewerObj)})});instance.addEventListener("bookmarks.didSave",function(){instance.exportInstantJSON().then(function(instantJSON){handleAnnotation(docUrl,
annotationUrl,false,"setAnnotation",instantJSON,viewerObj)})});["annotations.update","annotations.delete","annotations.create","bookmarks.update","bookmarks.delete","bookmarks.create"].forEach(function(event){instance.addEventListener(event,function(annotations){toggleSaveButton(false)})});instance.addEventListener("viewState.currentPageIndex.change",function(pageIndex){if(typeof disabledPages!=="undefined"&&disabledPages.includes(pageIndex))disableAnnotations(pageIndex)});handleAnnotation(docUrl,
annotationUrl,instance,"getAnnotation",false,viewerObj)}).catch(function(error){console.log(error);$("#pdfviewerModal").modal("toggle");PSPDFKit.unload("#pdfviewer");window.open(docUrl)})}
function handleAnnotation(docUrl,annotationUrl,instance,action,instantJSON,viewerObj){var annotationCsrfToken=$("#annotation-token").val();var options={};options[viewerObj.portletNamespace+"action"]=action;options[viewerObj.portletNamespace+"annotation"]=JSON.stringify(instantJSON);options[viewerObj.portletNamespace+"schriftgutId"]=viewerObj.documentId;options[viewerObj.portletNamespace+"ris-csrf-token"]=annotationCsrfToken;$.ajax({url:annotationUrl,method:"POST",dataType:"json",cache:false,data:options}).done(function(response,
status,xhr){if(!instantJSON){$("#annotation-token").val(response.annotationCsrfToken);pdfName=response.docName;if(!response.isCompleteDocument){$("#addFavoriteDoc").data("csrf-token",response.favoritCsrfToken);toggleFavoriteClass("addFavoriteDoc",response.isFavorit);$("#lastUpdated").html(response.lastUpdated);$("#lastUpdated").show()}else $("#lastUpdated").hide();disabledPages=response.disabledPages;if(response.hasOwnProperty("disabledPages")&&response.disabledPages.length)disableAnnotations(0);
var jsonAnnotation=response.jsonAnnotation;try{if("annotations"in jsonAnnotation){for(var i=0;i<jsonAnnotation.annotations.length;i++){var annotation=PSPDFKit.Annotations.fromSerializableObject(jsonAnnotation.annotations[i]);instance.createAnnotation(annotation)}instance.saveAnnotations()}if("bookmarks"in jsonAnnotation){for(var i=0;i<jsonAnnotation.bookmarks.length;i++){jsonAnnotation.bookmarks[i].action=new PSPDFKit.Actions.GoToAction(jsonAnnotation.bookmarks[i].action);var bookmark=new PSPDFKit.Bookmark(jsonAnnotation.bookmarks[i]);
instance.createBookmark(bookmark)}instance.saveBookmarks()}}catch(e){console.log(action+" error json: ",e)}}else if(instantJSON){if(xClicked&&saveClicked){PSPDFKit.unload("#pdfviewer");xClicked=false;saveClicked=false}if(saveButtonClicked){toggleSaveButton(true);setCursorToArrow();saveButtonClicked=false}}}).fail(function(xhr,status,thrown){$("#pdfviewerModal").modal("toggle");PSPDFKit.unload("#pdfviewer");window.open(docUrl)})}
function handleFavorites(url,elementId,type,entityId,sessionId,favCsrfToken,portletNamespace){var options={};options[portletNamespace+"type"]=type;options[portletNamespace+"entityId"]=entityId;options[portletNamespace+"sitzungId"]=sessionId;options[portletNamespace+"ris-csrf-token"]=favCsrfToken;$.ajax({url:url,dataType:"json",data:options,success:function(response){toggleFavoriteClass(elementId,response.isFavorit);Liferay.Portlet.refresh("#p_p_id_RisFavorit_")},error:function(){console.log("error occured setting favorite. type: "+
type+", entityId: "+entityId)}})}function toggleFavoriteClass(elementId,isFavorit){if(isFavorit){$("#"+elementId+" SPAN.fa-star").removeClass("far").addClass("fas");$("#"+elementId+" SPAN.fav-text").text("Favorit entfernen")}else{$("#"+elementId+" SPAN.fa-star").removeClass("fas").addClass("far");$("#"+elementId+" SPAN.fav-text").text("Favorit setzen")}$("#"+elementId).show()}
function disableAnnotations(pageIndex){var iframe=$(".PSPDFKit-Container IFRAME");var pageElement=iframe.contents().find('[data-page-index\x3d"'+pageIndex+'"]')[0];var pageStyle=pageElement.getAttribute("style");pageStyle+=" pointer-events: none;";pageElement.setAttribute("style",pageStyle)}
$(".favorite-document").click(function(){var type=$(this).data("type");var entityId=$(this).data("entity-id");var sessionId=$(this).data("sessionid");var resourceUrl=$(this).data("href");var namespace=$(this).data("namespace");var elementId=$(this).attr("id");var favCsrfToken=$(this).data("csrf-token");handleFavorites(resourceUrl,elementId,type,entityId,sessionId,favCsrfToken,namespace)});
$("#pdfviewerModal").on("hidden.bs.modal",function(){saveButtonClicked=true;xClicked=true;if(pspdfkitInstance!=null&&pspdfkitInstance.hasUnsavedAnnotations())$("#saveModal").modal("show");else PSPDFKit.unload("#pdfviewer")});$("#saveModal .save-button").click(function(){saveClicked=true;pspdfkitInstance.saveAnnotations();$("#saveModal").modal("hide")});$("#saveModal .close-button").click(function(){PSPDFKit.unload("#pdfviewer")});$("#saveModal .ris-modal-header button").click(function(){PSPDFKit.unload("#pdfviewer")});
$("#saveModal .abort-button").click(function(){$("#pdfviewerModal").modal("show")});
$("#decisionModal .edit-button").click(function(){var annotation=$(".ris-modal-body #pspdf-annotation").val();var documentUrl=$(".ris-modal-body #pspdf-documentUrl").val();var viewerObj={"useViewer":"true","licenseKey":$(".ris-modal-body #pspdf-licenseKey").val(),"isSignedIn":$(".ris-modal-body #pspdf-isSignedIn").val(),"portletNamespace":$(".ris-modal-body #pspdf-portletNamespace").val(),"cssPath":$(".ris-modal-body #pspdf-cssPath").val(),"imgPath":$(".ris-modal-body #pspdf-imgPath").val(),"sessionid":$(".ris-modal-body #pspdf-sessionid").val(),
"documentName":$(".ris-modal-body #pspdf-documentName").val(),"documentId":$(".ris-modal-body #pspdf-documentId").val(),"isFavorite":$(".ris-modal-body #pspdf-isFavorite").val()};loadPDF(documentUrl,annotation,viewerObj);$("#decisionModal").modal("hide")});$("#decisionModal .download-button").click(function(){window.open($(".ris-modal-body #pspdf-documentUrl").val());$("#decisionModal").modal("hide")});
function getPsPdfKitConfig(imgPath,cssPath,pspdfLicenseKey,docUrl){PSPDFKit.Options.INK_EPSILON_RANGE_OPTIMIZATION=0;PSPDFKit.Annotations.InkAnnotation.defaultValues.lineWidth=2;var items=[{type:"sidebar-thumbnails"},{type:"sidebar-document-outline"},{type:"sidebar-annotations"},{type:"sidebar-bookmarks"},{type:"pager"},{type:"pan"},{type:"zoom-out"},{type:"zoom-in"},{type:"zoom-mode"},{type:"spacer"},{type:"annotate"},{type:"ink"},{type:"highlighter"},{type:"ink-eraser"},{type:"note"},{type:"text"},
{type:"line"},{type:"arrow"},{type:"rectangle"},{type:"ellipse"},{type:"polygon"},{type:"polyline"},{type:"print"},{type:"search"}];var downloadButton={type:"custom",id:"download-pdf",icon:imgPath+"/download-icon.svg",title:"Download mit Notizen",dropdownGroup:"download-group",onPress:function(event,id){pspdfkitInstance.saveAnnotations();exportPDF()}};var rotateButton={type:"custom",id:"rotate-pdf",icon:imgPath+"/rotate-icon-white.svg",title:"Dokument um 90\u00b0 im Uhrzeigersinn drehen",onPress:function(event,
id){var state=pspdfkitInstance.viewState;var newState=state.rotateRight();pspdfkitInstance.setViewState(newState)}};var downloadButtonNA={type:"custom",id:"download-pdf-without",icon:imgPath+"/download-icon.svg",title:"Download ohne Notizen",dropdownGroup:"download-group",onPress:function(event,id){downloadPdf(currentDocUrl,pdfName)}};var toolbarSaveButton={type:"custom",id:"save-pdf",icon:imgPath+"/save-icon-white.svg",disabled:true,title:"Speichern",onPress:function(event,id){saveButtonClicked=
true;pspdfkitInstance.saveBookmarks();pspdfkitInstance.saveAnnotations()}};items.push(downloadButton);items.push(rotateButton);items.push(downloadButtonNA);items.push(toolbarSaveButton);var disableTextSelection=false;var preventTextCopy=false;var configuration={container:"#pdfviewer",locale:"de",document:docUrl,licenseKey:pspdfLicenseKey,autoSaveMode:PSPDFKit.AutoSaveMode.DISABLED,disableWebAssembly:true,styleSheets:[cssPath+"/pspdf/custom.css"],toolbarItems:items,disableTextSelection:disableTextSelection,
preventTextCopy:preventTextCopy,theme:PSPDFKit.Theme.DARK};var isSupported=isWasmSupported();if(isSupported){configuration["disableWebAssembly"]=false;configuration["disableWebAssemblyStreaming"]=true}return configuration}
function exportPDF(){var fileName=pdfName;pspdfkitInstance.exportPDF().then(function(buffer){const supportsDownloadAttribute=HTMLAnchorElement.prototype.hasOwnProperty("download");const blob=new Blob([buffer],{type:"application/pdf"});if(navigator.msSaveOrOpenBlob)navigator.msSaveOrOpenBlob(blob,fileName);else if(!supportsDownloadAttribute){const reader=new FileReader;reader.onloadend=function(){const dataUrl=reader.result;downloadPdf(dataUrl,fileName)};reader.readAsDataURL(blob)}else{const objectUrl=
window.URL.createObjectURL(blob);downloadPdf(objectUrl,fileName);window.URL.revokeObjectURL(objectUrl)}})}function downloadPdf(blob,fileName){const a=document.createElement("a");a.href=blob;a.style.display="none";a.download=fileName;a.setAttribute("download",fileName);document.body.appendChild(a);a.click();document.body.removeChild(a)}
function isWasmSupported(){try{if(typeof WebAssembly==="object"&&typeof WebAssembly.instantiate==="function"){const module=new WebAssembly.Module(Uint8Array.of(0,97,115,109,1,0,0,0));if(module instanceof WebAssembly.Module)return new WebAssembly.Instance(module)instanceof WebAssembly.Instance}}catch(e){}return false}
function toggleSaveButton(disabled){var items=pspdfkitInstance.toolbarItems;items.find(function(item){return item.id=="save-pdf"}).disabled=disabled;pspdfkitInstance.setToolbarItems(items)}function setCursorToArrow(){var state=pspdfkitInstance.viewState;var newState=state.set("interactionMode",null);pspdfkitInstance.setViewState(newState)}
function handleIFrame(isSignedIn){var pspdfIframe=$("#pdfviewer IFRAME");var cssVars=$("#rootvars").clone();pspdfIframe.contents().find("HEAD").append(cssVars);pspdfIframe.addClass(isSignedIn);if(isSignedIn==="false")pspdfIframe.contents().find("DIV.PSPDFKit-Toolbar").remove()};