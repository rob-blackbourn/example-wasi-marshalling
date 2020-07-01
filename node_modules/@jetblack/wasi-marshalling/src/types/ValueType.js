// @flow

import { MemoryManager } from '../MemoryManager'

import { Type } from './Type'

export class ValueType<T> extends Type<T> {
  alloc (memoryManager: MemoryManager): number {
    return memoryManager.malloc(this.TypedArrayType.BYTES_PER_ELEMENT)
  }

  free (address: number, memoryManager: MemoryManager): void {
    memoryManager.free(address)
  }
}
