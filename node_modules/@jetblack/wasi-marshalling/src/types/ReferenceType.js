import { Type } from './Type'

/**
 * A class representing a reference type
 * @template T
 * @extends {Type<T>}
 */
export class ReferenceType extends Type {
  /**
   * Construct a reference type.
   */
  constructor () {
    super(Uint32Array)
  }
}
