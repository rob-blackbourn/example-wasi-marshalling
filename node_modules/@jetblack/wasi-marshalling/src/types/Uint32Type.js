// @flow

import { MemoryManager } from '../MemoryManager'

import { ValueType } from './ValueType'

export class Uint32Type extends ValueType<number> {
  constructor () {
    super(Uint32Array)
  }

  marshall (value: number, memoryManager: MemoryManager): number {
    const address = this.alloc(memoryManager)
    memoryManager.dataView.setUint32(address, value)
    return address
  }

  unmarshall (address: number, memoryManager: MemoryManager): number {
    try {
      return memoryManager.dataView.getUint32(address)
    } finally {
      memoryManager.free(address)
    }
  }
}
