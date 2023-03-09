
// Add entry names to the global namespace
// In a separate function so the var defs don't leak out and the global constants created by them can be used instead
function add_entry_names_soundfx() {
    
    // These definitions are required in order for the C macro conversion to JS functions below to work
    // (C macro requires a NON-quoted string to create the var name, while js requires a string)

    // Tool
    let sig_fxhammer_info_1 = "sig_fxhammer_info_1";
    let sig_fxhammer_info_2 = "sig_fxhammer_info_2";
    let sig_cbtfx_info = "sig_cbtfx_info";
    let sig_valfx_info = "sig_valfx_info";
    let sig_vgm2gbsfx_aud3waveram_load = "sig_vgm2gbsfx_aud3waveram_load";

    // ==== SHARED CODE WITH C STARTS HERE ====

    // ==== FX Hammer Player
    // Records can be at any location

        // From "Sliced" 32KB SRAM File (*.sav) into two files (or ROM banks for assembler)
        // Slices a 32KB SRAM File (*.sav) into two files (or ROM banks for assembler):
            // 1) 16KB music player code and music data (*.bin)
            // "@FX HAMMER Version 1.0 (c)2000 Aleksi Eeben (email:aleksi@cncd.fi)";
            // FX@HAMMER@V1:0@@@ ... @<2000@ALEKSI@EEBEN@
            DEF_PATTERN_STR(sig_fxhammer_info_1, "FX HAMMER");
            DEF_PATTERN_STR(sig_fxhammer_info_2, "FX@HAMMER");

    // ==== CBT-FX
    // Records can be at any location
        // constant : https://github.com/datguywitha3ds/CBT-FX/tree/main
        DEF_PATTERN_STR(sig_cbtfx_info, "CBT-FX BY COFFEEBAT 2021");

    // ==== VAL-FX
    // Records can be at any location
        // constant: https://github.com/ISSOtm/val-fx/blob/master/val-fx.asm#L49
        DEF_PATTERN_STR(sig_valfx_info, "VAL-FX BY CVB");

    // ==== VGM2GBSFX
    // Records can be at any location
        // This may also ID GBStudio 3.1.0+
        // asm : https://github.com/untoxa/VGM2GBSFX/blob/main/src/gbz80/sfxplayer.c#L61
        DEF_PATTERN_BUF(sig_vgm2gbsfx_aud3waveram_load, AR_ARGS(0x2A, 0x47, 0xE6, 0x07, 0xFE, 0x05, 0x38, 0x5A, 0xFE, 0x07, 0x28, 0x50, 0xAF, 0xEA, 0x1A, 0xFF, 0x0E, 0x30, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C));
        // Full version, but prob not needed // {0x2A, 0x47, 0xE6, 0x07, 0xFE, 0x05, 0x38, 0x5A, 0xFE, 0x07, 0x28, 0x50, 0xAF, 0xEA, 0x1A, 0xFF, 0x0E, 0x30, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C, 0x2A, 0xE2, 0x0C};

    // ==== SHARED CODE WITH C ENDS HERE ====
}
