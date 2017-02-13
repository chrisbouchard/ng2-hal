module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@angular/core");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HalLinkObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HalObjectSerializer; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HalLinkObject = function HalLinkObject(href, templated) {
    _classCallCheck(this, HalLinkObject);

    this.href = href;
    this.templated = templated;
};
var HalObject = function HalObject(embedded, links, resource) {
    _classCallCheck(this, HalObject);

    this.embedded = embedded;
    this.links = links;
    this.resource = resource;
};
var HalObjectSerializer = function HalObjectSerializer() {
    _classCallCheck(this, HalObjectSerializer);
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalResourceFactory; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HalResourceFactory = function HalResourceFactory() {
  _classCallCheck(this, HalResourceFactory);
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalFieldSection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HalFieldDescription; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HalFieldTypeDescription; });
/* harmony export (immutable) */ __webpack_exports__["d"] = HalField;
/* harmony export (immutable) */ __webpack_exports__["e"] = HalEmbedded;
/* harmony export (immutable) */ __webpack_exports__["f"] = HalLink;
/* harmony export (immutable) */ __webpack_exports__["g"] = getCookedFieldDescription;
/* harmony export (immutable) */ __webpack_exports__["h"] = getRawFieldDescription;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HAL_COOKED_FIELD_METADATA_KEY = Symbol('halCookedFieldMetadataKey');
var HAL_RAW_FIELD_METADATA_KEY = Symbol('halRawFieldMetadataKey');
var HalFieldSection;
(function (HalFieldSection) {
    HalFieldSection[HalFieldSection["EMBEDDED"] = 0] = "EMBEDDED";
    HalFieldSection[HalFieldSection["LINKS"] = 1] = "LINKS";
    HalFieldSection[HalFieldSection["RESOURCE"] = 2] = "RESOURCE";
})(HalFieldSection || (HalFieldSection = {}));
var HalFieldDescription = function HalFieldDescription(key, arg) {
    _classCallCheck(this, HalFieldDescription);

    this.section = HalFieldSection.RESOURCE;
    this.rawName = key;
    this.cookedName = key;
    if (arg instanceof String) {
        this.rawName = arg;
        this.typeDescription = new HalFieldTypeDescription({});
    } else if (arg instanceof Function) {
        this.typeDescription = new HalFieldTypeDescription(arg);
    } else {
        var metadata = arg || {};
        if (metadata.name !== undefined) {
            this.rawName = metadata.name;
        }
        if (metadata.section !== undefined) {
            this.section = metadata.section;
        }
        this.typeDescription = new HalFieldTypeDescription(metadata);
    }
};
var HalFieldTypeDescription = function () {
    function HalFieldTypeDescription(arg) {
        _classCallCheck(this, HalFieldTypeDescription);

        if (arg instanceof Function) {
            this.type = arg;
        } else {
            var metadata = arg || {};
            this.type = metadata.type;
            this.collection = metadata.collection;
        }
    }

    _createClass(HalFieldTypeDescription, [{
        key: 'getElementTypeDescription',
        value: function getElementTypeDescription() {
            if (!this.collection) {
                throw new TypeError('This HalFieldTypeDescription does not describe a collection.');
            }
            return new HalFieldTypeDescription({
                type: this.type
            });
        }
    }]);

    return HalFieldTypeDescription;
}();
function HalField(arg) {
    return function (target, key) {
        if (typeof key === 'string') {
            var description = new HalFieldDescription(key, arg);
            defineDescriptionMetadata(description, target);
        } else {
            throw new TypeError('The @HalField decorator can only be applied to a field whose name is a String');
        }
    };
}
function HalEmbedded(arg) {
    return function (target, key) {
        if (typeof key === 'string') {
            var description = new HalFieldDescription(key, arg);
            description.section = HalFieldSection.EMBEDDED;
            defineDescriptionMetadata(description, target);
        } else {
            throw new TypeError('The @HalEmbedded decorator can only be applied to a field whose name is a String');
        }
    };
}
function HalLink(arg) {
    return function (target, key) {
        if (typeof key === 'string') {
            var description = new HalFieldDescription(key, arg);
            description.section = HalFieldSection.LINKS;
            defineDescriptionMetadata(description, target);
        } else {
            throw new TypeError('The @HalLink decorator can only be applied to a field whose name is a String');
        }
    };
}
function defineDescriptionMetadata(description, target) {
    Reflect.defineMetadata(HAL_COOKED_FIELD_METADATA_KEY, description, target.constructor, description.cookedName);
    Reflect.defineMetadata(HAL_RAW_FIELD_METADATA_KEY, description, target.constructor, description.rawName);
}
function getCookedFieldDescription(target, key) {
    return Reflect.getMetadata(HAL_COOKED_FIELD_METADATA_KEY, target, key) || new HalFieldDescription(key, undefined);
}
function getRawFieldDescription(target, key) {
    return Reflect.getMetadata(HAL_RAW_FIELD_METADATA_KEY, target, key) || new HalFieldDescription(key, undefined);
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__error__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__object__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalHttp; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 *
 */
var HalHttp = function () {
    function HalHttp(objectSerializer, http) {
        _classCallCheck(this, HalHttp);

        this.objectSerializer = objectSerializer;
        this.http = http;
    }

    _createClass(HalHttp, [{
        key: "get",
        value: function get(url) {
            var _this = this;

            return this.http.get(url).map(handleErrorResponse).map(function (response) {
                if (response.status === 204) {
                    return undefined;
                }
                return _this.objectSerializer.deserialize(response.text());
            });
        }
    }, {
        key: "delete",
        value: function _delete(url) {
            return undefined;
        }
    }, {
        key: "post",
        value: function post(url, body) {
            return undefined;
        }
    }, {
        key: "put",
        value: function put(url, body) {
            return undefined;
        }
    }]);

    return HalHttp;
}();
HalHttp = __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__object__["c" /* HalObjectSerializer */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]])], HalHttp);

