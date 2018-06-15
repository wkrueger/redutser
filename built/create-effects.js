"use strict";
/**
 * I gave up on making declaration augment work on this, so
 * currently this is kept only for reference
 */
Object.defineProperty(exports, "__esModule", { value: true });
function createEffects(redutser) {
    return (fx) => fx;
}
exports.createEffects = createEffects;
