jQuery(function($){var _rys=jQuery.noConflict();_rys("document").ready(function(){_rys(window).scroll(function(){if(_rys(this).scrollTop()>50){_rys('#sp-header-wrapper').addClass("f-sp-header-wrapper");$('#sp-header-wrapper').data('size','small');}else{_rys('#sp-header-wrapper').removeClass("f-sp-header-wrapper");$('#sp-header-wrapper').data('size','big');}});});var native_width=0;var native_height=0;$(".magnify-zoom").css("background","url('"+$(".small").attr("src")+"') no-repeat");$(".magnify").mousemove(function(e){if(!native_width&&!native_height)
{var image_object=new Image();image_object.src=$(".small").attr("src");native_width=image_object.width;native_height=image_object.height;}
else
{var magnify_offset=$(this).offset();var mx=e.pageX-magnify_offset.left;var my=e.pageY-magnify_offset.top;if(mx<$(this).width()&&my<$(this).height()&&mx>0&&my>0)
{$(".magnify-zoom").fadeIn(100);}
else
{$(".magnify-zoom").fadeOut(100);}
if($(".magnify-zoom").is(":visible"))
{var rx=Math.round(mx/$(".small").width()*native_width-$(".magnify-zoom").width()/2)*-1;var ry=Math.round(my/$(".small").height()*native_height-$(".magnify-zoom").height()/2)*-1;var bgp=rx+"px "+ry+"px";var px=mx-$(".magnify-zoom").width()/2;var py=my-$(".magnify-zoom").height()/2;$(".magnify-zoom").css({left:px,top:py,backgroundPosition:bgp});}}})
_rys(document).ready(function(){_ryswindow=_rys(window);_rys('#horizon[data-type="background"]').each(function(){var _rysbgobj=_rys(this);_rys(window).scroll(function(){var yPos=-(_ryswindow.scrollTop()/_rysbgobj.data('speed'));var coords=yPos+'px';_rysbgobj.css({backgroundPosition:coords});});});});_rys(document).ready(function(){_ryswindow=_rys(window);_rys('#vertical[data-type="background"]').each(function(){var _rysbgobj=_rys(this);_rys(window).scroll(function(){var yPos=-(_ryswindow.scrollTop()/_rysbgobj.data('speed'));var coords='50% '+yPos+'px';_rysbgobj.css({backgroundPosition:coords});});});});});