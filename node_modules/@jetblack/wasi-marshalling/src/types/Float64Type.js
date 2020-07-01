// @flow

import { MemoryManager } from '../MemoryManager'

import { ValueType } from './ValueType'

export class Float64Type extends ValueType<number> {
  constructor () {
    super(Float64Array)
  }

  marshall (value: number, memoryManager:MemoryManager): number {
    const address = this.alloc(memoryManager)
    memoryManager.dataView.setFloat64(address, value)
    return address
  }

  unmarshall (address: number, memoryManager: MemoryManager): number {
    try {
      return memoryManager.dataView.getFloat64(address)
    } finally {
      memoryManager.free(address)
    }
  }
}
