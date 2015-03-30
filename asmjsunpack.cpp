// vim: set ts=2 sw=2 tw=99 et:

#include "unpack.h"

#include <stdexcept>
#include <iostream>
#include <fstream>

using namespace std;

int
main(int argc, char** argv)
try
{
  if (argc != 3 || !argv[1] || !argv[2]) {
    cerr << "Usage: asmjsunpack in.asm out.js" << endl;
    return -1;
  }

  vector<uint8_t> in_bytes;

  ifstream in_stream(argv[1], ios::binary | ios::ate);
  in_stream.exceptions(ios::failbit | ios::badbit);
  in_bytes.resize(in_stream.tellg());
  in_stream.seekg(0);
  in_stream.read(reinterpret_cast<char*>(in_bytes.data()), in_bytes.size());
  in_stream.close();

  vector<uint8_t> out_bytes = asmjs::unpack(in_bytes.data());

  ofstream out(argv[2], ios::binary);
  out.exceptions(ios::failbit | ios::badbit);
  out.write(reinterpret_cast<char*>(out_bytes.data()), out_bytes.size());
  return 0;
}
catch(const ios::failure& err)
{
  cerr << "Failed with runtime error: " << err.what() << endl;
  return -1;
}
catch(const runtime_error& err)
{
  cerr << "Failed with runtime error: " << err.what() << endl;
  return -1;
}
