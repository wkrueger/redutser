import { ComponentEnhancer } from "../type-helpers"
import { connect } from "react-redux"
import { RedutserShort as Redutser } from "./redutser"

export const plugShort = <Red extends Redutser<any, any>>(redutser: Red) => <
  OwnProps = {}
>() => <
  StateProps = Red["initialState"],
  DispatchProps = {
    dispatch: Red_Dispatcher<Red["actionTypes"], Red["initialState"]>
  }
>(
  stateMapper: (state: Red["initialState"]) => StateProps = state => state,
  dispatchMapper: (
    dispatcher: Red_Dispatcher<Red["actionTypes"], Red["initialState"]>
  ) => DispatchProps = dispatch => ({ dispatch } as any)
): ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps> => {
  return (connect as any)(stateMapper, dispatchMapper as any)
}

export const plug = <Red extends Redutser<any, any>>(redutser: Red) => {
  return {
    ownProps: ownProps<Red>(),
    mapProps: mapProps<Red, {}>(),
  }
}

const ownProps = <Red extends Redutser<any, any>>() => <OwnProps = {}>() => {
  return {
    mapProps: mapProps<Red, OwnProps>(),
  }
}

const mapProps = <Red extends Redutser<any, any>, OwnProps = {}>() => <
  StateProps = Red["initialState"],
  DispatchProps = {
    dispatch: Red_Dispatcher<Red["actionTypes"], Red["initialState"]>
  }
>(
  stateMapper: (state: Red["initialState"]) => StateProps = state => state,
  dispatchMapper: (
    dispatcher: Red_Dispatcher<Red["actionTypes"], Red["initialState"]>
  ) => DispatchProps = dispatch => ({ dispatch } as any)
): {
  component: ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>
} => {
  const component = (connect as any)(stateMapper, dispatchMapper as any)
  return { component }
}
