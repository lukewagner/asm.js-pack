// vim: set ts=2 sw=2 tw=99 et:

#include "unpack.h"

#include <stdlib.h>
#include <stdio.h>
#include <string>

#ifdef EMSCRIPTEN
# include <emscripten.h>
#endif

using namespace std;

int
main(int argc, char** argv)
{
  if (argc != 3 || !argv[1] || !argv[2]) {
    fprintf(stderr, "Usage: asmjsunpack in.asm out.js");
    return -1;
  }

  string in_file_name = argv[1];
  string out_file_name = argv[2];

#ifdef EMSCRIPTEN
  in_file_name = "fs/" + in_file_name;
  out_file_name = "fs/" + out_file_name;
  EM_ASM(
          FS.mkdir('fs');
          FS.mount(NODEFS, { root: '.' }, '/fs');
  );
#endif

  // Read in packed .asm file bytes.
  vector<uint8_t> in_bytes;
  FILE* in_file = fopen(in_file_name.c_str(), "rb");
  if (!in_file) {
      fprintf(stderr, "Unable to open %s to read\n", in_file_name.c_str());
      return -1;
  }
  fseek(in_file, 0, SEEK_END);
  in_bytes.resize(ftell(in_file));
  fseek(in_file, 0, SEEK_SET);
  if (fread(in_bytes.data(), 1, in_bytes.size(), in_file) != in_bytes.size())
      abort();
  fclose(in_file);

  // Unpack .asm file into utf8 chars.
  vector<uint8_t> out_bytes(asmjs::read_unpacked_size(in_bytes.data()));
  asmjs::unpack(in_bytes.data(), out_bytes.size(), out_bytes.data());

  // Write the utf8 chars out to a .js file.
  FILE* out_file = fopen(out_file_name.c_str(), "wb");
  if (!out_file) {
      fprintf(stderr, "Unable to open %s to write\n", out_file_name.c_str());
      return -1;
  }
  fwrite(out_bytes.data(), 1, out_bytes.size(), out_file);
  fclose(out_file);

  return 0;
}
