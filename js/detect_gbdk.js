// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2020


// const (.*)\[\]\s*=\s*{(.*)};
// const $1 = new Uint8Array([$2]);

// ==== GBDK ====
//
// These are almost all in crt0.s
//
// Bitmap defines
    const sig_gbdk_bmp = new Uint8Array([0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80]);
    const sig_gbdk_bmp_2x_to_2020_320_at = 0x0010;
    const sig_gbdk_bmp_2020_400_plus_at = 0x0070; // This entry may or MAY NOT be present for GBDK-2020 4.0.0+
// 0x20
    const sig_gbdk_0x20_at = 0x0020;
    // First Entry is ambiguous, must be combined
    //const sig_gbdk_0x20_GBDK_2x_to_2020_320 = new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
    const sig_gbdk_0x20_GBDK_2020_400 = new Uint8Array([0xE9, 0xFF, 0xFF, 0xFF]);
    const sig_gbdk_0x20_GBDK_2020_401_plus = new Uint8Array([0xE9, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x22, 0x0D, 0x20, 0xFC, 0xC9, 0xFF, 0xFF, 0xFF]);
// 0x30
    const sig_gbdk_0x30_at = 0x0030;
    // First Entry is ambiguous, must be combined
    // const sig_gbdk_0x20_GBDK_2x_to_2020_400 = = new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
    // const sig_gbdk_0x30_GBDK_2020_401_plus = new Uint8Array([0x1A, 0x22, 0x13, 0x0D, 0x20, 0xFA, 0xC9, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
    const sig_gbdk_0x30_GBDK_2020_401_plus = new Uint8Array([0x1A, 0x22, 0x13, 0x0D, 0x20, 0xFA, 0xC9]);
        // Had to shorten this for builds which have the crashhandler installed
        // Previously:
        // const sig_gbdk_0x30_GBDK_2020_401_plus  = {0x1A, 0x22, 0x13, 0x0D, 0x20, 0xFA, 0xC9, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};
        // Or could also check for the crashhandler as an alternate
        // const sig_gbdk_0x30_GBDK_2020_401_plus_with_crashhandler  = {0x1A, 0x22, 0x13, 0x0D, 0x20, 0xFA, 0xC9, 0xFF, 0xF3, 0xC3, 0x00, 0x02, 0xFF, 0xFF, 0xFF, 0xFF};    
// 0x80
    const sig_gbdk_0x80_at = 0x0080;
    const sig_gbdk_0x80_GBDK_4_0_0 = new Uint8Array([0xC5, 0xD5, 0x2A, 0xB6, 0x28, 0x09, 0xE5, 0x3A, 0x6E, 0x67, 0xE7, 0xE1, 0x23, 0x18, 0xF3, 0xD1, 0xC1, 0xE1, 0xF0, 0x41, 0xE6, 0x02, 0x20, 0xFA, 0xF1, 0xD9]);
// 0x100
    const sig_gbdk_0x100_at = 0x0100;
    const sig_gbdk_0x100_GBDK_4_0_4 = new Uint8Array([0x18, 0x51]);
    // ZGB uses a pre-release 4.0.5 where .code_start has been moved down, but is missing _refresh_OAM:: and .clear_WRAM
    const sig_gbdk_0x100_GBDK_4_0_5_v0_zgb = new Uint8Array([0x18, 0x55]);
// 0x150
    // These should only be used when stacked on other entries
        const sig_gbdk_0x150 = new Uint8Array([0xF3, 0x57, 0xAF, 0x31]);
            // This one is incorrect, 4.0.1 and 4.0.2 have an indistinguishable crt0.s
                // const sig_gbdk_0x150_GBDK_2x_to_2020_401_at   = 0x0150;
        const sig_gbdk_0x150_GBDK_2020_401_to_402_at  = 0x0153;
        // 0x0153
        const sig_gbdk_0x153_GBDK_2020_403_plus = new Uint8Array([0xF3, 0x57, 0x31]);
        const sig_gbdk_0x153_GBDK_2020_403_plus_at = 0x0153;
        // 0x0157
        const sig_gbdk_0x157_GBDK_2020_405_plus = new Uint8Array([0xF3, 0x57, 0x58, 0x31]);
        const sig_gbdk_0x157_GBDK_2020_405_plus_at = 0x0157;
        // _refresh_OAM:: crt0.s JP (HL) was replaced with // JP      .refresh_OAM + (.refresh_OAM_DMA - .start_refresh_OAM)
        const sig_gbdk_0x157_GBDK_2020_405_v1 = new Uint8Array([0xF3, 0x57, 0x58, 0x31]);
        const sig_gbdk_0x157_GBDK_2020_405_v1_at = 0x0157;
    // .clear_WRAM:: Tail
            // Single instruction test is ok, but there is a slightly larger block shortly after:
            // const sig_gbdk_0x00B7_GBDK_2020_410_plus = new Uint8Array([0xAF}; // "xor a".Was [0xD5, 0xAF] (push de, xor ]);
            // const sig_gbdk_0x00B7_GBDK_2020_410_plus_at = 0x00B7;
        // 4.0.5-v1 crt0.s : had a "JP (HL)" after "_refresh_OAM::" ->  removed in 4.1.0 -> which shifted most of ".clear_WRAM:"
        const  sig_gbdk_clear_WRAM_tail_GBDK_2020_405_v1 = new Uint8Array([0x67, 0xAF, 0x6F, 0x0E, 0xA0, 0xEF, 0xD1, 0xC9]);
        const sig_gbdk_clear_WRAM_tail_GBDK_2020_405_v1_at = 0x00C7;
            // Optional extra test for 4.0.5.v1: 0x00B7: 0xE9 (jp hl) -> 4.0.5.v2 / 4.0.6  0x00B7: 0xD5  ("push de" got bumped upward to 0xB7)
        // 4.0.5-v2 / 4.0.5 crt0.s : had a "push de" after ".clear_WRAM:" which shifted everything one byte earlier in ROM
        const  sig_gbdk_clear_WRAM_tail_GBDK_2020_405_v2_to_406 = new Uint8Array([0x67, 0xAF, 0x6F, 0x0E, 0xA0, 0xEF, 0xD1, 0xC9]);
        const sig_gbdk_clear_WRAM_tail_GBDK_2020_405_v2_to_406_at = 0x00C6;
        // 4.1.0+
        const  sig_gbdk_clear_WRAM_tail_GBDK_2020_410_plus = new Uint8Array([0x67, 0xAF, 0x6F, 0x0E, 0xA0, 0xEF, 0xC9]);
        const sig_gbdk_clear_WRAM_tail_GBDK_2020_410_plus_at = 0x00C5;

