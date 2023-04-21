/**
 * JS-Funktionen fuer landkreis-heilbronn.de
 *
 * seitenblick interaktive medien gmbh
 * e-Mail : info@seitenblick.de
 *
 * Version: 1.0
 */

/**
 * Name           : isMobile
 * Beschreibung   : Mobilgerät-Erkennung
 * Parameter      : -
 * Rückgabe       : -
 * Bibliothek     : https://github.com/kaimallea/isMobile
*/
 
 !function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,i=/IEMobile/i,j=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/(CriOS|Chrome)(?=.*\bMobile\b)/i,o=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,p=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),q=function(a,b){return a.test(b)},r=function(a){var r=a||navigator.userAgent,s=r.split("[FBAN");return"undefined"!=typeof s[1]&&(r=s[0]),this.apple={phone:q(b,r),ipod:q(c,r),tablet:!q(b,r)&&q(d,r),device:q(b,r)||q(c,r)||q(d,r)},this.amazon={phone:q(g,r),tablet:!q(g,r)&&q(h,r),device:q(g,r)||q(h,r)},this.android={phone:q(g,r)||q(e,r),tablet:!q(g,r)&&!q(e,r)&&(q(h,r)||q(f,r)),device:q(g,r)||q(h,r)||q(e,r)||q(f,r)},this.windows={phone:q(i,r),tablet:q(j,r),device:q(i,r)||q(j,r)},this.other={blackberry:q(k,r),blackberry10:q(l,r),opera:q(m,r),firefox:q(o,r),chrome:q(n,r),device:q(k,r)||q(l,r)||q(m,r)||q(o,r)||q(n,r)},this.seven_inch=q(p,r),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},s=function(){var a=new r;return a.Class=r,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=r:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=s():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=s()):a.isMobile=s()}(this);

 
/**
 * Name           : IE HTML5 Fix
 * Beschreibung   : Bringt dem IE < 9 HTML5-Elemente bei
 * Parameter      : -
 * Rückgabe       : -
 * Bibliothek     : Nativ
*/
  "'article aside footer header nav section time'".replace(/\w+/g,function(n){document.createElement(n)})

  
/**
 * Name           : Picture element HTML5 shiv
 * Beschreibung   : HTML5 Elemente für IE8
 * Parameter      : -
 * Rückgabe       : -
 * Bibliothek     : Nativ
*/     
  document.createElement( "picture" );
      

