import { MemoryManager } from '../MemoryManager'

import { ReferenceType } from './ReferenceType'
import { Type } from './Type'

/**
 * An arra type
 * @template T
 * @extends {ReferenceType<Array<T>>}
 */
export class ArrayType extends ReferenceType {
  /**
   * Construct an array type
   * @param {Type<T>} type The type of the elements in the array
   * @param {number} length The length of the array
   */
  constructor (type, length) {
    super()
    this.type = type
    this.length = length
  }

  /**
   * Allocate memory for the array.
   * @param {MemoryManager} memoryManager The memory manager
   * @param {Array<T>} [array] An optional unmarshalled array
   * @returns {number} The address of the allocated memory.
   */
  alloc (memoryManager, array) {
    if (this.length != null && array != null && this.length !== array.length) {
      throw new RangeError('Invalid array length')
    }

    const length = array != null ? array.length : this.length
    if (length == null) {
      throw new RangeError('Unknown length')
    }
    return memoryManager.malloc(length * this.type.TypedArrayType.BYTES_PER_ELEMENT)
  }

  /**
   * Fre allocated memory.
   * @param {number} address The address of the memory to be freed
   * @param {MemoryManager} memoryManager The memory manager
   * @param {Array<T>} [array] An optional unmarshalled array
   */
  free (address, memoryManager, array) {
    try {
      const length = array != null ? array.length : this.length
      if (length == null) {
        throw new Error('Unknwon length for array')
      }
      if (this.type instanceof ReferenceType) {
        const typedArray = new this.type.TypedArrayType(memoryManager.memory.buffer, address, length)
        typedArray.forEach(item => this.type.free(item, memoryManager, null))
      }
    } finally {
      memoryManager.free(address)
    }
  }

  /**
   * Marshall a (possibly nested) array.
   * @param {Array<T>} array The array to be marshalled
   * @param {MemoryManager} memoryManager The memory manager
   * @returns {number} The address of the marshalled array
   */
  marshall (array, memoryManager) {
    const address = this.alloc(memoryManager, array)

    const typedArray = new this.type.TypedArrayType(memoryManager.memory.buffer, address, array.length)
    if (this.type instanceof ReferenceType) {
      array.forEach((item, i) => {
        typedArray[i] = /** @type {number} */ (this.type.marshall(item, memoryManager))
      })
    } else {
      // @ts-ignore
      typedArray.set(array)
    }

    return address
  }

  /**
   * Unmarshall a possibly nested array.
   * @param {number} address The address of the marshalled array
   * @param {MemoryManager} memoryManager The memory manager
   * @param {Array<T>} array AN optional unmarshalled array
   * @returns {Array<T>} The unmarshalled array
   */
  unmarshall (address, memoryManager, array) {
    try {
      const length = array != null ? array.length : this.length
      if (length == null) {
        throw new Error('Unknwon length for array')
      }
      const typedArray = new this.type.TypedArrayType(memoryManager.memory.buffer, address, length)
      // @ts-ignore
      return this.type instanceof ReferenceType
        // @ts-ignore
        ? Array.from(typedArray, x => (this.type.unmarshall(x, memoryManager, null)))
        // @ts-ignore
        : Array.from(typedArray)
    } finally {
      memoryManager.free(address)
    }
  }

  /**
   * Copy an array
   * @param {Array<T>} dest The array to receive the data
   * @param {Array<T>} source The source array
   * @returns {Array<T>} The array to which the data was copied.
   */
  copy (dest, source) {
    dest.splice(0, dest.length, ...source)
    return dest
  }
}
