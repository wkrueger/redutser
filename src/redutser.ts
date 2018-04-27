import * as H from "../type-helpers"

export type Reducer<State, Payload = any> = (s: State, p: Payload) => State

export type ReducerDict<State> = {
  [name: string]: Reducer<State>
}

export type ActionCreatorsFromReducerDict<Inp extends ReducerDict<any>> = {
  [K in keyof Inp]: (
    payload: H.SecondArg<Inp[K]>
  ) => { type: K; payload: H.SecondArg<Inp[K]> }
}

export type ActionTypesFromReducerDict<
  Inp extends ReducerDict<any>
> = H.FnReturn<H.Values<ActionCreatorsFromReducerDict<Inp>>>

export function createRedutser<State, Dict extends ReducerDict<State>>(
  initialState: State,
  reducerDict: Dict
): Redutser<State, Dict> {
  const creators = _actionCreatorsFromReducerDict()(reducerDict)

  function reducer(
    state = initialState,
    action: ActionTypesFromReducerDict<Dict>
  ): State {
    if (initialState === undefined) {
      console.error("redutser unexpected: undefined state.")
    }

    const handler = reducerDict[action.type]
    if (handler) {
      return handler(state, action.payload)
    } else if (String(action.type).substr(0, 2) !== "@@") {
      console.error(
        "redutser unexpected: handler not found for action",
        action.type
      )
    }
    return state
  }

  return {
    creators,
    reducer,
    initialState,
    actionTypes: (undefined as any) as ActionTypesFromReducerDict<Dict>,
    __redutser__: true,
    _reducerDict: reducerDict,
  }
}

// copy-pasted, maybe helps something
export interface Redutser<State, Dict extends ReducerDict<State>> {
  creators: ActionCreatorsFromReducerDict<Dict>
  reducer: (
    state: State | undefined,
    action: H.FnReturn<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>
  ) => State
  initialState: State
  actionTypes: ActionTypesFromReducerDict<Dict>
  __redutser__: boolean
  _reducerDict: Dict
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
