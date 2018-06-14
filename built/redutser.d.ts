import * as H from "../type-helpers";
export declare type Reducer<State, Payload = any> = (s: State, p: Payload) => State;
export declare type ReducerDict<State> = {
    [name: string]: (s: State, p: any) => State;
};
export declare type ActionCreatorsFromReducerDict<Inp extends ReducerDict<any>> = {
    [K in keyof Inp]: (payload: H.SecondArg<Inp[K]>) => {
        type: K;
        payload: H.SecondArg<Inp[K]>;
    };
};
export declare type ActionTypesFromReducerDict<Inp extends ReducerDict<any>> = ReturnType<H.Values<ActionCreatorsFromReducerDict<Inp>>>;
export declare const createRedutser2: <State>(initialState: State) => <Dict extends ReducerDict<State>>(reducerDict: Dict) => {
    creators: ActionCreatorsFromReducerDict<Dict>;
    reducer: (state: State | undefined, action: ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>) => State;
    initialState: State;
    actionTypes: ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>;
    plug: () => {
        ownProps: <OwnProps = {}>() => {
            mapProps: <StateProps = State, DispatchProps = {
                dispatch: Red_Dispatcher<ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>, State>;
            }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>, State>) => DispatchProps) => {
                component: H.ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>;
            };
        };
        mapProps: <StateProps = State, DispatchProps = {
            dispatch: Red_Dispatcher<ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>, State>;
        }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>, State>) => DispatchProps) => {
            component: H.ComponentEnhancer<StateProps & DispatchProps & {}, {}>;
        };
    };
    plugShort: () => <OwnProps = {}>() => <StateProps = State, DispatchProps = {
        dispatch: Red_Dispatcher<ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>, State>;
    }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>, State>) => DispatchProps) => H.ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>;
    __redutser__: boolean;
    _reducerDict: Dict;
};
export declare const createRedutser: <State, Dict extends ReducerDict<State>>(initialState: State, reducerDict: Dict) => {
    creators: ActionCreatorsFromReducerDict<Dict>;
    reducer: (state: State | undefined, action: ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>) => State;
    initialState: State;
    actionTypes: ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>;
    plug: () => {
        ownProps: <OwnProps = {}>() => {
            mapProps: <StateProps = State, DispatchProps = {
                dispatch: Red_Dispatcher<ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>, State>;
            }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>, State>) => DispatchProps) => {
                component: H.ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>;
            };
        };
        mapProps: <StateProps = State, DispatchProps = {
            dispatch: Red_Dispatcher<ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>, State>;
        }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>, State>) => DispatchProps) => {
            component: H.ComponentEnhancer<StateProps & DispatchProps & {}, {}>;
        };
    };
    plugShort: () => <OwnProps = {}>() => <StateProps = State, DispatchProps = {
        dispatch: Red_Dispatcher<ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>, State>;
    }>(stateMapper?: (state: State) => StateProps, dispatchMapper?: (dispatcher: Red_Dispatcher<ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>, State>) => DispatchProps) => H.ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>;
    __redutser__: boolean;
    _reducerDict: Dict;
};
export interface Redutser<State, Dict extends ReducerDict<State>> {
    creators: ActionCreatorsFromReducerDict<Dict>;
    reducer: (state: State | undefined, action: ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>) => State;
    initialState: State;
    actionTypes: ActionTypesFromReducerDict<Dict>;
    __redutser__: boolean;
    _reducerDict: Dict;
}
export interface RedutserShort<State, ActionTypes> {
    __redutser__: boolean;
    initialState: State;
    actionTypes: ActionTypes;
    creators: any;
    reducer: (state: State, action: ActionTypes) => State;
    _reducerDict: ReducerDict<State>;
}
