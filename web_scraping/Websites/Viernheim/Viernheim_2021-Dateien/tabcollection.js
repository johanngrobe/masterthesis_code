function prepareTablist(){$SST.each($SST.find("[id*=a-tablink]"),function(){$SST(this).on("click",function(){return showTab(this.id.split("-")[2]),!1}),$SST(this).attr("aria-selected",$SST(this).hasClass("active"))})}function showTab(a){$SST("#a-tablink-"+a).parent().parent().parent().find(".active").each(function(){this.className="inactive",$SST(this).attr("aria-selected",!1)}),$SST("#a-tablink-"+a).toggleClass("active inactive"),$SST("#div-tabbody-"+a).toggleClass("active inactive"),$SST("#a-tablink-"+a).attr("aria-selected",$SST("#a-tablink-"+a).hasClass("active"))}$SST(document).ready(prepareTablist);