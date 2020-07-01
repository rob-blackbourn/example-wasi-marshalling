// @flow

export class Pointer<T> {
  contents: T

  constructor (contents: T) {
    this.contents = contents
  }
}
