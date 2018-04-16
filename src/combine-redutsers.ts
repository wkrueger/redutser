import { Reducer, Redutser, ReducerDict, innerRedutser } from "./redutser"

type MapperGroup<StateInner, StateOuter> = {
  mapToInner: (s: StateOuter) => StateInner
  mapToOuter: (s: StateInner, out: StateOuter) => StateOuter
}

const mapToKey = <Outer>() => <K extends keyof Outer>(
  key: K
): MapperGroup<Outer[K], Outer> => ({
  mapToInner: (s: Outer) => s[key],
  mapToOuter: (sin: Outer[K], sout: Outer) => ({
    ...(sout as any),
    [key]: sin,
  }),
})

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

export type Convert<Red, UpperState> = Red extends Reducer<any, infer P>
  ? Reducer<UpperState, P>
  : never

export type ApplyToDict<Dict extends ReducerDict<any>, StateOuter> = {
  [DictKey in keyof Dict]: Convert<Dict[DictKey], StateOuter>
}

export const applyToDict = <StateOuter>() => <
  Dict extends ReducerDict<StateOuter>
>(
  dict: Dict,
  mapKey: keyof StateOuter
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
  ) as ApplyToDict<Dict, StateOuter>
}

export const applyToRedutser = <StateOuter>() => <
  R extends Redutser<StateOuter[K], any>,
  K extends keyof StateOuter
>(
  redutser: R,
  key: K
) => {
  const dict = redutser._reducerDict
  const dictMapped = applyToDict<StateOuter>()(dict, key)
  return innerRedutser<StateOuter>()(dictMapped)
}
