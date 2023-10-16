// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2021


// ==== Sound FX
// Records can be at any location

// Check for Sound FX drivers
function check_soundfx(u8RomBuffer) {

    set_memsearch_u8RomBuffer(u8RomBuffer);
    let entry;

    // ==== SHARED CODE WITH C STARTS HERE ====

    entry = FORMAT_ENTRY(TYPE_SOUNDFX,"FX Hammer", "");
    if (FIND_PATTERN_STR_NOTERM(sig_fxhammer_info_1) ||
        FIND_PATTERN_STR_NOTERM(sig_fxhammer_info_2) )
        entry_add(entry);

    entry = FORMAT_ENTRY(TYPE_SOUNDFX,"CBT-FX", "");
    if (FIND_PATTERN_STR_NOTERM(sig_cbtfx_info))
        entry_add(entry);

    entry = FORMAT_ENTRY(TYPE_SOUNDFX,"VAL-FX", "");
    if (FIND_PATTERN_STR_NOTERM(sig_valfx_info))
        entry_add(entry);

    entry = FORMAT_ENTRY(TYPE_SOUNDFX,"VGM2GBSFX", "");
    if (FIND_PATTERN_BUF(sig_vgm2gbsfx_aud3waveram_load))
        entry_add(entry);

    // ==== SHARED CODE WITH C ENDS HERE ====
}
