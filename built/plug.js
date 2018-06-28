"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugShort = (redutser) => () => (stateMapper = state => state, dispatchMapper = dispatch => ({ dispatch })) => {
    const connect = require("react-redux").connect;
    return connect(stateMapper, dispatchMapper);
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
    const connect = require("react-redux").connect;
    const component = connect(stateMapper, dispatchMapper);
    return { component };
};
