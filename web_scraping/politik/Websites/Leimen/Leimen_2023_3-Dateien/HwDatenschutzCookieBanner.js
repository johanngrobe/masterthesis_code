(function (window, document) {

    window.addEventListener('load', function () {

        // Die Id des Containers, in dem gescrollt wird, falls das Element nicht ermittelt werden konnte
        var scrollableContainerId = 'hwcookiebanner-content';

        // Globaler Speicher für den Link, der den Banner geöffnet hat
        var cookieBannerOpeningElement = null;

        // Cookie-Banner Small gefunden?
        if ( document.getElementById('hwcookiebanner-small') ) {

            var cookieBannerSmallWrap = document.getElementById('hwcookiebanner-small');

            // Klick auf Verweigern-Button
            document.getElementById('hwcookiebanner-keine').addEventListener('click', function (e) {

                e.preventDefault();

                // Alle veränderbaren Checkboxen im Cookie-Banner unchecken
                _uncheckAllEnabledCheckboxesinCookieBanner();

                // Formular Absenden (mit kurzer Verzögerung)
                window.setTimeout(
                    function() {
                        _submitCookieBannerForm();
                    },
                    100
                );
            });

            // Klick auf Akzeptieren-Button
            document.getElementById('hwcookiebanner-alle').addEventListener('click', function (e) {

                e.preventDefault();

                // Alle veränderbaren Checkboxen im Cookie-Banner unchecken
                _checkAllEnabledCheckboxesinCookieBanner();

                // Formular Absenden (mit kurzer Verzögerung)
                window.setTimeout(
                    function() {
                        _submitCookieBannerForm();
                    },
                    100
                );
            });

            // Klick auf den Mehr-Button
            document.getElementById('hwcookiebanner-mehr').addEventListener('click', function (e) {

                // Prüfen ob das Pop-Up bereits offen ist und öffnen bzw. schließen
            	if(document.getElementById('hwcookiebanner-full').classList.contains('hwcookiebanner-open')) {
            	    _closeCookieBannerFull();
            	} else {
            	    _openCookieBannerFull();

            	    // Element speichern, das den Banner geöffnet hat
                    _storeLastFocusedElement(document.getElementById('hwcookiebanner-mehr'));
            	}

            });

        }


        // Cookie-Banner gefunden?
        if ( document.getElementById('hwcookiebanner-full') ) {

            var cookieBannerWrap = document.getElementById('hwcookiebanner-full');

            // Alle Elemente mit data-target finden und dort auf den click die Funktion binden,
            // die zu dem entsprechenden Element scrollt
            var elementsWithDataTarget = cookieBannerWrap.querySelectorAll('[data-target]');

            if ( elementsWithDataTarget.length > 0 ) {

                // Alle Elemente durchgehen und die Funktion binden
                for ( var i = 0; i < elementsWithDataTarget.length; i++ ) {
                    elementsWithDataTarget[i].addEventListener('click', function(e) {

                        e.preventDefault();

                    	if (cookieBannerWrap.classList.contains("sidebar-open")) {
	                        cookieBannerWrap.classList.remove("sidebar-open");
	                    }
                        _scrollToTarget(this.dataset.target);
                    });
                }
            }

            // Buttons Klick: uncheck all
            if ( document.getElementById('hwcookiebanner-uncheck-all') ) {

                var uncheckAllButton = document.querySelector('#hwcookiebanner-uncheck-all button');

                if ( uncheckAllButton ) {

                    // Auf Klick hören
                    uncheckAllButton.addEventListener('click', function () {

                        // Alle veränderbaren Checkboxen im Cookie-Banner unchecken
                        _uncheckAllEnabledCheckboxesinCookieBanner();
                    });
                }
            }

            // Buttons Klick: check all
            if ( document.getElementById('hwcookiebanner-check-all') ) {

                var checkAllButton = document.querySelector('#hwcookiebanner-check-all button');

                if ( checkAllButton ) {

                    // Auf Klick hören
                    checkAllButton.addEventListener('click', function () {

                        // Alle veränderbaren Checkboxen im Cookie-Banner checken
                        _checkAllEnabledCheckboxesinCookieBanner();
                    });
                }
            }

            // click-Event auf den Button zum öffnen der Sidebar in Mobile
            if (document.getElementById("hwcookiebanner-sidebar-toggle-button")) {

                var hwcookiebannerSidebarToggle = document.getElementById("hwcookiebanner-sidebar-toggle-button");

                hwcookiebannerSidebarToggle.addEventListener('click', function (e) {
                    if (cookieBannerWrap.classList.contains("sidebar-open")) {
                        cookieBannerWrap.classList.remove("sidebar-open");
                    } else {
                        cookieBannerWrap.classList.add("sidebar-open");
                    }
                });
            }
            document.getElementById("hwcookiebanner-content").addEventListener('click', function (e) {
                if (cookieBannerWrap.classList.contains("sidebar-open")) {
                    cookieBannerWrap.classList.remove("sidebar-open");
                }
            });


            // Wechsel von Mobile zu Desltop beachten
            var hw_cookiebanner_mobile;

            // was getan werden soll wenn sich die Größe um einen bestimmten Punkt ändert
            var widthChangeCookiebannerMobile = function() {
                if (!hw_cookiebanner_mobile.matches) {
                    if (cookieBannerWrap.classList.contains("sidebar-open")) {
                        cookieBannerWrap.classList.remove("sidebar-open");
                    }
                }
            };

            // beobachten ob sich die Größe um einen besimmten Punkt ändert
            if (typeof matchMedia !== 'undefined' && typeof matchMedia === 'function') {
                hw_cookiebanner_mobile = window.matchMedia("(max-width: 639px)");
                hw_cookiebanner_mobile.addListener(widthChangeCookiebannerMobile);
                widthChangeCookiebannerMobile();
            }

            if(document.querySelectorAll('#hwcookiebanner-full #hwcookiebanner-sidebar-groups .services .service input[type="checkbox"]:not([disabled="disabled"])').length > 0 && document.querySelectorAll('#hwcookiebanner-full #hwcookiebanner-content .services .service input[type="checkbox"]:not([disabled="disabled"])').length >0) {
                _setOtherCheckbox();
            }

        }


        // Links gefunden die das PopUp öffnen?
        if ( document.getElementsByClassName('hwcookiebanner-open-full') ) {

            var cookieBannerOpenPopupLinks = document.getElementsByClassName('hwcookiebanner-open-full');

            // Alle gefunden Links ein ClickEvent geben
            for (var i = 0; i < cookieBannerOpenPopupLinks.length; i++) {

                // Prüfen ob Link auch wirklich da ist (wegen Fehler von IE wo Elemente während dem rendern kurz verschwinden)
                if (cookieBannerOpenPopupLinks[i]) {

                    // Klick auf den Link
                    cookieBannerOpenPopupLinks[i].addEventListener('click', function (e) {
                        e.preventDefault();

                        // Prüfen ob das Pop-Up existiert
                        if( document.getElementById('hwcookiebanner-full') ) {
                            // Prüfen ob das Pop-Up bereits offen ist und öffnen bzw. schließen
                            if( document.getElementById('hwcookiebanner-full').classList.contains('hwcookiebanner-open') ) {
                                _closeCookieBannerFull();
                            } else {
                                _openCookieBannerFull();

                                // Falls ein target exisitert, scrolle an diese Stelle
                                if(this.hasAttribute("data-target")) {
                                    _scrollToTarget(this.dataset.target);
                                }

                                // Element speichern, das den Banner geöffnet hat
                                _storeLastFocusedElement(cookieBannerOpenPopupLinks[i]);
                            }
                        }
                    });
                }
            }
        }


        //   _   _ ___ _     _____ ____  _____ _   _ _   _ _  _______ ___ ___  _   _ _____ _   _
        //  | | | |_ _| |   |  ___/ ___||  ___| | | | \ | | |/ /_   _|_ _/ _ \| \ | | ____| \ | |
        //  | |_| || || |   | |_  \___ \| |_  | | | |  \| | ' /  | |  | | | | |  \| |  _| |  \| |
        //  |  _  || || |___|  _|  ___) |  _| | |_| | |\  | . \  | |  | | |_| | |\  | |___| |\  |
        //  |_| |_|___|_____|_|   |____/|_|    \___/|_| \_|_|\_\ |_| |___\___/|_| \_|_____|_| \_|
        //

        /**
         * _openCookieBannerFull
         *
         * Öffnet den großen Cookie-Banner
         *
         * @private
         */
        function _openCookieBannerFull() {

            var cookieBannerFull = document.getElementById('hwcookiebanner-full');

            // Klasse hwcookiebanner-open hinzufügen
            cookieBannerFull.classList.add('hwcookiebanner-open');

            // html Klasse hwcookiebanner-open hinzufügen
            document.documentElement.classList.add('hwcookiebanner-open');

            // Attribut open hinzufügen
            cookieBannerFull.setAttribute('open', '');

            // Hiermit sollte der erste Link fokussiert werden
            cookieBannerFull.querySelector('a').focus();

            // Auf Klicks außerhalb des Banners achten und ggf. Banner schließen
            // Muss mit einem kurzen Timeout aufgerufen werden, da sonst der Banner nie offen sein kann
            // Die Funktion muss ausgelagert sein, so dass der EventListener wieder korrekt entfernt werden kann
            window.setTimeout(
                function() {
                    document.addEventListener('click', _closeCookieBannerIfClickedOutsite);
                },
                100
            );

            // Auf tabs reagieren und prüfen, ob der Banner den focus verloren hat und ggf. schließen
            cookieBannerFull.addEventListener('focusout', _closeCookieBannerOnFocusOut);

        }

        /**
         * _closeCookieBannerFull
         *
         * Schließt den großen Cookie-Banner
         *
         * @private
         */
        function _closeCookieBannerFull() {

            var cookieBannerFull = document.getElementById('hwcookiebanner-full');

            // Klasse hwcookiebanner-open entfernen
            cookieBannerFull.classList.remove('hwcookiebanner-open');

            // html Klasse hwcookiebanner-open entfernen
            document.documentElement.classList.remove('hwcookiebanner-open');

            // Attribut open entfernen
            cookieBannerFull.removeAttribute('open');

            // EventListener für click wieder entfernen
            document.removeEventListener('click', _closeCookieBannerIfClickedOutsite);

            // EventListener für tab entfernen
            cookieBannerFull.removeEventListener('focusout', _closeCookieBannerOnFocusOut);

            // Element fokussieren, dass den Banner geöffnet hat
            _recoverLastFocusedElement();
        }

        /**
         * _isCookieBannerFullOpened
         *
         * Prüft, ob der große Cookie-Banenr offen ist
         *
         * @returns {boolean|*}
         * @private
         */
        function _isCookieBannerFullOpened() {
            return !!document.getElementById('hwcookiebanner-full').classList.contains('hwcookiebanner-open') && document.getElementById('hwcookiebanner-full').hasAttribute('open');
        }

        /**
         * _submitCookieBannerForm
         *
         * Schickt das CookieBanner-Formular ab
         *
         * @private
         */
        function _submitCookieBannerForm() {

            // Formular im CookieBanner suchen
            var cookieBannerForm = document.querySelector('#hwcookiebanner-full form');

            // Wenn das Formular existiert -> Absenden
            if ( cookieBannerForm ) {
                cookieBannerForm.submit();
            }
        }

        /**
         * _closeCookieBannerIfClickedOutsite
         *
         * Schließt den Cookie-Banner, wenn außerhalb des Elements geklickt wird
         *
         * @param e
         * @private
         */
        function _closeCookieBannerIfClickedOutsite(e) {
            if ( !document.getElementById('hwcookiebanner-full').contains(e.target)  ) {
                _closeCookieBannerFull();
            }
        }

        /**
         * _closeCookieBannerOnFocusOut
         *
         * Schließt den Cookie-Banner, wenn herausgetabt wird
         *
         * @param e
         * @private
         */
        function _closeCookieBannerOnFocusOut(e) {

            // Nur auf Events hören, die ein related Target haben (z.B. ein Tab aus dem Fenster heraus)
            if ( e.relatedTarget ) {

                // Nur prüfen, wenn der Cookie-Banner geöffnet ist
                if ( _isCookieBannerFullOpened()) {

                    // Kurz warten, da wir uns sonst zwischen den Focus-Events befinden
                    window.setTimeout(
                        function() {

                            // Prüfen, ob das neu fokussierte Element innerhalb des Cookie-Banners ist
                            if ( !document.getElementById('hwcookiebanner-full').contains(document.activeElement) ) {

                                // Wenn nicht -> Cookie-Banner schließen
                                _closeCookieBannerFull();
                            }
                        },
                        50
                    );
                }
            }
        }

        /**
         * _storeLastFocusedElement
         *
         * Speichert das Element, von aus der Banner geöffnet wurde
         *
         * @param element
         * @private
         */
        function _storeLastFocusedElement(element) {

            if ( element ) {
                cookieBannerOpeningElement = element;
            }
        }

        /**
         * _recoverLastFocusedElement
         *
         * Fokussiert das Element, von dem aus der Banner geöffnet wurde
         *
         * @private
         */
        function _recoverLastFocusedElement() {

            // Prüfen, ob es ein zuvor fokussiertes Element gibt
            if ( cookieBannerOpeningElement ) {

                // Element fokussieren
                cookieBannerOpeningElement.focus();

                // Element zurücksetzen
                cookieBannerOpeningElement = null;
            }
        }

        /**
         * _findAllEnabledCheckboxesInCookieBanner
         *
         * Findet alle veränderbaren Checkboxen im Cookiebanner
         *
         * @returns {*}
         * @private
         */
        function _findAllEnabledCheckboxesInCookieBanner() {
            return document.querySelectorAll('#hwcookiebanner-full .services .service input[type="checkbox"]:not([disabled="disabled"])');
        }

        /**
         * _uncheckAllEnabledCheckboxesinCookieBanner
         *
         * Setzt checked aller veränderbaren Checkboxen im Cookiebanner auf FALSE
         *
         * @private
         */
        function _uncheckAllEnabledCheckboxesinCookieBanner() {

            // Alle veränderbaren Checkboxen im Cookie-Banner suchen
            var enabledCheckboxes = _findAllEnabledCheckboxesInCookieBanner();

            // Alle gefunden Checkboxen durchgehen und checked auf FALSE setzen
            if ( enabledCheckboxes && enabledCheckboxes.length > 0 ) {
                for ( var i = 0; i < enabledCheckboxes.length; i++ ) {
                    enabledCheckboxes[i].checked = false;
                }
            }
        }

        /**
         * _checkAllEnabledCheckboxesinCookieBanner
         *
         * Setzt checked aller veränderbaren Checkboxen im Cookiebanner auf TRUE
         *
         * @private
         */
        function _checkAllEnabledCheckboxesinCookieBanner() {

            // Alle veränderbaren Checkboxen im Cookie-Banner suchen
            var enabledCheckboxes = _findAllEnabledCheckboxesInCookieBanner();

            // Alle gefunden Checkboxen durchgehen und checked auf TRUE setzen
            if ( enabledCheckboxes && enabledCheckboxes.length > 0 ) {
                for ( var i = 0; i < enabledCheckboxes.length; i++ ) {
                    enabledCheckboxes[i].checked = true;
                }
            }
        }


        /**
         * _setOtherCheckbox
         *
         * Verknüpft die Listen Checkbox mit der Checkbox im Textblock, sodass beide Elemente bei klick getoggelt werden
         *
         * @private
         */
        function _setOtherCheckbox() {

            // Checkboxen imSidebarblock
            var listCheckBoxes = document.querySelectorAll('#hwcookiebanner-full #hwcookiebanner-sidebar-groups .services .service input[type="checkbox"]:not([disabled="disabled"])');
            // Checkboxen im Textblock
            var textCheckBoxes = document.querySelectorAll('#hwcookiebanner-full #hwcookiebanner-content .services .service input[type="checkbox"]:not([disabled="disabled"])');
            // Die enstprechende ID des Targets im anderen Block
            var otherTarget = '';
            // Die enstprechende Checkbox im anderen Block
            var otherElement;
            // TempElement für this
            var innerElement;

            // Nadel für Substring der IDs
            var needle;
            // Part nach der Nadel
            var endPart;

            // Nur wenn ich auf beiden Seiten genauso viele Checkboxen habe, ansonsten Fehlermeldung
            if(listCheckBoxes.length === textCheckBoxes.length) {

                for ( var i = 0; i < listCheckBoxes.length; i++ ) {

                    listCheckBoxes[i].addEventListener("click", function(e){

                        innerElement = this;
                        // ID im Textblock ohne -quicklist
                        needle = innerElement.id.lastIndexOf('-quicklist');
                        endPart = innerElement.id.substring(needle + 10);
                        otherTarget = innerElement.id.substring(0,needle) + endPart;

                        // Suchen der ID
                        for ( var j = 0; j < textCheckBoxes.length; j++ ) {
                            if(textCheckBoxes[j].id === otherTarget) {
                                otherElement = textCheckBoxes[j];
                            }
                        }

                        if (innerElement.checked) {
                            otherElement.checked = true;
                        } else {
                            otherElement.checked = false;
                        }
                    });
                }

                for ( var k = 0; k < textCheckBoxes.length; k++ ) {

                    textCheckBoxes[k].addEventListener("click", function(e){

                        innerElement = this;

                        // ID im Listenblock ohne -quicklist
                        needle = innerElement.id.lastIndexOf('-');
                        endPart = innerElement.id.substring(needle);
                        otherTarget = innerElement.id.substring(0,needle) + '-quicklist' + endPart;

                        // Suchen der ID
                        for ( var l = 0; l < listCheckBoxes.length; l++ ) {
                            if(listCheckBoxes[l].id === otherTarget) {
                                otherElement = listCheckBoxes[l];
                            }
                        }

                        if (innerElement.checked) {
                            otherElement.checked = true;
                        } else {
                            otherElement.checked = false;
                        }
                    });
                }
            } else {
                console.error('Checkboxen im Template nicht die gleiche Anzahl');
            }

        }


        /**
         * _scrollToTarget
         *
         * Stellt sicher, dass das gewünschte Element sichtbar wird
         * Als Focus kann hier ein Selektor angegeben werden, der fokussiert werden soll
         *
         * @param targetId
         * @param focus
         * @private
         */
        function _scrollToTarget(targetId, focus) {

            // Focus parameter gesetzt?
            if ( typeof focus === 'undefined' ) {
                focus = '';
            }

            // Prüfen, ob es das targetElement gibt (+cachen)
            var targetElement = document.getElementById(targetId);

            if ( targetElement ) {

                // Scrollbares Eltern-Element finden
                var scrollableElement = _getScrollableParent(targetElement);

                // Wenn keines gefunden wurde, das Backup Setup verwenden
                if ( typeof scrollableElement === 'undefined' || !scrollableElement ) {
                    scrollableElement = document.getElementById(scrollableContainerId);
                }

                // Fallback für IE11 falls nötig
                if (typeof scrollableElement.scrollTo !== "undefined") { // IE11 Fallback
                    // Zum gewünschten Element scrollen (Element offsetTop - Container offsetTop - 20 [20px weiter oben, dass es besser aussieht])
                    scrollableElement.scrollTo(0, targetElement.offsetTop - scrollableElement.offsetTop - 20);
                } else {
                    targetElement.scrollIntoView({alignToTop: "true"});
                }

                // Fokussieren?
                if ( focus !== '' ) {
                    targetElement.querySelector(focus).focus();
                }
            }

        }


        /**
         * _getScrollableParent
         *
         * Ermittelt das nächte scrollbare Elternelement
         * Von: https://github.com/olahol/scrollparent.js/blob/master/scrollparent.js#L13
         *
         * @param node
         * @returns {undefined|*}
         * @private
         */
        function _getScrollableParent(node) {

            var regex = /(auto|scroll)/;

            var parents = function (node, ps) {
                if (node.parentNode === null) { return ps; }

                return parents(node.parentNode, ps.concat([node]));
            };

            var style = function (node, prop) {
                return getComputedStyle(node, null).getPropertyValue(prop);
            };

            var overflow = function (node) {
                return style(node, "overflow") + style(node, "overflow-y") + style(node, "overflow-x");
            };

            var scroll = function (node) {
                return regex.test(overflow(node));
            };

            var scrollParent = function (node) {
                if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
                    return ;
                }

                var ps = parents(node.parentNode, []);

                for (var i = 0; i < ps.length; i += 1) {
                    if (scroll(ps[i])) {
                        return ps[i];
                    }
                }

                return document.scrollingElement || document.documentElement;
            };

            return scrollParent(node);
        }
    });

})(window, document);
