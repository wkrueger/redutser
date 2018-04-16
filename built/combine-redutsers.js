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
var mapToKey = function () { return function (key) { return ({
    mapToInner: function (s) { return s[key]; },
    mapToOuter: function (sin, sout) {
        return (__assign({}, sout, (_a = {}, _a[key] = sin, _a)));
        var _a;
    }
}); }; };
var mapReducerState = function () { return function (mapper) {
    return function (reducer) {
        return function (stateOuter, p) {
            return mapper.mapToOuter(reducer(mapper.mapToInner(stateOuter), p), stateOuter);
        };
    };
}; };
exports.applyToDict = function () { return function (dict, mapKey) {
    return Object.keys(dict).reduce(function (out, dictKey) {
        var mapObj = mapToKey()(mapKey);
        return __assign({}, out, (_a = {}, _a[dictKey] = mapReducerState()(mapObj)(dict[dictKey]), _a));
        var _a;
    }, {});
}; };
exports.applyToRedutser = function () { return function (redutser, key) {
    var dict = redutser._reducerDict;
    var dictMapped = exports.applyToDict()(dict, key);
    return redutser_1.innerRedutser()(dictMapped);
}; };
