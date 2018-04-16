import { redutser } from "./redutser"
import { subdomain } from "./subdomain"
import { createStore } from "redux"
import { applyToRedutser } from "./helper"

const initialState1 = {
  a: 1,
  b: "b",
  c: undefined as undefined | { name: string; energy: number },
}

function createSomething() {
  return redutser(initialState1, {
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
}

function fromSameDomain() {
  return redutser(initialState1, {
    reset: () => initialState1,
  })
}

function createAnotherThing() {
  const initialState = { name: "Dog", energy: 57 }
  return redutser(initialState, {
    bark: (state, strength: "low" | "loud") => ({
      ...state,
      energy: strength == "low" ? state.energy - 2 : state.energy - 5,
    }),
  })
}

const red1 = createSomething()
const red2 = fromSameDomain()
const red3 = createAnotherThing()

describe("Subdomain", () => {
  const subd = subdomain(initialState1, { red1, red2 })

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
    expect(store.getState()).toEqual(initialState1)

    store.dispatch(subd.creators.red1.increment(2))
    expect(store.getState()).toEqual({ a: 3, b: "b" })

    store.dispatch(subd.creators.red2.reset({}))
    expect(store.getState()).toEqual(initialState1)
  })
})

describe("Combine reducers", () => {
  const mapped = applyToRedutser<typeof initialState1>()(red3, "c")
})
