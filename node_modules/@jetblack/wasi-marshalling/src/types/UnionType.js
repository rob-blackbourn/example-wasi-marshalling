import { ValueType } from './ValueType'

export class UnionType extends ValueType {
  constructor (types) {
    super(Uint32Array)
    this.types = types
  }
}
