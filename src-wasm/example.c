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
