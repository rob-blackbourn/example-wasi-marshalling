// @flow

import { MemoryManager } from '../MemoryManager'

import { ValueType } from './ValueType'

export class Uint64Type extends ValueType<number> {
  constructor () {
    // $FlowFixMe
    super(BigUint64Array)
  }

  marshall (value: number, memoryManager: MemoryManager): number {
    const address = this.alloc(memoryManager)
    memoryManager.dataView.setBigUint64(address, value)
    return address
  }

  unmarshall (address: number, memoryManager: MemoryManager): number {
    try {
      return memoryManager.dataView.getBigUint64(address)
    } finally {
      memoryManager.free(address)
    }
  }
}
