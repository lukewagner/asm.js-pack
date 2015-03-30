#ifndef unpack_h_
#define unpack_h_

#include <cstdint>
#include <vector>

namespace asmjs {

std::vector<uint8_t> unpack(const uint8_t* in);

}  // namespace asmjs
#endif  // unpack_h_
