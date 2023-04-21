









function checkboxConfirmMessage(strCkbId, trueMessage, falseMessage) {
var strTemp = String(strCkbId);
var trueMessageRepl = trueMessage.replaceAll('@', '\\n', false);
var falseMessageRepl = falseMessage.replaceAll('@', '\\n', false);
if (document.getElementById(strTemp).checked == true) {
var box1 = confirm(trueMessageRepl);
if (box1 == true) {
return true;
} else {
document.getElementById(strTemp).checked = false;
}
} else {
var box2 = confirm(falseMessageRepl);
if (box2 == true) {
return true;
} else {
document.getElementById(strTemp).checked = true;
}
}
return false;
}

function checkMaxChar(strTaId, strDivId, length) {
var strTemp = String(strDivId);
var opt = document.getElementById(strTaId);
var remain = trimMax(opt, length);
document.getElementById(strTemp).innerHTML = 'Noch ' + remain + ' Zeichen frei';
if (remain <= 20) {
addClass(document.getElementById(strTemp), "warning");
} else {
removeClass(document.getElementById(strTemp), "warning");
}
}
function trimMax(opt, maxChars) {
var tmpStr = opt.value;
var normCharCount;
do {
var realCharCount = tmpStr.length;
normCharCount = tmpStr.replace(/\r\n/g, '__').replace(/[\n\r]/g, '__').length;
if (normCharCount > maxChars) {
tmpStr = tmpStr.slice(0, realCharCount - 1);
opt.value = tmpStr;
}
} while (normCharCount > maxChars);
return maxChars - normCharCount;
}
function addClass(element, className) {
if (!hasClass(element, className)) {
if (element.className) {
element.className += " " + className;
} else {
element.className = className;
}
}
}
function removeClass(element, className) {
var regexp = addClass[className];
if (!regexp) {
regexp = addClass[className] = new RegExp("(^|\\s)" + className + "(\\s|$)");
}
element.className = element.className.replace(regexp, "$2");
}
function hasClass(element, className) {
var regexp = addClass[className];
if (!regexp) {
regexp = addClass[className] = new RegExp("(^|\\s)" + className + "(\\s|$)");
}
return regexp.test(element.className);
}
function toggleClass(element, className) {
if (element.hasClass(className)) {
element.removeClass(className);
} else {
element.addClass(className);
}
}

function copyFilename(strTaId, strDivId) {
var thefile = document.getElementById(strTaId);
var thedesc = document.getElementById(strDivId);
var fullPath = thefile.value;
if (fullPath) {
var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
var filename = fullPath.substring(startIndex, fullPath.lastIndexOf('.'));
if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
filename = filename.substring(1, fullPath.lastIndexOf('.'));
}
thedesc.value = filename;
}
}
function previewImg(strTaId, strImgId) {
var input = document.getElementById(strTaId);
if (input.files && input.files[0]) {
document.getElementById(strImgId).src = window.URL.createObjectURL(input.files[0]);
}
}
function getTextSelection() {
var txt;
if (document.getSelection) txt = document.getSelection();
else if (document.selection) txt = document.selection.createRange().text;
else if (window.getSelection) txt = window.getSelection();
else {
alert('Ihr Browser unterstützt diese Programmfunktion nicht');
return '';
}
return txt;
}

function highlightInitalFromSearchfield() {
if (document.getElementById('searchfield') != null) {
highlightAllWithReset(document.getElementById('searchfield').value, false);
}
}

function highlightAllWithReset(searchTerm, remove) {
if (remove) {

$('#pageContent').removeHighlight();
}
var logicalConnectors = "OR AND NOT";

if (searchTerm) {
console.log('highlightAll' + searchTerm);

var splits = searchTerm.split(' ');
for (var part in splits) {

if (splits[part]) {

if (logicalConnectors.indexOf(splits[part].toUpperCase()) == -1) {

$('#pageContent').highlight(splits[part]);
}
}
}
}
}

function highlightAll(searchTerm) {
highlightAllWithReset(searchTerm, true);
}
String.prototype.replaceAll = function(search, replace, ignoreCase) {
var result = [];
if (ignoreCase) {
var _string = this.toLowerCase();
var _search = search.toLowerCase();
var start = 0,
match, length = _search.length;
while ((match = _string.indexOf(_search, start)) >= 0) {
result.push(this.slice(start, match));
start = match + length;
}
result.push(this.slice(start));
} else {
result = this.split(search);
}
return result.join(replace);
};

String.prototype.includes = function(match) {
return this.indexOf(match) !== -1;
};

jQuery.fn.highlight = function(pat) {
function innerHighlight(node, pat) {
var skip = 0;
if (node.nodeType === 3) {
var pos = node.data.toUpperCase().indexOf(pat);
if (pos >= 0) {
var spannode = document.createElement('span');
spannode.className = 'highlight';
var middlebit = node.splitText(pos);
middlebit.splitText(pat.length);

var middleclone = middlebit.cloneNode(true);
spannode.appendChild(middleclone);
middlebit.parentNode.replaceChild(spannode, middlebit);
skip = 1;
}
} else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && node.tagName !== "TEXTAREA") {
for (var i = 0; i < node.childNodes.length; ++i) {
i += innerHighlight(node.childNodes[i], pat);
}
}
return skip;
}
return this.length && pat && pat.length ? this.each(function() {
innerHighlight(this, pat.toUpperCase());
}) : this;
};
jQuery.fn.removeHighlight = function() {
return this.find("span.highlight").each(function() {

var par = this.parentNode;
par.replaceChild(this.firstChild, this);
par.normalize();




}).end();
};

var PercentageDecorator = function() {
this.initialize();
};
PercentageDecorator.prototype = {
initialize: function() {
var elements = document.getElementsByTagName("*"),
i = -1,
element, regex, value;
while (++i < elements.length) {
element = elements[i];
if ((regex = /percent(inline|block)/.exec(element.className)) !== null) {
if ((value = this.percentValue(element))) {
element.className = element.className.replace(new RegExp("percent" + regex[1]), "percent" + regex[1] + "-on");
this[regex[1] + "Modify"](element, value - 1);
}
}
}
},
inlineModify: function(e, value) {
var span = document.createElement("span");
var childs = e.childNodes;
var i = -1;
while (++i < childs.length) {
span.appendChild(childs[i]);
}
span.style.backgroundPosition = (-100 + value) + "px 50%";
e.appendChild(span);
},
blockModify: function(e, value) {
var childs = e.childNodes;
e.setAttribute('aria-label', value + "% Rang");
var span3 = document.createElement("span");
span3.className = "value";
var i = -1;
while (++i < childs.length) {
span3.appendChild(childs[i]);
}





var nbsp2 = document.createTextNode("");
var span2 = document.createElement("span");
span2.className = "bar";
span2.style.width = value + "%";
span2.appendChild(nbsp2);
e.appendChild(span2);
e.appendChild(span3);
},
percentValue: function(e) {
var value = false;
while (e.firstChild) {
if (e.firstChild.nodeType === 3) {
value = e.firstChild.nodeValue;
break;
} else {
e = e.firstChild;
}
}
value = value.replace(/,/, ".");
value = parseFloat(value);
if (isNaN(value)) return false;
return ((value > 100) ? 100 : value) + 1; 


}
};


