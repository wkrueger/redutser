import { Reducer, Redutser, ReducerDict } from "./redutser";
export declare type ReplaceReducerState<Red, UpperState> = Red extends Reducer<any, infer P> ? Reducer<UpperState, P> : never;
export declare type ReplaceDictState<Dict extends ReducerDict<any>, StateOuter> = {
    [DictKey in keyof Dict]: ReplaceReducerState<Dict[DictKey], StateOuter>;
};
/**
 * Applies "mapToKey" to a key-value pair (ReducerDict), returning a new Dict.
 */
export declare const liftDictState: <StateOuter>() => <K extends keyof StateOuter, Dict extends ReducerDict<StateOuter[K]>>(mapKey: K, dict: Dict) => ReplaceDictState<Dict, StateOuter>;
export declare type DictOfRedutser<R> = R extends Redutser<any, infer D> ? D : never;
export declare type LiftRedutserState<OuterState, Key extends keyof OuterState, Red extends Redutser<OuterState[Key], any>> = Redutser<OuterState, ReplaceDictState<DictOfRedutser<Red>, OuterState>>;
/**
 * "Lifts up" the state of a redutser.
 */
export declare const liftRedutserState: <OuterState, K extends keyof OuterState, R extends Redutser<OuterState[K], any>>(state: OuterState, key: K, _red: R) => Redutser<OuterState, ReplaceDictState<DictOfRedutser<R>, OuterState>>;
