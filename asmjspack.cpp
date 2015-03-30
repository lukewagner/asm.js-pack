// vim: set ts=2 sw=2 tw=99 et:

#include "pack.h"

#include <stdexcept>
#include <iostream>
#include <fstream>
#include <vector>

using namespace std;

int
main(int argc, char** argv)
try
{
  if (argc != 3 || !argv[1] || !argv[2]) {
    cerr << "Usage: asmjspack in.js out.asm" << endl;
    return -1;
  }

  vector<char> in_chars;
  ifstream in_stream(argv[1], ios::binary | ios::ate);
  in_stream.exceptions(ios::failbit | ios::badbit);
  in_chars.resize(in_stream.tellg());
  in_stream.seekg(0);
  in_stream.read(in_chars.data(), in_chars.size());
  in_chars.push_back('\0');
  in_stream.close();

  const asmjs::FuncNode& module = asmjs::parse(in_chars.data());

  ofstream out_stream(argv[2], ios::binary);
  out_stream.exceptions(ios::failbit | ios::badbit);

  asmjs::pack(out_stream, module);
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

