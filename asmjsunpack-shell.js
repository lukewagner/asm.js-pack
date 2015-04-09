
// asmjsunpack-shell.js: this file is concatenated at the end of unpack.js.

var inBytes = snarf(scriptArgs[0], 'binary');
var outBytes = unpack(inBytes, 'callback');
var outString = "";
for (var i = 0; i < outBytes.length; i++)
  outString += String.fromCharCode(outBytes[i]);
print(outString);
