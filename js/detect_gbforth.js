// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2021


// ==== GBForth
// Records can be at any location

function check_gbforth(u8RomBuffer) {

    set_memsearch_u8RomBuffer(u8RomBuffer);
    let entry;

    // ==== SHARED CODE WITH C STARTS HERE ====

    entry = FORMAT_ENTRY(TYPE_TOOLS, "GBForth", "");
    if (FIND_PATTERN_BUF(sig_gbforth_startup_1)) {
        // Gap of one byte, then next pattern
        if (CHECK_PATTERN_AT_ADDR(sig_gbforth_startup_2, (GET_ADDR_LAST_MATCH() + sig_gbforth_startup_1_next_at))) {
            // Gap of one byte, then next pattern
            if (CHECK_PATTERN_AT_ADDR(sig_gbforth_startup_3, (GET_ADDR_LAST_MATCH() + sig_gbforth_startup_2_next_at))) {
                entry_add(entry);
            }
        }
    }

    // ==== SHARED CODE WITH C ENDS HERE ====
}
