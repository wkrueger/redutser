/**
 * I gave up on making declaration augment work on this, so
 * currently this is kept only for reference
 */
import { RedutserShort } from "./redutser";
declare global  {
    interface Red_EffectsType<A, S> {
    }
}
export declare function createEffects<Red extends RedutserShort<any, any>>(redutser: Red): <FX extends {
    [k: string]: (...i: any[]) => any;
}>(fx: FX) => FX;
