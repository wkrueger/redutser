import { plug, plugShort } from "./plug";
export const createRedutser2 = (initialState) => (reducerDict) => {
    const creators = _actionCreatorsFromReducerDict()(reducerDict);
    function reducer(state = initialState, action) {
        if (reducerDict[action.type]) {
            return reducerDict[action.type](state, action.payload);
        }
        return state;
    }
    let output = {
        creators,
        reducer,
        initialState,
        actionTypes: undefined,
        plug: () => plug(output),
        plugShort: () => plugShort(output),
        // get createEffects() {
        //   return createEffects(output)
        // },
        __redutser__: true,
        _reducerDict: reducerDict,
    };
    return output;
};
export const createRedutser = (initialState, reducerDict) => {
    return createRedutser2(initialState)(reducerDict);
};
function _actionCreatorsFromReducerDict() {
    return (dict) => {
        return Object.keys(dict).reduce((out, name) => (Object.assign({}, out, { [name]: (i) => ({ type: name, payload: i }) })), {});
    };
}
