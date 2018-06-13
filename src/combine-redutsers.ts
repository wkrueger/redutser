import {
  Reducer,
  Redutser,
  RedutserShort,
  createRedutser,
  ReducerDict,
} from "./redutser"

/**
 * A pair of functions that handle the state conversion in and out.
 */
type MapperGroup<StateInner, StateOuter> = {
  mapToInner: (s: StateOuter) => StateInner
  mapToOuter: (s: StateInner, out: StateOuter) => StateOuter
}

/**
 * An implementation of the above pair.
 */
const mapToKey = <Outer>() => <K extends keyof Outer>(
  key: K
): MapperGroup<Outer[K], Outer> => ({
  mapToInner: (s: Outer) => s[key],
  mapToOuter: (sin: Outer[K], sout: Outer) => ({
    ...(sout as any),
    [key]: sin,
  }),
})

/**
 * Gets a reducer.
 * Returns a new reducer with its state "lifted" from the original,
 * according to the mapper pair.
 */
const mapReducerState = <StateOuter>() => <
  Mapper extends MapperGroup<StateInner, StateOuter>,
  StateInner
>(
  mapper: Mapper
) => {
  return <InReducer extends Reducer<StateInner, Payload>, Payload>(
    reducer: InReducer
  ): Reducer<StateOuter, Payload> => {
    return (stateOuter, p) =>
      mapper.mapToOuter(reducer(mapper.mapToInner(stateOuter), p), stateOuter)
  }
}

export type ReplaceReducerState<Red, UpperState> = Red extends Reducer<
  any,
  infer P
>
  ? Reducer<UpperState, P>
  : never

export type ReplaceDictState<Dict extends ReducerDict<any>, StateOuter> = {
  [DictKey in keyof Dict]: ReplaceReducerState<Dict[DictKey], StateOuter>
}

/**
 * Applies "mapToKey" to a key-value pair (ReducerDict), returning a new Dict.
 */
export const liftDictState = <StateOuter>() => <
  K extends keyof StateOuter,
  Dict extends ReducerDict<StateOuter[K]>
>(
  mapKey: K,
  dict: Dict
) => {
  return Object.keys(dict).reduce(
    (out, dictKey) => {
      const mapObj: any = mapToKey<any>()(mapKey)
      return {
        ...out,
        [dictKey]: mapReducerState()(mapObj)(dict[dictKey] as any),
      }
    },
    {} as any
  ) as ReplaceDictState<Dict, StateOuter>
}

export type DictOfRedutser<R> = R extends Redutser<any, infer D> ? D : never

/*
export type LiftRedutserState<
  OuterState,
  Key extends keyof OuterState,
  Red extends Redutser<OuterState[Key], any>
> = Redutser<OuterState, ReplaceDictState<DictOfRedutser<Red>, OuterState>>
*/

export type LiftRedutserState<
  State,
  Red extends Redutser<any, any> | undefined
> = Redutser<State, ReplaceDictState<DictOfRedutser<Red>, State>>

/**
 * "Lifts up" the state of a redutser.
 */
export const liftRedutserState = <
  OuterState,
  K extends keyof OuterState,
  R extends RedutserShort<OuterState[K], any>
>(
  state: OuterState,
  key: K,
  _red: R
) => {
  const dictMapped = liftDictState<OuterState>()(
    key,
    //this might feel a bit hacky but thats what worked better wth the inference atm
    //a previous less "hacky" approach brought inference issues.
    _red._reducerDict as DictOfRedutser<R>
  )
  return createRedutser(state, dictMapped)
}
