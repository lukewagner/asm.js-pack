default: out/asmjspack out/asmjsunpack out/asmjsunpack.js out/asmjsunpack-shell.js

out/asmjspack: asmjspack.cpp pack.cpp pack.h unpack.cpp unpack.h shared.h cashew/parser.h cashew/parser.cpp cashew/istring.h
	mkdir -p out
	c++ -O3 -g -std=c++11 -DCHECKED_OUTPUT_SIZE -Wall -pedantic \
	    asmjspack.cpp pack.cpp unpack.cpp cashew/parser.cpp \
	    -o out/asmjspack

out/asmjsunpack: asmjsunpack.cpp unpack.cpp unpack.h shared.h
	mkdir -p out
	c++ -DNDEBUG -O3 -std=c++11 -Wall -pedantic \
	    asmjsunpack.cpp unpack.cpp \
	    -o out/asmjsunpack

obj/unpack.js: unpack.cpp unpack.h shared.h
	mkdir -p obj
	emcc -DNDEBUG -O3 -std=c++11 -Wall -pedantic \
	     --memory-init-file 0 --llvm-lto 1 -s ALLOW_MEMORY_GROWTH=1 \
	     unpack.cpp \
	     -o obj/unpack.js

out/asmjsunpack.js: asmjsunpack.js obj/unpack.js unpack.js asmjsunpack-worker.js
	mkdir -p obj
	cat obj/unpack.js unpack.js asmjsunpack-worker.js > out/asmjsunpack-worker.js
	cp asmjsunpack.js out/asmjsunpack.js

out/asmjsunpack-shell.js: obj/unpack.js asmjsunpack-shell.js
	mkdir -p obj
	cat obj/unpack.js unpack.js asmjsunpack-shell.js > out/asmjsunpack-shell.js

.PHONY: test
test: out/asmjspack out/asmjsunpack
	mkdir -p /tmp/test;
	for tjs in test/*.js; do \
		t=$${tjs%.js}; \
		( out/asmjspack $$t.js /tmp/$$t.asm || \
		  ( echo "Failure running:  out/asmjspack $$t.js /tmp/$$t.asm" && false) ) && \
		\
		( out/asmjsunpack /tmp/$$t.asm /tmp/$$t.js || \
		  ( echo "Failure running:  out/asmjsunpack /tmp/$$t.asm /tmp/$$t.js" && false) ) && \
		\
		( diff $$t.js /tmp/$$t.js || \
		  ( echo "Failure running:  diff $$t.js /tmp/$$t.js" && false) ); \
		\
		true; \
	done

.PHONY: clean
clean:
	rm -f out/asmjspack out/asmjsunpack out/asmjsunpack.js obj/unpack.js \
          out/asmjsunpack-worker.js out/asmjsunpack-shell.js
