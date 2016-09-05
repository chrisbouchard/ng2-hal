"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const object_1 = require('../object');
class HalJsonObjectSerializerOptions {
}
exports.HalJsonObjectSerializerOptions = HalJsonObjectSerializerOptions;
let BaseHalJsonObjectSerializerOptions = class BaseHalJsonObjectSerializerOptions extends HalJsonObjectSerializerOptions {
    constructor() {
        super();
        this.embeddedKey = '_embedded';
        this.linksKey = '_links';
    }
};
BaseHalJsonObjectSerializerOptions = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], BaseHalJsonObjectSerializerOptions);
exports.BaseHalJsonObjectSerializerOptions = BaseHalJsonObjectSerializerOptions;
let HalJsonObjectSerializer = class HalJsonObjectSerializer extends object_1.HalObjectSerializer {
    constructor(options) {
        super();
        this.options = options;
    }
    deserialize(data) {
        let json = JSON.parse(data);
        return this.toObject(json);
    }
    toObject(json) {
        /* Special case when the JSON is an array. */
        if (json instanceof Array) {
            return json.map((element) => this.toObject(element));
        }
        let embedded = {};
        let links = {};
        let resource = {};
        for (let [key, value] of Object.entries(json)) {
            switch (key) {
                case this.options.embeddedKey:
                    /* Propagate HalObject into the embedded objects. */
                    for (let [embedKey, embedValue] of Object.entries(value)) {
                        embedded[embedKey] = this.toObject(embedValue);
                    }
                    break;
                case this.options.linksKey:
                    /* Propagate HalLinkObject into the links. */
                    for (let [linkKey, linkValue] of Object.entries(value)) {
                        links[linkKey] = this.toLinkObject(linkValue);
                    }
                    break;
                default:
                    resource[key] = value;
                    break;
            }
        }
        return new object_1.HalObject(embedded, links, resource);
    }
    toLinkObject(json) {
        /* Special case when the JSON is an array. */
        if (json instanceof Array) {
            return json.map((element) => this.toLinkObject(element));
        }
        return new object_1.HalLinkObject(json.href, json.templated);
    }
    serialize(object) {
        return '';
    }
};
HalJsonObjectSerializer = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [HalJsonObjectSerializerOptions])
], HalJsonObjectSerializer);
exports.HalJsonObjectSerializer = HalJsonObjectSerializer;
//# sourceMappingURL=json-object.js.map