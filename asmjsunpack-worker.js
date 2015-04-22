
// asmjsunpack-worker.js: this file is concatenated at the end of unpack.js.

// This file implements a worker that responds to a single initial message containing a url to
// fetch and unpack and the name of the callback to pass into decoding. The worker responds by
// transfering an Int8Array view of the decoded utf8 chars.

onmessage = function(e) {
  var url = e.data.url;
  var callbackName = e.data.callbackName;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onerror = function (e) {
    postMessage('Loading ' + url + ' failed');
  }
  xhr.onload = function (e) {
    if (xhr.status !== 200) {
      postMessage("failed to download " + url + " with status: " + xhr.statusText);
    } else {
      try {
        var bef = Date.now();
        var utf8 = unpack(xhr.response, callbackName);
        var aft = Date.now();
        console.log("unpack of " + url + " took " + (aft - bef) + "ms");
        postMessage(new Blob([utf8]));
      } catch (e) {
        postMessage("failed to unpack " + url + ": " + e);
      }
    }
    self.close();
  }
  xhr.send(null);
}

