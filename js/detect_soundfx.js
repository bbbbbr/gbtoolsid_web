// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2021


// ==== Sound FX
// Records can be at any location

// Check for Sound FX drivers
function check_soundfx(u8RomBuffer) {

    let utf8Encoder = new TextEncoder();

    // From "Sliced" 32KB SRAM File (*.sav) into two files (or ROM banks for assembler)
    // Slices a 32KB SRAM File (*.sav) into two files (or ROM banks for assembler):
        // 1) 16KB music player code and music data (*.bin)
        // "@FX HAMMER Version 1.0 (c)2000 Aleksi Eeben (email:aleksi@cncd.fi)";
        // FX@HAMMER@V1:0@@@ ... @<2000@ALEKSI@EEBEN@
        const sig_fxhammer_info_1 = utf8Encoder.encode("FX HAMMER");
        const sig_fxhammer_info_2 = utf8Encoder.encode("FX@HAMMER");


    let entry = {type: TYPE_SOUNDFX, name: "FX Hammer", version: ""};

    // FXHammer music 1.0
    if (findPattern_u8(u8RomBuffer, sig_fxhammer_info_1) ||
        findPattern_u8(u8RomBuffer, sig_fxhammer_info_2))
        entry_add(entry);
}