function handleErrorResponse(response) {
    var status = response.status;
    /* This is probably a little over-zealous, but it corresponds to !response.ok (which doesn't work with the current
      * Angular 2 beta. */
    if (status < 200 || status >= 300) {
        throw new __WEBPACK_IMPORTED_MODULE_2__error__["a" /* HalError */](status, response.text());
    }
    return response;
}
function mapUpdate(response) {
    if (response.headers.has('Location')) {
        return new __WEBPACK_IMPORTED_MODULE_3__object__["b" /* HalLinkObject */](response.headers.get('Location'), false);
    }
    return undefined;
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__field__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__object__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__translator__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalInstanceFactory; });
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = this && this.__param || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    };
};




var HalInstanceFactory = function () {
    function HalInstanceFactory(collectionTranslators, objectTranslators) {
        _classCallCheck(this, HalInstanceFactory);

        this.collectionTranslators = collectionTranslators;
        this.objectTranslators = objectTranslators;
    }

    _createClass(HalInstanceFactory, [{
        key: "createInstance",
        value: function createInstance(value, typeDescription, resourceFactory) {
            var _this = this;

            /* If the field is a collection... */
            if (typeDescription.collection) {
                /* The value must be an array. */
                if (!Array.isArray(value)) {
                    throw new TypeError('Expected an array, but did not get one.');
                } else {
                    var _ret = function () {
                        /* Create instance of all the elements. */
                        var elementTypeDescription = typeDescription.getElementTypeDescription();
                        var instanceArray = value.map(function (element) {
                            return _this.createInstance(element, elementTypeDescription, resourceFactory);
                        });
                        /* Then translate the array into a collection instance. */
                        return {
                            v: findApplicableCollectionTranslator(_this.collectionTranslators, typeDescription.collection).fromArray(instanceArray, typeDescription.collection)
                        };
                    }();

                    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
                }
            } else if (Array.isArray(typeDescription.type)) {
                /* The value must be an array. */
                if (!Array.isArray(value)) {
                    throw new TypeError('Expected an array, but did not get one.');
                } else {
                    /* Create instances for each value using the corresponding tuple type to build a type descriptor. */
                    return Array.from(wu.zipWith(function (element, elementType) {
                        return _this.createInstance(element, new __WEBPACK_IMPORTED_MODULE_1__field__["c" /* HalFieldTypeDescription */](elementType), resourceFactory);
                    }, value, typeDescription.type));
                }
            } else if (value instanceof __WEBPACK_IMPORTED_MODULE_2__object__["a" /* HalObject */]) {
                /* Get the instance's type from the type description if present, otherwise use the type of the HAL object's
                 * resource. We already handled tuple types, so it must be a constructor. */
                var type = typeDescription.type || value.resource.constructor;
                /* This is where we'll build the object we send to the translator. */
                var rawInstance = {};
                /* Copy fields from the links and embedded sections, then all other fields. The order matters -- fields in later
                 * sections will overwrite earlier sections. */
                this.fillInstance(rawInstance, value.links, type, __WEBPACK_IMPORTED_MODULE_1__field__["a" /* HalFieldSection */].LINKS, resourceFactory);
                this.fillInstance(rawInstance, value.embedded, type, __WEBPACK_IMPORTED_MODULE_1__field__["a" /* HalFieldSection */].EMBEDDED, resourceFactory);
                this.fillInstance(rawInstance, value.resource, type, __WEBPACK_IMPORTED_MODULE_1__field__["a" /* HalFieldSection */].RESOURCE, resourceFactory);
                /* Translate the raw instance into a cooked instance. */
                return findApplicableObjectTranslator(this.objectTranslators, type).fromObject(rawInstance, type);
            } else if (value instanceof __WEBPACK_IMPORTED_MODULE_2__object__["b" /* HalLinkObject */]) {
                return resourceFactory.createResource(value, typeDescription);
            } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
                /* Get the instance's type from the type description if present, otherwise use the type of the HAL object's
                 * resource. We already handled tuple types, so it must be a constructor. */
                var _type = typeDescription.type || value.constructor;
                /* This is where we'll build the object we send to the translator. */
                var _rawInstance = {};
                /* Copy fields from the value. We treat all the fields as if they were in the resource section. */
                this.fillInstance(_rawInstance, value, _type, __WEBPACK_IMPORTED_MODULE_1__field__["a" /* HalFieldSection */].RESOURCE, resourceFactory);
                /* Translate the raw instance into a cooked instance. */
                return findApplicableObjectTranslator(this.objectTranslators, _type).fromObject(_rawInstance, _type);
            } else {
                /* Just return it. */
                return value;
            }
        }
    }, {
        key: "fillInstance",
        value: function fillInstance(target, source, type, section, resourceFactory) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(source)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        key = _step$value[0],
                        value = _step$value[1];

                    /* Look up a field description using the raw name. */
                    var fieldDescription = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__field__["h" /* getRawFieldDescription */])(type, key);
                    /* If the field belongs in this section... */
                    if (fieldDescription.section === section) {
                        /* Create an instance from the value, then assign it using the cooked name. */
                        /* TODO: Should we throw an exception if a field is reassigned? */
                        target[fieldDescription.cookedName] = this.createInstance(value, fieldDescription.typeDescription, resourceFactory);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }]);

    return HalInstanceFactory;
}();
HalInstanceFactory = __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__translator__["b" /* HAL_COLLECTION_TRANSLATORS */])), __param(1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__translator__["a" /* HAL_OBJECT_TRANSLATORS */])), __metadata("design:paramtypes", [Array, Array])], HalInstanceFactory);

