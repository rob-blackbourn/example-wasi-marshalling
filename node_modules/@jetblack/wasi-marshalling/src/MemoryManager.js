// @flow

import { $DataView } from 'flow-bin'

export class MemoryManager {
  memory: WebAssembly.Memory
  malloc: (byteLength: number) => number
  free: (address: number) => void
  dataView: $DataView

  constructor (memory: WebAssembly.Memory, malloc: (byteLength: number) => number, free: (address: number) => void) {
    this.memory = memory
    this.malloc = malloc
    this.free = free
    this.dataView = new DataView(this.memory.buffer)
  }
}
