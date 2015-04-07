var unpackAsmJS = (function() {
  var counter = 0;

  function unpack(url) {
    return new Promise(function(resolve, reject) {
      var callbackName = "";
      do {
        callbackName = "onFinishAsmJSUnpack_" + counter++;
      } while (Object.hasOwnProperty(window, this));
      this[callbackName] = function(asmModule) {
        delete this[callbackName];
        resolve(asmModule);
      }

      var worker = new Worker('unpack-worker.js');
      worker.postMessage({url:url, callbackName:callbackName});
      worker.onmessage = function (e) {
        if (!(e.data instanceof Int8Array)) {
          reject("unpack-worker.js failed with: " + e.data);
          return;
        }

        var blob = new Blob([e.data], { type:"text/plain; charset=UTF-8" });
        var script = document.createElement('script');
        var url = URL.createObjectURL(blob);
        script.onload = script.onerror = function() { URL.revokeObjectURL(url) }
        script.src = url;
        document.body.appendChild(script);
      }
    });
  }

  return unpack;
})();
