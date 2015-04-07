// This file is concatenated to the end of unpack.js which is Emscripten-compiled from unpack.cpp.

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

onmessage = function(e) {
  var url = e.data.url;
  var callbackName = e.data.callbackName;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onerror = function (e) { postMessage('XHR ' + url + ' failed'); }
  xhr.onload = function (e) {
    var packedPtr = mallocArrayCopy(xhr.response);
    var callbackNamePtr = mallocStringCopy(callbackName);
    var unpackedSize = _asmjs_unpacked_size(packedPtr, callbackNamePtr);
    var unpackedPtr = _malloc(unpackedSize);
    _asmjs_unpack(packedPtr, callbackNamePtr, unpackedSize, unpackedPtr);
    postMessage(HEAP8.subarray(unpackedPtr, unpackedPtr + unpackedSize), [HEAP8.buffer]);
  }
  xhr.send(null);
}
