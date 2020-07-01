export function * zip (...args) {
  const iterators = args.map(x => x[Symbol.iterator]())
  let values = iterators.map(x => x.next())
  while (values.some(x => !x.done)) {
    yield values.map(x => x.value)
    values = iterators.map(x => x.next())
  }
}

function * map (iterable, callback) {
  for (const item of iterable) {
    yield callback(item)
  }
}

export class Iterable {
  static map (iterable, callback) {
    return Array.from(map(iterable, callback))
  }

  static forEach (iterable, callback) {
    for (const item of iterable) {
      callback(item)
    }
  }
}
