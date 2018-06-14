import { Reducer, Redutser, RedutserShort, ReducerDict } from "./redutser";
export declare type ReplaceReducerState<Red, UpperState> = Red extends Reducer<any, infer P> ? Reducer<UpperState, P> : never;
export declare type ReplaceDictState<Dict extends ReducerDict<any>, StateOuter> = {
    [DictKey in keyof Dict]: ReplaceReducerState<Dict[DictKey], StateOuter>;
};
/**
 * Applies "mapToKey" to a key-value pair (ReducerDict), returning a new Dict.
 */
export declare const liftDictState: <StateOuter>() => <K extends keyof StateOuter, Dict extends ReducerDict<StateOuter[K]>>(mapKey: K, dict: Dict) => ReplaceDictState<Dict, StateOuter>;
export declare type DictOfRedutser<R> = R extends Redutser<any, infer D> ? D : never;
export declare type LiftRedutserState<State, Red extends Redutser<any, any> | undefined> = Redutser<State, ReplaceDictState<DictOfRedutser<Red>, State>>;
/**
 * "Lifts up" the state of a redutser.
 */
export declare const liftRedutserState: <OuterState, K extends keyof OuterState, R extends RedutserShort<OuterState[K], any>>(state: OuterState, key: K, _red: R) => {
    creators: import("./redutser").ActionCreatorsFromReducerDict<ReplaceDictState<DictOfRedutser<R>, OuterState>>;
    reducer: (state: OuterState | undefined, action: ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReplaceDictState<DictOfRedutser<R>, OuterState>>[keyof DictOfRedutser<R>]>) => OuterState;
    initialState: OuterState;
    actionTypes: ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReplaceDictState<DictOfRedutser<R>, OuterState>>[keyof DictOfRedutser<R>]>;
    plug: () => {
        ownProps: <OwnProps = {}>() => {
            mapProps: <StateProps = OuterState, DispatchProps = {
                dispatch: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReplaceDictState<DictOfRedutser<R>, OuterState>>[keyof DictOfRedutser<R>]>, OuterState>;
            }>(stateMapper?: (state: OuterState) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReplaceDictState<DictOfRedutser<R>, OuterState>>[keyof DictOfRedutser<R>]>, OuterState>) => DispatchProps) => {
                component: import("../type-helpers").ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>;
            };
        };
        mapProps: <StateProps = OuterState, DispatchProps = {
            dispatch: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReplaceDictState<DictOfRedutser<R>, OuterState>>[keyof DictOfRedutser<R>]>, OuterState>;
        }>(stateMapper?: (state: OuterState) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReplaceDictState<DictOfRedutser<R>, OuterState>>[keyof DictOfRedutser<R>]>, OuterState>) => DispatchProps) => {
            component: import("../type-helpers").ComponentEnhancer<StateProps & DispatchProps & {}, {}>;
        };
    };
    plugShort: () => <OwnProps = {}>() => <StateProps = OuterState, DispatchProps = {
        dispatch: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReplaceDictState<DictOfRedutser<R>, OuterState>>[keyof DictOfRedutser<R>]>, OuterState>;
    }>(stateMapper?: (state: OuterState) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<import("./redutser").ActionCreatorsFromReducerDict<ReplaceDictState<DictOfRedutser<R>, OuterState>>[keyof DictOfRedutser<R>]>, OuterState>) => DispatchProps) => import("../type-helpers").ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>;
    __redutser__: boolean;
    _reducerDict: ReplaceDictState<DictOfRedutser<R>, OuterState>;
};