function findApplicableCollectionTranslator(translators, type) {
    try {
        return findApplicableTranslator(translators, type);
    } catch (ex) {
        throw Object.create(ex, {
            message: "Error finding an applicable collection translator: " + ex.message
        });
    }
}
function findApplicableObjectTranslator(translators, type) {
    try {
        return findApplicableTranslator(translators, type);
    } catch (ex) {
        throw Object.create(ex, {
            message: "Error finding an applicable object translator: " + ex.message
        });
    }
}
function findApplicableTranslator(translators, ctor) {
    var currentPrototype = ctor ? ctor.prototype : undefined;
    var currentCtor = ctor;
    while (true) {
        var applicable = translators.filter(function (translator) {
            return translator.appliesTo(currentCtor);
        });
        /* If we find multiple translators applicable to the same type, we have no way to choose among them. So we just
         * throw an exception. */
        if (applicable.length > 1) {
            throw new TypeError("Multiple translators found for type " + currentCtor + " while finding translators for type " + ctor + ".");
        }
        /* If we find exactly one translator, we can return it. */
        if (applicable.length === 1) {
            return applicable[0];
        }
        /* Once we're reached the bottom of the prototype chain, we need to stop looking. */
        if (!currentCtor) {
            break;
        }
        /* Otherwise we should try using our prototype's constructor (if we have a prototype), or else undefined. */
        if (currentPrototype) {
            currentCtor = currentPrototype.constructor;
            currentPrototype = Object.getPrototypeOf(currentPrototype);
        } else {
            currentCtor = undefined;
        }
    }
    /* If we get out of the loop, we walked all the way down the prototype chain and didn't find any applicable
     * translators. Give up and throw an exception. */
    throw new TypeError("No translators found for type " + ctor + ".");
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HAL_OBJECT_TRANSLATORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HAL_COLLECTION_TRANSLATORS; });

