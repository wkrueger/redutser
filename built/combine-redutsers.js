import { createRedutser, } from "./redutser";
/**
 * An implementation of the above pair.
 */
const mapToKey = () => (key) => ({
    mapToInner: (s) => s[key],
    mapToOuter: (sin, sout) => (Object.assign({}, sout, { [key]: sin })),
});
/**
 * Gets a reducer.
 * Returns a new reducer with its state "lifted" from the original,
 * according to the mapper pair.
 */
const mapReducerState = () => (mapper) => {
    return (reducer) => {
        return (stateOuter, p) => mapper.mapToOuter(reducer(mapper.mapToInner(stateOuter), p), stateOuter);
    };
};
/**
 * Applies "mapToKey" to a key-value pair (ReducerDict), returning a new Dict.
 */
export const liftDictState = () => (mapKey, dict) => {
    return Object.keys(dict).reduce((out, dictKey) => {
        const mapObj = mapToKey()(mapKey);
        return Object.assign({}, out, { [dictKey]: mapReducerState()(mapObj)(dict[dictKey]) });
    }, {});
};
/**
 * "Lifts up" the state of a redutser.
 */
export const liftRedutserState = (state, key, _red) => {
    const dictMapped = liftDictState()(key, 
    //this might feel a bit hacky but thats what worked better wth the inference atm
    //a previous less "hacky" approach brought inference issues.
    _red._reducerDict);
    return createRedutser(state, dictMapped);
};