// Check for GBDK 2.x - GBDK-2020
//
// If match is found: calls setTools() and returns true
//
function checkGBDK(u8RomBuffer) {

    var entry = {type: TYPE_TOOLS, name: STR_GBDK, version: ""};

    // GBDK-2020 4.0.0
    if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x80_GBDK_4_0_0, sig_gbdk_0x80_at)) {
        // GBDK-2020 4.0.0 (Additional test to strengthen match)
        if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x20_GBDK_2020_400, sig_gbdk_0x20_at)) {
            entry_add_with_version(entry, STR_GBDK_2020_4_0_0);
            return true;
        }
    }

    // GBDK 2.x - GBDK-2020 3.2.0
    if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_bmp, sig_gbdk_bmp_2x_to_2020_320_at)) {
        entry_add_with_version(entry, STR_GBDK_2_x_to_2020_3_2_0);
        return true;
    }


    // GBDK-2020 4.0.1 and later
    if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x20_GBDK_2020_401_plus, sig_gbdk_0x20_at)) {

        // GBDK-2020 4.0.1 and later (Additional test to strengthen match)
        if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x30_GBDK_2020_401_plus, sig_gbdk_0x30_at)) {

            //  GBDK-2020 4.0.1 - 4.0.2
            if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x150, sig_gbdk_0x150_GBDK_2020_401_to_402_at)) {
                entry_add_with_version(entry, STR_GBDK_2020_4_0_1_to_4_0_2);
                return true;
            }

            // GBDK-2020 4.0.3 - 4.0.4
            if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x153_GBDK_2020_403_plus, sig_gbdk_0x153_GBDK_2020_403_plus_at)) {

                // GBDK-2020 4.0.4 and later
                if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x100_GBDK_4_0_4, sig_gbdk_0x100_at)) {
                    entry_add_with_version(entry, STR_GBDK_2020_4_0_4);
                    return true;
                }

                entry_add_with_version(entry, STR_GBDK_2020_4_0_3);
                return true;
            }

            // 4.0.5+
            if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x157_GBDK_2020_405_plus, sig_gbdk_0x157_GBDK_2020_405_plus_at)) {

                // 4.0.5.v1 was retracted and binaries replaced after 2 months. Maybe only available in ZGB 2021.2?
                if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_clear_WRAM_tail_GBDK_2020_405_v1, sig_gbdk_clear_WRAM_tail_GBDK_2020_405_v1_at)) {
                    entry_add_with_version(entry, STR_GBDK_2020_4_0_5_v1_retracted);
                    return true;
                }
                // Standard 4.0.5 (non-retracted 4.0.5.v1) cannot be distinguished from 4.0.6 based on the contents of crt0.s
                else if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_clear_WRAM_tail_GBDK_2020_405_v2_to_406, sig_gbdk_clear_WRAM_tail_GBDK_2020_405_v2_to_406_at)) {
                    entry_add_with_version(entry, STR_GBDK_2020_4_0_5_to_4_0_6);
                    return true;
                }
                // 4.1.0+
                else if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_clear_WRAM_tail_GBDK_2020_410_plus, sig_gbdk_clear_WRAM_tail_GBDK_2020_410_plus_at)) {
                    entry_add_with_version(entry, STR_GBDK_2020_4_1_0_plus);
                    return true;
                }
                // Some ZGB versions uses a GBDK version somewhere between 4.0.4 and 4.0.5.v1
                else if(checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x100_GBDK_4_0_5_v0_zgb, sig_gbdk_0x100_at)) {
                    entry_add_with_version(entry, STR_GBDK_2020_4_0_5_v0_zgb);
                    return true;
                }
            }

            // Optional broader detection
            // It's GBDK 4.x but unclear what version
            entry_add_with_version(entry, STR_GBDK_2020_4_UNKNOWN);

        } // end GBDK-2020 4.0.1 and later extra match
    } // end GBDK-2020 4.0.1 and later

    return false;
}
