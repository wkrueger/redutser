import * as H from "../type-helpers"
import { plug, plugShort } from "./plug"

export type Reducer<State, Payload = any> = (s: State, p: Payload) => State

export type ReducerDict<State> = {
  [name: string]: (this: ReducerDict<State>, s: State, p: any) => State
}

export type ActionCreatorsFromReducerDict<Inp extends ReducerDict<any>> = {
  [K in keyof Inp]: (
    payload: H.SecondArg<Inp[K]>
  ) => { type: K; payload: H.SecondArg<Inp[K]> }
}

export type ActionTypesFromReducerDict<
  Inp extends ReducerDict<any>
> = ReturnType<H.Values<ActionCreatorsFromReducerDict<Inp>>>

export const createRedutser2 = <State>(initialState: State) => <
  Dict extends ReducerDict<State>
>(
  reducerDict: Dict
) /*: Redutser<State, Dict>*/ => {
  const creators = _actionCreatorsFromReducerDict()(reducerDict)

  const reducerWithInitializer = (initializer: State) => (
    state = initializer,
    action: ActionTypesFromReducerDict<Dict>
  ): State => {
    if (reducerDict[(action as any).type]) {
      return reducerDict[(action as any).type](state, (action as any).payload)
    }
    return state
  }

  const reducer = reducerWithInitializer(initialState)

  let output = {
    creators,
    reducer,
    reducerWithInitializer,
    initialState,
    actionTypes: (undefined as any) as ActionTypesFromReducerDict<Dict>,
    plug: () => plug(output),
    plugShort: () => plugShort(output),
    __redutser__: true,
    _reducerDict: reducerDict,
  }

  return output
}

export const createRedutser = <State, Dict extends ReducerDict<State>>(
  initialState: State,
  reducerDict: Dict
) => {
  return createRedutser2(initialState)(reducerDict)
}

// copy-pasted from the inferred return type
// this generates a precise type from the parameters
export interface Redutser<State, Dict extends ReducerDict<State>> {
  creators: ActionCreatorsFromReducerDict<Dict>
  reducer: (
    state: State | undefined,
    action: ReturnType<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>
  ) => State
  initialState: State
  actionTypes: ActionTypesFromReducerDict<Dict>
  __redutser__: boolean
  _reducerDict: Dict
}

// this is a less strict version used for checking, not
// to actually generating a precise type from the parameters
export interface RedutserShort<State, ActionTypes> {
  __redutser__: boolean
  initialState: State
  actionTypes: ActionTypes
  creators: any
  reducer: (state: State, action: ActionTypes) => State
  _reducerDict: ReducerDict<State>
}

function _actionCreatorsFromReducerDict() {
  return <D extends ReducerDict<any>>(
    dict: D
  ): ActionCreatorsFromReducerDict<D> => {
    return Object.keys(dict).reduce(
      (out, name) => ({
        ...out,
        [name]: (i: any) => ({ type: name, payload: i }),
      }),
      {}
    ) as any
  }
}
