"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var redutser_1 = require("./redutser");
var combine_redutsers_1 = require("./combine-redutsers");
/**
 * "Composes" many redutsers which share the same state.
 */
function subdomain(initialState, redutsers) {
    var reducerDict = _reducerDictFromRedutserDict()(redutsers);
    var out = redutser_1.redutser(initialState, reducerDict);
    var creators = Object.keys(redutsers).reduce(function (reduced, key) {
        return (__assign({}, reduced, (_a = {}, _a[key] = Object.keys(redutsers[key].creators).reduce(function (o2, k2) {
            return (__assign({}, o2, (_a = {}, _a[k2] = function (i) { return ({
                type: key,
                payload: redutsers[key].creators[k2](i)
            }); }, _a)));
            var _a;
        }, {}), _a)));
        var _a;
    }, {});
    return __assign({}, out, { creators: creators });
}
exports.subdomain = subdomain;
function _reducerDictFromRedutserDict() {
    return function (dict) {
        return Object.keys(dict).reduce(function (out, key) {
            return (__assign({}, out, (_a = {}, _a[key] = function (state, act) { return dict[key].reducer(state, act); }, _a)));
            var _a;
        }, {});
    };
}
function combineRedutsers(initialState, redutsers) {
    var lifted = Object.keys(redutsers).reduce(function (out, key) {
        return __assign({}, out, (_a = {}, _a[key] = combine_redutsers_1.liftRedutserState(initialState, key, redutsers[key]), _a));
        var _a;
    }, {});
    return subdomain(initialState, lifted);
}
exports.combineRedutsers = combineRedutsers;
