import { createRedutser } from "./redutser";
import { liftRedutserState } from "./combine-redutsers";
/**
 * "Composes" many redutsers which share the same state.
 */
export function subdomain(initialState, redutsers) {
    const reducerDict = _reducerDictFromRedutserDict()(redutsers);
    const out = createRedutser(initialState, reducerDict);
    const creators = Object.keys(redutsers).reduce((reduced, key) => (Object.assign({}, reduced, { [key]: Object.keys(redutsers[key].creators).reduce((o2, k2) => (Object.assign({}, o2, { [k2]: (i) => ({
                type: key,
                payload: redutsers[key].creators[k2](i),
            }) })), {}) })), {});
    return Object.assign({}, out, { creators });
}
function _reducerDictFromRedutserDict() {
    return function (dict) {
        return Object.keys(dict).reduce((out, key) => (Object.assign({}, out, { [key]: (state, act) => dict[key].reducer(state, act) })), {});
    };
}
// https://stackoverflow.com/questions/49858826/mapped-types-function-parameters-enigma/49868362
// thank you!
export function combineRedutsers(initialState, redutsers) {
    const lifted = Object.keys(redutsers).reduce((out, key) => {
        return Object.assign({}, out, { [key]: liftRedutserState(initialState, key, redutsers[key]) });
    }, {});
    return subdomain(initialState, lifted);
}
