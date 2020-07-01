# WASI Marshalling

This library provides two things:

* The minimum WASI implementation required for supporting  memory allocation
  and strings.
* A marshalling framework for calling WebAssembly functions in a wasm module
  from JavaScript.

The intention is to provide support to "drop in" publically available libraries
that can be compiled into a wasm module.

## The WASI Layer

Three WASI domains are implemented:

* stout/stderr - many libraries fall back to reporting errors over the standard
  output/error. These are redirected to `console.log` and `console.error`.
* string passing with UTF-8 requires a call to `setlocale` which in turn
  requires a system call to request environment variables. This call is
  intercepted, and returns a application provided set of the environment
  variables.
* memory management - most libraries make use of `malloc` and `free` to manage
  memory.

The implementation of the WASI layer is provided through a class of the
same name. Here is an example of initialising the library.

```javascript
import { Wasi } from '@jetblack/wasi-marshalling'

// Create the Wasi instance passing in environment variables.
const wasi = new Wasi({})

// Instantiate the wasm module.
WebAssembly.instantiateStreaming(
  fetch('example.wasm'), {
    wasi_snapshot_preview1: wasi
  })
  .then(res => {
    // Initialise the wasi instance
    wasi.init(res.instance)

    // Do something interesting ...
  })
```

## The Marshalling Framework

Given the following C function call which multiplies two arrays.

```C
#include <stdlib.h>

__attribute__((used)) double* multipleFloat64ArraysReturningPtr (double* array1, double* array2, int length)
{
  double* result = (double*) malloc(length * sizeof(double));
  if (result == 0)
    return 0;

  for (int i = 0; i < length; ++i) {
    result[i] = array1[i] + array2[i];
  }

  return result;
}
```

We can define and call the following function prototype.

```javascript
import {
  ArrayType,
  Float64Type,
  Int32Type,
  FunctionPrototype,
  In
} from '@jetblack/wasi-marshalling.develop.js'

const prototype = new FunctionPrototype(
  // The arguments
  [
    new In(new ArrayType(new Float64Type())),
    new In(new ArrayType(new Float64Type())),
    new In(new Int32Type())
  ],
  // The return type
  new ArrayType(new Float64Type(), 4)
)

const result = prototype.invoke(
  wasi.memoryManager,
  wasi.instance.exports.multipleFloat64ArraysReturningPtr,
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  4)

console.log(result)
```

The framework will take care of passing the data to the wasm module,
unpacking the result and allocating/deallocating the memory.

The framework handles the following types:

* Int8, Int16, Int32, Int64
* Uint8, Uint16, Uint32, Uint64
* Float32, Float64
* String
* Array
* Pointer

## Usage

To build the package:

```bash
npm install
npm run build
```

To Run the examples in the `client` folder.

```bash
# Run a node example
npm run exec:nodejs
# Run a browser which uploads an es6 module
npm run exec:es6
# Run code in a `<script>` tag in the browser
npm run exec:browser
```
