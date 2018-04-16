import * as H from "../type-helpers";
export declare type Reducer<State, Payload = any> = (s: State, p: Payload) => State;
export declare type ReducerDict<State> = {
    [name: string]: Reducer<State>;
};
export declare type ActionCreatorsFromReducerDict<Inp extends ReducerDict<any>> = {
    [K in keyof Inp]: (payload: H.SecondArg<Inp[K]>) => {
        type: K;
        payload: H.SecondArg<Inp[K]>;
    };
};
export declare type ActionTypesFromReducerDict<Inp extends ReducerDict<any>> = H.FnReturn<H.Values<ActionCreatorsFromReducerDict<Inp>>>;
export declare function redutser<State, Dict extends ReducerDict<State>>(initialState: State, reducerDict: Dict): Redutser<State, Dict>;
export interface Redutser<State, Dict extends ReducerDict<State>> {
    __redutser__: boolean;
    _reducerDict: Dict;
    creators: ActionCreatorsFromReducerDict<Dict>;
    reducer: (state: State | undefined, action: H.FnReturn<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>) => State;
    actionTypes: ActionTypesFromReducerDict<Dict>;
}
/**
 * Initial state is recommended. But sometimes you just want to write an inner reducer,
 * so use this function for that case.
 */
export declare function innerRedutser<State>(): <Actions extends ReducerDict<State>>(actionsMap: Actions) => Redutser<State, Actions>;