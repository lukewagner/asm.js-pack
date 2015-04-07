default: out/asmjspack out/asmjsunpack out/asmjsunpack-raw.js

out/asmjspack: asmjspack.cpp pack.cpp pack.h unpack.cpp unpack.h shared.h cashew/parser.h cashew/parser.cpp cashew/istring.h
	mkdir -p out
	c++ -O3 -g -std=c++11 -DCHECKED_OUTPUT_SIZE -Wall -pedantic -o out/asmjspack \
	    asmjspack.cpp pack.cpp unpack.cpp cashew/parser.cpp

out/asmjsunpack: asmjsunpack.cpp unpack.cpp unpack.h shared.h
	mkdir -p out
	c++ -DNDEBUG -O3 -g -std=c++11 -Wall -pedantic -o out/asmjsunpack \
	    asmjsunpack.cpp unpack.cpp

out/asmjsunpack-raw.js: asmjsunpack.cpp unpack.cpp unpack.h shared.h
	mkdir -p out
	emcc -DNDEBUG -O3 --memory-init-file 0 --llvm-lto 1 -s TOTAL_MEMORY=50331648 -std=c++11 -Wall -pedantic -o out/asmjsunpack-raw.js \
	     unpack.cpp

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
	rm out/asmjspack out/asmjsunpack out/asmjsunpack-raw.js
