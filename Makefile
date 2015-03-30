default: out/asmjspack out/asmjsunpack

out/asmjspack: pack.cpp shared.h cashew/parser.h cashew/parser.cpp cashew/istring.h Makefile
	mkdir -p out
	c++ -O3 -g -std=c++11 -Wall -pedantic pack.cpp cashew/parser.cpp -o out/asmjspack

out/asmjsunpack: unpack.cpp shared.h Makefile
	mkdir -p out
	c++ -O3 -g -std=c++11 -Wall -pedantic unpack.cpp -o out/asmjsunpack

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
	rm out/asmjspack out/asmjsunpack
