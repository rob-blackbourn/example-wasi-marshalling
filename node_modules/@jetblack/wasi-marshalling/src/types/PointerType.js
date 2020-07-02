import { MemoryManager } from '../MemoryManager'

import { Pointer } from './Pointer'
import { ReferenceType } from './ReferenceType'
import { Type } from './Type'

/**
 * A pointer type
 * @template T
 * @extends {ReferenceType<Pointer<T>>}
 */
export class PointerType extends ReferenceType {
  /**
   * Construct a pointer type.
   * @param {Type<T>} type The type pointed to
   */
  constructor (type) {
    super()
    this.type = type
  }

  /**
   * Free an allocated pointer
   * @param {number} address The address of the pointer to be freed
   * @param {MemoryManager} memoryManager The memory manager
   */
  free (address, memoryManager) {
    try {
      const marshalledAddress = memoryManager.dataView.getUint32(address)
      this.type.free(marshalledAddress, memoryManager)
    } finally {
      memoryManager.free(address)
    }
  }

  /**
   * Allocate memory for a pointer
   * @param {MemoryManager} memoryManager The memory manager
   * @returns{number} The address of the allocated memory
   */
  alloc (memoryManager) {
    const address = memoryManager.malloc(Uint32Array.BYTES_PER_ELEMENT)
    return address
  }

  /**
   * Marshal a pointer
   * @param {Pointer<T>} value The value to marshall
   * @param {MemoryManager} memoryManager The memory manager
   * @returns {number} The address of the pointer in memory
   */
  marshall (value, memoryManager) {
    const address = this.alloc(memoryManager)
    const marshalledAddress = /** @type {number} */ (this.type.marshall(value.contents, memoryManager))
    memoryManager.dataView.setUint32(address, marshalledAddress)
    return address
  }

  /**
   * 
   * @param {number} address The address of the pointer in memory
   * @param {MemoryManager} memoryManager The memory manager
   */
  unmarshall (address, memoryManager) {
    try {
      const marshalledAddress = memoryManager.dataView.getUint32(address)
      return new Pointer(this.type.unmarshall(marshalledAddress, memoryManager))
    } finally {
      memoryManager.free(address)
    }
  }

  /**
   * Copy a pointer
   * @param {Pointer<T>} dest The destination pointer
   * @param {Pointer<T>} source The source pointer
   * @returns {Pointer<T>} The destination pointer
   */
  copy (dest, source) {
    dest.contents = source.contents
    return dest
  }
}
