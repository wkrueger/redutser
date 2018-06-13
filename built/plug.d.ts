import { ComponentEnhancer } from "../type-helpers";
import { RedutserShort as Redutser } from "./redutser";
export declare const plugShort: <Red extends Redutser<any, any>>(redutser: Red) => <OwnProps = {}>() => <StateProps = Red["initialState"], DispatchProps = {
    dispatch: Redutser.DefaultDispatcher<Red["actionTypes"], Red["initialState"]>;
}>(stateMapper?: (state: Red["initialState"]) => StateProps, dispatchMapper?: (dispatcher: Redutser.DefaultDispatcher<Red["actionTypes"], Red["initialState"]>) => DispatchProps) => ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>;
export declare const plug: <Red extends Redutser<any, any>>(redutser: Red) => {
    ownProps: <OwnProps = {}>() => {
        mapProps: <StateProps = Red["initialState"], DispatchProps = {
            dispatch: Redutser.DefaultDispatcher<Red["actionTypes"], Red["initialState"]>;
        }>(stateMapper?: (state: Red["initialState"]) => StateProps, dispatchMapper?: (dispatcher: Redutser.DefaultDispatcher<Red["actionTypes"], Red["initialState"]>) => DispatchProps) => {
            component: ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>;
        };
    };
    mapProps: <StateProps = Red["initialState"], DispatchProps = {
        dispatch: Redutser.DefaultDispatcher<Red["actionTypes"], Red["initialState"]>;
    }>(stateMapper?: (state: Red["initialState"]) => StateProps, dispatchMapper?: (dispatcher: Redutser.DefaultDispatcher<Red["actionTypes"], Red["initialState"]>) => DispatchProps) => {
        component: ComponentEnhancer<StateProps & DispatchProps & {}, {}>;
    };
};
