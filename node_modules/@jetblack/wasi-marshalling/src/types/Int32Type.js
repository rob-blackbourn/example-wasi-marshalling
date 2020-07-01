// @flow

import { MemoryManager } from '../MemoryManager'

import { ValueType } from './ValueType'

export class Int32Type extends ValueType<number> {
  constructor () {
    super(Int32Array)
  }

  marshall (value: number, memoryManager: MemoryManager): number {
    const address = this.alloc(memoryManager)
    memoryManager.dataView.setInt32(address, value)
    return address
  }

  unmarshall (address: number, memoryManager: MemoryManager): number {
    try {
      return memoryManager.dataView.getInt32(address)
    } finally {
      memoryManager.free(address)
    }
  }
}
