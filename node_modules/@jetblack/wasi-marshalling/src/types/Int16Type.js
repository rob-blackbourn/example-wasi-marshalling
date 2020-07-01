// @flow

import { MemoryManager } from '../MemoryManager'

import { ValueType } from './ValueType'

export class Int16Type extends ValueType<number> {
  constructor () {
    super(Int8Array)
  }

  marshall (value: number, memoryManager: MemoryManager): number {
    const address = this.alloc(memoryManager)
    memoryManager.dataView.setInt16(address, value)
    return address
  }

  unmarshall (address: number, memoryManager: MemoryManager): number {
    try {
      return memoryManager.dataView.getInt16(address)
    } finally {
      memoryManager.free(address)
    }
  }
}
