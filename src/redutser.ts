import * as T from "../type-helpers"

export type ReducerDict<State> = {
  [name: string]: (state: State, p: any) => State
}

export type ActionCreatorsFromReducerDict<Inp extends ReducerDict<any>> = {
  [K in keyof Inp]: (
    payload: T.SecondArg<Inp[K]>
  ) => { type: K; payload: T.SecondArg<Inp[K]> }
}

export type ActionTypesFromReducerDict<
  Inp extends ReducerDict<any>
> = T.FnReturn<T.Values<ActionCreatorsFromReducerDict<Inp>>>

export function redutser<State, Dict extends ReducerDict<State>>(
  initialState: State,
  actionsMap: Dict
): Redutser<State, Dict> {
  const creators = _actionCreatorsFromReducerDict()(actionsMap)

  function reducer(
    state = initialState,
    action: ActionTypesFromReducerDict<Dict>
  ): State {
    if (initialState === undefined) {
      console.error("redutser unexpected: undefined state.")
    }

    const handler = actionsMap[action.type]
    if (handler) {
      return handler(state, action.payload)
    } else {
      console.error(
        "redutser unexpected: handler not found for action",
        action.type
      )
    }
    return state
  }

  return {
    __redutser__: true,
    creators,
    reducer,
    actionTypes: (undefined as any) as ActionTypesFromReducerDict<Dict>,
  }
}

// copy-pasted, maybe helps something
export interface Redutser<State, ActionsMap extends ReducerDict<State>> {
  __redutser__: boolean
  creators: ActionCreatorsFromReducerDict<ActionsMap>
  reducer: (
    state: State | undefined,
    action: T.FnReturn<
      ActionCreatorsFromReducerDict<ActionsMap>[keyof ActionsMap]
    >
  ) => State
  actionTypes: ActionTypesFromReducerDict<ActionsMap>
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