var HAL_OBJECT_TRANSLATORS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('halObjectTranslators');
var HAL_COLLECTION_TRANSLATORS = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["OpaqueToken"]('halCollectionTranslators');

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__field__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__object__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resource_factory__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalClient; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 *
 */
var HalClient = function () {
    function HalClient(resourceFactory) {
        _classCallCheck(this, HalClient);

        this.resourceFactory = resourceFactory;
    }

    _createClass(HalClient, [{
        key: "resource",
        value: function resource(url, metadata) {
            return this.resourceFactory.createResource(new __WEBPACK_IMPORTED_MODULE_2__object__["b" /* HalLinkObject */](url, false), new __WEBPACK_IMPORTED_MODULE_1__field__["c" /* HalFieldTypeDescription */](metadata));
        }
    }]);

    return HalClient;
}();
HalClient = __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__resource_factory__["a" /* HalResourceFactory */]])], HalClient);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_decorators__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_decorators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_decorators__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalError; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 *
 */
var HalError = function () {
    function HalError(status, message) {
        _classCallCheck(this, HalError);

        this.status = status;
        this.message = message;
    }

    _createClass(HalError, [{
        key: "toString",
        value: function toString() {
            return this.status + ": " + this.message;
        }
    }]);

    return HalError;
}();
__decorate([__WEBPACK_IMPORTED_MODULE_0_core_decorators__["override"], __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", String)], HalError.prototype, "toString", null);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__object__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalJsonObjectSerializerOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BaseHalJsonObjectSerializerOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HalJsonObjectSerializer; });
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HalJsonObjectSerializerOptions = function HalJsonObjectSerializerOptions() {
    _classCallCheck(this, HalJsonObjectSerializerOptions);
};
var BaseHalJsonObjectSerializerOptions = function (_HalJsonObjectSeriali) {
    _inherits(BaseHalJsonObjectSerializerOptions, _HalJsonObjectSeriali);

    function BaseHalJsonObjectSerializerOptions() {
        _classCallCheck(this, BaseHalJsonObjectSerializerOptions);

        var _this = _possibleConstructorReturn(this, (BaseHalJsonObjectSerializerOptions.__proto__ || Object.getPrototypeOf(BaseHalJsonObjectSerializerOptions)).call(this));

        _this.embeddedKey = '_embedded';
        _this.linksKey = '_links';
        return _this;
    }

    return BaseHalJsonObjectSerializerOptions;
}(HalJsonObjectSerializerOptions);
BaseHalJsonObjectSerializerOptions = __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), __metadata("design:paramtypes", [])], BaseHalJsonObjectSerializerOptions);

