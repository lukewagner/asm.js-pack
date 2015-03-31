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

  // Read in packed .asm file bytes.
  vector<uint8_t> in_bytes;
  ifstream in_stream(argv[1], ios::binary | ios::ate);
  in_stream.exceptions(ios::failbit | ios::badbit);
  in_bytes.resize(in_stream.tellg());
  in_stream.seekg(0);
  in_stream.read((char*)in_bytes.data(), in_bytes.size());
  in_stream.close();

  // Unpack .asm file into utf8 chars.
  vector<uint8_t> out_bytes(asmjs::read_unpacked_size(in_bytes.data()));
  asmjs::unpack(in_bytes.data(), out_bytes.size(), out_bytes.data());

  // Write the utf8 chars out to a .js file.
  ofstream out_stream(argv[2], ios::binary);
  out_stream.exceptions(ios::failbit | ios::badbit);
  out_stream.write((char*)out_bytes.data(), out_bytes.size());
  out_stream.close();

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