(function(global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
typeof define === 'function' && define.amd ? define(factory) :
(global.Popper = factory());
}(this, (function() {


'use strict';
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
timeoutDuration = 1;
break;
}
}
function microtaskDebounce(fn) {
var called = false;
return function() {
if (called) {
return;
}
called = true;
window.Promise.resolve().then(function() {
called = false;
fn();
});
};
}
function taskDebounce(fn) {
var scheduled = false;
return function() {
if (!scheduled) {
scheduled = true;
setTimeout(function() {
scheduled = false;
fn();
}, timeoutDuration);
}
};
}
var supportsMicroTasks = isBrowser && window.Promise;

var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

function isFunction(functionToCheck) {
var getType = {};
return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function getStyleComputedProperty(element, property) {
if (element.nodeType !== 1) {
return [];
}

var css = getComputedStyle(element, null);
return property ? css[property] : css;
}

function getParentNode(element) {
if (element.nodeName === 'HTML') {
return element;
}
return element.parentNode || element.host;
}

function getScrollParent(element) {


if (!element) {
return document.body;
}
switch (element.nodeName) {
case 'HTML':
case 'BODY':
return element.ownerDocument.body;
case '#document':
return element.body;
}

var _getStyleComputedProp = getStyleComputedProperty(element),
overflow = _getStyleComputedProp.overflow,
overflowX = _getStyleComputedProp.overflowX,
overflowY = _getStyleComputedProp.overflowY;
if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
return element;
}
return getScrollParent(getParentNode(element));
}

function getOffsetParent(element) {

var offsetParent = element && element.offsetParent;
var nodeName = offsetParent && offsetParent.nodeName;
if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
if (element) {
return element.ownerDocument.documentElement;
}
return document.documentElement;
}


if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
return getOffsetParent(offsetParent);
}
return offsetParent;
}
function isOffsetContainer(element) {
var nodeName = element.nodeName;
if (nodeName === 'BODY') {
return false;
}
return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

function getRoot(node) {
if (node.parentNode !== null) {
return getRoot(node.parentNode);
}
return node;
}

function findCommonOffsetParent(element1, element2) {


if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
return document.documentElement;
}


var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
var start = order ? element1 : element2;
var end = order ? element2 : element1;

var range = document.createRange();
range.setStart(start, 0);
range.setEnd(end, 0);
var commonAncestorContainer = range.commonAncestorContainer;

if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
if (isOffsetContainer(commonAncestorContainer)) {
return commonAncestorContainer;
}
return getOffsetParent(commonAncestorContainer);
}

var element1root = getRoot(element1);
if (element1root.host) {
return findCommonOffsetParent(element1root.host, element2);
} else {
return findCommonOffsetParent(element1, getRoot(element2).host);
}
}

function getScroll(element) {
var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
var nodeName = element.nodeName;
if (nodeName === 'BODY' || nodeName === 'HTML') {
var html = element.ownerDocument.documentElement;
var scrollingElement = element.ownerDocument.scrollingElement || html;
return scrollingElement[upperSide];
}
return element[upperSide];
}

function includeScroll(rect, element) {
var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
var scrollTop = getScroll(element, 'top');
var scrollLeft = getScroll(element, 'left');
var modifier = subtract ? -1 : 1;
rect.top += scrollTop * modifier;
rect.bottom += scrollTop * modifier;
rect.left += scrollLeft * modifier;
rect.right += scrollLeft * modifier;
return rect;
}

function getBordersSize(styles, axis) {
var sideA = axis === 'x' ? 'Left' : 'Top';
var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

var isIE10;
var isIE10$1 = function() {
if (isIE10 === undefined) {
isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
}
return isIE10;
};
function getSize(axis, body, html, computedStyle) {
return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
}
function getWindowSizes() {
var body = document.body;
var html = document.documentElement;
var computedStyle = isIE10$1() && getComputedStyle(html);
return {
height: getSize('Height', body, html, computedStyle),
width: getSize('Width', body, html, computedStyle)
};
}
var classCallCheck = function(instance, Constructor) {
if (!(instance instanceof Constructor)) {
throw new TypeError("Cannot call a class as a function");
}
};
var createClass = function() {
function defineProperties(target, props) {
for (var i = 0; i < props.length; i++) {
var descriptor = props[i];
descriptor.enumerable = descriptor.enumerable || false;
descriptor.configurable = true;
if ("value" in descriptor) descriptor.writable = true;
Object.defineProperty(target, descriptor.key, descriptor);
}
}
return function(Constructor, protoProps, staticProps) {
if (protoProps) defineProperties(Constructor.prototype, protoProps);
if (staticProps) defineProperties(Constructor, staticProps);
return Constructor;
};
}();
var defineProperty = function(obj, key, value) {
if (key in obj) {
Object.defineProperty(obj, key, {
value: value,
enumerable: true,
configurable: true,
writable: true
});
} else {
obj[key] = value;
}
return obj;
};
var _extends = Object.assign || function(target) {
for (var i = 1; i < arguments.length; i++) {
var source = arguments[i];
for (var key in source) {
if (Object.prototype.hasOwnProperty.call(source, key)) {
target[key] = source[key];
}
}
}
return target;
};

function getClientRect(offsets) {
return _extends({}, offsets, {
right: offsets.left + offsets.width,
bottom: offsets.top + offsets.height
});
}

function getBoundingClientRect(element) {
var rect = {};



if (isIE10$1()) {
try {
rect = element.getBoundingClientRect();
var scrollTop = getScroll(element, 'top');
var scrollLeft = getScroll(element, 'left');
rect.top += scrollTop;
rect.left += scrollLeft;
rect.bottom += scrollTop;
rect.right += scrollLeft;
} catch (err) {
console.log(err);
}
} else {
rect = element.getBoundingClientRect();
}
var result = {
left: rect.left,
top: rect.top,
width: rect.right - rect.left,
height: rect.bottom - rect.top
};

var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
var width = sizes.width || element.clientWidth || result.right - result.left;
var height = sizes.height || element.clientHeight || result.bottom - result.top;
var horizScrollbar = element.offsetWidth - width;
var vertScrollbar = element.offsetHeight - height;



if (horizScrollbar || vertScrollbar) {
var styles = getStyleComputedProperty(element);
horizScrollbar -= getBordersSize(styles, 'x');
vertScrollbar -= getBordersSize(styles, 'y');
result.width -= horizScrollbar;
result.height -= vertScrollbar;
}
return getClientRect(result);
}
function getOffsetRectRelativeToArbitraryNode(children, parent) {
var isIE10 = isIE10$1();
var isHTML = parent.nodeName === 'HTML';
var childrenRect = getBoundingClientRect(children);
var parentRect = getBoundingClientRect(parent);
var scrollParent = getScrollParent(children);
var styles = getStyleComputedProperty(parent);
var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);
var offsets = getClientRect({
top: childrenRect.top - parentRect.top - borderTopWidth,
left: childrenRect.left - parentRect.left - borderLeftWidth,
width: childrenRect.width,
height: childrenRect.height
});
offsets.marginTop = 0;
offsets.marginLeft = 0;




if (!isIE10 && isHTML) {
var marginTop = parseFloat(styles.marginTop, 10);
var marginLeft = parseFloat(styles.marginLeft, 10);
offsets.top -= borderTopWidth - marginTop;
offsets.bottom -= borderTopWidth - marginTop;
offsets.left -= borderLeftWidth - marginLeft;
offsets.right -= borderLeftWidth - marginLeft;


offsets.marginTop = marginTop;
offsets.marginLeft = marginLeft;
}
if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
offsets = includeScroll(offsets, parent);
}
return offsets;
}
function getViewportOffsetRectRelativeToArtbitraryNode(element) {
var html = element.ownerDocument.documentElement;
var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
var width = Math.max(html.clientWidth, window.innerWidth || 0);
var height = Math.max(html.clientHeight, window.innerHeight || 0);
var scrollTop = getScroll(html);
var scrollLeft = getScroll(html, 'left');
var offset = {
top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
width: width,
height: height
};
return getClientRect(offset);
}

function isFixed(element) {
var nodeName = element.nodeName;
if (nodeName === 'BODY' || nodeName === 'HTML') {
return false;
}
if (getStyleComputedProperty(element, 'position') === 'fixed') {
return true;
}
return isFixed(getParentNode(element));
}

function getBoundaries(popper, reference, padding, boundariesElement) {

var boundaries = {
top: 0,
left: 0
};
var offsetParent = findCommonOffsetParent(popper, reference);

if (boundariesElement === 'viewport') {
boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
} else {

var boundariesNode = void 0;
if (boundariesElement === 'scrollParent') {
boundariesNode = getScrollParent(getParentNode(reference));
if (boundariesNode.nodeName === 'BODY') {
boundariesNode = popper.ownerDocument.documentElement;
}
} else if (boundariesElement === 'window') {
boundariesNode = popper.ownerDocument.documentElement;
} else {
boundariesNode = boundariesElement;
}
var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
var _getWindowSizes = getWindowSizes(),
height = _getWindowSizes.height,
width = _getWindowSizes.width;
boundaries.top += offsets.top - offsets.marginTop;
boundaries.bottom = height + offsets.top;
boundaries.left += offsets.left - offsets.marginLeft;
boundaries.right = width + offsets.left;
} else {

boundaries = offsets;
}
}

boundaries.left += padding;
boundaries.top += padding;
boundaries.right -= padding;
boundaries.bottom -= padding;
return boundaries;
}
function getArea(_ref) {
var width = _ref.width,
height = _ref.height;
return width * height;
}

