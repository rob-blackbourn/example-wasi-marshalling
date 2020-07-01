// @flow

import { MemoryManager } from '../MemoryManager'

import { ValueType } from './ValueType'

export class Uint16Type extends ValueType<number> {
  constructor () {
    super(Uint16Array)
  }

  marshall (value: number, memoryManager: MemoryManager): number {
    const address = this.alloc(memoryManager)
    memoryManager.dataView.setUint16(address, value)
    return address
  }

  unmarshall (address: number, memoryManager: MemoryManager): number {
    try {
      return memoryManager.dataView.getUint16(address)
    } finally {
      memoryManager.free(address)
    }
  }
}
