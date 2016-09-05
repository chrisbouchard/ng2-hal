"use strict";
/**
 * A translator that returns Arrays as-is.
 */
class HalArrayTranslator {
    /**
     * Only apply to Arrays.
     */
    appliesTo(type) {
        return type === Array;
    }
    toArray(value, type) {
        if (Array.isArray(value)) {
            return value;
        }
        throw new TypeError(`Expected value of type Array, but got ${value.constructor.name}`);
    }
    fromArray(value, type) {
        return value;
    }
}
exports.HalArrayTranslator = HalArrayTranslator;
//# sourceMappingURL=array-translator.js.map