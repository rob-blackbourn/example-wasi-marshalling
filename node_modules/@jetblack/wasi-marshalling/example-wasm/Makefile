GSL_HOME=/opt/gsl-2.6
GSL_INCLUDE=$(GSL_HOME)/include
GSL_LIB=$(GSL_HOME)/lib


WASI_SDK=/opt/wasi-sdk
WASI_SYSROOT=$(WASI_SDK)/share/wasi-sysroot
WASI_LIB=$(WASI_SYSROOT)/lib/wasm32-wasi
WASI_BUILTINS=$(WASI_SDK)/lib/clang/10.0.0/lib/wasi/libclang_rt.builtins-wasm32.a

CC=clang
LD=wasm-ld
CFLAGS=-fno-trapping-math --target=wasm32-wasi -mthread-model single -I$(GSL_INCLUDE)
LDFLAGS=--export-all --no-entry --allow-undefined -L$(GSL_LIB) -L$(WASI_LIB) -lgsl -lc $(WASI_BUILTINS)

WASM2WAT=/opt/wabt/bin/wasm2wat

sources = example.c crt1.c
objects = $(sources:%.c=%.bc)
target = example

.PHONY: all

all: $(target).wat

$(target).wat: $(target).wasm
	$(WASM2WAT) $(target).wasm -o $(target).wat

$(target).wasm: $(objects)
	$(LD) $(objects) $(LDFLAGS) -o $(target).wasm
	
%.bc: %.c
	$(CC) -c -emit-llvm $(CFLAGS) $< -o $@

clean:
	rm -f $(target).wasm
	rm -f $(target).wat
	rm -f $(objects)
