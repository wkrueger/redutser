"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plug_1 = require("./plug");
exports.createRedutser2 = (initialState) => (reducerDict) => {
    const creators = _actionCreatorsFromReducerDict()(reducerDict);
    const reducerWithInitializer = (initializer) => (state = initializer, action) => {
        if (reducerDict[action.type]) {
            return reducerDict[action.type](state, action.payload);
        }
        return state;
    };
    const reducer = reducerWithInitializer(initialState);
    let output = {
        creators,
        reducer,
        reducerWithInitializer,
        initialState,
        actionTypes: undefined,
        plug: () => plug_1.plug(output),
        plugShort: () => plug_1.plugShort(output),
        __redutser__: true,
        _reducerDict: reducerDict,
    };
    return output;
};
exports.createRedutser = (initialState, reducerDict) => {
    return exports.createRedutser2(initialState)(reducerDict);
};
function _actionCreatorsFromReducerDict() {
    return (dict) => {
        return Object.keys(dict).reduce((out, name) => (Object.assign({}, out, { [name]: (i) => ({ type: name, payload: i }) })), {});
    };
}
