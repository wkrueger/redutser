import { Reducer, Redutser, ReducerDict } from "./redutser";
export declare type Convert<Red, UpperState> = Red extends Reducer<any, infer P> ? Reducer<UpperState, P> : never;
export declare type ApplyToDict<Dict extends ReducerDict<any>, StateOuter> = {
    [DictKey in keyof Dict]: Convert<Dict[DictKey], StateOuter>;
};
export declare const applyToDict: <StateOuter>() => <Dict extends ReducerDict<StateOuter>>(dict: Dict, mapKey: keyof StateOuter) => ApplyToDict<Dict, StateOuter>;
export declare const applyToRedutser: <StateOuter>() => <R extends Redutser<StateOuter[K], any>, K extends keyof StateOuter>(redutser: R, key: K) => Redutser<StateOuter, ApplyToDict<any, StateOuter>>;
