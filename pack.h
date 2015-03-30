#ifndef pack_h_
#define pack_h_

#include <iosfwd>

namespace asmjs {

class FuncNode;

const FuncNode& parse(char* src);
void pack(std::ostream& out, const FuncNode& module);

}  // namespace asmjs
#endif  // pack_h_
