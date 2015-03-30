default: asmjspack asmjsunpack

asmjspack: pack.cpp shared.h cashew/parser.h cashew/parser.cpp cashew/istring.h Makefile
	c++ -O3 -g -std=c++11 -Wall -pedantic pack.cpp cashew/parser.cpp -o asmjspack

asmjsunpack: unpack.cpp shared.h Makefile
	c++ -O3 -g -std=c++11 -Wall -pedantic unpack.cpp -o asmjsunpack

.PHONY: test
test: asmjspack asmjsunpack
	mkdir -p /tmp/test;
	for tjs in test/*.js; do \
        t=$${tjs%.js}; \
        ( asmjspack $$t.js /tmp/$$t.asm || \
          ( echo "Failure running:  asmjspack $$t.js /tmp/$$t.asm" && false) ) && \
        \
        ( asmjsunpack /tmp/$$t.asm /tmp/$$t.js || \
          ( echo "Failure running:  asmjsunpack /tmp/$$t.asm /tmp/$$t.js" && false) ) && \
        \
        ( diff $$t.js /tmp/$$t.js || \
          ( echo "Failure running:  diff $$t.js /tmp/$$t.js" && false) ); \
        \
        true; \
    done

.PHONY: clean
clean:
	rm asmjspack asmjsunpack
