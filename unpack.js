
// unpack.js: this file is concatenated at the end of the Emscripten-compiled unpack.cpp.

// This file is basically a wrapper around the raw Emscripten output of unpack.cpp. It allows the
// worker or shell script to easily perform a synchronous unpacking of an input byte array of
// packed asm.js bytes, returning a view of the bigger Emscripten heap containing the decoded utf8
// bytes.

function mallocArrayCopy(src) {
  var L = src.byteLength;
  var dst = _malloc(L);
  HEAP8.set(new Uint8Array(src), dst);
  return dst;
}

function mallocStringCopy(src) {
  var L = src.length;
  var dst = _malloc(L + 1);
  for (var i = 0; i < L; i++)
    HEAP8[dst + i] = src.charCodeAt(i);
  HEAP8[dst + L] = 0;
  return dst;
}

function unpack(inBytes, callbackName) {
  var packedPtr = mallocArrayCopy(inBytes);
  if (!_asmjs_has_magic_number(packedPtr))
    throw "File does not appear to be packed asm.js";
  var callbackNamePtr = mallocStringCopy(callbackName);
  var unpackedSize = _asmjs_unpacked_size(packedPtr, callbackNamePtr);
  var unpackedPtr = _malloc(unpackedSize);
  _asmjs_unpack(packedPtr, callbackNamePtr, unpackedSize, unpackedPtr);
  return HEAP8.subarray(unpackedPtr, unpackedPtr + unpackedSize);
}

