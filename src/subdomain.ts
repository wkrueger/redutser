import { createRedutser, Redutser } from "./redutser"
import { liftRedutserState, LiftRedutserState } from "./combine-redutsers"
import { Exactify } from "../type-helpers"

export type RedutserDict<State> = {
  [k: string]: Redutser<State, any>
}

export type ReducerDictFromRedutserDict<
  Inp extends RedutserDict<State>,
  State
> = {
  [K in keyof Inp]: (state: State, payload: Inp[K]["actionTypes"]) => State
}

type AdaptedAcFunction<T, Wrapper> = T extends (i: infer K) => infer V
  ? (i: K) => { type: Wrapper; payload: V }
  : never

type SubdomainActionCreators<
  State,
  Redutsers extends { [RedK in keyof Redutsers]: Redutser<State, any> }
> = {
  [RedK in keyof Redutsers]: {
    [ACKey in keyof Redutsers[RedK]["creators"]]: AdaptedAcFunction<
      Redutsers[RedK]["creators"][ACKey],
      RedK
    >
  }
}

/**
 * "Composes" many redutsers which share the same state.
 */
export function subdomain<State, Redutsers extends RedutserDict<State>>(
  initialState: State,
  redutsers: Redutsers
) {
  const reducerDict = _reducerDictFromRedutserDict<State>()(redutsers)
  const out = createRedutser(initialState, reducerDict)
  const creators = Object.keys(redutsers).reduce(
    (reduced, key) => ({
      ...reduced,
      [key]: Object.keys(redutsers[key].creators).reduce(
        (o2, k2) => ({
          ...o2,
          [k2]: (i: any) => ({
            type: key,
            payload: redutsers[key].creators[k2](i),
          }),
        }),
        {} as any
      ),
    }),
    {}
  ) as SubdomainActionCreators<State, Redutsers>
  return {
    ...out,
    creators,
  }
}

function _reducerDictFromRedutserDict<State>() {
  return function<D extends RedutserDict<any>>(
    dict: D
  ): ReducerDictFromRedutserDict<D, State> {
    return Object.keys(dict).reduce(
      (out, key) => ({
        ...out,
        [key]: (state: any, act: any) => dict[key].reducer(state, act),
      }),
      {}
    ) as any
  }
}

// https://stackoverflow.com/questions/49858826/mapped-types-function-parameters-enigma/49868362
// thank you!
export function combineRedutsers<
  State,
  RedDict extends Exactify<
    { [k in keyof State]?: Redutser<State[k], any> },
    RedDict
  >
>(initialState: State, redutsers: RedDict) {
  const lifted = Object.keys(redutsers).reduce(
    (out, key: any) => {
      return {
        ...out,
        [key]: liftRedutserState(initialState, key, (redutsers as any)[key]),
      }
    },
    {} as any
  ) as {
    [k in keyof RedDict]: RedDict[k] extends Redutser<any, any>
      ? LiftRedutserState<State, RedDict[k]>
      : never
  }

  return subdomain(initialState, lifted)
}
