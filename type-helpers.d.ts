export type SecondArg<T> = T extends (x: any, y: infer V) => any ? V : never
export type Values<K> = K[keyof K]
export type Just<T> = Omit<T, undefined>
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export type Exactify<T, X extends T> = T &
  { [K in keyof X]: K extends keyof T ? X[K] : never }

export type ChangeComponentProps<
  Comp,
  KeysToRemove = never,
  ShapeToAdd = {}
> = Comp extends React.ComponentType<infer Props>
  ? React.ComponentType<Omit<Props, KeysToRemove> & ShapeToAdd>
  : never

export type ComponentEnhancer<ToRemove, ToAdd> = <
  Comp extends React.ComponentType<ToRemove & ToAdd>
>(
  comp: Comp
) => ChangeComponentProps<Comp, keyof ToRemove, ToAdd>

declare global {
  namespace Redutser {
    export interface DispatchInput<A, S> {
      basic: A
    }

    export type Dispatcher<A, S> = (v: Values<DispatchInput<A, S>>) => void

    export type ThunkDispatch<A, S> = (
      dispatch: Dispatcher<A, S>,
      getState: () => S
    ) => void | Promise<void>
  }
}
