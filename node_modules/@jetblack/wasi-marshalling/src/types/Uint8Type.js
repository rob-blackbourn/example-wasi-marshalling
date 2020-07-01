// @flow

import { MemoryManager } from '../MemoryManager'

import { ValueType } from './ValueType'

export class Uint8Type extends ValueType<number> {
  constructor () {
    super(Uint8Array)
  }

  marshall (value: number, memoryManager: MemoryManager): number {
    const address = this.alloc(memoryManager)
    memoryManager.dataView.setUint8(address, value)
    return address
  }

  unmarshall (address: number, memoryManager: MemoryManager): number {
    try {
      return memoryManager.dataView.getUint8(address)
    } finally {
      memoryManager.free(address)
    }
  }
}