function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
if (placement.indexOf('auto') === -1) {
return placement;
}
var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
var rects = {
top: {
width: boundaries.width,
height: refRect.top - boundaries.top
},
right: {
width: boundaries.right - refRect.right,
height: boundaries.height
},
bottom: {
width: boundaries.width,
height: boundaries.bottom - refRect.bottom
},
left: {
width: refRect.left - boundaries.left,
height: boundaries.height
}
};
var sortedAreas = Object.keys(rects).map(function(key) {
return _extends({
key: key
}, rects[key], {
area: getArea(rects[key])
});
}).sort(function(a, b) {
return b.area - a.area;
});
var filteredAreas = sortedAreas.filter(function(_ref2) {
var width = _ref2.width,
height = _ref2.height;
return width >= popper.clientWidth && height >= popper.clientHeight;
});
var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
var variation = placement.split('-')[1];
return computedPlacement + (variation ? '-' + variation : '');
}

function getReferenceOffsets(state, popper, reference) {
var commonOffsetParent = findCommonOffsetParent(popper, reference);
return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
}

function getOuterSizes(element) {
var styles = getComputedStyle(element);
var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
var result = {
width: element.offsetWidth + y,
height: element.offsetHeight + x
};
return result;
}

function getOppositePlacement(placement) {
var hash = {
left: 'right',
right: 'left',
bottom: 'top',
top: 'bottom'
};
return placement.replace(/left|right|bottom|top/g, function(matched) {
return hash[matched];
});
}

function getPopperOffsets(popper, referenceOffsets, placement) {
placement = placement.split('-')[0];

var popperRect = getOuterSizes(popper);

var popperOffsets = {
width: popperRect.width,
height: popperRect.height
};


var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
var mainSide = isHoriz ? 'top' : 'left';
var secondarySide = isHoriz ? 'left' : 'top';
var measurement = isHoriz ? 'height' : 'width';
var secondaryMeasurement = !isHoriz ? 'height' : 'width';
popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
if (placement === secondarySide) {
popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
} else {
popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
}
return popperOffsets;
}

function find(arr, check) {

if (Array.prototype.find) {
return arr.find(check);
}

return arr.filter(check)[0];
}

function findIndex(arr, prop, value) {

if (Array.prototype.findIndex) {
return arr.findIndex(function(cur) {
return cur[prop] === value;
});
}

var match = find(arr, function(obj) {
return obj[prop] === value;
});
return arr.indexOf(match);
}

function runModifiers(modifiers, data, ends) {
var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
modifiersToRun.forEach(function(modifier) {
if (modifier['function']) {

console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
}
var fn = modifier['function'] || modifier.fn; 

if (modifier.enabled && isFunction(fn)) {



data.offsets.popper = getClientRect(data.offsets.popper);
data.offsets.reference = getClientRect(data.offsets.reference);
data = fn(data, modifier);
}
});
return data;
}

function update() {

if (this.state.isDestroyed) {
return;
}
var data = {
instance: this,
styles: {},
arrowStyles: {},
attributes: {},
flipped: false,
offsets: {}
};

data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);



data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

data.originalPlacement = data.placement;

data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
data.offsets.popper.position = 'absolute';

data = runModifiers(this.modifiers, data);


if (!this.state.isCreated) {
this.state.isCreated = true;
this.options.onCreate(data);
} else {
this.options.onUpdate(data);
}
}

function isModifierEnabled(modifiers, modifierName) {
return modifiers.some(function(_ref) {
var name = _ref.name,
enabled = _ref.enabled;
return enabled && name === modifierName;
});
}

function getSupportedPropertyName(property) {
var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
var upperProp = property.charAt(0).toUpperCase() + property.slice(1);
for (var i = 0; i < prefixes.length - 1; i++) {
var prefix = prefixes[i];
var toCheck = prefix ? '' + prefix + upperProp : property;
if (typeof document.body.style[toCheck] !== 'undefined') {
return toCheck;
}
}
return null;
}

function destroy() {
this.state.isDestroyed = true;

if (isModifierEnabled(this.modifiers, 'applyStyle')) {
this.popper.removeAttribute('x-placement');
this.popper.style.left = '';
this.popper.style.position = '';
this.popper.style.top = '';
this.popper.style[getSupportedPropertyName('transform')] = '';
}
this.disableEventListeners();


if (this.options.removeOnDestroy) {
this.popper.parentNode.removeChild(this.popper);
}
return this;
}

function getWindow(element) {
var ownerDocument = element.ownerDocument;
return ownerDocument ? ownerDocument.defaultView : window;
}
function attachToScrollParents(scrollParent, event, callback, scrollParents) {
var isBody = scrollParent.nodeName === 'BODY';
var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
target.addEventListener(event, callback, {
passive: true
});
if (!isBody) {
attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
}
scrollParents.push(target);
}

function setupEventListeners(reference, options, state, updateBound) {

state.updateBound = updateBound;
getWindow(reference).addEventListener('resize', state.updateBound, {
passive: true
});

var scrollElement = getScrollParent(reference);
attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
state.scrollElement = scrollElement;
state.eventsEnabled = true;
return state;
}

function enableEventListeners() {
if (!this.state.eventsEnabled) {
this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
}
}

function removeEventListeners(reference, state) {

getWindow(reference).removeEventListener('resize', state.updateBound);

state.scrollParents.forEach(function(target) {
target.removeEventListener('scroll', state.updateBound);
});

state.updateBound = null;
state.scrollParents = [];
state.scrollElement = null;
state.eventsEnabled = false;
return state;
}

function disableEventListeners() {
if (this.state.eventsEnabled) {
cancelAnimationFrame(this.scheduleUpdate);
this.state = removeEventListeners(this.reference, this.state);
}
}

function isNumeric(n) {
return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

function setStyles(element, styles) {
Object.keys(styles).forEach(function(prop) {
var unit = '';

if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
unit = 'px';
}
element.style[prop] = styles[prop] + unit;
});
}

function setAttributes(element, attributes) {
Object.keys(attributes).forEach(function(prop) {
var value = attributes[prop];
if (value !== false) {
element.setAttribute(prop, attributes[prop]);
} else {
element.removeAttribute(prop);
}
});
}

function applyStyle(data) {




setStyles(data.instance.popper, data.styles);


setAttributes(data.instance.popper, data.attributes);

if (data.arrowElement && Object.keys(data.arrowStyles).length) {
setStyles(data.arrowElement, data.arrowStyles);
}
return data;
}

function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {

var referenceOffsets = getReferenceOffsets(state, popper, reference);



var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
popper.setAttribute('x-placement', placement);


setStyles(popper, {
position: 'absolute'
});
return options;
}

function computeStyle(data, options) {
var x = options.x,
y = options.y;
var popper = data.offsets.popper;

var legacyGpuAccelerationOption = find(data.instance.modifiers, function(modifier) {
return modifier.name === 'applyStyle';
}).gpuAcceleration;
if (legacyGpuAccelerationOption !== undefined) {
console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
}
var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
var offsetParent = getOffsetParent(data.instance.popper);
var offsetParentRect = getBoundingClientRect(offsetParent);

var styles = {
position: popper.position
};

var offsets = {
left: Math.floor(popper.left),
top: Math.floor(popper.top),
bottom: Math.floor(popper.bottom),
right: Math.floor(popper.right)
};
var sideA = x === 'bottom' ? 'top' : 'bottom';
var sideB = y === 'right' ? 'left' : 'right';



var prefixedProperty = getSupportedPropertyName('transform');









var left = void 0,
top = void 0;
if (sideA === 'bottom') {
top = -offsetParentRect.height + offsets.bottom;
} else {
top = offsets.top;
}
if (sideB === 'right') {
left = -offsetParentRect.width + offsets.right;
} else {
left = offsets.left;
}
if (gpuAcceleration && prefixedProperty) {
styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
styles[sideA] = 0;
styles[sideB] = 0;
styles.willChange = 'transform';
} else {


var invertTop = sideA === 'bottom' ? -1 : 1;
var invertLeft = sideB === 'right' ? -1 : 1;
styles[sideA] = top * invertTop;
styles[sideB] = left * invertLeft;
styles.willChange = sideA + ', ' + sideB;
}

var attributes = {
'x-placement': data.placement
};

data.attributes = _extends({}, attributes, data.attributes);
data.styles = _extends({}, styles, data.styles);
data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
return data;
}

