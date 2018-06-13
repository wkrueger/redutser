import React from "react"
import { createRedutser } from "../built"
import { createStore } from "redux"
import { Provider } from "react-redux"
import renderer from "react-test-renderer"

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

test("Plug 1", () => {
  const store = createStore(red.reducer)
  const Plugged = red
    .plug()
    .mapProps()
    .component(props => {
      return (
        <div onClick={() => props.dispatch(creators.doNothing({}))}>
          a: {props.a}
          b: {props.b}
        </div>
      )
    })

  const tree = renderer
    .create(
      <Provider store={store as any}>
        <Plugged />
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test("Plug 2", () => {
  const store = createStore(red.reducer)
  const Plugged = red
    .plug()
    .ownProps<{ myOwnProp: string }>()
    .mapProps(
      state => ({ b: state.b }),
      dispatch => ({
        increment: (n: number) => dispatch(creators.increment(n)),
      })
    )
    .component(props => {
      // expect error props.a
      return (
        <div onClick={() => props.increment(3)}>
          a: {props.b}
          ownProp: {props.myOwnProp}
        </div>
      )
    })
  const tree = renderer
    .create(
      <Provider store={store as any}>
        <Plugged myOwnProp="own" />
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test("Plug 3", () => {
  const store = createStore(red.reducer)
  const Plugged = red
    .plug()
    .mapProps(state => ({ a: state.a }))
    .component(props => {
      return (
        <div onClick={() => props.dispatch(red.creators.doNothing({}))}>
          a: {props.a}
        </div>
      )
    })
  const tree = renderer
    .create(
      <Provider store={store as any}>
        <Plugged />
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test("PlugShort 1", () => {
  const store = createStore(red.reducer)
  const Plugged = red.plugShort()<{ myOwnProp: string }>()(
    state => ({ b: state.b }),
    dispatch => ({
      increment: (n: number) => dispatch(creators.increment(n)),
    })
  )(props => {
    return (
      <div onClick={() => props.increment(3)}>
        a: {props.b}
        ownProp: {props.myOwnProp}
      </div>
    )
  })
  const tree = renderer
    .create(
      <Provider store={store as any}>
        <Plugged myOwnProp="own" />
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
