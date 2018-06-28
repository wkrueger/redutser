import { ComponentEnhancer } from "../type-helpers"
import { RedutserShort as Redutser } from "./redutser"
declare var require: (s: string) => any

export const plugShort = <Red extends Redutser<any, any>>(redutser: Red) => <
  OwnProps = {}
>() => <
  StateProps = Red["initialState"],
  DispatchProps = {
    dispatch: Redutser.Dispatcher<Red["actionTypes"], Red["initialState"]>
  }
>(
  stateMapper: (state: Red["initialState"]) => StateProps = state => state,
  dispatchMapper: (
    dispatcher: Redutser.Dispatcher<Red["actionTypes"], Red["initialState"]>
  ) => DispatchProps = dispatch => ({ dispatch } as any)
): ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps> => {
  const connect = require("react-redux").connect
  return connect(
    stateMapper,
    dispatchMapper as any
  )
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
    dispatch: Redutser.Dispatcher<Red["actionTypes"], Red["initialState"]>
  }
>(
  stateMapper: (state: Red["initialState"]) => StateProps = state => state,
  dispatchMapper: (
    dispatcher: Redutser.Dispatcher<Red["actionTypes"], Red["initialState"]>
  ) => DispatchProps = dispatch => ({ dispatch } as any)
): {
  component: ComponentEnhancer<StateProps & DispatchProps & OwnProps, OwnProps>
} => {
  const connect = require("react-redux").connect
  const component = connect(
    stateMapper,
    dispatchMapper as any
  )
  return { component }
}
