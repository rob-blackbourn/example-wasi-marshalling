import { MemoryManager } from '../MemoryManager'

import { Type } from './Type'

/**
 * A base class representing a value type
 * @template T
 * @extends {Type<T>}
 */
export class ValueType extends Type {
  /**
   * Allocate memory for the type
   * @param {MemoryManager} memoryManager The memory manager
   * @returns {number} The address of the allocated memory
   */
  alloc (memoryManager) {
    return memoryManager.malloc(this.TypedArrayType.BYTES_PER_ELEMENT)
  }

  /**
   * Free allocated memory
   * @param {number} address The address of the memory to be freed
   * @param {MemoryManager} memoryManager The memory manager
   * @param {T} [value] Optional unmarshalled value.
   */
  free (address, memoryManager, value) {
    memoryManager.free(address)
  }
}
