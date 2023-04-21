function showModal() {
  var tracing = '<li><b>Tracing-Cookies:</b><br />'
    + 'Dieses Rats- und B&uuml;rgerinfosystem nutzt eine Technik, um anonym Daten &uuml;ber die Seitenaufrufe zu erheben.<br />'
    + 'Die Datenerhebung erfolgt &uuml;ber eine Javascript-Funktion und &uuml;bersendet diese Daten an einen Server,<br />'
    + 'der als Dienst von der more! software GmbH & Co. KG bereitgestellt wird. Diese Daten werden<br />'
    + 'ausschlie&szlig;lich vom Auftraggeber des Ratsinfosystems (z.B. Stadtverwaltung, Kreisverwaltung) eingesehen.<br />'
    + 'Die Datenverarbeitung erfolgt im Rechenzentrum der more! software GmbH & Co. KG in Deutschland.<br />'
    + 'Eine &Uuml;bermittlung der Daten findet nicht statt!</li>';

  var gdprcompliance = '<div class="gdprmodal" id="gdprmodal">'
    + '<div class="gdprmodal-body">'
    + '<div class="gdprmodal-header">Verwendung von Cookies in dem more! rubin Rats- und B&uuml;rgerinfosystem<button id="btnclose">x</button></div>'
    + '<div class="gdprmodal-content">Im Rats- und B&uuml;rgerinfosystem RIS werden die folgenden Cookies gesetzt:'
    + '<ul><li><b>Session-Cookies:</b><br />'
    + 'Diese sind n&ouml;tig, damit Sie sich (ein aktives Nutzerkonto vorausgesetzt) am Ratsinfosystem<br />'
    + 'anmelden k&ouml;nnen.<br />'
    + 'In diesem Cookie wird ausschlie&szlig;lich eine Sitzungs-ID gespeichert, die w&auml;hrend Ihres Aufenthalts<br />'
    + 'auf dieser Seite genutzt wird, um Ihnen die f&uuml;r Sie relevanten und freigegebenen Daten liefern<br />'
    + 'zu k&ouml;nnen. Sollten Sie der Verwendung des Login-Cookies nicht zustimmen, ist eine Anmeldung nicht m&ouml;glich!<br />'
    + 'Auch f&uuml;r andere grundlegende Funktionen ist dieses Session-Cookie n&ouml;tig.<br /><br /></li>';

  if (window.hasAnalytics) {
    gdprcompliance += tracing;
  }

  gdprcompliance += '</ul>'
    + '<br /><h4>Der Inhalt von Cookies kann nur durch dieses Rats- und B&uuml;rgerinfosystem ausgelesen werden und<br />'
    + 'enth&auml;lt keine privaten oder sonstwie sch&uuml;tzenswerten Daten!</h4>'
    + '</div>'
    + '</div>'
    + '</div>';

  $('body').append(gdprcompliance);
  var modal = document.getElementById('gdprmodal');
  modal.style.display = 'flex';
  window.addEventListener('keydown', function (sender) {
    if (sender.key === "Escape") {
      modal.style.display = 'none';
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
      modal.remove();
      window.removeEventListener('keydown', function () { });
    }
  });
  modal.addEventListener('click', function (sender) {
    if (sender.target.id == 'gdprmodal' || sender.target.id == 'btnclose') {
      modal.style.display = 'none';
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
      document.getElementById('gdprmodal').remove();
    }
  });
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function acceptCookie(cookieKey) {
  document.cookie = cookieKey + '=true;';
  $('#cookiebanner').hide();
}

$(document).ready(function () {
  if (!getCookie('sessionCookies')) {
    var sessionCookieBanner = '<div id="cookiebanner" class="fixbottom">'
      + '<div class="cookie-text">'
      + '<img onclick="showModal()" src="/images/info.svg" alt="Mehr erfahren">'
      + 'Diese Webseite verwendet Session-Cookies. Diese sind f&uuml;r Funktionalit&auml;ten wie die Anmeldung oder Recherche notwendig.'
      + '<button onclick="acceptCookie(\'sessionCookies\')">Ausblenden</button>'
      + '</div>'
      + '</div>';

    $('body').append(sessionCookieBanner);
  }

  if (!getCookie('analyticsallowed') && window.hasAnalytics) {
    var analyticsCookieBanner = '<div id="cookiebanner" class="fixbottom">'
      + '<div class="cookie-text">'
      + '<img onclick="showModal()" src="/images/info.svg" alt="Mehr erfahren">'
      + 'Diese Webseite verwendet Session-Cookies. Diese sind für Funktionalitäten wie die Anmeldung oder Recherche notwendig.'
      + '<button onclick="acceptCookie(\'analyticsallowed\')">Ausblenden</button>'
      + '</div>'
      + '</div>';

    $('body').append(analyticsCookieBanner);
  }
});
