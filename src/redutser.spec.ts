import { createRedutser } from "./redutser"
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
})
