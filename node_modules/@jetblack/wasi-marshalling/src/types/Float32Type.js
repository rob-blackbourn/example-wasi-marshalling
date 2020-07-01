// @flow

import { MemoryManager } from '../MemoryManager'

import { ValueType } from './ValueType'

export class Float32Type extends ValueType<number> {
  constructor () {
    super(Float32Array)
  }

  marshall (value: number, memoryManager: MemoryManager): number {
    const address = this.alloc(memoryManager)
    memoryManager.dataView.setFloat32(address, value)
    return address
  }

  unmarshall (address: number, memoryManager: MemoryManager): number {
    try {
      return memoryManager.dataView.getFloat32(address)
    } finally {
      memoryManager.free(address)
    }
  }
}