function isModifierRequired(modifiers, requestingName, requestedName) {
var requesting = find(modifiers, function(_ref) {
var name = _ref.name;
return name === requestingName;
});
var isRequired = !!requesting && modifiers.some(function(modifier) {
return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
});
if (!isRequired) {
var _requesting = '`' + requestingName + '`';
var requested = '`' + requestedName + '`';
console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
}
return isRequired;
}

function arrow(data, options) {
var _data$offsets$arrow;

if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
return data;
}
var arrowElement = options.element;

if (typeof arrowElement === 'string') {
arrowElement = data.instance.popper.querySelector(arrowElement);

if (!arrowElement) {
return data;
}
} else {


if (!data.instance.popper.contains(arrowElement)) {
console.warn('WARNING: `arrow.element` must be child of its popper element!');
return data;
}
}
var placement = data.placement.split('-')[0];
var _data$offsets = data.offsets,
popper = _data$offsets.popper,
reference = _data$offsets.reference;
var isVertical = ['left', 'right'].indexOf(placement) !== -1;
var len = isVertical ? 'height' : 'width';
var sideCapitalized = isVertical ? 'Top' : 'Left';
var side = sideCapitalized.toLowerCase();
var altSide = isVertical ? 'left' : 'top';
var opSide = isVertical ? 'bottom' : 'right';
var arrowElementSize = getOuterSizes(arrowElement)[len];





if (reference[opSide] - arrowElementSize < popper[side]) {
data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
}

if (reference[side] + arrowElementSize > popper[opSide]) {
data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
}
data.offsets.popper = getClientRect(data.offsets.popper);

var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;


var css = getStyleComputedProperty(data.instance.popper);
var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
data.arrowElement = arrowElement;
data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
return data;
}

function getOppositeVariation(variation) {
if (variation === 'end') {
return 'start';
} else if (variation === 'start') {
return 'end';
}
return variation;
}

var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

var validPlacements = placements.slice(3);

function clockwise(placement) {
var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
var index = validPlacements.indexOf(placement);
var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
return counter ? arr.reverse() : arr;
}
var BEHAVIORS = {
FLIP: 'flip',
CLOCKWISE: 'clockwise',
COUNTERCLOCKWISE: 'counterclockwise'
};

function flip(data, options) {

if (isModifierEnabled(data.instance.modifiers, 'inner')) {
return data;
}
if (data.flipped && data.placement === data.originalPlacement) {


return data;
}
var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);
var placement = data.placement.split('-')[0];
var placementOpposite = getOppositePlacement(placement);
var variation = data.placement.split('-')[1] || '';
var flipOrder = [];
switch (options.behavior) {
case BEHAVIORS.FLIP:
flipOrder = [placement, placementOpposite];
break;
case BEHAVIORS.CLOCKWISE:
flipOrder = clockwise(placement);
break;
case BEHAVIORS.COUNTERCLOCKWISE:
flipOrder = clockwise(placement, true);
break;
default:
flipOrder = options.behavior;
}
flipOrder.forEach(function(step, index) {
if (placement !== step || flipOrder.length === index + 1) {
return data;
}
placement = data.placement.split('-')[0];
placementOpposite = getOppositePlacement(placement);
var popperOffsets = data.offsets.popper;
var refOffsets = data.offsets.reference;


var floor = Math.floor;
var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);
if (overlapsRef || overflowsBoundaries || flippedVariation) {

data.flipped = true;
if (overlapsRef || overflowsBoundaries) {
placement = flipOrder[index + 1];
}
if (flippedVariation) {
variation = getOppositeVariation(variation);
}
data.placement = placement + (variation ? '-' + variation : '');


data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
data = runModifiers(data.instance.modifiers, data, 'flip');
}
});
return data;
}

function keepTogether(data) {
var _data$offsets = data.offsets,
popper = _data$offsets.popper,
reference = _data$offsets.reference;
var placement = data.placement.split('-')[0];
var floor = Math.floor;
var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
var side = isVertical ? 'right' : 'bottom';
var opSide = isVertical ? 'left' : 'top';
var measurement = isVertical ? 'width' : 'height';
if (popper[side] < floor(reference[opSide])) {
data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
}
if (popper[opSide] > floor(reference[side])) {
data.offsets.popper[opSide] = floor(reference[side]);
}
return data;
}

function toValue(str, measurement, popperOffsets, referenceOffsets) {

var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
var value = +split[1];
var unit = split[2];

if (!value) {
return str;
}
if (unit.indexOf('%') === 0) {
var element = void 0;
switch (unit) {
case '%p':
element = popperOffsets;
break;
case '%':
case '%r':
default:
element = referenceOffsets;
}
var rect = getClientRect(element);
return rect[measurement] / 100 * value;
} else if (unit === 'vh' || unit === 'vw') {

var size = void 0;
if (unit === 'vh') {
size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
} else {
size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}
return size / 100 * value;
} else {


return value;
}
}

function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
var offsets = [0, 0];




var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;



var fragments = offset.split(/(\+|\-)/).map(function(frag) {
return frag.trim();
});


var divider = fragments.indexOf(find(fragments, function(frag) {
return frag.search(/,|\s/) !== -1;
}));
if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
}


var splitRegex = /\s*,\s*|\s+/;
var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];


ops = ops.map(function(op, index) {

var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
var mergeWithPrevious = false;
return op


.reduce(function(a, b) {
if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
a[a.length - 1] = b;
mergeWithPrevious = true;
return a;
} else if (mergeWithPrevious) {
a[a.length - 1] += b;
mergeWithPrevious = false;
return a;
} else {
return a.concat(b);
}
}, [])

.map(function(str) {
return toValue(str, measurement, popperOffsets, referenceOffsets);
});
});

ops.forEach(function(op, index) {
op.forEach(function(frag, index2) {
if (isNumeric(frag)) {
offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
}
});
});
return offsets;
}

function offset(data, _ref) {
var offset = _ref.offset;
var placement = data.placement,
_data$offsets = data.offsets,
popper = _data$offsets.popper,
reference = _data$offsets.reference;
var basePlacement = placement.split('-')[0];
var offsets = void 0;
if (isNumeric(+offset)) {
offsets = [+offset, 0];
} else {
offsets = parseOffset(offset, popper, reference, basePlacement);
}
if (basePlacement === 'left') {
popper.top += offsets[0];
popper.left -= offsets[1];
} else if (basePlacement === 'right') {
popper.top += offsets[0];
popper.left += offsets[1];
} else if (basePlacement === 'top') {
popper.left += offsets[0];
popper.top -= offsets[1];
} else if (basePlacement === 'bottom') {
popper.left += offsets[0];
popper.top += offsets[1];
}
data.popper = popper;
return data;
}

function preventOverflow(data, options) {
var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);



if (data.instance.reference === boundariesElement) {
boundariesElement = getOffsetParent(boundariesElement);
}
var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
options.boundaries = boundaries;
var order = options.priority;
var popper = data.offsets.popper;
var check = {
primary: function primary(placement) {
var value = popper[placement];
if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
value = Math.max(popper[placement], boundaries[placement]);
}
return defineProperty({}, placement, value);
},
secondary: function secondary(placement) {
var mainSide = placement === 'right' ? 'left' : 'top';
var value = popper[mainSide];
if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
}
return defineProperty({}, mainSide, value);
}
};
order.forEach(function(placement) {
var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
popper = _extends({}, popper, check[side](placement));
});
data.offsets.popper = popper;
return data;
}

function shift(data) {
var placement = data.placement;
var basePlacement = placement.split('-')[0];
var shiftvariation = placement.split('-')[1];

if (shiftvariation) {
var _data$offsets = data.offsets,
reference = _data$offsets.reference,
popper = _data$offsets.popper;
var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
var side = isVertical ? 'left' : 'top';
var measurement = isVertical ? 'width' : 'height';
var shiftOffsets = {
start: defineProperty({}, side, reference[side]),
end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
};
data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
}
return data;
}

function hide(data) {
if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
return data;
}
var refRect = data.offsets.reference;
var bound = find(data.instance.modifiers, function(modifier) {
return modifier.name === 'preventOverflow';
}).boundaries;
if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {

if (data.hide === true) {
return data;
}
data.hide = true;
data.attributes['x-out-of-boundaries'] = '';
} else {

if (data.hide === false) {
return data;
}
data.hide = false;
data.attributes['x-out-of-boundaries'] = false;
}
return data;
}

function inner(data) {
var placement = data.placement;
var basePlacement = placement.split('-')[0];
var _data$offsets = data.offsets,
popper = _data$offsets.popper,
reference = _data$offsets.reference;
var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
data.placement = getOppositePlacement(placement);
data.offsets.popper = getClientRect(popper);
return data;
}


