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
var subdomain_1 = require("./subdomain");
var redux_1 = require("redux");
var helper_1 = require("./helper");
var initialState1 = {
    a: 1,
    b: "b",
    c: undefined
};
function createSomething() {
    return redutser_1.redutser(initialState1, {
        increment: function (state, count) { return (__assign({}, state, { a: state.a + count })); },
        concat: function (state, act) { return (__assign({}, state, { b: state.b + act.text })); },
        doNothing: function (state) { return state; }
    });
}
function fromSameDomain() {
    return redutser_1.redutser(initialState1, {
        reset: function () { return initialState1; }
    });
}
function createAnotherThing() {
    var initialState = { name: "Dog", energy: 57 };
    return redutser_1.redutser(initialState, {
        bark: function (state, strength) { return (__assign({}, state, { energy: strength == "low" ? state.energy - 2 : state.energy - 5 })); }
    });
}
var red1 = createSomething();
var red2 = fromSameDomain();
var red3 = createAnotherThing();
describe("Subdomain", function () {
    var subd = subdomain_1.subdomain(initialState1, { red1: red1, red2: red2 });
    test("Check action formats", function () {
        var genActions = [
            subd.creators.red1.increment(2),
            subd.creators.red2.reset({}),
        ];
        var expActions = [
            { type: "red1", payload: { type: "increment", payload: 2 } },
            { type: "red2", payload: { type: "reset", payload: {} } },
        ];
        [1, 2].forEach(function (key) {
            var gen = genActions[key];
            var exp = expActions[key];
            expect(gen).toEqual(exp);
        });
    });
    test("Check reducer output", function () {
        var store = redux_1.createStore(subd.reducer);
        expect(store.getState()).toEqual(initialState1);
        store.dispatch(subd.creators.red1.increment(2));
        expect(store.getState()).toEqual({ a: 3, b: "b" });
        store.dispatch(subd.creators.red2.reset({}));
        expect(store.getState()).toEqual(initialState1);
    });
});
describe("Combine reducers", function () {
    var mapped = helper_1.applyToRedutser()(red3, "c");
});
