# An Example for @jetblack/wasi-marshalling

This repository contains an example of using @jetblack/wasi-marshalling

## Usage

```bash
npm install
npm start
```


## The C code


Here is the C code marshalled by the JavaScript.

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

__attribute__((used)) void multipleFloat64ArraysWithOutputArray (double* array1, double* array2, double* result, int length)
{
  for (int i = 0; i < length; ++i) {
    result[i] = array1[i] + array2[i];
  }
}
```

## The JavaScript

Here is the JavaScript.

```javascript
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
```
