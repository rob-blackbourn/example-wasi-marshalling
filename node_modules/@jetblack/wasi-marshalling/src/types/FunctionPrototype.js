// @flow

import { MemoryManager } from '../MemoryManager'

import { ArgumentDef } from './ArgumentDef'
import { Type } from './Type'

export class FunctionPrototype<T> {
  argDefs: Array<ArgumentDef<any>>
  returns: ?Type<T>

  constructor (argDefs: Array<ArgumentDef<any>>, returns: ?Type<T>) {
    this.argDefs = argDefs
    this.returns = returns
  }

  invoke (memoryManager: MemoryManager, func: (...args: Array<any>) => any, ...args: Array<any>): ?T {
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
