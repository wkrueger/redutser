/// <reference types="react" />
import { Redutser, RedutserShort } from "./redutser";
import { Exactify } from "../type-helpers";
import { ComponentClass, StatelessComponent } from "react";
export declare type RedutserDict<State> = {
    [k: string]: RedutserShort<State, any>;
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
    reducer: (state: State | undefined, action: ReturnType<{ [K in keyof Redutsers]: (payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof Redutsers]>) => State;
    initialState: State;
    actionTypes: ReturnType<{ [K in keyof Redutsers]: (payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof Redutsers]>;
    plug: () => {
        ownProps: <OwnProps = {}>() => {
            mapProps: <StateProps = State, DispatchProps = {
                dispatch: Redutser.Dispatcher<ReturnType<{ [K in keyof Redutsers]: (payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
                    type: K;
                    payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never;
                }; }[keyof Redutsers]>, State>;
            }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Redutser.Dispatcher<ReturnType<{ [K in keyof Redutsers]: (payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
                type: K;
                payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never;
            }; }[keyof Redutsers]>, State>) => DispatchProps) => {
                component: <Comp extends ComponentClass<StateProps & DispatchProps & OwnProps> | StatelessComponent<StateProps & DispatchProps & OwnProps>>(comp: Comp) => Comp extends ComponentClass<infer Props> | StatelessComponent<infer Props> ? ComponentClass<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps | keyof OwnProps>> & OwnProps> | StatelessComponent<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps | keyof OwnProps>> & OwnProps> : never;
            };
        };
        mapProps: <StateProps = State, DispatchProps = {
            dispatch: Redutser.Dispatcher<ReturnType<{ [K in keyof Redutsers]: (payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
                type: K;
                payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never;
            }; }[keyof Redutsers]>, State>;
        }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Redutser.Dispatcher<ReturnType<{ [K in keyof Redutsers]: (payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
            type: K;
            payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never;
        }; }[keyof Redutsers]>, State>) => DispatchProps) => {
            component: <Comp extends ComponentClass<StateProps & DispatchProps & {}> | StatelessComponent<StateProps & DispatchProps & {}>>(comp: Comp) => Comp extends ComponentClass<infer Props> | StatelessComponent<infer Props> ? ComponentClass<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps>>> | StatelessComponent<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps>>> : never;
        };
    };
    plugShort: () => <OwnProps = {}>() => <StateProps = State, DispatchProps = {
        dispatch: Redutser.Dispatcher<ReturnType<{ [K in keyof Redutsers]: (payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
            type: K;
            payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never;
        }; }[keyof Redutsers]>, State>;
    }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Redutser.Dispatcher<ReturnType<{ [K in keyof Redutsers]: (payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<Redutsers, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof Redutsers]>, State>) => DispatchProps) => <Comp extends ComponentClass<StateProps & DispatchProps & OwnProps> | StatelessComponent<StateProps & DispatchProps & OwnProps>>(comp: Comp) => Comp extends ComponentClass<infer Props> | StatelessComponent<infer Props> ? ComponentClass<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps | keyof OwnProps>> & OwnProps> | StatelessComponent<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps | keyof OwnProps>> & OwnProps> : never;
    __redutser__: boolean;
    _reducerDict: ReducerDictFromRedutserDict<Redutsers, State>;
};
export declare function combineRedutsers<State, RedDict extends Exactify<{
    [k in keyof State]?: RedutserShort<State[k], any>;
}, RedDict>>(initialState: State, redutsers: RedDict): {
    creators: { [RedK in keyof RedDict]: { [ACKey in keyof { [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }[RedK]["creators"]]: { [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }[RedK]["creators"][ACKey] extends (i: infer K) => infer V ? (i: K) => {
        type: RedK;
        payload: V;
    } : never; }; };
    reducer: (state: State | undefined, action: ReturnType<{ [K in keyof RedDict]: (payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof RedDict]>) => State;
    initialState: State;
    actionTypes: ReturnType<{ [K in keyof RedDict]: (payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof RedDict]>;
    plug: () => {
        ownProps: <OwnProps = {}>() => {
            mapProps: <StateProps = State, DispatchProps = {
                dispatch: Redutser.Dispatcher<ReturnType<{ [K in keyof RedDict]: (payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
                    type: K;
                    payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never;
                }; }[keyof RedDict]>, State>;
            }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Redutser.Dispatcher<ReturnType<{ [K in keyof RedDict]: (payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
                type: K;
                payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never;
            }; }[keyof RedDict]>, State>) => DispatchProps) => {
                component: <Comp extends ComponentClass<StateProps & DispatchProps & OwnProps> | StatelessComponent<StateProps & DispatchProps & OwnProps>>(comp: Comp) => Comp extends ComponentClass<infer Props> | StatelessComponent<infer Props> ? ComponentClass<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps | keyof OwnProps>> & OwnProps> | StatelessComponent<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps | keyof OwnProps>> & OwnProps> : never;
            };
        };
        mapProps: <StateProps = State, DispatchProps = {
            dispatch: Redutser.Dispatcher<ReturnType<{ [K in keyof RedDict]: (payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
                type: K;
                payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never;
            }; }[keyof RedDict]>, State>;
        }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Redutser.Dispatcher<ReturnType<{ [K in keyof RedDict]: (payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
            type: K;
            payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never;
        }; }[keyof RedDict]>, State>) => DispatchProps) => {
            component: <Comp extends ComponentClass<StateProps & DispatchProps & {}> | StatelessComponent<StateProps & DispatchProps & {}>>(comp: Comp) => Comp extends ComponentClass<infer Props> | StatelessComponent<infer Props> ? ComponentClass<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps>>> | StatelessComponent<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps>>> : never;
        };
    };
    plugShort: () => <OwnProps = {}>() => <StateProps = State, DispatchProps = {
        dispatch: Redutser.Dispatcher<ReturnType<{ [K in keyof RedDict]: (payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
            type: K;
            payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never;
        }; }[keyof RedDict]>, State>;
    }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Redutser.Dispatcher<ReturnType<{ [K in keyof RedDict]: (payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never) => {
        type: K;
        payload: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>[K] extends (x: any, y: infer V) => any ? V : never;
    }; }[keyof RedDict]>, State>) => DispatchProps) => <Comp extends ComponentClass<StateProps & DispatchProps & OwnProps> | StatelessComponent<StateProps & DispatchProps & OwnProps>>(comp: Comp) => Comp extends ComponentClass<infer Props> | StatelessComponent<infer Props> ? ComponentClass<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps | keyof OwnProps>> & OwnProps> | StatelessComponent<Pick<Props, Exclude<keyof Props, keyof StateProps | keyof DispatchProps | keyof OwnProps>> & OwnProps> : never;
    __redutser__: boolean;
    _reducerDict: ReducerDictFromRedutserDict<{ [k in keyof RedDict]: RedDict[k] extends Redutser<any, any> ? Redutser<State, { [DictKey in keyof (RedDict[k] extends Redutser<any, infer D> ? D : never)]: (RedDict[k] extends Redutser<any, infer D> ? D : never)[DictKey] extends (s: any, p: infer P) => any ? (s: State, p: P) => State : never; }> : never; }, State>;
};
