"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
exports.plugShort = (redutser) => () => (stateMapper = state => state, dispatchMapper = dispatch => ({ dispatch })) => {
    return react_redux_1.connect(stateMapper, dispatchMapper);
};
exports.plug = (redutser) => {
    return {
        ownProps: ownProps(),
        mapProps: mapProps(),
    };
};
const ownProps = () => () => {
    return {
        mapProps: mapProps(),
    };
};
const mapProps = () => (stateMapper = state => state, dispatchMapper = dispatch => ({ dispatch })) => {
    const component = react_redux_1.connect(stateMapper, dispatchMapper);
    return { component };
};
