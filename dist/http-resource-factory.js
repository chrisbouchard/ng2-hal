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
const uri_templates_1 = require('uri-templates');
const http_1 = require('./http');
const instance_factory_1 = require('./instance-factory');
const resource_factory_1 = require('./resource-factory');
/**
 *
 */
let HalHttpResourceFactory = class HalHttpResourceFactory extends resource_factory_1.HalResourceFactory {
    constructor(halHttp, instanceFactory) {
        super();
        this.halHttp = halHttp;
        this.instanceFactory = instanceFactory;
    }
    createResource(link, typeDescription) {
        return new HalHttpResource(link, typeDescription, this.halHttp, this.instanceFactory, this);
    }
};
HalHttpResourceFactory = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.HalHttp, instance_factory_1.HalInstanceFactory])
], HalHttpResourceFactory);
exports.HalHttpResourceFactory = HalHttpResourceFactory;
/**
 *
 */
class HalHttpResource {
    constructor(link, typeDescription, halHttp, instanceFactory, resourceFactory) {
        this.link = link;
        this.typeDescription = typeDescription;
        this.halHttp = halHttp;
        this.instanceFactory = instanceFactory;
        this.resourceFactory = resourceFactory;
    }
    get(params) {
        return this.halHttp.get(this.filledUrl(params)).map(object => this.instanceFactory.createInstance(object, this.typeDescription, this.resourceFactory));
    }
    delete(params) {
        return this.halHttp.delete(this.filledUrl(params));
    }
    post(body, params, typeDescription) {
        // TODO: Implement this method.
        return undefined;
    }
    put(body, params) {
        // TODO: Implement this method.
        return undefined;
    }
    filledUrl(params) {
        const template = new uri_templates_1.default(this.link.href);
        return template.fill(params);
    }
}
exports.HalHttpResource = HalHttpResource;
//# sourceMappingURL=http-resource-factory.js.map