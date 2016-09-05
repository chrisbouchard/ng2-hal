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
const field_1 = require('./field');
const object_1 = require('./object');
const resource_factory_1 = require('./resource-factory');
/**
 *
 */
let HalClient = class HalClient {
    constructor(resourceFactory) {
        this.resourceFactory = resourceFactory;
    }
    resource(url, metadata) {
        return this.resourceFactory.createResource(new object_1.HalLinkObject(url, false), new field_1.HalFieldTypeDescription(metadata));
    }
};
HalClient = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [resource_factory_1.HalResourceFactory])
], HalClient);
exports.HalClient = HalClient;
//# sourceMappingURL=client.js.map