var modifiers = {

shift: {

order: 100,

enabled: true,

fn: shift
},

offset: {

order: 200,

enabled: true,

fn: offset,

offset: 0
},

preventOverflow: {

order: 300,

enabled: true,

fn: preventOverflow,

priority: ['left', 'right', 'top', 'bottom'],

padding: 5,

boundariesElement: 'scrollParent'
},

keepTogether: {

order: 400,

enabled: true,

fn: keepTogether
},

arrow: {

order: 500,

enabled: true,

fn: arrow,

element: '[x-arrow]'
},

flip: {

order: 600,

enabled: true,

fn: flip,

behavior: 'flip',

padding: 5,

boundariesElement: 'viewport'
},

inner: {

order: 700,

enabled: false,

fn: inner
},

hide: {

order: 800,

enabled: true,

fn: hide
},

computeStyle: {

order: 850,

enabled: true,

fn: computeStyle,

gpuAcceleration: true,

x: 'bottom',

y: 'right'
},

applyStyle: {

order: 900,

enabled: true,

fn: applyStyle,

onLoad: applyStyleOnLoad,

gpuAcceleration: undefined
}
};


var Defaults = {

placement: 'bottom',

eventsEnabled: true,

removeOnDestroy: false,

onCreate: function onCreate() {},

onUpdate: function onUpdate() {},

modifiers: modifiers
};




var Popper = function() {

function Popper(reference, popper) {
var _this = this;
var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
classCallCheck(this, Popper);
this.scheduleUpdate = function() {
return requestAnimationFrame(_this.update);
};

this.update = debounce(this.update.bind(this));

this.options = _extends({}, Popper.Defaults, options);

this.state = {
isDestroyed: false,
isCreated: false,
scrollParents: []
};

this.reference = reference && reference.jquery ? reference[0] : reference;
this.popper = popper && popper.jquery ? popper[0] : popper;

this.options.modifiers = {};
Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function(name) {
_this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
});

this.modifiers = Object.keys(this.options.modifiers).map(function(name) {
return _extends({
name: name
}, _this.options.modifiers[name]);
})

.sort(function(a, b) {
return a.order - b.order;
});






this.modifiers.forEach(function(modifierOptions) {
if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
}
});

this.update();
var eventsEnabled = this.options.eventsEnabled;
if (eventsEnabled) {


this.enableEventListeners();
}
this.state.eventsEnabled = eventsEnabled;
}


createClass(Popper, [{
key: 'update',
value: function update$$1() {
return update.call(this);
}
}, {
key: 'destroy',
value: function destroy$$1() {
return destroy.call(this);
}
}, {
key: 'enableEventListeners',
value: function enableEventListeners$$1() {
return enableEventListeners.call(this);
}
}, {
key: 'disableEventListeners',
value: function disableEventListeners$$1() {
return disableEventListeners.call(this);
}


}]);
return Popper;
}();

Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;
return Popper;
})));

if (typeof jQuery === 'undefined') {
throw new Error('Bootstrap\'s JavaScript requires jQuery');
}
+ function($) {

'use strict';
var version = $.fn.jquery.split(' ')[0].split('.');
if ((version[0] < 2 && version[1] < 9) || (version[0] === 1 && version[1] === 9 && version[2] < 1)) {
throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher');
}
}(jQuery);

+ function($) {

'use strict';


function transitionEnd() {
var el = document.createElement('bootstrap');
var transEndEventNames = {
WebkitTransition: 'webkitTransitionEnd',
MozTransition: 'transitionend',
OTransition: 'oTransitionEnd otransitionend',
transition: 'transitionend'
};
for (var name in transEndEventNames) {
if (el.style[name] !== undefined) {
return {
end: transEndEventNames[name]
};
}
}
return false; 
}

$.fn.emulateTransitionEnd = function(duration) {
var called = false;
var $el = this;
$(this).one('bsTransitionEnd', function() {
called = true;
});
var callback = function() {
if (!called) $($el).trigger($.support.transition.end);
};
setTimeout(callback, duration);
return this;
};
$(function() {
$.support.transition = transitionEnd();
if (!$.support.transition) return;
$.event.special.bsTransitionEnd = {
bindType: $.support.transition.end,
delegateType: $.support.transition.end,
handle: function(e) {
if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
}
};
});
}(jQuery);

+ function($) {

'use strict';


var Tooltip = function(element, options) {
this.type =
this.options =
this.enabled =
this.timeout =
this.hoverState =
this.$element = null;
this.init('tooltip', element, options);
};
Tooltip.VERSION = '3.3.2';
Tooltip.TRANSITION_DURATION = 150;
Tooltip.DEFAULTS = {
animation: true,
placement: 'top',
selector: false,
template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
trigger: 'hover focus',
title: '',
delay: 0,
html: false,
container: false,
viewport: {
selector: 'body',
padding: 0
}
};
Tooltip.prototype.init = function(type, element, options) {
this.enabled = true;
this.type = type;
this.$element = $(element);
this.options = this.getOptions(options);
this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);
var triggers = this.options.trigger.split(' ');
for (var i = triggers.length; i--;) {
var trigger = triggers[i];
if (trigger === 'click') {
this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
} else if (trigger !== 'manual') {
var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';
this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
}
}
this.options.selector ?
(this._options = $.extend({}, this.options, {
trigger: 'manual',
selector: ''
})) :
this.fixTitle();
};
Tooltip.prototype.getDefaults = function() {
return Tooltip.DEFAULTS;
};
Tooltip.prototype.getOptions = function(options) {
options = $.extend({}, this.getDefaults(), this.$element.data(), options);
if (options.delay && typeof options.delay === 'number') {
options.delay = {
show: options.delay,
hide: options.delay
};
}
return options;
};
Tooltip.prototype.getDelegateOptions = function() {
var options = {};
var defaults = this.getDefaults();
this._options && $.each(this._options, function(key, value) {
if (defaults[key] !== value) options[key] = value;
});
return options;
};
Tooltip.prototype.enter = function(obj) {
var self = obj instanceof this.constructor ?
obj : $(obj.currentTarget).data('bs.' + this.type);
if (self && self.$tip && self.$tip.is(':visible')) {
self.hoverState = 'in';
return;
}
if (!self) {
self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
$(obj.currentTarget).data('bs.' + this.type, self);
}
clearTimeout(self.timeout);
self.hoverState = 'in';
if (!self.options.delay || !self.options.delay.show) return self.show();
self.timeout = setTimeout(function() {
if (self.hoverState === 'in') self.show();
}, self.options.delay.show);
};
Tooltip.prototype.leave = function(obj) {
var self = obj instanceof this.constructor ?
obj : $(obj.currentTarget).data('bs.' + this.type);
if (!self) {
self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
$(obj.currentTarget).data('bs.' + this.type, self);
}
clearTimeout(self.timeout);
self.hoverState = 'out';
if (!self.options.delay || !self.options.delay.hide) return self.hide();
self.timeout = setTimeout(function() {
if (self.hoverState === 'out') self.hide();
}, self.options.delay.hide);
};
Tooltip.prototype.show = function() {
var e = $.Event('show.bs.' + this.type);
if (this.hasContent() && this.enabled) {
this.$element.trigger(e);
var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
if (e.isDefaultPrevented() || !inDom) return;
var that = this;
var $tip = this.tip();
var tipId = this.getUID(this.type);
this.setContent();
$tip.attr('id', tipId);
this.$element.attr('aria-describedby', tipId);





if (this.options.animation) $tip.addClass('fade');
var placement = typeof this.options.placement === 'function' ?
this.options.placement.call(this, $tip[0], this.$element[0]) :
this.options.placement;
var autoToken = /\s?auto?\s?/i;
var autoPlace = autoToken.test(placement);
if (autoPlace) placement = placement.replace(autoToken, '') || 'top';
$tip
.detach()
.css({
top: 0,
left: 0,
display: 'block'
})
.addClass(placement)
.data('bs.' + this.type, this);
this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
var pos = this.getPosition();
var actualWidth = $tip[0].offsetWidth;
var actualHeight = $tip[0].offsetHeight;
if (autoPlace) {
var orgPlacement = placement;
var $container = this.options.container ? $(this.options.container) : this.$element.parent();
var containerDim = this.getPosition($container);
placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top' :
placement == 'top' && pos.top - actualHeight < containerDim.top ? 'bottom' :
placement == 'right' && pos.right + actualWidth > containerDim.width ? 'left' :
placement == 'left' && pos.left - actualWidth < containerDim.left ? 'right' :
placement;
$tip
.removeClass(orgPlacement)
.addClass(placement);
}
var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
this.applyPlacement(calculatedOffset, placement);
var complete = function() {
var prevHoverState = that.hoverState;
that.$element.trigger('shown.bs.' + that.type);
that.hoverState = null;
if (prevHoverState === 'out') that.leave(that);
};
$.support.transition && this.$tip.hasClass('fade') ?
$tip
.one('bsTransitionEnd', complete)
.emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
complete();
}
};
Tooltip.prototype.applyPlacement = function(offset, placement) {
var $tip = this.tip();
var width = $tip[0].offsetWidth;
var height = $tip[0].offsetHeight;

var marginTop = parseInt($tip.css('margin-top'), 10);
var marginLeft = parseInt($tip.css('margin-left'), 10);

if (isNaN(marginTop)) marginTop = 0;
if (isNaN(marginLeft)) marginLeft = 0;
offset.top = offset.top + marginTop;
offset.left = offset.left + marginLeft;


$.offset.setOffset($tip[0], $.extend({
using: function(props) {
$tip.css({
top: Math.round(props.top),
left: Math.round(props.left)
});
}
}, offset), 0);
$tip.addClass('in');

var actualWidth = $tip[0].offsetWidth;
var actualHeight = $tip[0].offsetHeight;
if (placement === 'top' && actualHeight !== height) {
offset.top = offset.top + height - actualHeight;
}
var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
if (delta.left) offset.left += delta.left;
else offset.top += delta.top;
var isVertical = /top|bottom/.test(placement);
var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';
$tip.offset(offset);
this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
};
Tooltip.prototype.replaceArrow = function(delta, dimension, isHorizontal) {
this.arrow()
.css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
.css(isHorizontal ? 'top' : 'left', '');
};
Tooltip.prototype.setContent = function() {
var $tip = this.tip();
var title = this.getTitle();
$tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
$tip.removeClass('fade in top bottom left right');
};
Tooltip.prototype.hide = function(callback) {
var that = this;
var $tip = this.tip();
var e = $.Event('hide.bs.' + this.type);
function complete() {
if (that.hoverState !== 'in') $tip.detach();
that.$element
.removeAttr('aria-describedby')
.trigger('hidden.bs.' + that.type);
callback && callback();
}
this.$element.trigger(e);
if (e.isDefaultPrevented()) return;
$tip.removeClass('in');
$.support.transition && this.$tip.hasClass('fade') ?
$tip
.one('bsTransitionEnd', complete)
.emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
complete();
this.hoverState = null;
return this;
};
Tooltip.prototype.fixTitle = function() {
var $e = this.$element;
if ($e.attr('title') || typeof($e.attr('data-original-title')) !== 'string') {
$e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
}
};
Tooltip.prototype.hasContent = function() {
return this.getTitle();
};
Tooltip.prototype.getPosition = function($element) {
$element = $element || this.$element;
var el = $element[0];
var isBody = el.tagName == 'BODY';
var elRect = el.getBoundingClientRect();
if (elRect.width == null) {


elRect = $.extend({}, elRect, {
width: elRect.right - elRect.left,
height: elRect.bottom - elRect.top
});
}
var elOffset = isBody ? {
top: 0,
left: 0
} : $element.offset();
var scroll = {
scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
};
var outerDims = isBody ? {
width: $(window).width(),
height: $(window).height()
} : null;
return $.extend({}, elRect, scroll, outerDims, elOffset);
};
Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
return placement == 'bottom' ? {
top: pos.top + pos.height,
left: pos.left + pos.width / 2 - actualWidth / 2
} :
placement == 'top' ? {
top: pos.top - actualHeight,
left: pos.left + pos.width / 2 - actualWidth / 2
} :
placement == 'left' ? {
top: pos.top + pos.height / 2 - actualHeight / 2,
left: pos.left - actualWidth
} :

