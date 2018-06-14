/**
 * I gave up on making declaration augment work on this, so
 * currently this is kept only for reference
 */

import { RedutserShort } from "./redutser"
import { Values } from "../type-helpers"

declare global {
  export interface Red_EffectsType<A, S> {}
}

export function createEffects<Red extends RedutserShort<any, any>>(
  redutser: Red
) {
  return <
    FX extends {
      [k: string]: (
        ...i: any[]
      ) => Values<Red_EffectsType<Red["actionTypes"], Red["initialState"]>>
    }
  >(
    fx: FX
  ) => fx
}
