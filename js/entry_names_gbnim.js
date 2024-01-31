
// Add entry names to the global namespace
// In a separate function so the var defs don't leak out and the global constants created by them can be used instead
function add_entry_names_gbnim() {

    // These definitions are required in order for the C macro conversion to JS functions below to work
    // (C macro requires a NON-quoted string to create the var name, while js requires a string)

    let sig_gbnim_startup_1_at = "sig_gbnim_startup_1_at";
    let sig_gbnim_startup_1 = "sig_gbnim_startup_1";
    let sig_gbnim_startup_2_at = "sig_gbnim_startup_2_at";
    let sig_gbnim_startup_2 = "sig_gbnim_startup_2";

    let sig_gbnim_exception_handle_string = "sig_gbnim_exception_handle_string";

    // ==== SHARED CODE WITH C STARTS HERE ====

    // ==== gbnim ====
    //
    // https://github.com/ZoomTen/pocket-clicker/blob/4b520a95e9b8b22d5b3860cac124b4ad6de2215d/src/asm/crt0/header_init_rstvectors.s#L121C1-L128C19
    DEF_PATTERN_ADDR(sig_gbnim_startup_1_at, 0x0176);
    DEF_PATTERN_BUF(sig_gbnim_startup_1, AR_ARGS(0x22, 0x77, 0xE0, 0x0F, 0xE0, 0x26));

    // https://github.com/ZoomTen/pocket-clicker/blob/4b520a95e9b8b22d5b3860cac124b4ad6de2215d/src/asm/crt0/header_init_rstvectors.s#L144C1-L158C10
    DEF_PATTERN_ADDR(sig_gbnim_startup_2_at, 0x0185);
    DEF_PATTERN_BUF(sig_gbnim_startup_2, AR_ARGS(0x0E, 0x0B, 0xF7, 0xCD, 0x92, 0x28, 0xE0, 0x4A, 0x3E, 0x07, 0xE0, 0x4B, 0x3E, 0xE4, 0xE0, 0x47, 0xE0, 0x48, 0xE0, 0x49, 0x3C));

    DEF_PATTERN_STR(sig_gbnim_exception_handle_string, "exception handling is not available");

    // ==== SHARED CODE WITH C ENDS HERE ====
}
