import { redutser } from "./redutser"
import { subdomain, combineRedutsers } from "./subdomain"
import { createStore } from "redux"
import { liftRedutserState } from "./combine-redutsers"

const initialState = {
  a: 1,
  b: "b",
  c: undefined as undefined | { name: string; energy: number },
  d: undefined as undefined | { name: string; meows: boolean },
}

// 1 and 2 share the same state
const red1 = redutser(initialState, {
  increment: (state, count: number) => ({
    ...state,
    a: state.a + count,
  }),
  concat: (state, act: { text: string }) => ({
    ...state,
    b: state.b + act.text,
  }),
  doNothing: state => state,
})
const red2 = redutser(initialState, {
  reset: () => initialState,
})

// 3 and 4 work on "substates"
const red3 = redutser(initialState.c, {
  initDog: (state, name: string) => state || { name, energy: 50 },
  bark: (state, strength: "low" | "loud") =>
    state && {
      ...state,
      energy: strength == "low" ? state.energy - 2 : state.energy - 5,
    },
})

const red4 = redutser(initialState.d, {
  initCat: (state, name: string) => state || { name, meows: true },
})

describe("Subdomain", () => {
  const subd = subdomain(initialState, { red1, red2 })

  test("Check action formats", () => {
    const genActions = [
      subd.creators.red1.increment(2),
      subd.creators.red2.reset({}),
    ]
    const expActions = [
      { type: "red1", payload: { type: "increment", payload: 2 } },
      { type: "red2", payload: { type: "reset", payload: {} } },
    ]
    ;[1, 2].forEach(key => {
      const gen = genActions[key]
      const exp = expActions[key]
      expect(gen).toEqual(exp)
    })
  })

  test("Check reducer output", () => {
    const store = createStore(subd.reducer)
    expect(store.getState()).toEqual(initialState)

    store.dispatch(subd.creators.red1.increment(2))
    expect(store.getState()).toEqual({ a: 3, b: "b" })

    store.dispatch(subd.creators.red2.reset({}))
    expect(store.getState()).toEqual(initialState)
  })
})

describe("Move redutser scope up", () => {
  const scopeup = liftRedutserState(initialState, "c", red3)

  test("Check action format", () => {
    const genAction = scopeup.creators.bark("low")
    const expAction = { type: "bark", payload: "low" }
    expect(genAction).toEqual(expAction)
  })

  test("Check reducer output", () => {
    const store = createStore(scopeup.reducer)
    expect(store.getState()).toEqual(initialState)

    store.dispatch(scopeup.creators.bark("loud"))
    expect(store.getState()).toEqual(initialState)

    store.dispatch(scopeup.creators.initDog("Rex"))
    expect(store.getState()).toEqual({
      a: 1,
      b: "b",
      c: { name: "Rex", energy: 50 },
    })

    store.dispatch(scopeup.creators.bark("loud"))
    expect(store.getState()).toEqual({
      a: 1,
      b: "b",
      c: { name: "Rex", energy: 45 },
    })
  })
})

describe("Equivalent", () => {
  const equivalent = subdomain(initialState, {
    c: liftRedutserState(initialState, "c", red3),
    d: liftRedutserState(initialState, "d", red4),
  })

  test("Check action format", () => {
    expect(equivalent.creators.c.bark("low")).toEqual({
      type: "c",
      payload: {
        type: "bark",
        payload: "low",
      },
    })
    expect(equivalent.creators.d.initCat("bob")).toEqual({
      type: "d",
      payload: {
        type: "initCat",
        payload: "bob",
      },
    })
  })

  test("Check reducer output", () => {
    const store = createStore(equivalent.reducer)
    expect(store.getState()).toEqual(initialState)

    store.dispatch(equivalent.creators.c.bark("loud"))
    expect(store.getState()).toEqual(initialState)

    store.dispatch(equivalent.creators.c.initDog("Rex"))
    expect(store.getState()).toEqual({
      a: 1,
      b: "b",
      c: { name: "Rex", energy: 50 },
    })

    store.dispatch(equivalent.creators.c.bark("loud"))
    expect(store.getState()).toEqual({
      a: 1,
      b: "b",
      c: { name: "Rex", energy: 45 },
    })
  })
})

describe("CombineRedutsers", () => {
  const equivalent = combineRedutsers(initialState, {
    c: red3,
    d: red4,
  })

  test("Check action format", () => {
    expect(equivalent.creators.c.bark("low")).toEqual({
      type: "c",
      payload: {
        type: "bark",
        payload: "low",
      },
    })
    expect(equivalent.creators.d.initCat("bob")).toEqual({
      type: "d",
      payload: {
        type: "initCat",
        payload: "bob",
      },
    })
  })

  test("Check reducer output", () => {
    const store = createStore(equivalent.reducer)
    expect(store.getState()).toEqual(initialState)

    store.dispatch(equivalent.creators.c.bark("loud"))
    expect(store.getState()).toEqual(initialState)

    store.dispatch(equivalent.creators.c.initDog("Rex"))
    expect(store.getState()).toEqual({
      a: 1,
      b: "b",
      c: { name: "Rex", energy: 50 },
    })

    store.dispatch(equivalent.creators.c.bark("loud"))
    expect(store.getState()).toEqual({
      a: 1,
      b: "b",
      c: { name: "Rex", energy: 45 },
    })
  })
})
