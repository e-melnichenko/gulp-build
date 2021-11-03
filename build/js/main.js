/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/svg4everybody/dist/svg4everybody.js":
/*!**********************************************************!*\
  !*** ./node_modules/svg4everybody/dist/svg4everybody.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(root, factory) {\n     true ? // AMD. Register as an anonymous module unless amdModuleId is set\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n        return root.svg4everybody = factory();\n    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;\n}(this, function() {\n    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */\n    function embed(parent, svg, target) {\n        // if the target exists\n        if (target) {\n            // create a document fragment to hold the contents of the target\n            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute(\"viewBox\") && target.getAttribute(\"viewBox\");\n            // conditionally set the viewBox on the svg\n            viewBox && svg.setAttribute(\"viewBox\", viewBox);\n            // copy the contents of the clone into the fragment\n            for (// clone the target\n            var clone = target.cloneNode(!0); clone.childNodes.length; ) {\n                fragment.appendChild(clone.firstChild);\n            }\n            // append the fragment into the svg\n            parent.appendChild(fragment);\n        }\n    }\n    function loadreadystatechange(xhr) {\n        // listen to changes in the request\n        xhr.onreadystatechange = function() {\n            // if the request is ready\n            if (4 === xhr.readyState) {\n                // get the cached html document\n                var cachedDocument = xhr._cachedDocument;\n                // ensure the cached html document based on the xhr response\n                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(\"\"), \n                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item\n                xhr._embeds.splice(0).map(function(item) {\n                    // get the cached target\n                    var target = xhr._cachedTarget[item.id];\n                    // ensure the cached target\n                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), \n                    // embed the target into the svg\n                    embed(item.parent, item.svg, target);\n                });\n            }\n        }, // test the ready state change immediately\n        xhr.onreadystatechange();\n    }\n    function svg4everybody(rawopts) {\n        function oninterval() {\n            // while the index exists in the live <use> collection\n            for (// get the cached <use> index\n            var index = 0; index < uses.length; ) {\n                // get the current <use>\n                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute(\"xlink:href\") || use.getAttribute(\"href\");\n                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), \n                svg && src) {\n                    if (polyfill) {\n                        if (!opts.validate || opts.validate(src, svg, use)) {\n                            // remove the <use> element\n                            parent.removeChild(use);\n                            // parse the src and get the url and id\n                            var srcSplit = src.split(\"#\"), url = srcSplit.shift(), id = srcSplit.join(\"#\");\n                            // if the link is external\n                            if (url.length) {\n                                // get the cached xhr request\n                                var xhr = requests[url];\n                                // ensure the xhr request exists\n                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open(\"GET\", url), xhr.send(), \n                                xhr._embeds = []), // add the svg and id as an item to the xhr embeds list\n                                xhr._embeds.push({\n                                    parent: parent,\n                                    svg: svg,\n                                    id: id\n                                }), // prepare the xhr ready state change event\n                                loadreadystatechange(xhr);\n                            } else {\n                                // embed the local id into the svg\n                                embed(parent, svg, document.getElementById(id));\n                            }\n                        } else {\n                            // increase the index when the previous value was not \"valid\"\n                            ++index, ++numberOfSvgUseElementsToBypass;\n                        }\n                    }\n                } else {\n                    // increase the index when the previous value was not \"valid\"\n                    ++index;\n                }\n            }\n            // continue the interval\n            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);\n        }\n        var polyfill, opts = Object(rawopts), newerIEUA = /\\bTrident\\/[567]\\b|\\bMSIE (?:9|10)\\.0\\b/, webkitUA = /\\bAppleWebKit\\/(\\d+)\\b/, olderEdgeUA = /\\bEdge\\/12\\.(\\d+)\\b/, edgeUA = /\\bEdge\\/.(\\d+)\\b/, inIframe = window.top !== window.self;\n        polyfill = \"polyfill\" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;\n        // create xhr requests object\n        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName(\"use\"), numberOfSvgUseElementsToBypass = 0;\n        // conditionally start the interval if the polyfill is active\n        polyfill && oninterval();\n    }\n    function getSVGAncestor(node) {\n        for (var svg = node; \"svg\" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}\n        return svg;\n    }\n    return svg4everybody;\n});\n\n//# sourceURL=webpack:///./node_modules/svg4everybody/dist/svg4everybody.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var svg4everybody__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svg4everybody */ \"./node_modules/svg4everybody/dist/svg4everybody.js\");\n/* harmony import */ var svg4everybody__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(svg4everybody__WEBPACK_IMPORTED_MODULE_0__);\n\nsvg4everybody__WEBPACK_IMPORTED_MODULE_0___default()();\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

/******/ });