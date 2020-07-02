import { MemoryManager } from '../MemoryManager'

import { ReferenceType } from './ReferenceType'

/**
 * A class representing a string type
 * @template {string} T
 * @extends {ReferenceType<string>}
 */
export class StringType extends ReferenceType {
  /**
   * Free an allocated string
   * @param {number} address The address of the string in memory
   * @param {MemoryManager} memoryManager The memory manager
   */
  free (address, memoryManager) {
    memoryManager.free(address)
  }

  /**
   * Marshall a string into memory
   * @param {T} string The string to marshall
   * @param {MemoryManager} memoryManager The memory manager
   * @returns {number} The address of the string in memory
   */
  marshall (string, memoryManager) {
    // Encode the string in utf-8.
    const encoder = new TextEncoder()
    const encodedString = encoder.encode(string)
    // Copy the string into memory allocated in the WebAssembly
    const address = memoryManager.malloc(encodedString.byteLength + 1)
    const buf = new Uint8Array(memoryManager.memory.buffer, address, encodedString.byteLength + 1)
    buf.set(encodedString)
    return address
  }

  /**
   * Unmarshall a string
   * @param {number} address The address of the string in memory
   * @param {MemoryManager} memoryManager The memory manager
   * @param {T} [value] Optional unmarshalled value.
   * @returns {T} The unmarshalled string
   */
  unmarshall (address, memoryManager, value) {
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
      return /** @type {T} */ (string)
    } finally {
      // Free the memory
      memoryManager.free(address)
    }
  }
}
