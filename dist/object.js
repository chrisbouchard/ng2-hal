"use strict";
class HalLinkObject {
    constructor(href, templated) {
        this.href = href;
        this.templated = templated;
    }
}
exports.HalLinkObject = HalLinkObject;
class HalObject {
    constructor(embedded, links, resource) {
        this.embedded = embedded;
        this.links = links;
        this.resource = resource;
    }
}
exports.HalObject = HalObject;
class HalObjectSerializer {
}
exports.HalObjectSerializer = HalObjectSerializer;
//# sourceMappingURL=object.js.map