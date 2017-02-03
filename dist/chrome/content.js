/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = log;
exports.info = info;
exports.warn = warn;
exports.error = error;
exports.getConsole = getConsole;
/* eslint-disable no-console */
function log(...args) {
  console.log(...args);
}

function info(...args) {
  console.info(...args);
}

function warn(...args) {
  console.warn(...args);
}

function error(...args) {
  console.error(...args);
}

function getConsole() {
  return console;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/* eslint-disable no-underscore-dangle */

let _set = function () {
  var _ref = _asyncToGenerator(function* (obj, storage = 'sync') {
    return new Promise(function (resolve, reject) {
      try {
        chrome.storage[storage].set(obj, function () {
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  });

  return function _set(_x) {
    return _ref.apply(this, arguments);
  };
}();

let _get = function () {
  var _ref2 = _asyncToGenerator(function* (obj = null, storage = 'sync') {
    return new Promise(function (resolve, reject) {
      try {
        chrome.storage[storage].get(function (items) {
          resolve(items);
        });
      } catch (e) {
        reject(e);
      }
    });
  });

  return function _get() {
    return _ref2.apply(this, arguments);
  };
}();

let get = function () {
  var _ref3 = _asyncToGenerator(function* (key, storage) {
    try {
      const items = yield _get(null, storage);
      return items[key];
    } catch (e) {
      return null;
    }
  });

  return function get(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

let set = function () {
  var _ref4 = _asyncToGenerator(function* (key, value, storage) {
    const items = yield _get(null, storage);
    const updatedItems = Object.assign({}, items, {
      [key]: value
    });
    yield _set(updatedItems, storage);
    return true;
  });

  return function set(_x4, _x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getSync(key) {
  return get(key, 'sync');
}

function setSync(key, value) {
  return set(key, value, 'sync');
}

function getLocal(key) {
  return get(key, 'local');
}

function setLocal(key, value) {
  return set(key, value, 'local');
}

exports.getSync = getSync;
exports.setSync = setSync;
exports.getLocal = getLocal;
exports.setLocal = setLocal;
exports._set = _set;
exports._get = _get;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function sendMessage(msg, callback) {
  chrome.extension.sendMessage(msg, callback);
}

function sendMessageToTab(tabId, msg) {
  chrome.tabs.sendMessage(tabId, msg);
}

function addMessageListener(listener /* fn(msg, sender, sendResponse) */) {
  chrome.runtime.onMessage.addListener(listener);
}

exports.sendMessage = sendMessage;
exports.sendMessageToTab = sendMessageToTab;
exports.addMessageListener = addMessageListener;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const EVENT_BROWSER_ACTION_CLICK = exports.EVENT_BROWSER_ACTION_CLICK = 'EVENT_BROWSER_ACTION_CLICK';

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const CLASS_PREFIX = 'extension-cw--';
const CLASS_WORD = exports.CLASS_WORD = CLASS_PREFIX + 'word';
const CLASS_UNKNOWN_WORD = exports.CLASS_UNKNOWN_WORD = CLASS_PREFIX + 'word--unknown';
const CLASS_KNOWN_WORD = exports.CLASS_KNOWN_WORD = CLASS_PREFIX + 'word--known';

const CLASS_TOOL_ADD_TO_KNOWN_LIST = exports.CLASS_TOOL_ADD_TO_KNOWN_LIST = CLASS_PREFIX + 'tool--known';
const CLASS_TOOLBAR_MOUNT_DIV = exports.CLASS_TOOLBAR_MOUNT_DIV = CLASS_PREFIX + 'tool--div-mount';
const CLASS_PROGRESS_TO_SHOW_TOOLBAR = exports.CLASS_PROGRESS_TO_SHOW_TOOLBAR = CLASS_PREFIX + 'progress--toolbar-enable';
const PROP_WORD = exports.PROP_WORD = CLASS_PREFIX + 'word';

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(9))(78);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = standard;

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const THRESHOLD_TOOLBAR_SHOW = exports.THRESHOLD_TOOLBAR_SHOW = 800;
const THRESHOLD_TOOLBAR_PROGRESS_SHOW = exports.THRESHOLD_TOOLBAR_PROGRESS_SHOW = 51;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideWord = undefined;

let updateKnownWordStorage = function () {
  var _ref = _asyncToGenerator(function* ({ word }) {
    const knownList = yield (0, _storage.getSync)('knownList');
    const selectedWordList = yield (0, _storage.getSync)('selectedWordList');
    const list = knownList[selectedWordList];
    if (list) {
      if (!list.find(function (entry) {
        return entry.word === word;
      })) {
        const newEntry = { word, date: new Date().getTime(), sentence: '' };
        list.push(newEntry);
        yield (0, _storage.setSync)('knownList', Object.assign({}, knownList, {
          [selectedWordList]: list
        }));
        (0, _log.info)(`add ${word} into knowlist`);
      }
    }
  });

  return function updateKnownWordStorage(_x) {
    return _ref.apply(this, arguments);
  };
}();

let hideWord = exports.hideWord = function () {
  var _ref2 = _asyncToGenerator(function* ({ word, targetNode }) {
    yield updateKnownWordStorage({ word });
    [...document.querySelectorAll(`.${_className.CLASS_WORD}[${_className.PROP_WORD}="${word}"]`)].forEach(function (node) {
      node.classList.remove(_className.CLASS_UNKNOWN_WORD);
      node.classList.add(_className.CLASS_KNOWN_WORD);
    });
    hideToolbar({ targetNode });
  });

  return function hideWord(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.hideToolbar = hideToolbar;
exports.actionUpdateKnownWord = actionUpdateKnownWord;
exports.showToolbar = showToolbar;
exports.showProgressBar = showProgressBar;
exports.removeProgressBar = removeProgressBar;

var _log = __webpack_require__(0);

var _toolbar = __webpack_require__(14);

var _storage = __webpack_require__(1);

var _className = __webpack_require__(6);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function hideToolbar({ targetNode }) {
  console.log('clear');
  delete targetNode.attributes.isToolbarShow; // eslint-disable-line no-param-reassign
  (0, _toolbar.removeToolbar)({ targetNode });
}

function actionUpdateKnownWord({ word, targetNode }) {
  hideWord({ word, targetNode });
  (0, _log.info)(`known ${word}`);
}

function showToolbar({ word, targetNode, event }) {
  console.log('show');
  targetNode.attributes.isToolbarShow = true; // eslint-disable-line no-param-reassign
  (0, _toolbar.bindToolbar)({ word, targetNode, event }, {
    actionUpdateKnownWord: actionUpdateKnownWord.bind(null, { word, targetNode })
  });
}

function showProgressBar({ targetNode }) {
  let progressNode = targetNode.querySelector(`.${_className.CLASS_PROGRESS_TO_SHOW_TOOLBAR}`);
  if (!progressNode) {
    progressNode = document.createElement('div');
    progressNode.classList.add(_className.CLASS_PROGRESS_TO_SHOW_TOOLBAR);
    targetNode.append(progressNode);
  }
}

function removeProgressBar({ targetNode }) {
  const progressNode = targetNode.querySelector(`.${_className.CLASS_PROGRESS_TO_SHOW_TOOLBAR}`);
  if (progressNode) progressNode.remove();
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindToolbar = bindToolbar;
exports.removeToolbar = removeToolbar;

var _reactDom = __webpack_require__(25);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

var _toolbar = __webpack_require__(19);

var _toolbar2 = _interopRequireDefault(_toolbar);

var _className = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bindToolbar({ word, targetNode, event }, actions) {
  const mountNode = document.createElement('div');
  mountNode.classList.add(_className.CLASS_TOOLBAR_MOUNT_DIV);
  targetNode.appendChild(mountNode);
  _reactDom2.default.render(_react2.default.createElement(_toolbar2.default, { word: word, node: targetNode, actions: actions }), mountNode);
  return mountNode;
}

function removeToolbar({ targetNode }) {
  const mountNode = targetNode.querySelector(`.${_className.CLASS_TOOLBAR_MOUNT_DIV}`);
  if (mountNode) {
    _reactDom2.default.unmountComponentAtNode(mountNode);
    mountNode.remove();
    return true;
  }
  return false;
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * findAndReplaceDOMText v 0.4.5
 * @author James Padolsey http://james.padolsey.com
 * @license http://unlicense.org/UNLICENSE
 *
 * Matches the text of a DOM node against a regular expression
 * and replaces each match (or node-separated portions of the match)
 * in the specified element.
 */
 (function (root, factory) {
     if (typeof module === 'object' && module.exports) {
         // Node/CommonJS
         module.exports = factory();
     } else if (true) {
         // AMD. Register as an anonymous module.
         !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
     } else {
         // Browser globals
         root.findAndReplaceDOMText = factory();
     }
 }(this, function factory() {

	var PORTION_MODE_RETAIN = 'retain';
	var PORTION_MODE_FIRST = 'first';

	var doc = document;
	var hasOwn = {}.hasOwnProperty;

	function escapeRegExp(s) {
		return String(s).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}

	function exposed() {
		// Try deprecated arg signature first:
		return deprecated.apply(null, arguments) || findAndReplaceDOMText.apply(null, arguments);
	}

	function deprecated(regex, node, replacement, captureGroup, elFilter) {
		if ((node && !node.nodeType) && arguments.length <= 2) {
			return false;
		}
		var isReplacementFunction = typeof replacement == 'function';

		if (isReplacementFunction) {
			replacement = (function(original) {
				return function(portion, match) {
					return original(portion.text, match.startIndex);
				};
			}(replacement));
		}

		// Awkward support for deprecated argument signature (<0.4.0)
		var instance = findAndReplaceDOMText(node, {

			find: regex,

			wrap: isReplacementFunction ? null : replacement,
			replace: isReplacementFunction ? replacement : '$' + (captureGroup || '&'),

			prepMatch: function(m, mi) {

				// Support captureGroup (a deprecated feature)

				if (!m[0]) throw 'findAndReplaceDOMText cannot handle zero-length matches';

				if (captureGroup > 0) {
					var cg = m[captureGroup];
					m.index += m[0].indexOf(cg);
					m[0] = cg;
				}

				m.endIndex = m.index + m[0].length;
				m.startIndex = m.index;
				m.index = mi;

				return m;
			},
			filterElements: elFilter
		});

		exposed.revert = function() {
			return instance.revert();
		};

		return true;
	}

	/**
	 * findAndReplaceDOMText
	 *
	 * Locates matches and replaces with replacementNode
	 *
	 * @param {Node} node Element or Text node to search within
	 * @param {RegExp} options.find The regular expression to match
	 * @param {String|Element} [options.wrap] A NodeName, or a Node to clone
	 * @param {String} [options.wrapClass] A classname to append to the wrapping element
	 * @param {String|Function} [options.replace='$&'] What to replace each match with
	 * @param {Function} [options.filterElements] A Function to be called to check whether to
	 *	process an element. (returning true = process element,
	 *	returning false = avoid element)
	 */
	function findAndReplaceDOMText(node, options) {
		return new Finder(node, options);
	}

	exposed.NON_PROSE_ELEMENTS = {
		br:1, hr:1,
		// Media / Source elements:
		script:1, style:1, img:1, video:1, audio:1, canvas:1, svg:1, map:1, object:1,
		// Input elements
		input:1, textarea:1, select:1, option:1, optgroup: 1, button:1
	};

	exposed.NON_CONTIGUOUS_PROSE_ELEMENTS = {

		// Elements that will not contain prose or block elements where we don't
		// want prose to be matches across element borders:

		// Block Elements
		address:1, article:1, aside:1, blockquote:1, dd:1, div:1,
		dl:1, fieldset:1, figcaption:1, figure:1, footer:1, form:1, h1:1, h2:1, h3:1,
		h4:1, h5:1, h6:1, header:1, hgroup:1, hr:1, main:1, nav:1, noscript:1, ol:1,
		output:1, p:1, pre:1, section:1, ul:1,
		// Other misc. elements that are not part of continuous inline prose:
		br:1, li: 1, summary: 1, dt:1, details:1, rp:1, rt:1, rtc:1,
		// Media / Source elements:
		script:1, style:1, img:1, video:1, audio:1, canvas:1, svg:1, map:1, object:1,
		// Input elements
		input:1, textarea:1, select:1, option:1, optgroup:1, button:1,
		// Table related elements:
		table:1, tbody:1, thead:1, th:1, tr:1, td:1, caption:1, col:1, tfoot:1, colgroup:1

	};

	exposed.NON_INLINE_PROSE = function(el) {
		return hasOwn.call(exposed.NON_CONTIGUOUS_PROSE_ELEMENTS, el.nodeName.toLowerCase());
	};

	// Presets accessed via `options.preset` when calling findAndReplaceDOMText():
	exposed.PRESETS = {
		prose: {
			forceContext: exposed.NON_INLINE_PROSE,
			filterElements: function(el) {
				return !hasOwn.call(exposed.NON_PROSE_ELEMENTS, el.nodeName.toLowerCase());
			}
		}
	};

	exposed.Finder = Finder;

	/**
	 * Finder -- encapsulates logic to find and replace.
	 */
	function Finder(node, options) {

		var preset = options.preset && exposed.PRESETS[options.preset];

		options.portionMode = options.portionMode || PORTION_MODE_RETAIN;

		if (preset) {
			for (var i in preset) {
				if (hasOwn.call(preset, i) && !hasOwn.call(options, i)) {
					options[i] = preset[i];
				}
			}
		}

		this.node = node;
		this.options = options;

		// Enable match-preparation method to be passed as option:
		this.prepMatch = options.prepMatch || this.prepMatch;

		this.reverts = [];

		this.matches = this.search();

		if (this.matches.length) {
			this.processMatches();
		}

	}

	Finder.prototype = {

		/**
		 * Searches for all matches that comply with the instance's 'match' option
		 */
		search: function() {

			var match;
			var matchIndex = 0;
			var offset = 0;
			var regex = this.options.find;
			var textAggregation = this.getAggregateText();
			var matches = [];
			var self = this;

			regex = typeof regex === 'string' ? RegExp(escapeRegExp(regex), 'g') : regex;

			matchAggregation(textAggregation);

			function matchAggregation(textAggregation) {
				for (var i = 0, l = textAggregation.length; i < l; ++i) {

					var text = textAggregation[i];

					if (typeof text !== 'string') {
						// Deal with nested contexts: (recursive)
						matchAggregation(text);
						continue;
					}

					if (regex.global) {
						while (match = regex.exec(text)) {
							matches.push(self.prepMatch(match, matchIndex++, offset));
						}
					} else {
						if (match = text.match(regex)) {
							matches.push(self.prepMatch(match, 0, offset));
						}
					}

					offset += text.length;
				}
			}

			return matches;

		},

		/**
		 * Prepares a single match with useful meta info:
		 */
		prepMatch: function(match, matchIndex, characterOffset) {

			if (!match[0]) {
				throw new Error('findAndReplaceDOMText cannot handle zero-length matches');
			}

			match.endIndex = characterOffset + match.index + match[0].length;
			match.startIndex = characterOffset + match.index;
			match.index = matchIndex;

			return match;
		},

		/**
		 * Gets aggregate text within subject node
		 */
		getAggregateText: function() {

			var elementFilter = this.options.filterElements;
			var forceContext = this.options.forceContext;

			return getText(this.node);

			/**
			 * Gets aggregate text of a node without resorting
			 * to broken innerText/textContent
			 */
			function getText(node) {

				if (node.nodeType === Node.TEXT_NODE) {
					return [node.data];
				}

				if (elementFilter && !elementFilter(node)) {
					return [];
				}

				var txt = [''];
				var i = 0;

				if (node = node.firstChild) do {

					if (node.nodeType === Node.TEXT_NODE) {
						txt[i] += node.data;
						continue;
					}

					var innerText = getText(node);

					if (
						forceContext &&
						node.nodeType === Node.ELEMENT_NODE &&
						(forceContext === true || forceContext(node))
					) {
						txt[++i] = innerText;
						txt[++i] = '';
					} else {
						if (typeof innerText[0] === 'string') {
							// Bridge nested text-node data so that they're
							// not considered their own contexts:
							// I.e. ['some', ['thing']] -> ['something']
							txt[i] += innerText.shift();
						}
						if (innerText.length) {
							txt[++i] = innerText;
							txt[++i] = '';
						}
					}
				} while (node = node.nextSibling);

				return txt;

			}

		},

		/**
		 * Steps through the target node, looking for matches, and
		 * calling replaceFn when a match is found.
		 */
		processMatches: function() {

			var matches = this.matches;
			var node = this.node;
			var elementFilter = this.options.filterElements;

			var startPortion,
				endPortion,
				innerPortions = [],
				curNode = node,
				match = matches.shift(),
				atIndex = 0, // i.e. nodeAtIndex
				matchIndex = 0,
				portionIndex = 0,
				doAvoidNode,
				nodeStack = [node];

			out: while (true) {

				if (curNode.nodeType === Node.TEXT_NODE) {

					if (!endPortion && curNode.length + atIndex >= match.endIndex) {

						// We've found the ending
						endPortion = {
							node: curNode,
							index: portionIndex++,
							text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex),
							indexInMatch: atIndex - match.startIndex,
							indexInNode: match.startIndex - atIndex, // always zero for end-portions
							endIndexInNode: match.endIndex - atIndex,
							isEnd: true
						};

					} else if (startPortion) {
						// Intersecting node
						innerPortions.push({
							node: curNode,
							index: portionIndex++,
							text: curNode.data,
							indexInMatch: atIndex - match.startIndex,
							indexInNode: 0 // always zero for inner-portions
						});
					}

					if (!startPortion && curNode.length + atIndex > match.startIndex) {
						// We've found the match start
						startPortion = {
							node: curNode,
							index: portionIndex++,
							indexInMatch: 0,
							indexInNode: match.startIndex - atIndex,
							endIndexInNode: match.endIndex - atIndex,
							text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex)
						};
					}

					atIndex += curNode.data.length;

				}

				doAvoidNode = curNode.nodeType === Node.ELEMENT_NODE && elementFilter && !elementFilter(curNode);

				if (startPortion && endPortion) {

					curNode = this.replaceMatch(match, startPortion, innerPortions, endPortion);

					// processMatches has to return the node that replaced the endNode
					// and then we step back so we can continue from the end of the
					// match:

					atIndex -= (endPortion.node.data.length - endPortion.endIndexInNode);

					startPortion = null;
					endPortion = null;
					innerPortions = [];
					match = matches.shift();
					portionIndex = 0;
					matchIndex++;

					if (!match) {
						break; // no more matches
					}

				} else if (
					!doAvoidNode &&
					(curNode.firstChild || curNode.nextSibling)
				) {
					// Move down or forward:
					if (curNode.firstChild) {
						nodeStack.push(curNode);
						curNode = curNode.firstChild;
					} else {
						curNode = curNode.nextSibling;
					}
					continue;
				}

				// Move forward or up:
				while (true) {
					if (curNode.nextSibling) {
						curNode = curNode.nextSibling;
						break;
					}
					curNode = nodeStack.pop();
					if (curNode === node) {
						break out;
					}
				}

			}

		},

		/**
		 * Reverts ... TODO
		 */
		revert: function() {
			// Reversion occurs backwards so as to avoid nodes subsequently
			// replaced during the matching phase (a forward process):
			for (var l = this.reverts.length; l--;) {
				this.reverts[l]();
			}
			this.reverts = [];
		},

		prepareReplacementString: function(string, portion, match) {
			var portionMode = this.options.portionMode;
			if (
				portionMode === PORTION_MODE_FIRST &&
				portion.indexInMatch > 0
			) {
				return '';
			}
			string = string.replace(/\$(\d+|&|`|')/g, function($0, t) {
				var replacement;
				switch(t) {
					case '&':
						replacement = match[0];
						break;
					case '`':
						replacement = match.input.substring(0, match.startIndex);
						break;
					case '\'':
						replacement = match.input.substring(match.endIndex);
						break;
					default:
						replacement = match[+t];
				}
				return replacement;
			});

			if (portionMode === PORTION_MODE_FIRST) {
				return string;
			}

			if (portion.isEnd) {
				return string.substring(portion.indexInMatch);
			}

			return string.substring(portion.indexInMatch, portion.indexInMatch + portion.text.length);
		},

		getPortionReplacementNode: function(portion, match) {

			var replacement = this.options.replace || '$&';
			var wrapper = this.options.wrap;
			var wrapperClass = this.options.wrapClass;

			if (wrapper && wrapper.nodeType) {
				// Wrapper has been provided as a stencil-node for us to clone:
				var clone = doc.createElement('div');
				clone.innerHTML = wrapper.outerHTML || new XMLSerializer().serializeToString(wrapper);
				wrapper = clone.firstChild;
			}

			if (typeof replacement == 'function') {
				replacement = replacement(portion, match);
				if (replacement && replacement.nodeType) {
					return replacement;
				}
				return doc.createTextNode(String(replacement));
			}

			var el = typeof wrapper == 'string' ? doc.createElement(wrapper) : wrapper;

 			if (el && wrapperClass) {
				el.className = wrapperClass;
			}

			replacement = doc.createTextNode(
				this.prepareReplacementString(
					replacement, portion, match
				)
			);

			if (!replacement.data) {
				return replacement;
			}

			if (!el) {
				return replacement;
			}

			el.appendChild(replacement);

			return el;
		},

		replaceMatch: function(match, startPortion, innerPortions, endPortion) {

			var matchStartNode = startPortion.node;
			var matchEndNode = endPortion.node;

			var precedingTextNode;
			var followingTextNode;

			if (matchStartNode === matchEndNode) {

				var node = matchStartNode;

				if (startPortion.indexInNode > 0) {
					// Add `before` text node (before the match)
					precedingTextNode = doc.createTextNode(node.data.substring(0, startPortion.indexInNode));
					node.parentNode.insertBefore(precedingTextNode, node);
				}

				// Create the replacement node:
				var newNode = this.getPortionReplacementNode(
					endPortion,
					match
				);

				node.parentNode.insertBefore(newNode, node);

				if (endPortion.endIndexInNode < node.length) { // ?????
					// Add `after` text node (after the match)
					followingTextNode = doc.createTextNode(node.data.substring(endPortion.endIndexInNode));
					node.parentNode.insertBefore(followingTextNode, node);
				}

				node.parentNode.removeChild(node);

				this.reverts.push(function() {
					if (precedingTextNode === newNode.previousSibling) {
						precedingTextNode.parentNode.removeChild(precedingTextNode);
					}
					if (followingTextNode === newNode.nextSibling) {
						followingTextNode.parentNode.removeChild(followingTextNode);
					}
					newNode.parentNode.replaceChild(node, newNode);
				});

				return newNode;

			} else {
				// Replace matchStartNode -> [innerMatchNodes...] -> matchEndNode (in that order)


				precedingTextNode = doc.createTextNode(
					matchStartNode.data.substring(0, startPortion.indexInNode)
				);

				followingTextNode = doc.createTextNode(
					matchEndNode.data.substring(endPortion.endIndexInNode)
				);

				var firstNode = this.getPortionReplacementNode(
					startPortion,
					match
				);

				var innerNodes = [];

				for (var i = 0, l = innerPortions.length; i < l; ++i) {
					var portion = innerPortions[i];
					var innerNode = this.getPortionReplacementNode(
						portion,
						match
					);
					portion.node.parentNode.replaceChild(innerNode, portion.node);
					this.reverts.push((function(portion, innerNode) {
						return function() {
							innerNode.parentNode.replaceChild(portion.node, innerNode);
						};
					}(portion, innerNode)));
					innerNodes.push(innerNode);
				}

				var lastNode = this.getPortionReplacementNode(
					endPortion,
					match
				);

				matchStartNode.parentNode.insertBefore(precedingTextNode, matchStartNode);
				matchStartNode.parentNode.insertBefore(firstNode, matchStartNode);
				matchStartNode.parentNode.removeChild(matchStartNode);

				matchEndNode.parentNode.insertBefore(lastNode, matchEndNode);
				matchEndNode.parentNode.insertBefore(followingTextNode, matchEndNode);
				matchEndNode.parentNode.removeChild(matchEndNode);

				this.reverts.push(function() {
					precedingTextNode.parentNode.removeChild(precedingTextNode);
					firstNode.parentNode.replaceChild(matchStartNode, firstNode);
					followingTextNode.parentNode.removeChild(followingTextNode);
					lastNode.parentNode.replaceChild(matchEndNode, lastNode);
				});

				return lastNode;
			}
		}

	};

	return exposed;

}));


/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(8);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Toolbar extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.clickKnown = this.clickKnown.bind(this);
  }
  clickKnown() {
    console.log(this.props);
    this.props.actions.actionUpdateKnownWord(this.props.word);
  }
  render() {
    // const clickKnown = this.clickKnown.bind(this);
    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "span",
        { onClick: this.clickKnown },
        "Known"
      ),
      _react2.default.createElement(
        "span",
        { disabled: true, title: "The feature is not available yet" },
        "Definition"
      ),
      _react2.default.createElement(
        "span",
        { disabled: true, title: "The feature is not available yet" },
        "Collocation"
      )
    );
  }
}
exports.default = Toolbar;

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(9))(77);

/***/ }),
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let highlight = function () {
  var _ref = _asyncToGenerator(function* () {
    let count = 0;
    (0, _findandreplacedomtext2.default)(document.body, {
      find: wordListRegExp,
      replace: function replace(s) {
        count += 1;
        const replacementNode = document.createElement('span');
        const textNode = document.createTextNode(s.text);
        const word = s.text.toLowerCase();
        replacementNode.appendChild(textNode);
        replacementNode.classList.add(_className.CLASS_WORD);
        if (knownListMap[word]) {
          replacementNode.classList.add(_className.CLASS_KNOWN_WORD);
        } else {
          replacementNode.classList.add(_className.CLASS_UNKNOWN_WORD);
        }
        replacementNode.setAttribute(_className.PROP_WORD, word);

        replacementNode.addEventListener('mouseenter', _eventHandlers.mouseenterHandler.bind(null, word, replacementNode));
        replacementNode.addEventListener('mouseleave', _eventHandlers.mouseleaveHandler.bind(null, word, replacementNode));
        return replacementNode;
      }
    });
    (0, _log.info)(`Matched ${count} words`);
  });

  return function highlight() {
    return _ref.apply(this, arguments);
  };
}();

let active = function () {
  var _ref2 = _asyncToGenerator(function* ({ wordList }) {
    __webpack_require__(15);
    const allKnownList = yield (0, _storage.getSync)('knownList');
    const knownList = allKnownList[wordList.id];
    if (knownList) {
      knownList.forEach(function (knownWord) {
        knownListMap[knownWord.word.toLowerCase()] = knownWord;
      });
    }
    if (wordListMap === null) {
      wordListMap = {};
      const words = [];
      wordList.list.forEach(function (word) {
        wordListMap[word.word] = word;
        words.push(word.word);
      });
      wordListRegExp = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');
    }
    (0, _log.info)('active');

    highlight();
  });

  return function active(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _findandreplacedomtext = __webpack_require__(16);

var _findandreplacedomtext2 = _interopRequireDefault(_findandreplacedomtext);

var _storage = __webpack_require__(1);

var _log = __webpack_require__(0);

var _communication = __webpack_require__(3);

var _eventHandlers = __webpack_require__(31);

var _events = __webpack_require__(4);

var _className = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import isUndefined from 'lodash/isUndefined';


document.addEventListener('DOMContentLoaded', function () {});

const knownListMap = {};
let wordListMap = null;
let wordListRegExp = null;

function addListener() {
  (0, _communication.addMessageListener)(function (msg, sender, sendResponse) {
    if (msg.event && msg.event === _events.EVENT_BROWSER_ACTION_CLICK) {
      const wordList = msg.wordList;
      active({ wordList });
    }
    sendResponse({});
  });
}

addListener();

(0, _log.info)('CW_Content');

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mouseenterHandler = mouseenterHandler;
exports.mouseleaveHandler = mouseleaveHandler;

var _actions = __webpack_require__(13);

var _className = __webpack_require__(6);

var _configuration = __webpack_require__(12);

function mouseenterHandler(word, replacementNode, event) {
  const targetNode = event.target;
  if (targetNode !== replacementNode) return;
  if (!targetNode.classList.contains(_className.CLASS_UNKNOWN_WORD)) return;
  clearTimeout(targetNode.attributes.leaveTO);
  clearTimeout(targetNode.attributes.enterTO);
  if (targetNode.attributes.isToolbarShow !== true) {
    (0, _actions.showProgressBar)({ targetNode });
  }
  targetNode.attributes.enterTO = setTimeout(_actions.showToolbar.bind(null, { word, targetNode, event }), _configuration.THRESHOLD_TOOLBAR_SHOW);
}

function mouseleaveHandler(word, targetNode, event) {
  if (!targetNode.classList.contains(_className.CLASS_UNKNOWN_WORD)) return;
  clearTimeout(targetNode.attributes.leaveTO);
  clearTimeout(targetNode.attributes.enterTO);
  (0, _actions.removeProgressBar)({ targetNode });
  targetNode.attributes.leaveTO = setTimeout(_actions.hideToolbar.bind(null, { word, targetNode, event }), 1000);
}

/***/ })
/******/ ]);
//# sourceMappingURL=content.js.map