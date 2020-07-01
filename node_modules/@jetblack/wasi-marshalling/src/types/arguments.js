// @flow

import { Type } from './Type'

import { ArgumentDef } from './ArgumentDef'

export class In<T> extends ArgumentDef<T> {
  constructor (type: Type<T>) {
    super(type, true, false)
  }
}

export class Out<T> extends ArgumentDef<T> {
  constructor (type: Type<T>) {
    super(type, false, true)
  }
}

export class InOut<T> extends ArgumentDef<T> {
  constructor (type: Type<T>) {
    super(type, true, true)
  }
}
