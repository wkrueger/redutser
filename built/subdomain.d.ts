import { Redutser, RedutserShort } from "./redutser";
import { Exactify } from "../type-helpers";
export declare type RedutserDict<State> = {
    [k: string]: RedutserShort<State, any>;
};
export declare type ReducerDictFromRedutserDict<Inp extends RedutserDict<State>, State> = {
    [K in keyof Inp]: (state: State, payload: Inp[K]["actionTypes"]) => State;
};
declare type AdaptedAcFunction<T, Wrapper> = T extends (i: infer K) => infer V ? (i: K) => {
    type: Wrapper;
    payload: V;
} : never;
declare type SubdomainActionCreators<State, Redutsers extends {
    [RedK in keyof Redutsers]: RedutserShort<State, any>;
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
    reducer: (state: State | undefined, action: ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<Redutsers, State>>[keyof Redutsers]>) => State;
    initialState: State;
    actionTypes: ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<Redutsers, State>>[keyof Redutsers]>;
    plug: () => {
        ownProps: <OwnProps = {}>() => {
            mapProps: <StateProps = State, DispatchProps = {
                dispatch: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<Redutsers, State>>[keyof Redutsers]>, State>;
            }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<Redutsers, State>>[keyof Redutsers]>, State>) => DispatchProps) => {
                component: import("../type-helpers").ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>;
            };
        };
        mapProps: <StateProps = State, DispatchProps = {
            dispatch: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<Redutsers, State>>[keyof Redutsers]>, State>;
        }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<Redutsers, State>>[keyof Redutsers]>, State>) => DispatchProps) => {
            component: import("../type-helpers").ComponentEnhancer<StateProps & DispatchProps & {}, {}>;
        };
    };
    plugShort: () => <OwnProps = {}>() => <StateProps = State, DispatchProps = {
        dispatch: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<Redutsers, State>>[keyof Redutsers]>, State>;
    }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<Redutsers, State>>[keyof Redutsers]>, State>) => DispatchProps) => import("../type-helpers").ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>;
    __redutser__: boolean;
    _reducerDict: ReducerDictFromRedutserDict<Redutsers, State>;
};
export declare function combineRedutsers<State, RedDict extends Exactify<{
    [k in keyof State]?: RedutserShort<State[k], any>;
}, RedDict>>(initialState: State, redutsers: RedDict): {
    creators: SubdomainActionCreators<State, { [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }>;
    reducer: (state: State | undefined, action: ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }, State>>[keyof RedDict]>) => State;
    initialState: State;
    actionTypes: ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }, State>>[keyof RedDict]>;
    plug: () => {
        ownProps: <OwnProps = {}>() => {
            mapProps: <StateProps = State, DispatchProps = {
                dispatch: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }, State>>[keyof RedDict]>, State>;
            }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }, State>>[keyof RedDict]>, State>) => DispatchProps) => {
                component: import("../type-helpers").ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>;
            };
        };
        mapProps: <StateProps = State, DispatchProps = {
            dispatch: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }, State>>[keyof RedDict]>, State>;
        }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }, State>>[keyof RedDict]>, State>) => DispatchProps) => {
            component: import("../type-helpers").ComponentEnhancer<StateProps & DispatchProps & {}, {}>;
        };
    };
    plugShort: () => <OwnProps = {}>() => <StateProps = State, DispatchProps = {
        dispatch: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }, State>>[keyof RedDict]>, State>;
    }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }, State>>[keyof RedDict]>, State>) => DispatchProps) => import("../type-helpers").ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>;
    __redutser__: boolean;
    _reducerDict: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, import("./combine-redutsers").ReplaceDictState<import("./combine-redutsers").DictOfRedutser<RedDict[k]>, State>> : never; }, State>;
};
export {};
