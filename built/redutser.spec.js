"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var redutser_1 = require("./redutser");
var redux_1 = require("redux");
function createSomething() {
    var initialState = { a: 1, b: "b" };
    var red = redutser_1.createRedutser(initialState, {
        increment: function (state, count) { return (__assign({}, state, { a: state.a + count })); },
        concat: function (state, act) { return (__assign({}, state, { b: state.b + act.text })); },
        doNothing: function (state) { return state; }
    });
    return red;
}
var red = createSomething();
var creators = red.creators;
describe("redutser", function () {
    test("Check action formats", function () {
        var genActions = [
            creators.increment(2),
            creators.concat({ text: "c" }),
            creators.doNothing({}),
        ];
        var expectActions = [
            { type: "increment", payload: 2 },
            { type: "concat", payload: { text: "c" } },
            { type: "doNothing", payload: {} },
        ];
        [1, 2, 3].forEach(function (key) {
            var gen = genActions[key];
            var exp = expectActions[key];
            expect(gen).toEqual(exp);
        });
    });
    test("Check reducer outputs", function () {
        var store = redux_1.createStore(red.reducer);
        store.dispatch(creators.increment(2));
        expect(store.getState()).toEqual({ a: 3, b: "b" });
        store.dispatch(creators.concat({ text: "cc" }));
        expect(store.getState()).toEqual({ a: 3, b: "bcc" });
        store.dispatch(creators.doNothing({}));
        expect(store.getState()).toEqual({ a: 3, b: "bcc" });
    });
    test("bind to self", function () {
        var initialState = { a: 1 };
        redutser_1.createRedutser(initialState, {
            increment: function (state, act) {
                return {
                    a: state.a + act.by
                };
            },
            times: function (state, act) {
                return this.increment(state, { by: act.by * act.times });
            }
        });
    });
});
