#include <stdlib.h>
#include <stdio.h>
#include <locale.h>
#include <wchar.h>

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

int is_locale_initialised = 0;

static void initLocale()
{
    // The locale must be initialised before using
    // multi byte characters.
    is_locale_initialised = 1;
    setlocale(LC_ALL, "");
}

int is_comb(wchar_t c)
{
	if (c >= 0x300 && c <= 0x36f) return 1;
	if (c >= 0x1dc0 && c <= 0x1dff) return 1;
	if (c >= 0x20d0 && c <= 0x20ff) return 1;
	if (c >= 0xfe20 && c <= 0xfe2f) return 1;
	return 0;
}
 
wchar_t* mb_to_wchar(const char *s)
{
	wchar_t *u;
	size_t len = mbstowcs(0, s, 0) + 1;
	if (!len) return 0;
 
	u = malloc(sizeof(wchar_t) * len);
	mbstowcs(u, s, len);
	return u;
}
 
wchar_t* ws_reverse(const wchar_t* u)
{
	size_t len, i, j;
	wchar_t *out;
	for (len = 0; u[len]; len++);
	out = malloc(sizeof(wchar_t) * (len + 1));
	out[len] = 0;
	j = 0;
	while (len) {
		for (i = len - 1; i && is_comb(u[i]); i--);
		wcsncpy(out + j, u + i, len - i);
		j += len - i;
		len = i;
	}
	return out;
}

__attribute__((used)) char *reverseString(const char *in)
{
	size_t len;
	char *out;

  if (is_locale_initialised == 0)
    initLocale();

	wchar_t *u = mb_to_wchar(in);
	wchar_t *r = ws_reverse(u);
	len = wcstombs(0, r, 0) + 1;
	out = malloc(len);
	wcstombs(out, r, len);
	free(u);
	free(r);
	return out;
}

__attribute__((used)) void sendToStdout(const char *text)
{
	fputs(text, stdout);
}


__attribute__((used)) void sendToStderr(const char *text)
{
	fputs(text, stderr);
}
