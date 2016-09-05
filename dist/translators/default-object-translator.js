"use strict";
/**
 * A translator that simply returns the value as given.
 */
class HalDefaultObjectTranslator {
    /**
     * Only apply when we've reached the bottom of the prototype chain.
     */
    appliesTo(type) {
        return !type;
    }
    toObject(value, type) {
        const instance = {};
        Object.assign(instance, value);
        return instance;
    }
    fromObject(value, type) {
        const instance = Reflect.construct(type, []);
        Object.assign(instance, value);
        return instance;
    }
}
exports.HalDefaultObjectTranslator = HalDefaultObjectTranslator;
//# sourceMappingURL=default-object-translator.js.map