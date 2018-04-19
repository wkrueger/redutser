import { Redutser } from "./redutser";
import { Exactify } from "../type-helpers";
export declare type RedutserDict<State> = {
    [k: string]: Redutser<State, any>;
};
export declare type ReducerDictFromRedutserDict<Inp extends RedutserDict<State>, State> = {
    [K in keyof Inp]: (state: State, payload: Inp[K]["actionTypes"]) => State;
};
/**
 * "Composes" many redutsers which share the same state.
 */
export declare function subdomain<State, Redutsers extends RedutserDict<State>>(initialState: State, redutsers: Redutsers): {
    creators: { [RedK in keyof Redutsers]: { [ACKey in keyof Redutsers[RedK]["creators"]]: Redutsers[RedK]["creators"][ACKey] extends (i: infer K) => infer V ? (i: K) => {
        type: RedK;
        payload: V;
    } : never; }; };
    reducer: (state: State | undefined, action: { [K in keyof Redutsers]: (payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof Redutsers] extends (...x: any[]) => infer V ? V : never) => State;
    actionTypes: { [K in keyof Redutsers]: (payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof Redutsers] extends (...x: any[]) => infer V ? V : never;
    __redutser__: boolean;
    _reducerDict: ReducerDictFromRedutserDict<Redutsers, State>;
};
export declare function combineRedutsers<State, RedDict extends Exactify<{
    [k in keyof State]?: Redutser<State[k], any>;
}, RedDict>>(initialState: State, redutsers: RedDict): {
    creators: { [RedK in keyof RedDict]: { [ACKey in keyof { [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }[RedK]["creators"]]: { [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }[RedK]["creators"][ACKey] extends (i: infer K) => infer V ? (i: K) => {
        type: RedK;
        payload: V;
    } : never; }; };
    reducer: (state: State | undefined, action: { [K in keyof RedDict]: (payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof RedDict] extends (...x: any[]) => infer V ? V : never) => State;
    actionTypes: { [K in keyof RedDict]: (payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof RedDict] extends (...x: any[]) => infer V ? V : never;
    __redutser__: boolean;
    _reducerDict: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>;
};