var HalJsonObjectSerializer = function (_HalObjectSerializer) {
    _inherits(HalJsonObjectSerializer, _HalObjectSerializer);

    function HalJsonObjectSerializer(options) {
        _classCallCheck(this, HalJsonObjectSerializer);

        var _this2 = _possibleConstructorReturn(this, (HalJsonObjectSerializer.__proto__ || Object.getPrototypeOf(HalJsonObjectSerializer)).call(this));

        _this2.options = options;
        return _this2;
    }

    _createClass(HalJsonObjectSerializer, [{
        key: "deserialize",
        value: function deserialize(data) {
            var json = JSON.parse(data);
            return this.toObjectOrArray(json);
        }
    }, {
        key: "toObjectOrArray",
        value: function toObjectOrArray(json) {
            var _this3 = this;

            /* Special case when the JSON is an array. */
            if (json instanceof Array) {
                return json.map(function (element) {
                    return _this3.toObject(element);
                });
            }
            return this.toObject(json);
        }
    }, {
        key: "toObject",
        value: function toObject(json) {
            var embedded = {};
            var links = {};
            var resource = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(json)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        key = _step$value[0],
                        value = _step$value[1];

                    switch (key) {
                        case this.options.embeddedKey:
                            /* Propagate HalObject into the embedded objects. */
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = Object.entries(value)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var _step2$value = _slicedToArray(_step2.value, 2),
                                        embedKey = _step2$value[0],
                                        embedValue = _step2$value[1];

                                    embedded[embedKey] = this.toObject(embedValue);
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                        _iterator2.return();
                                    }
                                } finally {
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }

                            break;
                        case this.options.linksKey:
                            /* Propagate HalLinkObject into the links. */
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = Object.entries(value)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var _step3$value = _slicedToArray(_step3.value, 2),
                                        linkKey = _step3$value[0],
                                        linkValue = _step3$value[1];

                                    links[linkKey] = this.toLinkObjectOrArray(linkValue);
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }

                            break;
                        default:
                            resource[key] = value;
                            break;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return new __WEBPACK_IMPORTED_MODULE_1__object__["a" /* HalObject */](embedded, links, resource);
        }
    }, {
        key: "toLinkObjectOrArray",
        value: function toLinkObjectOrArray(json) {
            var _this4 = this;

            /* Special case when the JSON is an array. */
            if (json instanceof Array) {
                return json.map(function (element) {
                    return _this4.toLinkObject(element);
                });
            }
            return this.toLinkObject(json);
        }
    }, {
        key: "toLinkObject",
        value: function toLinkObject(json) {
            return new __WEBPACK_IMPORTED_MODULE_1__object__["b" /* HalLinkObject */](json.href, json.templated);
        }
    }, {
        key: "serialize",
        value: function serialize(object) {
            return '';
        }
    }]);

    return HalJsonObjectSerializer;
}(__WEBPACK_IMPORTED_MODULE_1__object__["c" /* HalObjectSerializer */]);
HalJsonObjectSerializer = __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), __metadata("design:paramtypes", [HalJsonObjectSerializerOptions])], HalJsonObjectSerializer);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalArrayTranslator; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A translator that simply returns the value as given.
 */
var HalArrayTranslator = function () {
    function HalArrayTranslator() {
        _classCallCheck(this, HalArrayTranslator);
    }

    _createClass(HalArrayTranslator, [{
        key: "appliesTo",

        /**
         * Only apply when we've reached the bottom of the prototype chain.
         */
        value: function appliesTo(type) {
            return type === Array;
        }
    }, {
        key: "toArray",
        value: function toArray(value, type) {
            if (Array.isArray(value)) {
                return value;
            }
            throw new TypeError("Expected value of type Array, but got " + value.constructor.name);
        }
    }, {
        key: "fromArray",
        value: function fromArray(value, type) {
            return value;
        }
    }]);

    return HalArrayTranslator;
}();

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalDefaultObjectTranslator; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A translator that simply returns the value as given.
 */
