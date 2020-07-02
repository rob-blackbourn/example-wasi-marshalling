import { Type } from './Type'

import { ArgumentDef } from './ArgumentDef'

/**
 * An input arguent
 * @template T
 * @extends {ArgumentDef<T>}
 */
export class In extends ArgumentDef {
  /**
   * Construct an input argument
   * @param {Type<T>} type The argument type
   */
  constructor (type) {
    super(type, true, false)
  }
}

/**
 * An output argument
 * @template T
 * @extends {ArgumentDef<T>}
 */
export class Out extends ArgumentDef {
  /**
   * Construct an output argument
   * @param {Type<T>} type The argument type
   */
  constructor (type) {
    super(type, false, true)
  }
}

/**
 * An input/output argument
 * @template T
 * @extends {ArgumentDef<T>}
 */
export class InOut extends ArgumentDef {
  /**
   * Construct an input/output argument
   * @param {Type<T>} type The argument type
   */
  constructor (type) {
    super(type, true, true)
  }
}
