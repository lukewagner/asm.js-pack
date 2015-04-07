#ifndef unpack_h_
#define unpack_h_

#include <cstdint>
#include <vector>

namespace asmjs {

#ifdef CHECKED_OUTPUT_SIZE

std::vector<uint8_t> unpack(const uint8_t* packed);

#else

uint32_t read_unpacked_size(const uint8_t* packed);
void unpack(const uint8_t* packed, uint32_t unpacked_size, uint8_t* unpacked);

#endif

}  // namespace asmjs
#endif  // unpack_h_
