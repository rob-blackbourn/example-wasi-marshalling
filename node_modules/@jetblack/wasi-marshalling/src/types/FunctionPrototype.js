import { MemoryManager } from '../MemoryManager'

import { ArgumentDef } from './ArgumentDef'
import { Type } from './Type'

/**
 * A function prototype
 * @template T
 */
export class FunctionPrototype {
  /**
   * Construct a function prototype.
   * @param {Array<ArgumentDef<any>>} argDefs The argument definitions
   * @param {Type<T>} [returns] An optional return type
   */
  constructor (argDefs, returns) {
    this.argDefs = argDefs
    this.returns = returns
  }

  /**
   * Invoke a function
   * @param {MemoryManager} memoryManager The memory manager
   * @param {Function} func The function to invoke
   * @param {Array<any>} args The function arguments
   * @returns {T} An optional return value
   */
  invoke (memoryManager, func, ...args) {
    if (this.argDefs.length !== args.length) {
      throw new RangeError('Invalid number of arguments')
    }

    const marshalledArgs = args.map((arg, i) =>
      this.argDefs[i].marshall(arg, memoryManager))

    const result = func(...marshalledArgs)

    args.forEach((arg, i) =>
      this.argDefs[i].unmarshall(marshalledArgs[i], memoryManager, arg))

    if (this.returns != null) {
      return this.returns.unmarshall(result, memoryManager)
    }
  }
}