{
top: pos.top + pos.height / 2 - actualHeight / 2,
left: pos.left + pos.width
};
};
Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
var delta = {
top: 0,
left: 0
};
if (!this.$viewport) return delta;
var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
var viewportDimensions = this.getPosition(this.$viewport);
if (/right|left/.test(placement)) {
var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
if (topEdgeOffset < viewportDimensions.top) { 
delta.top = viewportDimensions.top - topEdgeOffset;
} else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { 

delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
}
} else {
var leftEdgeOffset = pos.left - viewportPadding;
var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
if (leftEdgeOffset < viewportDimensions.left) { 
delta.left = viewportDimensions.left - leftEdgeOffset;
} else if (rightEdgeOffset > viewportDimensions.width) { 

delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
}
}
return delta;
};
Tooltip.prototype.getTitle = function() {
var title;
var $e = this.$element;
var o = this.options;
title = $e.attr('data-original-title') || (typeof o.title === 'function' ? o.title.call($e[0]) : o.title);
return title;
};
Tooltip.prototype.getUID = function(prefix) {
do prefix += Math.floor((Math.random() * 1000000));
while (document.getElementById(prefix));
return prefix;
};
Tooltip.prototype.tip = function() {
return (this.$tip = this.$tip || $(this.options.template));
};
Tooltip.prototype.arrow = function() {
return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'));
};
Tooltip.prototype.enable = function() {
this.enabled = true;
};
Tooltip.prototype.disable = function() {
this.enabled = false;
};
Tooltip.prototype.toggleEnabled = function() {
this.enabled = !this.enabled;
};
Tooltip.prototype.toggle = function(e) {
var self = this;
if (e) {
self = $(e.currentTarget).data('bs.' + this.type);
if (!self) {
self = new this.constructor(e.currentTarget, this.getDelegateOptions());
$(e.currentTarget).data('bs.' + this.type, self);
}
}
self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
};
Tooltip.prototype.destroy = function() {
var that = this;
clearTimeout(this.timeout);
this.hide(function() {
that.$element.off('.' + that.type).removeData('bs.' + that.type);
});
};


function Plugin(option) {
return this.each(function() {
var $this = $(this);
var data = $this.data('bs.tooltip');
var options = typeof option === 'object' && option;
if (!data && option === 'destroy') return;
if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)));
if (typeof option === 'string') data[option]();
});
}
var old = $.fn.tooltip;
$.fn.tooltip = Plugin;
$.fn.tooltip.Constructor = Tooltip;


$.fn.tooltip.noConflict = function() {
$.fn.tooltip = old;
return this;
};
}(jQuery);

+ function($) {

'use strict';


var Popover = function(element, options) {
this.init('popover', element, options);
};
if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');
Popover.VERSION = '3.3.2';
Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
placement: 'right',
trigger: 'click',
content: '',
template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
});


Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
Popover.prototype.constructor = Popover;
Popover.prototype.getDefaults = function() {
return Popover.DEFAULTS;
};
Popover.prototype.setContent = function() {
var $tip = this.tip();
var title = this.getTitle();
var content = this.getContent();
$tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
$tip.find('.popover-content').children().detach().end()[ 




this.options.html ? (typeof content === 'string' ? 'html' : 'append') : 'text'
](content);
$tip.removeClass('fade top bottom left right in');


if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
};
Popover.prototype.hasContent = function() {
return this.getTitle() || this.getContent();
};
Popover.prototype.getContent = function() {
var $e = this.$element;
var o = this.options;
return $e.attr('data-content') || (typeof o.content === 'function' ?
o.content.call($e[0]) :
o.content);
};
Popover.prototype.arrow = function() {
return (this.$arrow = this.$arrow || this.tip().find('.arrow'));
};
Popover.prototype.tip = function() {
if (!this.$tip) this.$tip = $(this.options.template);
return this.$tip;
};


function Plugin(option) {
return this.each(function() {
var $this = $(this);
var data = $this.data('bs.popover');
var options = typeof option === 'object' && option;
if (!data && option === 'destroy') return;
if (!data) $this.data('bs.popover', (data = new Popover(this, options)));
if (typeof option === 'string') data[option]();
});
}
var old = $.fn.popover;
$.fn.popover = Plugin;
$.fn.popover.Constructor = Popover;


$.fn.popover.noConflict = function() {
$.fn.popover = old;
return this;
};
}(jQuery);

