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
function redutser(initialState, reducerDict) {
    var creators = _actionCreatorsFromReducerDict()(reducerDict);
    function reducer(state, action) {
        if (state === void 0) { state = initialState; }
        if (initialState === undefined) {
            console.error("redutser unexpected: undefined state.");
        }
        var handler = reducerDict[action.type];
        if (handler) {
            return handler(state, action.payload);
        }
        else if (String(action.type).substr(0, 2) !== "@@") {
            console.error("redutser unexpected: handler not found for action", action.type);
        }
        return state;
    }
    return {
        creators: creators,
        reducer: reducer,
        initialState: initialState,
        actionTypes: undefined,
        __redutser__: true,
        _reducerDict: reducerDict
    };
}
exports.redutser = redutser;
function _actionCreatorsFromReducerDict() {
    return function (dict) {
        return Object.keys(dict).reduce(function (out, name) {
            return (__assign({}, out, (_a = {}, _a[name] = function (i) { return ({ type: name, payload: i }); }, _a)));
            var _a;
        }, {});
    };
}
