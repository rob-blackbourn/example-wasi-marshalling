// @flow

import { MemoryManager } from '../MemoryManager'

import { ReferenceType } from './ReferenceType'

export class StringType extends ReferenceType<string> {
  free (address: number, memoryManager: MemoryManager): void {
    memoryManager.free(address)
  }

  // Convert a JavaScript string to a pointer to multi byte character array
  marshall (string: string, memoryManager: MemoryManager): number {
    // Encode the string in utf-8.
    const encoder = new TextEncoder()
    const encodedString = encoder.encode(string)
    // Copy the string into memory allocated in the WebAssembly
    const address = memoryManager.malloc(encodedString.byteLength + 1)
    const buf = new Uint8Array(memoryManager.memory.buffer, address, encodedString.byteLength + 1)
    buf.set(encodedString)
    return address
  }

  // Convert a null terminated pointer from the wasm module to JavaScript string.
  unmarshall (address: number, memoryManager: MemoryManager): string {
    try {
      // Find the number of bytes before the null termination character.
      const buf = new Uint8Array(memoryManager.memory.buffer, address)
      let length = 0
      while (buf[length] !== 0) {
        ++length
      }
      // Decode the string
      const array = new Uint8Array(memoryManager.memory.buffer, address, length)
      const decoder = new TextDecoder()
      const string = decoder.decode(array)
      return string
    } finally {
      // Free the memory
      memoryManager.free(address)
    }
  }
}
