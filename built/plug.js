"use strict";
exports.__esModule = true;
var react_redux_1 = require("react-redux");
exports.plugShort = function (redutser) { return function () { return function (stateMapper, dispatchMapper) {
    if (stateMapper === void 0) { stateMapper = function (state) { return state; }; }
    if (dispatchMapper === void 0) { dispatchMapper = function (dispatch) { return ({ dispatch: dispatch }); }; }
    return react_redux_1.connect(stateMapper, dispatchMapper);
}; }; };
/*
export const plug = <Red extends Redutser<any, any>>(redutser: Red) => {
  return {
    ownProps: <OwnProps = {}>() => {
      return {
        mapProps: <
          StateProps = Red["initialState"],
          DispatchProps = {
            dispatch: Redutser.DefaultDispatcher<
              Red["actionTypes"],
              Red["initialState"]
            >
          }
        >(
          stateMapper: (state: Red["initialState"]) => StateProps = state =>
            state,
          dispatchMapper: (
            dispatcher: Redutser.DefaultDispatcher<
              Red["actionTypes"],
              Red["initialState"]
            >
          ) => DispatchProps = dispatch => ({ dispatch } as any)
        ): {
          component: ComponentEnhancer<
            StateProps & DispatchProps & OwnProps,
            OwnProps
          >
        } => {
          const component = (connect as any)(stateMapper, dispatchMapper as any)
          return { component }
        },
      }
    },
  }
}
*/
exports.plug = function (redutser) {
    return {
        ownProps: ownProps(),
        mapProps: mapProps()
    };
};
var ownProps = function () { return function () {
    return {
        mapProps: mapProps()
    };
}; };
var mapProps = function () { return function (stateMapper, dispatchMapper) {
    if (stateMapper === void 0) { stateMapper = function (state) { return state; }; }
    if (dispatchMapper === void 0) { dispatchMapper = function (dispatch) { return ({ dispatch: dispatch }); }; }
    var component = react_redux_1.connect(stateMapper, dispatchMapper);
    return { component: component };
}; };
