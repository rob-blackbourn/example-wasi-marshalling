import { MemoryManager } from '../MemoryManager'

/**
 * The base class for representing types
 * @template T
 */
export class Type {
  /**
   * The abstract constructor for a type.
   * @param {Int8ArrayConstructor|Int16ArrayConstructor|Int32ArrayConstructor|BigInt64ArrayConstructor|Uint8ArrayConstructor|Uint16ArrayConstructor|Uint32ArrayConstructor|BigUint64ArrayConstructor|Float32ArrayConstructor|Float64ArrayConstructor} typedArrayType The typed array for the type
   */
  constructor (typedArrayType) {
    this.TypedArrayType = typedArrayType
  }

  /**
   * Allocate memory for the type
   * @abstract
   * @param {MemoryManager} memoryManager The memory manager
   * @param {T} array An optional array
   * @returns {number} The address of the allocated value in memory
   */
  alloc (memoryManager, array) {
    throw new Error('Not Implemented')
  }

  /**
   * Free the memory for the value
   * @abstract
   * @param {number} address The address of the value in memory
   * @param {MemoryManager} memoryManager The memory manager
   * @param {T} [value] An optional unmarshalled value
   */
  free (address, memoryManager, value) {
    throw new Error('Not Implemented')
  }

  /**
   * Marshal a value.
   * @abstract
   * @param {T} value The value to marshall
   * @param {MemoryManager} memoryManager The memory manager
   * @returns {number|T} The marshalled value
   */
  marshall (value, memoryManager) {
    throw new Error('Not Implemented')
  }

  /**
   * Unmarshall a value.
   * @abstract
   * @param {number} address The address of the value in memory
   * @param {MemoryManager} memoryManager The memory manager
   * @param {T} [value] An optional unmarshalled value
   * @returns {T}
   */
  unmarshall (address, memoryManager, value) {
    throw new Error('Not Implemented')
  }

  /**
   * Copy a value
   * @abstract
   * @param {T} dest The destination value
   * @param {T} source The source value
   * @returns {T} The destination value
   */
  copy (dest, source) {
    throw new Error('Not Implemented')
  }
}
