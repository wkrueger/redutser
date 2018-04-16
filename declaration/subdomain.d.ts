import { Redutser } from "./redutser";
export declare type RedutserDict<State> = {
    [k: string]: Redutser<State, any>;
};
export declare type ReducerDictFromRedutserDict<Inp extends RedutserDict<State>, State> = {
    [K in keyof Inp]: (state: State, payload: Inp[K]["actionTypes"]) => State;
};
/**
 * "Composes" many reducers.
 */
export declare function subdomain<State, Redutsers extends RedutserDict<State>>(initialState: State, redutsers: Redutsers): {
    creators: { [RedK in keyof Redutsers]: { [ACKey in keyof Redutsers[RedK]["creators"]]: Redutsers[RedK]["creators"][ACKey] extends (i: infer K) => infer V ? (i: K) => {
        type: RedK;
        payload: V;
    } : never; }; };
    __redutser__: boolean;
    _reducerDict: ReducerDictFromRedutserDict<Redutsers, State>;
    reducer: (state: State | undefined, action: { [K in keyof Redutsers]: (payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof Redutsers] extends (...x: any[]) => infer V ? V : never) => State;
    actionTypes: { [K in keyof Redutsers]: (payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof Redutsers] extends (...x: any[]) => infer V ? V : never;
};
