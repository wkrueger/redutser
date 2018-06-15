import { createRedutser, createRedutser2 } from "../built"
import { createStore } from "redux"

function createSomething() {
  const initialState = { a: 1, b: "b" }

  const red = createRedutser(initialState, {
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

  return red
}

const red = createSomething()
const creators = red.creators

describe("redutser", () => {
  test("Check action formats", () => {
    const genActions = [
      creators.increment(2),
      creators.concat({ text: "c" }),
      creators.doNothing({}),
    ]
    const expectActions = [
      { type: "increment", payload: 2 },
      { type: "concat", payload: { text: "c" } },
      { type: "doNothing", payload: {} },
    ]
    ;[1, 2, 3].forEach(key => {
      const gen = genActions[key]
      const exp = expectActions[key]
      expect(gen).toEqual(exp)
    })
  })

  test("Check reducer outputs", () => {
    const store = createStore(red.reducer)

    store.dispatch(creators.increment(2))
    expect(store.getState()).toEqual({ a: 3, b: "b" })

    store.dispatch(creators.concat({ text: "cc" }))
    expect(store.getState()).toEqual({ a: 3, b: "bcc" })

    store.dispatch(creators.doNothing({}))
    expect(store.getState()).toEqual({ a: 3, b: "bcc" })
  })

  test("Bind to self", () => {
    const initialState = { a: 1 }
    const red = createRedutser(initialState, {
      increment(state, act: { by: number }) {
        return {
          a: state.a + act.by,
        }
      },
      times(state, act: { by: number; times: number }) {
        return this.increment(state, { by: act.by * act.times })
      },
    })
    const store = createStore(red.reducer)
    store.dispatch(red.creators.times({ by: 2, times: 3 }))
    expect(store.getState()).toEqual({ a: 7 })
  })

  /*
  test("Effects", () => {
    const fx = red.createEffects({
      incrementManyTimes: (times: number) => async (dispatcher, getState) => {
        if (times) {
          dispatcher(red.creators.doNothing({}))
          dispatcher(red.creators.increment(getState().a))
        }
        await fx.incrementManyTimes(2)(dispatcher, getState)
      },
    })
  })*/
})
