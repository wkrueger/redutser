import { connect } from "react-redux";
export const plugShort = (redutser) => () => (stateMapper = state => state, dispatchMapper = dispatch => ({ dispatch })) => {
    return connect(stateMapper, dispatchMapper);
};
export const plug = (redutser) => {
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
    const component = connect(stateMapper, dispatchMapper);
    return { component };
};
