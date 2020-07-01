// @flow

import { Type } from './Type'

export class ReferenceType<T> extends Type<T> {
  constructor () {
    super(Uint32Array)
  }
}