var HalDefaultObjectTranslator = function () {
    function HalDefaultObjectTranslator() {
        _classCallCheck(this, HalDefaultObjectTranslator);
    }

    _createClass(HalDefaultObjectTranslator, [{
        key: "appliesTo",

        /**
         * Only apply when we've reached the bottom of the prototype chain.
         */
        value: function appliesTo(type) {
            return !type;
        }
    }, {
        key: "toObject",
        value: function toObject(value, type) {
            var instance = {};
            Object.assign(instance, value);
            return instance;
        }
    }, {
        key: "fromObject",
        value: function fromObject(value, type) {
            var instance = Reflect.construct(type, []);
            Object.assign(instance, value);
            return instance;
        }
    }]);

    return HalDefaultObjectTranslator;
}();

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client__ = __webpack_require__(7);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalClient", function() { return __WEBPACK_IMPORTED_MODULE_0__client__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error__ = __webpack_require__(8);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalError", function() { return __WEBPACK_IMPORTED_MODULE_1__error__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__field__ = __webpack_require__(3);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalFieldSection", function() { return __WEBPACK_IMPORTED_MODULE_2__field__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalFieldDescription", function() { return __WEBPACK_IMPORTED_MODULE_2__field__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalFieldTypeDescription", function() { return __WEBPACK_IMPORTED_MODULE_2__field__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalField", function() { return __WEBPACK_IMPORTED_MODULE_2__field__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalEmbedded", function() { return __WEBPACK_IMPORTED_MODULE_2__field__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalLink", function() { return __WEBPACK_IMPORTED_MODULE_2__field__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getCookedFieldDescription", function() { return __WEBPACK_IMPORTED_MODULE_2__field__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getRawFieldDescription", function() { return __WEBPACK_IMPORTED_MODULE_2__field__["h"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hal_module__ = __webpack_require__(13);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalModule", function() { return __WEBPACK_IMPORTED_MODULE_3__hal_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__http__ = __webpack_require__(4);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalHttp", function() { return __WEBPACK_IMPORTED_MODULE_4__http__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__instance_factory__ = __webpack_require__(5);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalInstanceFactory", function() { return __WEBPACK_IMPORTED_MODULE_5__instance_factory__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__resource__ = __webpack_require__(16);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DONT_SKIP_ME", function() { return __WEBPACK_IMPORTED_MODULE_6__resource__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__resource_factory__ = __webpack_require__(2);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalResourceFactory", function() { return __WEBPACK_IMPORTED_MODULE_7__resource_factory__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__translator__ = __webpack_require__(6);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HAL_OBJECT_TRANSLATORS", function() { return __WEBPACK_IMPORTED_MODULE_8__translator__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HAL_COLLECTION_TRANSLATORS", function() { return __WEBPACK_IMPORTED_MODULE_8__translator__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__serializers_json_object__ = __webpack_require__(9);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalJsonObjectSerializerOptions", function() { return __WEBPACK_IMPORTED_MODULE_9__serializers_json_object__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BaseHalJsonObjectSerializerOptions", function() { return __WEBPACK_IMPORTED_MODULE_9__serializers_json_object__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalJsonObjectSerializer", function() { return __WEBPACK_IMPORTED_MODULE_9__serializers_json_object__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__translators_array_translator__ = __webpack_require__(10);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalArrayTranslator", function() { return __WEBPACK_IMPORTED_MODULE_10__translators_array_translator__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__translators_default_object_translator__ = __webpack_require__(11);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HalDefaultObjectTranslator", function() { return __WEBPACK_IMPORTED_MODULE_11__translators_default_object_translator__["a"]; });













/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers__ = __webpack_require__(15);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalModule; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var HalModule = function HalModule() {
    _classCallCheck(this, HalModule);
};
HalModule = __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({ providers: [__WEBPACK_IMPORTED_MODULE_1__providers__["a" /* HAL_PROVIDERS */]] })], HalModule);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uri_templates__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uri_templates___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_uri_templates__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__instance_factory__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resource_factory__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HalHttpResourceFactory; });
/* unused harmony export HalHttpResource */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = this && this.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 *
 */
var HalHttpResourceFactory = function (_HalResourceFactory) {
    _inherits(HalHttpResourceFactory, _HalResourceFactory);

    function HalHttpResourceFactory(halHttp, instanceFactory) {
        _classCallCheck(this, HalHttpResourceFactory);

        var _this = _possibleConstructorReturn(this, (HalHttpResourceFactory.__proto__ || Object.getPrototypeOf(HalHttpResourceFactory)).call(this));

        _this.halHttp = halHttp;
        _this.instanceFactory = instanceFactory;
        return _this;
    }

    _createClass(HalHttpResourceFactory, [{
        key: "createResource",
        value: function createResource(link, typeDescription) {
            return new HalHttpResource(link, typeDescription, this.halHttp, this.instanceFactory, this);
        }
    }]);

    return HalHttpResourceFactory;
}(__WEBPACK_IMPORTED_MODULE_4__resource_factory__["a" /* HalResourceFactory */]);
HalHttpResourceFactory = __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__http__["a" /* HalHttp */], __WEBPACK_IMPORTED_MODULE_3__instance_factory__["a" /* HalInstanceFactory */]])], HalHttpResourceFactory);

/**
 *
 */
var HalHttpResource = function () {
    function HalHttpResource(link, typeDescription, halHttp, instanceFactory, resourceFactory) {
        _classCallCheck(this, HalHttpResource);

        this.link = link;
        this.typeDescription = typeDescription;
        this.halHttp = halHttp;
        this.instanceFactory = instanceFactory;
        this.resourceFactory = resourceFactory;
    }

    _createClass(HalHttpResource, [{
        key: "get",
        value: function get(params) {
            var _this2 = this;

            return this.halHttp.get(this.filledUrl(params)).map(function (object) {
                return _this2.instanceFactory.createInstance(object, _this2.typeDescription, _this2.resourceFactory);
            });
        }
    }, {
        key: "delete",
        value: function _delete(params) {
            return this.halHttp.delete(this.filledUrl(params));
        }
    }, {
        key: "post",
        value: function post(body, params, typeDescription) {
            // TODO: Implement this method.
            return undefined;
        }
    }, {
        key: "put",
        value: function put(body, params) {
            // TODO: Implement this method.
            return undefined;
        }
    }, {
        key: "filledUrl",
        value: function filledUrl(params) {
            var template = new __WEBPACK_IMPORTED_MODULE_1_uri_templates___default.a(this.link.href);
            return template.fill(params);
        }
    }]);

    return HalHttpResource;
}();

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__client__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_resource_factory__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__instance_factory__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__object__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__resource_factory__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__translator__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__serializers_json_object__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__translators_array_translator__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__translators_default_object_translator__ = __webpack_require__(11);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HAL_PROVIDERS; });










