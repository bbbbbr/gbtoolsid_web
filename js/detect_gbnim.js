// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2021


// ==== GB Nim
// Records can be at any location

function check_gbnim(u8RomBuffer) {

    set_memsearch_u8RomBuffer(u8RomBuffer);
    let entry;

    // ==== SHARED CODE WITH C STARTS HERE ====
    entry = FORMAT_ENTRY(TYPE_TOOLS, "gbnim", "");
    if (CHECK_PATTERN_AT_ADDR(sig_gbnim_startup_1, sig_gbnim_startup_1_at)) {
        if (CHECK_PATTERN_AT_ADDR(sig_gbnim_startup_2, sig_gbnim_startup_2_at)) {
            entry_add(entry);
        }
    }

    // ==== SHARED CODE WITH C ENDS HERE ====
}