function setCookie(c_name, value, exdays) {
if (!value) document.cookie = c_name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/;';
else {
var exdate = new Date();
exdate.setDate(exdate.getDate() + exdays);
document.cookie = c_name + "=" + encodeURI(value) + ((exdays === null) ? "" : "; expires=" + exdate.toUTCString()) + "; path=/;";
}
}

function getCookie(c_name) {
var x, y, ARRcookies = document.cookie.split(";");
for (var i = ARRcookies.length - 1; i > -1; i--) {
x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
x = x.replace(/^\s+|\s+$/g, "");
if (x == c_name) return (y && y !== undefined) ? decodeURI(y) : false;
}
return false;
}
(function() {

'use strict';
function ariaHide(elem){
$('#' + elem).attr('aria-hidden', 'true');
}
function ariaShow(elem){
$('#' + elem).attr('aria-hidden', 'false');
}
function showTooltip() {

var js_simple_tooltip = '.js-simple-tooltip';
var tooltip_txt = '.js-simpletooltip';
var aria_describedby = 'aria-describedby';
var aria_labelledby = 'aria-labelledby';
$('body')
.on('click', js_simple_tooltip, function() {
ariaHide($(this).attr(aria_labelledby) || $(this).attr(aria_describedby));
})
.on('mouseenter focusin', js_simple_tooltip, function() {
ariaShow($(this).attr(aria_labelledby) ||$(this).attr(aria_describedby));
})
.on('mouseleave', js_simple_tooltip, function() {
var $is_target_hovered = $('#' + $(this).attr(aria_labelledby) || $(this).attr(aria_describedby)).find(':hover').length > 0;
if (!$is_target_hovered) {
ariaHide($(this).attr(aria_labelledby) || $(this).attr(aria_describedby));
}
})
.on('focusout', js_simple_tooltip, function() {
ariaHide($(this).attr(aria_labelledby) || $(this).attr(aria_describedby));
})
.on('mouseleave', tooltip_txt, function() {
ariaHide($(this).attr('id'));
})
.on('keydown', function(event) {
var elm = $(tooltip_txt + '[aria-hidden="false"]').attr('id');
if (event.keyCode === 27 ) { 
if(elm !== null && typeof elm !== 'undefined') {
ariaHide(elm);
}
}
});
}

function hideTdSmallScreen() {
$('table tr td:not(.colorCol), ul li')
.each(function() {
if ($(this).children().length === 0 || ($.trim($(this).html()) === '')) {
$(this).addClass('emptyCol');
} else {
var count = 0;
for (var i = 0; i < $(this).children().length; i++) {
if ($($(this).children()[i]).is(':empty') || ($.trim($($(this).children()[i]).html()) === '')) {
count++;
}
}
if (count === $(this).children().length) {
$(this).addClass('emptyCol');
}
}
});
}

function expandMenuBar() {
var iconbar = '.iconbar';
var navbar = '#navigation';
if ($(iconbar).css('display') === 'none' || $(iconbar).length === 0 || $(iconbar).children().is(':empty')) {
$(navbar).addClass('no-iconbar');
} else {
$(navbar).removeClass('no-iconbar');
}
}
function checkedRowBorder() {
var table = '#allris table';
var chk = $(table).find('td input[type=checkbox]');
var chked = $(table).find('td input[type=checkbox]:checked');
var chkFunc = function chkFunc(elem) {
if($(elem).is(':checked')){
$(elem).closest('tr').addClass('checkedRow');
if($(chk).length === $('#allris table').find('td input[type=checkbox]:checked').length) $('#groupselectorBox').prop('checked', true);
} else {
$(elem).closest('tr').removeClass('checkedRow');
$('#groupselectorBox').prop('checked', false);
}
};
$(chk).each(function() {
chkFunc(this);
});
$(chk).on('change', function() {
chkFunc($(this));
});
$('#groupselectorBox').click(function() {
$('td.mailcheck input:checkbox').not(this).prop('checked', this.checked);
chkFunc($(chk));
});
if($('#groupselectorBox').is(':disabled')) {
$(table).find('.checkedRow').removeClass('checkedRow');
}
}
function showLegend() {
var legendTitle = '#legendeTitle';
var legendList = '#legendeList';
var timer;
$(legendTitle).on('mouseenter touchstart', function() {
$(legendList).addClass('showMe');
clearTimeout(timer);
if (!$(legendTitle).is(':focus')) {
timer = setTimeout(function() {
$(legendList).removeClass('showMe');
$(legendTitle).blur();
}, 3000);
}
})
.on('focusin', function() {
clearTimeout(timer);
$(legendList).addClass('showMe');
})
.on('focusout', function() {
$(legendList).removeClass('showMe');
})
.on('keydown', function(event) {
if(event.keyCode === 27) {
$(legendList).removeClass('showMe');
}
if(event.keyCode === 13) {
$(legendList).addClass('showMe');
}
});
}

function accessibleSimpleTooltipAria(options) {
var element = $(this);
options = options || element.data();
var text = options.simpletooltipText || element.attr('title') || '';
var prefix_class = typeof options.simpletooltipPrefixClass !== 'undefined' ? options.simpletooltipPrefixClass + '-' : '';
var content_id = typeof options.simpletooltipContentId !== 'undefined' ? '#' + options.simpletooltipContentId : '';
var index_lisible = Math.random().toString(32).slice(2, 12);
var aria_describedby = element.attr('aria-describedby') || '';
var element_id = $(element).attr('id') || '';
if(element.attr('title')){
$(element).removeAttr('title');
}

if (!aria_describedby.length && !element.is(':disabled') && !element.hasClass('disable')) {
if(~element_id.indexOf('showHideLink') || $(element).hasClass('image')){
element.attr({
'aria-labelledby': ('label_simpletooltip_' + index_lisible + ' ' + aria_describedby).trim()
});
} else {
element.attr({
'aria-describedby': ('label_simpletooltip_' + index_lisible + ' ' + aria_describedby).trim()
});
}
element.attr({
'tabindex': '0'
});
var html = '<span class="js-simpletooltip ' + prefix_class + 'simpletooltip" id="label_simpletooltip_' + index_lisible + '" role="tooltip" aria-hidden="true">';
if (text !== '') {
html += '' + text + '';
} else {
var $contentId = $(content_id);
if (content_id !== '' && $contentId.length) {
html += $contentId.html();
}
}

if (text === '') return;
html += '</span>';
if (!element.parent('.simpletooltip_container').length) {
element.wrap('<span class="' + prefix_class + 'simpletooltip_container"></span>');
}
if (!element.parent('.simpletooltip_container').has('.js-simpletooltip').length) {
$(html).insertAfter(element);
} else {
element.parent('.simpletooltip_container').find('.js-simpletooltip').replaceWith(html);
}
}
}
function colBorderLeft(){
$('td[data-bordercolor]').each(function() {
var borderColor = $(this).data('bordercolor');
$(this).find('div').css({'border-left':'thick solid '+borderColor+'', 'padding-left':'0.5em'});
});
}

function tableLayoutTO010(){
if($('#allris.to010').length > 0){
var colCount = 0;
var rowtxt = '#toTable table.dataTable>tbody>tr';
var expand = $(rowtxt + '>td.tonr a.expand');
var col = $(rowtxt + ':nth-child(1)>td');
$(col).each(function () {
if ($(this).attr('colspan')) {
colCount += $(this).attr('colspan');
} else {
colCount++;
}
});
if($(expand).length > 0) {
var row = $(expand).closest('tr');
$(row).find('>td:not(".tobetreff")').css({'display':'block'});
$(row).find('>td.emptyCol').css({'display':'none'});
$(row).find('>td.tobetreff').attr('colspan', colCount - 2);
}
}
}

function ajaxFuncs(){
hideTdSmallScreen();
expandMenuBar();
checkedRowBorder();
showLegend();
showTooltip();
colBorderLeft();
fileUploadSize();
tableLayoutTO010();
$('.js-simple-tooltip')
.each(function() {

accessibleSimpleTooltipAria.apply(this);
});
}

function showMenu(show){
var nav = $('#navigation');
var showMenu = $('#menuZeigen');
var hideMenu = $('#menuVerbergen');
var menuUl = $('#navigation>.menubar>ul');
var iconUl = $('#navigation>.iconbar>ul');
if(show === true) {
$(nav).show();
$(showMenu).hide();
$(hideMenu).show();
$(hideMenu).focus();
$(menuUl).addClass('showMenu');
$(iconUl).addClass('showMenu');
$('body').css({'overflow':'hidden', 'position':'fixed'});
} else if (show === false) {
$(nav).hide();
$(hideMenu).hide();
$(showMenu).show();
$(showMenu).focus();
$(menuUl).removeClass('showMenu');
$(iconUl).removeClass('showMenu');
$('body').css({'overflow':'visible', 'position':'relative'});
}
}
function dynamicSkipLinks(){
$('[data-jumplink]').each(function() {
var jumpID = $(this).attr('id');
var jumpName = $(this).data('jumplink');
$('#skipLinks').append('<li><a class="skip" href="#' +jumpID+ '">' + jumpName +'</a></li>');
});
}
function fileUploadSize(){
$('#fileUpload').on('change', function() {
var elem = $(this);
var maxSize = parseInt($(elem).data('maxuploadsize'), 10) || Number.MAX_SAFE_INTEGER;
var maxSingleFileSize = parseInt($(elem).data('maxsinglefilesize'), 10) || Number.MAX_SAFE_INTEGER;
var fileSize = 0;
var fileList = Object.values($(elem)[0].files);
var fileSizeDialog = '#fileSizeDialog';
var msg = '';
var dialogHTML = '<div id="fileSizeDialog" role="alert">';
if($(fileSizeDialog).length) {
$(fileSizeDialog).remove();
$('button[type=submit]').removeAttr('disabled');
}
for(var i=0; i<fileList.length; i++){
if (fileList[i].size > maxSingleFileSize) {
msg += '<div>Die Anlage <b>' + fileList[i].name +'</b> muss kleiner als <b>' + maxSingleFileSize/1024/1000 +'MB</b> sein.</div>';
}
fileSize += fileList[i].size;
}
if (fileSize > maxSize) {
if (msg === ''){
msg += '<div>Die <b>Gesamtgröße</b> der Anlagen muss kleiner als <b>' + maxSize/1024/1000 +'MB</b> sein.</div>';
}
} else {
$(fileSizeDialog).remove();
$('button[type=submit]').removeAttr('disabled');
}
dialogHTML += msg;
if (fileList.length && msg) {
$(dialogHTML).insertAfter($(elem).parent());
$('button[type=submit]').attr('disabled', 'true');
}
});
}

$.fn.accessibleSimpleTooltipAria = accessibleSimpleTooltipAria;
$.fn.hideTdSmallScreen = hideTdSmallScreen;
$.fn.expandMenuBar = expandMenuBar;
$.fn.checkedRowBorder = checkedRowBorder;
$.fn.showLegend = showLegend;
$.fn.ajaxFuncs = ajaxFuncs;
$.fn.fileUploadSize = fileUploadSize;
$(document).ready(function() {

$('form').on('blur', 'input[type="text"], input[type="date"],' +
'input[type="number"], input[type="time"],' +
'input[type="password"], input[type="email"],' +
'input[type="datetime"], input[type="search"],' +
'textarea',
function() { 


$(this).val(function(i, strContent) {
if(typeof strContent !== 'undefined' && strContent !== null){
return strContent.toString().trim();
}
return strContent;
});
});


$('#backToTop').on('click', function() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
if(window.matchMedia('(min-width: 760px)').matches) {
$('a[href="#navMenu"]').focus();
} else {
$('#menuZeigen').focus();
}
});

ajaxFuncs();


var resizeTimer;


$(window).on('resize', function() {
clearTimeout(resizeTimer);
resizeTimer = setTimeout(function() {
ajaxFuncs();
if(window.matchMedia('(min-width: 760px)').matches) {
$('#menuVerbergen').hide();
$('#menuZeigen').hide();
$('#navigation').css('display','grid');
$('body').css({'overflow':'visible','position':'relative'});
$('a[href="#navMenu"]').show();
$('a[href="#navIcon"]').show();
} else {
$('#menuZeigen').show();
$('#menuZeigen').focus();
$('#navigation').css('display','none');
$('body').css({'overflow':'visible','position':'relative'});
$('.iconSubtitle').removeClass('hideOnEsc');
$('a[href="#navMenu"]').hide();
$('a[href="#navIcon"]').hide();
}
}, 0);
});


if ($('#headRight').length === 0 || $('#headRight aside').length === 0 || $('#headRight').children().is(':empty')) {
if ($('#headLeft').length > 0) {
$('#headLeft').css('width', '100%');
}
}


$("#groupselectorBox").click(function() {
$('td.mailcheck input:checkbox').not(this).prop('checked', this.checked);
});

$('body').on('keydown', function(event) {
if (event.keyCode === 27 && window.matchMedia('(max-width: 759px)').matches) {
$('#navigation').hide();
$('#menuVerbergen').hide();
$('#menuZeigen').show();
$('#menuZeigen').focus();
$('body').css({'overflow':'visible', 'position':'relative'});
}
if (event.shiftKey && event.keyCode === 9 && window.matchMedia('(max-width: 759px)').matches) {
if($('#menuVerbergen').is(event.target)) {
$('#mehr').focus();
event.preventDefault();
event.stopPropagation();
}
if($('.menubar ul li:first a').is(event.target)) {
$('#menuVerbergen').focus();
event.preventDefault();
event.stopPropagation();
}
} else if (event.keyCode === 9 && window.matchMedia('(max-width: 759px)').matches) {
if($('a[href="./kp050"]').is(event.target) || $('#mehr:not(.open)').is(event.target)) {
$('#menuVerbergen').focus();
event.preventDefault();
event.stopPropagation();
}
if($('#menuVerbergen').is(event.target)) {
$('.menubar ul li:first a').focus();
event.preventDefault();
event.stopPropagation();
}
}
});
$('#menuZeigen').on('click', function() {
showMenu(true);
});
$('#menuVerbergen').on('click', function() {
showMenu(false);
});

$('#allris .iconbar a')
.on('focusin focusout blur mouseenter mouseleave', function(event) {
if (window.matchMedia('(min-width: 760px)').matches){
$(this).find('.iconSubtitle').removeClass('hideOnEsc');
}
});
$('body').on('keydown', function(event) {
if (event.keyCode === 27 && $('.iconSubtitle').is(':visible') && window.matchMedia('(min-width: 760px)').matches) {
$('.iconSubtitle').addClass('hideOnEsc');
}
});
$('#footerPrint').prepend('<div class="dateTimePrint">' + new Date().toLocaleString() +' </div>');
dynamicSkipLinks();
});

$(window).on('scroll', function() {
if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
$('#backToTop').show();
} else {
$('#backToTop').hide();
}
});

