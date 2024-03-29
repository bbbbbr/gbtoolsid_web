
// Add entry names to the global namespace
// In a separate function so the var defs don't leak out and the global constants created by them can be used instead
function add_entry_names_gbbasic() {

    // These definitions are required in order for the C macro conversion to JS functions below to work
    // (C macro requires a NON-quoted string to create the var name, while js requires a string)

    let sig_gbbasic_actor_init_alpha3 = "sig_gbbasic_actor_init_alpha3";
    let sig_gbbasic_actor_init_alpha3_at = "sig_gbbasic_actor_init_alpha3_at";

    // ==== SHARED CODE WITH C STARTS HERE ====

    // ==== GBBasic ====
    //
    DEF_PATTERN_BUF(sig_gbbasic_actor_init_alpha3, AR_ARGS(0x00, 0x19, 0xE5, 0x7D, 0xF8, 0x04, 0x77, 0xE1, 0x7C, 0xF8, 0x03, 0x32, 0x2A, 0x66, 0x6F, 0xAF, 0x22, 0x77, 0xE1, 0xE5, 0xAF, 0x22, 0x77, 0xF8, 0x02, 0x2A, 0x5F, 0x56));
    DEF_PATTERN_ADDR(sig_gbbasic_actor_init_alpha3_at, 0x861A); // Bank 2: 0x461A

    // ==== GBBASIC
    // https://github.com/gbbasic/prototype
    //

    // Bank 2: 0x461A - 0x4634, partway through actor_init
    //
    // add  hl, de
    // push hl
    // ld   a, l
    // ld   hl, sp+4
    // ld   [hl], a
    // pop  hl
    // ld   a, h
    // ld   hl, sp+3
    // ldd  [hl], a
    // ldi  a, [hl]
    // ld   h, [hl]
    // ld   l, a
    // xor  a
    // ldi  [hl], a
    // ld   [hl], a
    // pop  hl
    // push hl
    // xor  a
    // ldi  [hl], a
    // ld   [hl], a
    // ld   hl, sp+2
    // ldi  a, [hl]
    // ld   e, a
    // ld   d, [hl]

    // ==== SHARED CODE WITH C ENDS HERE ====
}
