// This file implements a browser utility function to asychronously fetch, decode and compile a
// given packed-asm.js url as asm.js code. The caller passes in the url of the packed asm.js and
// the returned promise resolves to the compiled (but unliked) asm.js module.

var unpackAsmJS = (function() {
  var globalNameCounter = 0;
  return function(packedURL, workerURL) {
    workerURL = workerURL || 'asmjsunpack-worker.js';

    return new Promise(function(resolve, reject) {
      var callbackName = "";
      do {
        callbackName = "onFinishAsmJSUnpack_" + globalNameCounter++;
      } while (Object.hasOwnProperty(window, this));
      this[callbackName] = function(asmModule) {
        delete this[callbackName];
        resolve(asmModule);
      }

      var worker = new Worker(workerURL);
      worker.postMessage({url:packedURL, callbackName:callbackName});
      worker.onmessage = function (e) {
        if (!(e.data instanceof Int8Array)) {
          reject("unpack-worker.js failed with: " + e.data);
          return;
        }

        var blob = new Blob([e.data]);
        var script = document.createElement('script');
        var url = URL.createObjectURL(blob);
        script.onload = script.onerror = function() { URL.revokeObjectURL(url) }
        script.src = url;
        document.body.appendChild(script);
      }
    });
  }
})();