var HAL_PROVIDERS = [__WEBPACK_IMPORTED_MODULE_0__client__["a" /* HalClient */], __WEBPACK_IMPORTED_MODULE_1__http__["a" /* HalHttp */], __WEBPACK_IMPORTED_MODULE_3__instance_factory__["a" /* HalInstanceFactory */], { provide: __WEBPACK_IMPORTED_MODULE_4__object__["c" /* HalObjectSerializer */], useClass: __WEBPACK_IMPORTED_MODULE_7__serializers_json_object__["c" /* HalJsonObjectSerializer */] }, { provide: __WEBPACK_IMPORTED_MODULE_7__serializers_json_object__["a" /* HalJsonObjectSerializerOptions */], useClass: __WEBPACK_IMPORTED_MODULE_7__serializers_json_object__["b" /* BaseHalJsonObjectSerializerOptions */] }, { provide: __WEBPACK_IMPORTED_MODULE_5__resource_factory__["a" /* HalResourceFactory */], useClass: __WEBPACK_IMPORTED_MODULE_2__http_resource_factory__["a" /* HalHttpResourceFactory */] }, { provide: __WEBPACK_IMPORTED_MODULE_6__translator__["b" /* HAL_COLLECTION_TRANSLATORS */], useClass: __WEBPACK_IMPORTED_MODULE_8__translators_array_translator__["a" /* HalArrayTranslator */], multi: true }, { provide: __WEBPACK_IMPORTED_MODULE_6__translator__["a" /* HAL_OBJECT_TRANSLATORS */], useClass: __WEBPACK_IMPORTED_MODULE_9__translators_default_object_translator__["a" /* HalDefaultObjectTranslator */], multi: true }];

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DONT_SKIP_ME; });
var DONT_SKIP_ME = true;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("@angular/http");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("core-decorators");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("uri-templates");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ })
/******/ ]);