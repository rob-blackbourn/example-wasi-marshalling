import { ValueType } from './ValueType'

export class StructType extends ValueType {
  constructor (types) {
    super(Uint32Array)
    this.types = types
  }
}
