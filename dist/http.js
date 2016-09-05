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
const http_1 = require('@angular/http');
const error_1 = require('./error');
const object_1 = require('./object');
/**
 *
 */
let HalHttp = class HalHttp {
    constructor(objectSerializer, http) {
        this.objectSerializer = objectSerializer;
        this.http = http;
    }
    get(url) {
        return this.http.get(url)
            .map(handleErrorResponse)
            .map(response => {
            if (response.status === 204) {
                return undefined;
            }
            return this.objectSerializer.deserialize(response.text());
        });
    }
    delete(url) {
        return undefined;
    }
    post(url, body) {
        return undefined;
    }
    put(url, body) {
        return undefined;
    }
};
HalHttp = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [object_1.HalObjectSerializer, http_1.Http])
], HalHttp);
exports.HalHttp = HalHttp;
function handleErrorResponse(response) {
    const status = response.status;
    /* This is probably a little over-zealous, but it corresponds to !response.ok (which doesn't work with the current
      * Angular 2 beta. */
    if (status < 200 || status >= 300) {
        throw new error_1.HalError(status, response.text());
    }
    return response;
}
function mapUpdate(response) {
    if (response.headers.has('Location')) {
        return new object_1.HalLinkObject(response.headers.get('Location'), false);
    }
    return undefined;
}
//# sourceMappingURL=http.js.map