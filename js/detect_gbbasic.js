// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2021


// ==== GBBasic
// Records can be at any location

function check_gbbasic(u8RomBuffer) {

    set_memsearch_u8RomBuffer(u8RomBuffer);
    let entry;

    // ==== SHARED CODE WITH C STARTS HERE ====

    entry = FORMAT_ENTRY(TYPE_ENGINE, "GBBasic", "Alpha3");
    if (CHECK_PATTERN_AT_ADDR(sig_gbbasic_actor_init_alpha3, sig_gbbasic_actor_init_alpha3_at)) {
        entry_add(entry);
    }

    // ==== SHARED CODE WITH C ENDS HERE ====
}