$( document ).ready(function() {

  /**
   * Speichert die Fensterbreite um zwischen Ändern der Höhe und Breite des Fensters zu unterscheiden
  */
  var windowWidth = 0;

  /**
   * Name           : 
   * Beschreibung   : Funktionen die bei Resize ausgeführt werden müssen
   * Parameter      : -
   * Rückgabe       : -
   * Bibliothek     : jQuery
  */  
  $(window).resize(function() {
	// Wenn die Breite gleich ist, muss das Menü nicht geändert werden
    if ($(window).width() == windowWidth) {
      return;
    }

    windowWidth = $(window).width();

    if(!isMobile.apple.device) {  
      showStickyNav();
    }
    mobileNav();
    desktopNavLvlOne();
  });



  /**
   * Name           : FirstWord
   * Beschreibung   : Erstes Wort in der Navi wird fett dargestellt
   * Parameter      : Klasse des Elements
   * Rückgabe       : -
   * Bibliothek     : jQuery
  */
    $('.fws').each(function() {
    var text = $(this).text().trim().split(" ");
    var first = text.pop();
    $(this).replaceWith((text.length > 0 ? "<span class='firstWord'>"+ text[0] + "</span> " +first : first));
  });

  
  /**
   * Name           : StickyNavigation
   * Beschreibung   :
   * Parameter      : -
   * Rückgabe       : -
   * Bibliothek     : jQuery
  */
  function showStickyNav(){
    $(window).scroll(function () {
      if (($(this).scrollTop() > 70) && ($(window).width() >= 1200)) {
        $('.navbar').prependTo('.stickynav .container');
        $('.stickynav').fadeIn();
      } else {
        $('.navbar').prependTo('.navi_normal');
        $('.stickynav').fadeOut();
      }
    });
  }
  if(!isMobile.apple.device) {  
    showStickyNav(); 
  }

  
  /**
   * Name           : Desktop-Navi Ebene 1
   * Beschreibung   : hier sollen die gesetzen Links greifen und keine Subnavi aufgeklappt werden
   * Parameter      : -
   * Rückgabe       : -
   * Bibliothek     : jQuery
  */  
  function desktopNavLvlOne(){
    if($(window).width() >= 1200) {
      $('.firstlevel a').click(function(event){
        var a_href = $(this).attr('href');
        window.location = a_href;
      });
    }
  }
  desktopNavLvlOne();  

  
  /**
   * Name           : Mobilnavigation
   * Beschreibung   : Darstellung und Anpassungen Mobilnavigation
   * Parameter      : -
   * Rückgabe       : -
   * Bibliothek     : jQuery
  */
  function mobileNav(){
    if($(window).width() < 1200) {
      $('.navbar').addClass("navbar-fixed-top");
    }
    else{
      $('.navbar').removeClass("navbar-fixed-top");
    }
  }
  mobileNav();
  
  /*--- Markierung des aktiven Navibaums fuer mobile Navigation ---------------------------------*/
  $('.navi_normal li.active').parents('li').addClass('active');


  /*--- Mobile Navigation schließen --------------------------------------------------------------*/
  $('.closenavi').click( function(){
     $('button.navbar-toggle').click();
  }); 

  
  /**
   * Name           : Breadcrumb Mobil
   * Beschreibung   : Erzeugen einer mobilen Breadcrumb in der Navi
   * Parameter      : -
   * Rückgabe       : -
   * Bibliothek     : jQuery
  */
  function ellipses() {
    ellipses1 = $("#bc1 :nth-child(2)")
    if ($("#bc1 a:hidden").length >0) {ellipses1.show()} else {ellipses1.hide()}

    ellipses2 = $("#bc2 :nth-child(2)")
    if ($("#bc2 a:hidden").length >0) {ellipses2.show()} else {ellipses2.hide()}
  }
  ellipses();
  $(window).resize(ellipses());
  
 
  /**
   * Name           : jQuery UI Autocomplete
   * Beschreibung   : Autosuggest für die Suche mit HTML-Ausgabe im Dropdown
   * Parameter      : -
   * Rückgabe       : -
   * Bibliothek     : jQuery, jQueryUI
   * Link: http://salman-w.blogspot.com/2013/12/jquery-ui-autocomplete-examples.html
  */ 
  $(function() {
    /*Funktion fürs Highlighten des Textes bei der Sucheingabe*/
    function highlightText(text, $node) {
      var searchText = $.trim(text).toLowerCase(), currentNode = $node.get(0).firstChild, matchIndex, newTextNode, newSpanNode;
      while ((matchIndex = currentNode.data.toLowerCase().indexOf(searchText)) >= 0) {
        newTextNode = currentNode.splitText(matchIndex);
        currentNode = newTextNode.splitText(searchText.length);
        newSpanNode = document.createElement("span");
        newSpanNode.className = "highlight";
        currentNode.parentNode.insertBefore(newSpanNode, currentNode);
        newSpanNode.appendChild(newTextNode);
      }
    }
    $("#autocomplete1").autocomplete({
      delay: 500,
      minLength: 2,
      source: function(request, response) {
        $.getJSON("http://relaunch.landkreis-heilbronn.de/api/SearchApi.php", {
          term: request.term
        }, function(data) {
          // data is an array of objects and must be transformed for autocomplete to use
          var array = data.error ? [] : $.map(data, function(m) {
            if((m.image) != null){
             thumbnail = m.image.url;
            }
            else{
              thumbnail = "";
            }
            return {
              label: m.title,
              id: m.id,
              thumbnail: thumbnail,
              url: "sixcms/detail.php?id=" + m.id,
            };
          });
          response(array);
        });
      },
      focus: function(event, ui) {
        // prevent autocomplete from updating the textbox
        event.preventDefault();
      },
      select: function(event, ui) {
        // prevent autocomplete from updating the textbox
        event.preventDefault();
        // navigate to the selected item's url
        window.open(ui.item.url);
      }
    }).data("ui-autocomplete")._renderItem = function(ul, item) {
      
      /*--- Ausgabe -----------------------------------/      
      /*Titel wird in a-Tag gewrappt und in $a zwischengespeichert*/
      var $a = $("<a></a>").text(item.label);
      /*Aufruf der Highlight-Funktion um eingegebenen Text im Title zu markieren*/
      highlightText(this.term, $a);
      /*Wenn im JSON-File für den Treffer auch ein Thumbnail hinterlegt ist - bitte ebenfalls mit den entsprechenden Formatierungen an $a anhängen*/
      if (item.thumbnail) {
       var $thumb = $("<span class='thumbnail'><img src='"+ item.thumbnail +"' /></span>").appendTo($a);
      }
      /*Die Ausgabeelemente werden formatiert und ebenfals an $a angehängt*/
      $("<span class='m-year'></span>").text(item.id).appendTo($a);

      /*Das vollständige Element ($a) wird in <li>-Tags gewrappt und zurückgegeben (für Ausgabe)*/
      return $("<li style='min-height: 45px;'></li>").append($a).appendTo(ul);
    };
    
    $("#autocomplete2").autocomplete({
      delay: 500,
      minLength: 2,
      source: function(request, response) {
        $.getJSON("http://relaunch.landkreis-heilbronn.de/api/SearchApi.php", {
          term: request.term
        }, function(data) {
          // data is an array of objects and must be transformed for autocomplete to use
          var array = data.error ? [] : $.map(data, function(m) {
            if((m.image) != null){
             thumbnail = m.image.url;
            }
            else{
              thumbnail = "";
            }
            return {
              label: m.title,
              id: m.id,
              thumbnail: thumbnail,
              url: "detail.php?id=" + m.id,
            };
          });
          response(array);
        });
      },
      focus: function(event, ui) {
        // prevent autocomplete from updating the textbox
        event.preventDefault();
      },
      select: function(event, ui) {
        // prevent autocomplete from updating the textbox
        event.preventDefault();
        // navigate to the selected item's url
        window.open(ui.item.url,'_self');
      }
    }).data("ui-autocomplete")._renderItem = function(ul, item) {
      
      /*--- Ausgabe -----------------------------------/      
      /*Titel wird in a-Tag gewrappt und in $a zwischengespeichert*/
      var $a = $("<a></a>").text(item.label);
      /*Aufruf der Highlight-Funktion um eingegebenen Text im Title zu markieren*/
      highlightText(this.term, $a);
      /*Wenn im JSON-File für den Treffer auch ein Thumbnail hinterlegt ist - bitte ebenfalls mit den entsprechenden Formatierungen an $a anhängen*/
      if (item.thumbnail) {
       var $thumb = $("<span class='thumbnail'><img src='"+ item.thumbnail +"' /></span>").appendTo($a);
      }
      /*Die Ausgabeelemente werden formatiert und ebenfals an $a angehängt*/
      $("<span class='m-year'></span>").text(item.id).appendTo($a);

      /*Das vollständige Element ($a) wird in <li>-Tags gewrappt und zurückgegeben (für Ausgabe)*/
      return $("<li style='min-height: 45px;'></li>").append($a).appendTo(ul);
    };    
  });  


  /**
   * Name           : bxSlider
   * Beschreibung   : Initialisierung des bxSliders auf der Startseite
   * Parameter      : Klasse des Slider-Elements
   * Rückgabe       : -
   * Bibliothek     : jQuery, bxSlider (jquery.bxslider.min.js)
  */
  $('.bxslider').bxSlider({
    adaptiveHeight: true,
    useCSS: false,
    auto: true,
    pagerCustom: '#bx-pager'
  });

  
  /**
   * Name           : owlCarousel
   * Beschreibung   : Carousellösung für Bildergalerie
   * Parameter      : Klasse des owlCarousel-Elements
   * Rückgabe       : -
   * Bibliothek     : jQuery, owlCarousel (owl.carousel.min.js)
  */
  $('.owl-carousel').owlCarousel({
    loop: true,
    dots: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      480: {
        items: 2,
        nav: false
      },
      768: {
        items: 3,
        nav: false
      },
      992: {
        items: 4,
        nav: false,
        loop: false,
        margin: 20
      }
    }
  });

  
  /**
   * Name           : MagnificPopup
   * Beschreibung   : PopUps und Lightbox für Artikelbilder, Hinweise und Formulare
   * Parameter      : Klasse des Elements
   * Rückgabe       : -
   * Bibliothek     : jQuery, Magnific Popup (magnific_min.js)
  */
  var groups = {};
  $('.mfp').each(function() {
    var id = parseInt($(this).attr('data-group'), 10);

    if(!groups[id]) {
      groups[id] = [];
    }

    groups[id].push( this );
  });

  $.each(groups, function() {

    $(this).magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      gallery: { enabled:true }
    })

  });

  /*--- Popup für Gästebuch und Sperrmüllbörseneintrag ------------------------------------------*/
  $('.popup-with-form').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',

    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      beforeOpen: function() {
        if($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#name';
        }
      }
    }
  });

  /*--- Popup Success ---------------------------------------------------------------------------*/
  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  });

  /*--- Popup für Feedback im Footer ------------------------------------------------------------*/
  $('.mfp-form').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',

    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      beforeOpen: function() {
        if($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#name';
        }
      }
    }
  });
  
  

  /**
   * Name           : Fadeout
   * Beschreibung   : Blendet Hinweisboxen zeitgesteuert wieder aus
   * Parameter      : Klasse des Elements
   * Rückgabe       : -
   * Bibliothek     : jQuery
  */
