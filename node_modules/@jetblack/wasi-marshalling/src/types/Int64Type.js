// @flow

import type { BigInt64Array } from 'flow-bin'

import { MemoryManager } from '../MemoryManager'

import { ValueType } from './ValueType'

export class Int64Type extends ValueType<number> {
  constructor () {
    // $FlowFixMe
    super(BigInt64Array)
  }

  marshall (value: number, memoryManager: MemoryManager): number {
    const address = this.alloc(memoryManager)
    memoryManager.dataView.setBigInt64(address, value)
    return address
  }

  unmarshall (address: number, memoryManager: MemoryManager): number {
    try {
      return memoryManager.dataView.getBigInt64(address)
    } finally {
      memoryManager.free(address)
    }
  }
}
