/// <reference types="react" />
import { Reducer, Redutser, RedutserShort, ReducerDict } from "./redutser";
import { ComponentClass, StatelessComponent } from "react";
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
    creators: { [K in keyof DictOfRedutser<R>]: (payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never;
    }; };
    reducer: (state: OuterState | undefined, action: ReturnType<{ [K in keyof DictOfRedutser<R>]: (payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof DictOfRedutser<R>]>) => OuterState;
    initialState: OuterState;
    actionTypes: ReturnType<{ [K in keyof DictOfRedutser<R>]: (payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof DictOfRedutser<R>]>;
    plug: () => {
        ownProps: <OwnProps = {}>() => {
            mapProps: <StateProps = OuterState, DispatchProps = {
                dispatch: Redutser.Dispatcher<ReturnType<{ [K in keyof DictOfRedutser<R>]: (payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never) => {
                    type: K;
                    payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never;
                }; }[keyof DictOfRedutser<R>]>, OuterState>;
            }>(stateMapper?: (state: OuterState) => StateProps, dispatchMapper?: (dispatcher: Redutser.Dispatcher<ReturnType<{ [K in keyof DictOfRedutser<R>]: (payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never) => {
                type: K;
                payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never;
            }; }[keyof DictOfRedutser<R>]>, OuterState>) => DispatchProps) => {
                component: <Comp extends ComponentClass<StateProps & DispatchProps & OwnProps> | StatelessComponent<StateProps & DispatchProps & OwnProps>>(comp: Comp) => Comp extends ComponentClass<infer Props> | StatelessComponent<infer Props> ? ComponentClass<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps | keyof OwnProps>> & OwnProps> | StatelessComponent<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps | keyof OwnProps>> & OwnProps> : never;
            };
        };
        mapProps: <StateProps = OuterState, DispatchProps = {
            dispatch: Redutser.Dispatcher<ReturnType<{ [K in keyof DictOfRedutser<R>]: (payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never) => {
                type: K;
                payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never;
            }; }[keyof DictOfRedutser<R>]>, OuterState>;
        }>(stateMapper?: (state: OuterState) => StateProps, dispatchMapper?: (dispatcher: Redutser.Dispatcher<ReturnType<{ [K in keyof DictOfRedutser<R>]: (payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never) => {
            type: K;
            payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never;
        }; }[keyof DictOfRedutser<R>]>, OuterState>) => DispatchProps) => {
            component: <Comp extends ComponentClass<StateProps & DispatchProps & {}> | StatelessComponent<StateProps & DispatchProps & {}>>(comp: Comp) => Comp extends ComponentClass<infer Props> | StatelessComponent<infer Props> ? ComponentClass<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps>>> | StatelessComponent<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps>>> : never;
        };
    };
    plugShort: () => <OwnProps = {}>() => <StateProps = OuterState, DispatchProps = {
        dispatch: Redutser.Dispatcher<ReturnType<{ [K in keyof DictOfRedutser<R>]: (payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never) => {
            type: K;
            payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never;
        }; }[keyof DictOfRedutser<R>]>, OuterState>;
    }>(stateMapper?: (state: OuterState) => StateProps, dispatchMapper?: (dispatcher: Redutser.Dispatcher<ReturnType<{ [K in keyof DictOfRedutser<R>]: (payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReplaceDictState<DictOfRedutser<R>, OuterState>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof DictOfRedutser<R>]>, OuterState>) => DispatchProps) => <Comp extends ComponentClass<StateProps & DispatchProps & OwnProps> | StatelessComponent<StateProps & DispatchProps & OwnProps>>(comp: Comp) => Comp extends ComponentClass<infer Props> | StatelessComponent<infer Props> ? ComponentClass<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps | keyof OwnProps>> & OwnProps> | StatelessComponent<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps | keyof OwnProps>> & OwnProps> : never;
    __redutser__: boolean;
    _reducerDict: ReplaceDictState<DictOfRedutser<R>, OuterState>;
};
