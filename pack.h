#ifndef pack_h_
#define pack_h_

#include <iosfwd>
#include <cstdint>

namespace asmjs {

class FuncNode;

const FuncNode& parse(char* src);
void pack(std::ostream& out, const FuncNode& module);
void patch_unpacked_size(std::ostream& out, uint32_t unpacked_size);

}  // namespace asmjs
#endif  // pack_h_
