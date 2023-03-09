// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2021


// ==== Turbo Rascal Syntax Error

// Check for Turbo Rascal Syntax Error
function check_turborascal(u8RomBuffer) {

    set_memsearch_u8RomBuffer(u8RomBuffer);
    let entry;
    
    let utf8Encoder = new TextEncoder();

    // 0x0134
    // May get added to the header as a post-processing step
    const sig_turborascal_header_at = 0x0134;
    const sig_turborascal_header = utf8Encoder.encode("TRSE GB");

    entry = FORMAT_ENTRY(TYPE_TOOLS, "Turbo Rascal Syntax Error", "");
    if (CHECK_PATTERN_AT_ADDR(sig_turborascal_header, sig_turborascal_header_at))
        entry_add(entry);
}
