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

export function redutser<State, Dict extends ReducerDict<State>>(
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
    __redutser__: true,
    _reducerDict: reducerDict,
    creators,
    reducer,
    actionTypes: (undefined as any) as ActionTypesFromReducerDict<Dict>,
  }
}

// copy-pasted, maybe helps something
export interface Redutser<State, Dict extends ReducerDict<State>> {
  __redutser__: boolean
  _reducerDict: Dict
  creators: ActionCreatorsFromReducerDict<Dict>
  reducer: (
    state: State | undefined,
    action: H.FnReturn<ActionCreatorsFromReducerDict<Dict>[keyof Dict]>
  ) => State
  actionTypes: ActionTypesFromReducerDict<Dict>
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

/**
 * Initial state is recommended. But sometimes you just want to write an inner reducer,
 * so use this function for that case.
 */
export function innerRedutser<State>() {
  // "curried style" is because either TS infers all, either you supply all
  // there seems no way to provide a middle ground.
  return <Actions extends ReducerDict<State>>(actionsMap: Actions) =>
    redutser((undefined as any) as State, actionsMap)
}