/*--- Hinweisbox beim Formulargenerator als Erfolgsmeldung -------------------------------------*/
  $(".label-success").css("display","none").delay(200).fadeIn().delay(5000).fadeOut();

/*--- Hinweisbox AGB Tauschbörse ---------------------------------------------------------------*/
  $( ".tos" ).click(function() {
    $( ".termsofservice" ).fadeToggle( "slow", "linear" );
  });

  
  /**
   * Name           : HorizBarChart
   * Beschreibung   : Erzeugt ein Balkendiagramm für die Wahlseite
   * Parameter      : Klasse des Elements
   * Rückgabe       : -
   * Bibliothek     : jQuery, Horizontal Responsive Bar Chart https://github.com/eriku/horizontal-chart
  */
  $('.chart').horizBarChart({
    selector: '.bar',
    speed: 3000
  });

  
  /**
   * Name           : Pflegeheime AJAX-Filter
   * Beschreibung   : Seite bei Auswahl eines Filters per AJAX nachladen
   * Parameter      : Klasse des Elements
   * Rückgabe       : -
   * Bibliothek     : jQuery
  */
  $('#cityselector').on('change', function () {
      var url = $(this).val(); // get selected value
      if (url) { // require a URL
      //var pathname = window.location.pathname; // Returns path only
      //var url      = window.location.href;     // Returns full URL
          window.location = window.location.pathname + '?city=' + url; // redirect
      }
      return false;
  });  


  /**
   * Name           : Pflegeheim-Karte
   * Beschreibung   : Erzeugen einer Karte mit allen Pflegeheimen
   * Parameter      : -
   * Rückgabe       : -
   * Bibliothek     : jQuery, toggleText, Google-Maps
  */  
  var map;
  // Set up the content for the info box
  var infowindow = new google.maps.InfoWindow();
  var marker, i;
  var bounds = new google.maps.LatLngBounds();

  function mapBounds() {
    for (i = 0; i < markers.length; i++) {
      var pos = new google.maps.LatLng(markers[i][1], markers[i][2]);
      bounds.extend(pos);
      marker = new google.maps.Marker({
        position: pos,
        map: map
      });
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          var content = "<div class='infowindow'>" + markers[i][0] + "</div>";
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
    map.fitBounds(bounds);
  }
  /*--- Karte initialisieren --------------------------------------------------------------------*/
  function initializeMaps() {
    var myOptions = {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);

    mapBounds();
  }

  //Map initialisieren, wenn entsprechender Container vorhanden ist
  if($("#map_canvas").length){
    google.maps.event.addDomListener(window, 'load', initializeMaps);
  }

  /*--- Karte auf Klick wieder einblenden -------------------------------------------------------*/
  $('.map').click( function(event){
     event.preventDefault();
     $('#map_canvas').toggle();
     //when you resize the map, you lose yourcenter
     //so you need to get them again here
     c = map.getCenter();

     mapBounds();

     google.maps.event.trigger(map, 'resize');

     //and set the center again here
     map.setCenter(c);
  });

  /*--- Karten-Icon Text tauschen ---------------------------------------------------------------*/
  /* jQuery um Funktion toggleText erweitern */
  jQuery.fn.extend({
    toggleText: function (a, b){
        var isClicked = false;
        var that = this;
        this.click(function (){
            if (isClicked) { that.text(a); isClicked = false; }
            else { that.text(b); isClicked = true; }
        });
        return this;
    }
  });
  $('.icon-map').toggleText("Karte anzeigen", "Karte ausblenden");

  /*--- Accordion bei Klick auf Kartenlink oeffnen ----------------------------------------------*/
  $(document.body).on('click', '.maplink', function(event){
    event.preventDefault();
    /*href auslesen*/
    var a_href = $(this).attr('href'); 
    /*alle Accordeon-Tabs schließen*/
    $('.accordion').find('.accordion-body').collapse('hide');  
    /*ausgewählten Tab öffenen*/
    $(a_href).collapse('show');
    /*an Position des geöffneten Tabs scrollen*/
    $('html, body').animate({
        scrollTop: $(a_href).offset().top -110
    }, 1000);
  });
 

  /**
   * Name           : Tauschbörse AJAX-Filter
   * Beschreibung   : Seite bei Auswahl eines Filters per AJAX nachladen
   * Parameter      : -
   * Rückgabe       : -
   * Bibliothek     : jQuery
  */
  $(function(){
    $("#FilterCat").change(function(){
      var url = window.location.href;
      var cleanurl = window.location.href.split('?')[0];      
      newurl = addParam(cleanurl,"cat", this.value);
      window.location.replace(newurl);
    });
  });
  function addParam(url, param, value) {
     var a = document.createElement('a'), regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/g;
     var match, str = []; a.href = url; param = encodeURIComponent(param);
     while (match = regex.exec(a.search))
         if (param != match[1]) str.push(match[1]+(match[2]?"="+match[2]:""));
     str.push(param+(value?"="+ encodeURIComponent(value):""));
     a.search = str.join("&");
     return a.href;
  }
  /*---- Kategorie-Filter aus URL auslesen und im Select-Feld setzen ----------------------------*/
  var parameterM = getUrlParam('cat');
  //alert(parameterM);
  $("#FilterCat").val(parameterM); //this is your selected

  function getUrlParam(sParam)
  {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam)
      {
          return sParameterName[1];
      }
    }
  }
  
  /**
   * Name           : Bootstrap Form Validation
   * Beschreibung   : Überprüfung der Dateigröße beim Bildupload der Tauschbörse
   * Parameter      : -
   * Rückgabe       : -
   * Bibliothek     : jQuery, http://jsbin.com/jipusifila/edit?html,js,output
  */ 
  //binds to onchange event of your input field
  $('#exampleImageFile').bind('change', function() {  
    $.fn.validator.Constructor.VALIDATORS.filesize = function ($el) {
        var fileSizeMax = $el.data('filesize');
        if ($el[0].files[0] && $el[0].files[0].size>fileSizeMax) {
            return false;
        } else {
            return true;
        }
    };
  });  
  

  /**
   * Name           : Kontaktformular Footer
   * Beschreibung   : Blendet das Formular im Footer ein/aus
   * Parameter      : Klasse des Elements
   * Rückgabe       : -
   * Bibliothek     : jQuery
  */
  $(".slideup_contact").click(function(event){
    event.preventDefault();
    if($(".contact").css('height') == '0px'){
        $(".contact").animate({height:'100%'},1000);
        $('html, body').animate({
          scrollTop: $(window).scrollTop() + 400
        });
    }
    else
    {
        $(".contact").animate({height:'0px'},1000);
    }
  });

});


/**
 * Name           : Expanding Search
 * Beschreibung   : Aufklappen des Suchfeldes bei der mobilen Navigation
 * Parameter      : -
 * Rückgabe       : -
 * Bibliothek     : jQuery, uisearch.js v1.0.0
 * Link:          : http://www.codrops.com
 */
  new UISearch( document.getElementById( 'sb-search' ) );