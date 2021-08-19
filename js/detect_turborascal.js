// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2021


// ==== Turbo Rascal Syntax Error

// Check for Turbo Rascal Syntax Error
function check_turborascal(u8RomBuffer) {

    let utf8Encoder = new TextEncoder();

    // 0x0134
    // May get added to the header as a post-processing step
    const sig_turborascal_header_at = 0x0134;
    const sig_turborascal_header = utf8Encoder.encode("TRSE GB");

    let entry = {type: TYPE_TOOLS, name: "Turbo Rascal Syntax Error", version: ""};
    if (checkPatternAtAddr_u8(u8RomBuffer, sig_turborascal_header, sig_turborascal_header_at))
        entry_add(entry);
}
