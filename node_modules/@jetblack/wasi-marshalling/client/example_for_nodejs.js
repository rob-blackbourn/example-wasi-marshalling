const fs = require('fs')
const {
  Wasi,
  Float64Type,
  ArrayType,
  Int32Type,
  FunctionPrototype,
  In,
  Out
} = require('../lib/index.develop.js')

async function setupWasi (fileName, envVars) {
  // Read the wasm file.
  const buf = fs.readFileSync(fileName)

  // Create the Wasi instance passing in environment variables.
  const wasi = new Wasi(envVars)

  // Instantiate the wasm module.
  const res = await WebAssembly.instantiate(buf, {
    wasi_snapshot_preview1: wasi
  })

  // Initialise the wasi instance
  wasi.init(res.instance)

  return wasi
}

async function main () {
  const wasi = await setupWasi('./client/example.wasm', {})

  // The first example takes in two arrays on the same length and
  // multiplies them, returning a third array.
  const proto1 = new FunctionPrototype(
    [
      new In(new ArrayType(new Float64Type())),
      new In(new ArrayType(new Float64Type())),
      new In(new Int32Type())
    ],
    new ArrayType(new Float64Type(), 4)
  )

  const result1 = proto1.invoke(
    wasi.memoryManager,
    wasi.instance.exports.multipleFloat64ArraysReturningPtr,
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    4)
  console.log(result1)

  // The second example takes in three arrays, multiplying the first
  // two are storing the output in the third.
  const proto2 = new FunctionPrototype(
    [
      new In(new ArrayType(new Float64Type())),
      new In(new ArrayType(new Float64Type())),
      new Out(new ArrayType(new Float64Type())),
      new In(new Int32Type())
    ]
  )

  const output = new Array(4)
  proto2.invoke(
    wasi.memoryManager,
    wasi.instance.exports.multipleFloat64ArraysWithOutputArray,
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    output,
    4)
  console.log(output)
}

main()
  .then(() => console.log('Done'))
  .catch(error => console.error(error))
