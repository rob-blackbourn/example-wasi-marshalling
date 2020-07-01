// @flow

import { MemoryManager } from '../MemoryManager'

import { ValueType } from './ValueType'

export class Int8Type extends ValueType<number> {
  constructor () {
    super(Int8Array)
  }

  marshall (value: number, memoryManager: MemoryManager): number {
    const address = this.alloc(memoryManager)
    memoryManager.dataView.setInt8(address, value)
    return address
  }

  unmarshall (address: number, memoryManager: MemoryManager) {
    try {
      return memoryManager.dataView.getInt8(address)
    } finally {
      memoryManager.free(address)
    }
  }
}
