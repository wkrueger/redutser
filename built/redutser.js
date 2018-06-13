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
var plug_1 = require("./plug");
exports.createRedutser2 = function (initialState) { return function (reducerDict) {
    var creators = _actionCreatorsFromReducerDict()(reducerDict);
    function reducer(state, action) {
        if (state === void 0) { state = initialState; }
        if (reducerDict[action.type]) {
            return reducerDict[action.type](state, action.payload);
        }
        return state;
    }
    var output = {
        creators: creators,
        plug: function () { return plug_1.plug(output); },
        plugShort: function () { return plug_1.plugShort(output); },
        reducer: reducer,
        initialState: initialState,
        actionTypes: undefined,
        __redutser__: true,
        _reducerDict: reducerDict
    };
    return output;
}; };
exports.createRedutser = function (initialState, reducerDict) {
    return exports.createRedutser2(initialState)(reducerDict);
};
function _actionCreatorsFromReducerDict() {
    return function (dict) {
        return Object.keys(dict).reduce(function (out, name) {
            var _a;
            return (__assign({}, out, (_a = {}, _a[name] = function (i) { return ({ type: name, payload: i }); }, _a)));
        }, {});
    };
}
