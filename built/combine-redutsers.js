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
/**
 * An implementation of the above pair.
 */
var mapToKey = function () { return function (key) { return ({
    mapToInner: function (s) { return s[key]; },
    mapToOuter: function (sin, sout) {
        return (__assign({}, sout, (_a = {}, _a[key] = sin, _a)));
        var _a;
    }
}); }; };
/**
 * Gets a reducer.
 * Returns a new reducer with its state "lifted" from the original,
 * according to the mapper pair.
 */
var mapReducerState = function () { return function (mapper) {
    return function (reducer) {
        return function (stateOuter, p) {
            return mapper.mapToOuter(reducer(mapper.mapToInner(stateOuter), p), stateOuter);
        };
    };
}; };
/**
 * Applies "mapToKey" to a key-value pair (ReducerDict), returning a new Dict.
 */
exports.liftDictState = function () { return function (mapKey, dict) {
    return Object.keys(dict).reduce(function (out, dictKey) {
        var mapObj = mapToKey()(mapKey);
        return __assign({}, out, (_a = {}, _a[dictKey] = mapReducerState()(mapObj)(dict[dictKey]), _a));
        var _a;
    }, {});
}; };
/**
 * "Lifts up" the state of a redutser.
 */
exports.liftRedutserState = function (state, key, _red) {
    var dictMapped = exports.liftDictState()(key, 
    //this might feel a bit hacky but thats what worked better wth the inference atm
    //a previous less "hacky" approach brought inference issues.
    _red._reducerDict);
    return redutser_1.createRedutser(state, dictMapped);
};