$(window).on('beforeunload', function() {

window.focused = $(':focus').attr('id');
window.page = $('#allris').attr('class');

console.log("***Before Loading*** -> Last focused element: ", window.focused);
console.log("***Before Loading*** -> Page Id: ", window.page);
sessionStorage.setItem("page", window.page);
sessionStorage.setItem("focused", window.focused);
});
$(window).on('load', function() {

ajaxFuncs();


var focus = sessionStorage.getItem("focused");
var pageOld = sessionStorage.getItem("page");
var pageNew = $('#allris').attr('class');

console.log("***After Loading*** -> Last focused element: ", focus);
console.log("***After Loading*** -> Old page Id: ", pageOld);
console.log("***After Loading*** -> New page Id: ", pageNew);
if (pageOld === pageNew && !$('#cookie-message').is(':visible')) {
if (typeof focus !== 'undefined' && focus !== null && $('#' + focus).length > 0 && !$('#' + focus).is(':disabled') && !$('#' + focus).hasClass('disable')) {
if(focus.includes("anchor")) {
focus = focus.split("anchor")[1];
$('#' + focus + ' .wfdate').focus();
} else {
$('#' + focus).focus();
}
} else {
var firstFocusableElement = $('#pageContent').find('button:not([disabled]),' +
'a[href],' +
'input:not([type=hidden]):not([tabindex="-1"]):not([disabled]),' +
'select:not([disabled]),' +
'textarea:not([disabled])').eq(0);
firstFocusableElement !== null ? firstFocusableElement.focus() : $('#pageContent').focus();
}
}

if (typeof pageNew !== 'undefined' && $.inArray(pageNew.split(" ")[0],
["logon", "logoff", "passwordforgotten", "passwordforgotten1",
"passwordchangeneeded", "passwordactivate", "mtan"]) > -1) {
$(document.documentElement).addClass('htmlBackground');
}

if (typeof pageNew !== 'undefined' && $.inArray(pageNew.split(" ")[1], ["print"]) > -1) {
$(document.documentElement).addClass('htmlBackgroundPrint');
}
});
})();