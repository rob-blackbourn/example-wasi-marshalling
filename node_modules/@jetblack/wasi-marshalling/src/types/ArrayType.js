// @flow

import { MemoryManager } from '../MemoryManager'

import { ReferenceType } from './ReferenceType'
import { Type } from './Type'

export class ArrayType<T> extends ReferenceType<Array<T>> {
  type: Type<T>
  length: ?number

  constructor (type: Type<T>, length: number) {
    super()
    this.type = type
    this.length = length
  }

  alloc (memoryManager: MemoryManager, array: ?Array<T>): number {
    if (this.length != null && array != null && this.length !== array.length) {
      throw new RangeError('Invalid array length')
    }

    const length = array != null ? array.length : this.length
    if (length == null) {
      throw new RangeError('Unknown length')
    }
    return memoryManager.malloc(length * this.type.TypedArrayType.BYTES_PER_ELEMENT)
  }

  free (address: number, memoryManager: MemoryManager, array: ?Array<T>): void {
    try {
      const length = array != null ? array.length : this.length
      if (length == null) {
        throw new Error('Unknwon length for array')
      }
      if (this.type instanceof ReferenceType) {
        const typedArray = new this.type.TypedArrayType(memoryManager.memory.buffer, address, length)
        typedArray.forEach(item => this.type.free(item, memoryManager))
      }
    } finally {
      memoryManager.free(address)
    }
  }

  marshall (array: Array<T>, memoryManager: MemoryManager): number {
    const address = this.alloc(memoryManager, array)

    const typedArray = new this.type.TypedArrayType(memoryManager.memory.buffer, address, array.length)
    if (this.type instanceof ReferenceType) {
      array.forEach((item, i) => {
        typedArray[i] = this.type.marshall(item, memoryManager)
      })
    } else {
      typedArray.set(array)
    }

    return address
  }

  unmarshall (address: number, memoryManager: MemoryManager, array: ?Array<T>): Array<T> {
    try {
      const length = array != null ? array.length : this.length
      if (length == null) {
        throw new Error('Unknwon length for array')
      }
      const typedArray = new this.type.TypedArrayType(memoryManager.memory.buffer, address, length)
      return this.type instanceof ReferenceType
        ? Array.from(typedArray, x => this.type.unmarshall(x, memoryManager))
        : Array.from(typedArray)
    } finally {
      memoryManager.free(address)
    }
  }

  copy (dest: Array<T>, source: Array<T>): Array<T> {
    dest.splice(0, dest.length, ...source)
    return dest
  }
}
