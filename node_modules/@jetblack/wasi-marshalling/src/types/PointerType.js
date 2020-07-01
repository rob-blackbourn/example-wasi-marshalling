// @flow

import { MemoryManager } from '../MemoryManager'

import { Pointer } from './Pointer'
import { ReferenceType } from './ReferenceType'
import { Type } from './Type'

export class PointerType<T> extends ReferenceType<Pointer<T>> {
  type: Type<T>

  constructor (type: Type<T>) {
    super()
    this.type = type
  }

  free (address: number, memoryManager: MemoryManager): void {
    try {
      const marshalledAddress = memoryManager.dataView.getUint32(address)
      this.type.free(marshalledAddress, memoryManager)
    } finally {
      memoryManager.free(address)
    }
  }

  alloc (memoryManager: MemoryManager): number {
    const address = memoryManager.malloc(Uint32Array.BYTES_PER_ELEMENT)
    return address
  }

  marshall (value: Pointer<T>, memoryManager: MemoryManager): number {
    const address = this.alloc(memoryManager)
    const marshalledAddress = this.type.marshall(value.contents, memoryManager)
    memoryManager.dataView.setUint32(address, marshalledAddress)
    return address
  }

  unmarshall (address: number, memoryManager: MemoryManager): Pointer<T> {
    try {
      const marshalledAddress = memoryManager.dataView.getUint32(address)
      return new Pointer(this.type.unmarshall(marshalledAddress, memoryManager))
    } finally {
      memoryManager.free(address)
    }
  }

  copy (dest: Pointer<T>, source: Pointer<T>): Pointer<T> {
    dest.contents = source.contents
    return dest
  }
}
