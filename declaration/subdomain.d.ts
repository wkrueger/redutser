import { Redutser } from "./redutser";
import { Exactify } from "../type-helpers";
export declare type RedutserDict<State> = {
    [k: string]: Redutser<State, any>;
};
export declare type ReducerDictFromRedutserDict<Inp extends RedutserDict<State>, State> = {
    [K in keyof Inp]: (state: State, payload: Inp[K]["actionTypes"]) => State;
};
declare type AdaptedAcFunction<T, Wrapper> = T extends (i: infer K) => infer V ? (i: K) => {
    type: Wrapper;
    payload: V;
} : never;
declare type SubdomainActionCreators<State, Redutsers extends {
    [RedK in keyof Redutsers]: Redutser<State, any>;
}> = {
    [RedK in keyof Redutsers]: {
        [ACKey in keyof Redutsers[RedK]["creators"]]: AdaptedAcFunction<Redutsers[RedK]["creators"][ACKey], RedK>;
    };
};
/**
 * "Composes" many redutsers which share the same state.
 */
export declare function subdomain<State, Redutsers extends RedutserDict<State>>(initialState: State, redutsers: Redutsers): {
    creators: SubdomainActionCreators<State, Redutsers>;
    reducer: (state: State | undefined, action: import("../type-helpers").FnReturn<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<Redutsers, State>>[keyof Redutsers]>) => State;
    initialState: State;
    actionTypes: import("../type-helpers").FnReturn<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<Redutsers, State>>[keyof Redutsers]>;
    __redutser__: boolean;
    _reducerDict: ReducerDictFromRedutserDict<Redutsers, State>;
};
export declare function combineRedutsers<State, RedDict extends Exactify<{
    [k in keyof State]?: Redutser<State[k], any>;
}, RedDict>>(initialState: State, redutsers: RedDict): {
    creators: SubdomainActionCreators<State, { [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }>;
    reducer: (state: State | undefined, action: import("../type-helpers").FnReturn<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }, State>>[keyof RedDict]>) => State;
    initialState: State;
    actionTypes: import("../type-helpers").FnReturn<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }, State>>[keyof RedDict]>;
    __redutser__: boolean;
    _reducerDict: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }, State>;
};
export {};
