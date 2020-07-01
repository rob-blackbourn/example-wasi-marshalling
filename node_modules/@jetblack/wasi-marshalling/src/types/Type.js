// @flow

import type { $TypedArray, Class } from 'flow-bin'

import { MemoryManager } from '../MemoryManager'

export class Type<T> {
  TypedArrayType: Class<$TypedArray>

  constructor (typedArrayType: Class<$TypedArray>) {
    this.TypedArrayType = typedArrayType
  }

  alloc (memoryManager: MemoryManager, array: ?T): number {
    throw new Error('Not Implemented')
  }

  free (address: number, memoryManager: MemoryManager, value: ?T): void {
    throw new Error('Not Implemented')
  }

  marshall (value: T, memoryManager: MemoryManager): number|T {
    throw new Error('Not Implemented')
  }

  unmarshall (address: number, memoryManager: MemoryManager, value: ?T): T {
    throw new Error('Not Implemented')
  }

  copy (dest: T, source: T): T {
    throw new Error('Not Implemented')
  }
}
