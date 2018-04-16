import { Redutser } from "./redutser";
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
export declare function combineRedutsers<State, RedDict extends {
    [k in keyof State]?: Redutser<State[k], any>;
}>(initialState: State, redutsers: RedDict): {
    creators: { [RedK in keyof RedDict]: { [ACKey in keyof { [k in keyof RedDict]: any; }[RedK]["creators"]]: { [k in keyof RedDict]: any; }[RedK]["creators"][ACKey] extends (i: infer K) => infer V ? (i: K) => {
        type: RedK;
        payload: V;
    } : never; }; };
    reducer: (state: State | undefined, action: { [K in keyof RedDict]: (payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: any; }, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: any; }, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof RedDict] extends (...x: any[]) => infer V ? V : never) => State;
    actionTypes: { [K in keyof RedDict]: (payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: any; }, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: any; }, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof RedDict] extends (...x: any[]) => infer V ? V : never;
    __redutser__: boolean;
    _reducerDict: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: any; }, State>;
};
