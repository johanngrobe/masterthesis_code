





(function ($, window, document) {
"use strict";
var pluginName = "accessibleMegaMenu",
defaults = {
uuidPrefix: "accessible-megamenu", 
 menuClass: "accessible-megamenu", 
 topNavItemClass: "accessible-megamenu-top-nav-item", 
 panelClass: "accessible-megamenu-panel", 
 panelGroupClass: "accessible-megamenu-panel-group", 
 hoverClass: "hover", 
 focusClass: "focus", 
 openClass: "open", 
 toggleButtonClass: "accessible-megamenu-toggle", 
 openDelay: 0, 
 closeDelay: 250, 
 openOnMouseover: true 
 },
Keyboard = {
BACKSPACE: 8,
COMMA: 188,
DELETE: 46,
DOWN: 40,
END: 35,
ENTER: 13,
ESCAPE: 27,
HOME: 36,
LEFT: 37,
PAGE_DOWN: 34,
PAGE_UP: 33,
PERIOD: 190,
RIGHT: 39,
SPACE: 32,
TAB: 9,
UP: 38,
keyMap: {
48: "0",
49: "1",
50: "2",
51: "3",
52: "4",
53: "5",
54: "6",
55: "7",
56: "8",
57: "9",
59: ";",
65: "a",
66: "b",
67: "c",
68: "d",
69: "e",
70: "f",
71: "g",
72: "h",
73: "i",
74: "j",
75: "k",
76: "l",
77: "m",
78: "n",
79: "o",
80: "p",
81: "q",
82: "r",
83: "s",
84: "t",
85: "u",
86: "v",
87: "w",
88: "x",
89: "y",
90: "z",
96: "0",
97: "1",
98: "2",
99: "3",
100: "4",
101: "5",
102: "6",
103: "7",
104: "8",
105: "9",
190: "."
}
},
clearTimeout = window.clearTimeout,
setTimeout = window.setTimeout,
isOpera = window.opera && window.opera.toString() === '[object Opera]';

function AccessibleMegaMenu(element, options) {
this.element = element;

 this.settings = $.extend({}, defaults, options);
this._defaults = defaults;
this._name = pluginName;
this.mouseTimeoutID = null;
this.focusTimeoutID = null;
this.mouseFocused = false;
this.justFocused = false;
this.init();
}
AccessibleMegaMenu.prototype = (function () {

var uuid = 0,
keydownTimeoutDuration = 1000,
keydownSearchString = "",
isTouch = 'ontouchstart' in window || window.navigator.msMaxTouchPoints,
_getPlugin,
_addUniqueId,
_togglePanel,
_clickHandler,
_touchmoveHandler,
_clickOutsideHandler,
_DOMAttrModifiedHandler,
_focusInHandler,
_focusOutHandler,
_keyDownHandler,
_mouseDownHandler,
_mouseOverHandler,
_mouseOutHandler,
_clickToggleHandler,
_toggleExpandedEventHandlers,
_addEventHandlers,
_removeEventHandlers;

_getPlugin = function (element) {
return $(element).closest(':data(plugin_' + pluginName + ')').data("plugin_" + pluginName);
};

_addUniqueId = function (element) {
element = $(element);
var settings = this.settings;
if (!element.attr("id")) {
element.attr("id", settings.uuidPrefix + "-" + new Date().getTime() + "-" + (++uuid));
}
};

_togglePanel = function (event, hide) {
var target = $(event.target),
that = this,
settings = this.settings,
menu = this.menu,
topli = target.closest('.' + settings.topNavItemClass),
panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass),
newfocus;
_toggleExpandedEventHandlers.call(this, true);

 if (hide) {

 topli = menu.find('.' + settings.topNavItemClass + ' .' + settings.openClass + ':first').closest('.' + settings.topNavItemClass);

 if (!(topli.is(event.relatedTarget) || topli.has(event.relatedTarget).length > 0)) {
if ((event.type === 'mouseout' || event.type === 'focusout') && topli.has(document.activeElement).length > 0) {
return;
}

 topli.find('[aria-expanded]')
.attr('aria-expanded', 'false')
.removeClass(settings.openClass)

 topli.find('.' + settings.panelClass)
.removeClass(settings.openClass)
.attr('aria-hidden', 'true');
if ((event.type === 'keydown' && event.keyCode === Keyboard.ESCAPE) || event.type === 'DOMAttrModified') {
newfocus = topli.find(':tabbable:first');
if(newfocus.hasClass('parent')) {
event.preventDefault();
event.stopPropagation();
}
setTimeout(function () {
menu.find('[aria-expanded].' + that.settings.panelClass).off('DOMAttrModified.accessible-megamenu');
newfocus.focus();
that.justFocused = false;
}, 99);
}
} else if (topli.length === 0) {
menu.find('[aria-expanded=true]')
.attr('aria-expanded', 'false')
.removeClass(settings.openClass)
.closest('.' + settings.panelClass)
.removeClass(settings.openClass)
.attr('aria-hidden', 'true');
}
}

 else {
clearTimeout(that.focusTimeoutID);

 var openli = menu.find('[aria-expanded=true]').parent();
if (!openli.is(topli)) {
openli.find('[aria-expanded]')
.attr('aria-expanded', 'false')
.removeClass(settings.openClass)
.siblings('.' + settings.panelClass)
.removeClass(settings.openClass)
.attr('aria-hidden', 'true');
}

 topli.find('[aria-expanded]')
.attr('aria-expanded', 'true')
.addClass(settings.openClass)
.siblings('.' + settings.panelClass)
.addClass(settings.openClass)
.attr('aria-hidden', 'false');
if (topli.length) {
var pageScrollPosition = $('html')[0].scrollTop;
var openPanelTopPosition = topli.offset().top;
if (pageScrollPosition > openPanelTopPosition) {
$('html')[0].scrollTop = openPanelTopPosition;
}
}
if (event.type === 'mouseover' && target.is(':tabbable') && topli.length === 1 && panel.length === 0 && menu.has(document.activeElement).length > 0) {

 that.justFocused = false;
}
_toggleExpandedEventHandlers.call(that);
}
};

_clickHandler = function (event) {
var target = $(event.target).closest(':tabbable'),
topli = target.closest('.' + this.settings.topNavItemClass),
panel = target.closest('.' + this.settings.panelClass);

 if (topli.length === 1 && panel.length === 0 && topli.find('.' + this.settings.panelClass).length === 1) {

 if (!target.hasClass(this.settings.openClass)) {
event.preventDefault();
event.stopPropagation();
_togglePanel.call(this, event);
this.justFocused = false;
}
else {

 if (this.justFocused) {
event.preventDefault();
event.stopPropagation();
this.justFocused = false;
}

 else if(!this.justFocused && target.hasClass(this.settings.hoverClass)) {
event.preventDefault();
event.stopPropagation();
_togglePanel.call(this, event, target.hasClass(this.settings.openClass));
}

 else if (isTouch || !isTouch && !this.settings.openOnMouseover) {
event.preventDefault();
event.stopPropagation();
_togglePanel.call(this, event, target.hasClass(this.settings.openClass));
}
}
}

 else if (topli.length === 1 && panel.length === 0 && event.type === "keydown") {
window.location.href = target.attr("href");
}
};

_touchmoveHandler = function () {
this.justMoved = true;
};

_clickOutsideHandler = function (event) {
if ($(event.target).closest(this.menu).length === 0) {
event.preventDefault();
event.stopPropagation();
_togglePanel.call(this, event, true);
}
};

_DOMAttrModifiedHandler = function (event) {
if (event.originalEvent.attrName === 'aria-expanded'
&& event.originalEvent.newValue === 'false'
&& $(event.target).hasClass(this.settings.openClass)) {
event.preventDefault();
event.stopPropagation();
_togglePanel.call(this, event, true);
}
};

_focusInHandler = function (event) {
clearTimeout(this.focusTimeoutID);
var target = $(event.target),
panel = target.closest('.' + this.settings.panelClass);
target
.addClass(this.settings.focusClass);
this.justFocused = !this.mouseFocused || (!this.settings.openOnMouseover && this.mouseFocused);
this.mouseFocused = false;
if (this.justFocused && this.panels.not(panel).filter('.' + this.settings.openClass).length) {
_togglePanel.call(this, event);
}
};

_focusOutHandler = function (event) {
this.justFocused = false;
var that = this,
target = $(event.target),
topli = target.closest('.' + this.settings.topNavItemClass);
target
.removeClass(this.settings.focusClass);
if (typeof window.cvox === 'object' && typeof window.cvox.Api !== 'object') {

 that.focusTimeoutID = setTimeout(function () {
window.cvox.Api.getCurrentNode(function (node) {
if (topli.has(node).length) {

 
 
 clearTimeout(that.focusTimeoutID);
} else {
that.focusTimeoutID = setTimeout(function (scope, event, hide) {
_togglePanel.call(scope, event, hide);
}, 275, that, event, true);
}
});
}, 25);
} else {
that.focusTimeoutID = setTimeout(function () {
if (that.mouseFocused && event.relatedTarget === null) {
return;
}
_togglePanel.call(that, event, true);
}, 300);
}
};

_keyDownHandler = function (event) {
var that = (this.constructor === AccessibleMegaMenu) ? this : _getPlugin(this), 
 settings = that.settings,
target = $($(this).is('.' + settings.hoverClass + ':tabbable') ? this : event.target), 
 menu = that.menu,
topnavitems = that.topnavitems,
topli = target.closest('.' + settings.topNavItemClass),
tabbables = menu.find(':tabbable'),
panel = target.hasClass(settings.panelClass) ? target : target.closest('.' + settings.panelClass),
panelGroups = panel.find('.' + settings.panelGroupClass),
currentPanelGroup = target.closest('.' + settings.panelGroupClass),
next,
keycode = event.keyCode || event.which,
start,
i,
o,
label,
found = false,
newString = Keyboard.keyMap[event.keyCode] || '',
regex,
isTopNavItem = (topli.length === 1 && panel.length === 0);
if (target.is("input:focus, select:focus, textarea:focus, button:focus")) {

 return;
}
if (target.is('.' + settings.hoverClass + ':tabbable')) {
$('html').off('keydown.accessible-megamenu');
}
switch (keycode) {
case Keyboard.ESCAPE:
this.mouseFocused = false;
_togglePanel.call(that, event, true);
break;
case Keyboard.DOWN:
event.preventDefault();
this.mouseFocused = false;
if (isTopNavItem) {
_togglePanel.call(that, event);
found = (topli.find('.' + settings.panelClass + ' :tabbable:first').focus().length === 1);
} else {
found = (tabbables.filter(':gt(' + tabbables.index(target) + '):first').focus().length === 1);
}
if (!found && isOpera && (event.ctrlKey || event.metaKey)) {
tabbables = $(':tabbable');
i = tabbables.index(target);
found = ($(':tabbable:gt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
}
break;
case Keyboard.UP:
event.preventDefault();
this.mouseFocused = false;
if (isTopNavItem && target.hasClass(settings.openClass)) {
_togglePanel.call(that, event, true);
next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
if (next.children('.' + settings.panelClass).length) {
found = (next.find('[aria-expanded]')
.attr('aria-expanded', 'true')
.addClass(settings.openClass)
.filter('.' + settings.panelClass)
.attr('aria-hidden', 'false')
.find(':tabbable:last')
.focus() === 1);
}
} else if (!isTopNavItem) {
found = (tabbables.filter(':lt(' + tabbables.index(target) + '):last').focus().length === 1);
}
if (!found && isOpera && (event.ctrlKey || event.metaKey)) {
tabbables = $(':tabbable');
i = tabbables.index(target);
found = ($(':tabbable:lt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
}
break;
case Keyboard.RIGHT:
event.preventDefault();
this.mouseFocused = false;
if (isTopNavItem) {
found = (topnavitems.filter(':gt(' + topnavitems.index(topli) + '):first').find(':tabbable:first').focus().length === 1);
} else {
if (panelGroups.length && currentPanelGroup.length) {

 found = (panelGroups.filter(':gt(' + panelGroups.index(currentPanelGroup) + '):first').find(':tabbable:first').focus().length === 1);
}
if (!found) {
found = (topli.find(':tabbable:first').focus().length === 1);
}
}
break;
case Keyboard.LEFT:
event.preventDefault();
this.mouseFocused = false;
if (isTopNavItem) {
found = (topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last').find(':tabbable:first').focus().length === 1);
} else {
if (panelGroups.length && currentPanelGroup.length) {

 found = (panelGroups.filter(':lt(' + panelGroups.index(currentPanelGroup) + '):last').find(':tabbable:first').focus().length === 1);
}
if (!found) {
found = (topli.find(':tabbable:first').focus().length === 1);
}
}
break;
case Keyboard.TAB:
this.mouseFocused = false;
i = tabbables.index(target);
if (event.shiftKey && isTopNavItem && target.hasClass(settings.openClass)) {
_togglePanel.call(that, event, true);
next = topnavitems.filter(':lt(' + topnavitems.index(topli) + '):last');
if (next.children('.' + settings.panelClass).length) {
found = next.children()
.attr('aria-expanded', 'true')
.addClass(settings.openClass)
.filter('.' + settings.panelClass)
.attr('aria-hidden', 'false')
.find(':tabbable:last')
.focus();
}
} else if (event.shiftKey && i > 0) {
found = (tabbables.filter(':lt(' + i + '):last').focus().length === 1);
} else if (!event.shiftKey && i < tabbables.length - 1) {
found = (tabbables.filter(':gt(' + i + '):first').focus().length === 1);
} else if (isOpera) {
tabbables = $(':tabbable');
i = tabbables.index(target);
if (event.shiftKey) {
found = ($(':tabbable:lt(' + $(':tabbable').index(target) + '):last').focus().length === 1);
} else {
found = ($(':tabbable:gt(' + $(':tabbable').index(target) + '):first').focus().length === 1);
}
}
if (found) {
event.preventDefault();
}
break;
case Keyboard.SPACE:
case Keyboard.ENTER:

 if (isTopNavItem) {

 if (target.hasClass("open")) {
event.preventDefault();
this.mouseFocused = false;
_togglePanel.call(that, event, true);
}

 else {

 return true;
}
}
break;
default:

 clearTimeout(this.keydownTimeoutID);
keydownSearchString += newString !== keydownSearchString ? newString : '';
if (keydownSearchString.length === 0) {
return;
}
this.keydownTimeoutID = setTimeout(function () {
keydownSearchString = '';
}, keydownTimeoutDuration);
if (isTopNavItem && !target.hasClass(settings.openClass)) {
tabbables = tabbables.filter(':not(.' + settings.panelClass + ' :tabbable)');
} else {
tabbables = topli.find(':tabbable');
}
if (event.shiftKey) {
tabbables = $(tabbables.get()
.reverse());
}
for (i = 0; i < tabbables.length; i++) {
o = tabbables.eq(i);
if (o.is(target)) {
start = (keydownSearchString.length === 1) ? i + 1 : i;
break;
}
}
regex = new RegExp('^' + keydownSearchString.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'), 'i');
for (i = start; i < tabbables.length; i++) {
o = tabbables.eq(i);
label = $.trim(o.text());
if (regex.test(label)) {
found = true;
o.focus();
break;
}
}
if (!found) {
for (i = 0; i < start; i++) {
o = tabbables.eq(i);
label = $.trim(o.text());
if (regex.test(label)) {
o.focus();
break;
}
}
}
break;
}
that.justFocused = false;
};

_mouseDownHandler = function (event) {
if ($(event.target).closest(this.settings.panelClass) || $(event.target).closest(":focusable").length) {
this.mouseFocused = true;
if ($(event.target).closest(this.settings.menuClass)) {
$('html').on('keydown.accessible-megamenu', $.proxy(_keyDownHandler, event.target));
}
}
clearTimeout(this.mouseTimeoutID);
this.mouseTimeoutID = setTimeout(function () {
clearTimeout(this.focusTimeoutID);
}, 1);
};

_mouseOverHandler = function (event) {
clearTimeout(this.mouseTimeoutID);
var that = this;
if (!that.settings.openOnMouseover) {
return;
}
this.mouseTimeoutID = setTimeout(function () {
$(event.target).addClass(that.settings.hoverClass);
_togglePanel.call(that, event);
if ($(event.target).closest(that.settings.menuClass)) {
$('html').on('keydown.accessible-megamenu', $.proxy(_keyDownHandler, event.target));
}
}, this.settings.openDelay);
};

_mouseOutHandler = function (event) {
clearTimeout(this.mouseTimeoutID);
var that = this;
if (!that.settings.openOnMouseover) {
return;
}
$(event.target)
.removeClass(that.settings.hoverClass);
$(event.target)
.removeClass(that.settings.openClass);
that.mouseTimeoutID = setTimeout(function () {
_togglePanel.call(that, event, true);
}, this.settings.closeDelay);
if ($(event.target).is(':tabbable')) {
$('html').off('keydown.accessible-megamenu');
}
};

_clickToggleHandler = function () {
var isExpanded = this.toggleButton.attr('aria-expanded') === 'true';
this.toggleButton.attr({'aria-expanded': !isExpanded, 'aria-pressed': !isExpanded});
};
_toggleExpandedEventHandlers = function (hide) {
var menu = this.menu;
if (hide) {
$('html').off('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu');
menu.find('[aria-expanded].' + this.settings.panelClass).off('DOMAttrModified.accessible-megamenu');
} else {
$('html').on('mouseup.outside-accessible-megamenu, touchend.outside-accessible-megamenu, mspointerup.outside-accessible-megamenu,  pointerup.outside-accessible-megamenu', $.proxy(_clickOutsideHandler, this));

menu.find('[aria-expanded=true].' + this.settings.panelClass).on('DOMAttrModified.accessible-megamenu', $.proxy(_DOMAttrModifiedHandler, this));
}
};
_addEventHandlers = function() {
var menu = this.menu,
toggleButton = this.toggleButton;
menu.on("focusin.accessible-megamenu", ":focusable, ." + this.settings.panelClass, $.proxy(_focusInHandler, this))
.on("focusout.accessible-megamenu", ":focusable, ." + this.settings.panelClass, $.proxy(_focusOutHandler, this))
.on("keydown.accessible-megamenu", $.proxy(_keyDownHandler, this))
.on("mouseover.accessible-megamenu", $.proxy(_mouseOverHandler, this))
.on("mouseout.accessible-megamenu", $.proxy(_mouseOutHandler, this))
.on("mousedown.accessible-megamenu", $.proxy(_mouseDownHandler, this))
.on("click.accessible-megamenu", $.proxy(_clickHandler, this));
toggleButton.on('click.accessible-megamenu', $.proxy(_clickToggleHandler, this));
if (isTouch) {
menu.on("touchmove.accessible-megamenu", $.proxy(_touchmoveHandler, this));
}
if ($(document.activeElement).closest(menu).length) {
$(document.activeElement).trigger("focusin.accessible-megamenu");
}
};
_removeEventHandlers = function () {
var menu = this.menu,
toggleButton = this.toggleButton;
menu.off('.accessible-megamenu');
if (menu.find('[aria-expanded=true].' + this.settings.panelClass).length) {
_toggleExpandedEventHandlers.call(this, true);
}
toggleButton.off('.accessible-megamenu');
};

return {
constructor: AccessibleMegaMenu,

init: function () {
var settings = this.settings,
nav = $(this.element),
menu = nav.children('ol,ul').first(),
topnavitems = menu.children(),
toggleButton = nav.children('button').first();
this.start(settings, nav, menu, topnavitems, toggleButton);
},
start: function(settings, nav, menu, topnavitems, toggleButton) {
var that = this;
this.settings = settings;
this.menu = menu;
this.topnavitems = topnavitems;
this.toggleButton = toggleButton;

 _addUniqueId.call(that, menu);
menu.addClass(settings.menuClass);
menu.addClass(['js', settings.menuClass].join('-'));
topnavitems.each(function (i, topnavitem) {
var topnavitemlink, topnavitempanel;
topnavitem = $(topnavitem);
topnavitem.addClass(settings.topNavItemClass);
topnavitemlink = topnavitem.find("a").first();
topnavitempanel = topnavitem.find('.' + settings.panelClass);
_addUniqueId.call(that, topnavitemlink);

 if (topnavitempanel.length) {
_addUniqueId.call(that, topnavitempanel);

 topnavitemlink.attr({
"role": "button",
"aria-controls": topnavitempanel.attr("id"),
"aria-expanded": false,
"tabindex": 0
});

 topnavitempanel.attr({
"role": "region",

 "aria-expanded": false,
"aria-hidden": true
})
.addClass(settings.panelClass)
.not("[aria-labelledby]")
.attr("aria-labelledby", topnavitemlink.attr("id"));
}
});
this.panels = menu.find("." + settings.panelClass);
menu.find("hr").attr("role", "separator");
toggleButton.addClass(settings.toggleButtonClass);
toggleButton.attr({'aria-expanded': false, 'aria-pressed': false, 'aria-controls': menu.attr('id')});
_addEventHandlers.call(this);
},

destroy: function () {
this.menu.removeClass(['js', this.settings.menuClass].join('-'));
_removeEventHandlers.call(this, true);
},

getDefaults: function () {
return this._defaults;
},

getOption: function (opt) {
return this.settings[opt];
},

getAllOptions: function () {
return this.settings;
},

setOption: function (opt, value, reinitialize) {
this.settings[opt] = value;
if (reinitialize) {
this.init();
}
}
};
}());


$.fn[pluginName] = function (options) {
return this.each(function () {
var pluginInstance = $.data(this, "plugin_" + pluginName);
if (!pluginInstance) {
$.data(this, "plugin_" + pluginName, new $.fn[pluginName].AccessibleMegaMenu(this, options));
} else if (typeof pluginInstance[options] === 'function') {
pluginInstance[options].apply(pluginInstance, Array.prototype.slice.call(arguments, 1));
}
});
};
$.fn[pluginName].AccessibleMegaMenu = AccessibleMegaMenu;


function visible(element) {
return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function () {
return $.css(this, "visibility") === "hidden";
}).length;
}

function focusable(element, isTabIndexNotNaN) {
var map, mapName, img,
nodeName = element.nodeName.toLowerCase();
if ("area" === nodeName) {
map = element.parentNode;
mapName = map.name;
if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
return false;
}
img = $("img[usemap=#" + mapName + "]")[0];
return !!img && visible(img);
}
return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled :
"a" === nodeName ?
element.href || isTabIndexNotNaN :
isTabIndexNotNaN) &&

 visible(element);
}
$.extend($.expr[":"], {
data: $.expr.createPseudo ? $.expr.createPseudo(function (dataName) {
return function (elem) {
return !!$.data(elem, dataName);
};
}) : 
 function (elem, i, match) {
return !!$.data(elem, match[3]);
},
focusable: function (element) {
return focusable(element, !isNaN($.attr(element, "tabindex")));
},
tabbable: function (element) {
var tabIndex = $.attr(element, "tabindex"),
isTabIndexNaN = isNaN(tabIndex);
return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}
});
}(jQuery, window, document));