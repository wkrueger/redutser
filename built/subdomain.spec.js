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
var combine_redutsers_1 = require("./combine-redutsers");
var initialState = {
    a: 1,
    b: "b",
    c: undefined,
    d: undefined
};
// 1 and 2 share the same state
var red1 = redutser_1.redutser(initialState, {
    increment: function (state, count) { return (__assign({}, state, { a: state.a + count })); },
    concat: function (state, act) { return (__assign({}, state, { b: state.b + act.text })); },
    doNothing: function (state) { return state; }
});
var red2 = redutser_1.redutser(initialState, {
    reset: function () { return initialState; }
});
// 3 and 4 work on "substates"
var red3 = redutser_1.redutser(initialState.c, {
    initDog: function (state, name) { return state || { name: name, energy: 50 }; },
    bark: function (state, strength) {
        return state && __assign({}, state, { energy: strength == "low" ? state.energy - 2 : state.energy - 5 });
    }
});
/*
const red4 = redutser(initialState.d, {
  initCat: (state, name: string) => state || { name, meows: true },
})*/
describe("Subdomain", function () {
    var subd = subdomain_1.subdomain(initialState, { red1: red1, red2: red2 });
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
        expect(store.getState()).toEqual(initialState);
        store.dispatch(subd.creators.red1.increment(2));
        expect(store.getState()).toEqual({ a: 3, b: "b" });
        store.dispatch(subd.creators.red2.reset({}));
        expect(store.getState()).toEqual(initialState);
    });
});
describe("Move redutser scope up", function () {
    var scopeup = combine_redutsers_1.liftRedutserState(initialState, "c", red3);
    test("Check action format", function () {
        var genAction = scopeup.creators.bark("low");
        var expAction = { type: "bark", payload: "low" };
        expect(genAction).toEqual(expAction);
    });
    test("Check reducer output", function () {
        var store = redux_1.createStore(scopeup.reducer);
        expect(store.getState()).toEqual(initialState);
        store.dispatch(scopeup.creators.bark("loud"));
        expect(store.getState()).toEqual(initialState);
        store.dispatch(scopeup.creators.initDog("Rex"));
        expect(store.getState()).toEqual({
            a: 1,
            b: "b",
            c: { name: "Rex", energy: 50 }
        });
        store.dispatch(scopeup.creators.bark("loud"));
        expect(store.getState()).toEqual({
            a: 1,
            b: "b",
            c: { name: "Rex", energy: 45 }
        });
    });
});
/*
describe("CombineRedutsers", () => {
  const combined = combineRedutsers(initialState, { c: red3, d: red4 })
  const subs = subdomain(initialState, {
    c: liftRedutserState(initialState, 'c', red3),
    d: liftRedutserState(initialState, 'd', red4),
  })


})
*/
