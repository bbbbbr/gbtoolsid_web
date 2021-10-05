// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2020



// ==== ZGB ====
// All ZGB records can be at any location (depends on where the linker places them)
    const sig_zgb_sound = new Uint8Array([0x05, 0x04, 0x05, 0x04, 0x03, 0x10, 0xFF, 0x16, 0xFF, 0x1A, 0xFF, 0x20, 0xFF, 0x24, 0xFF]);
    const sig_zgb_2017 = new Uint8Array([0xF8, 0x02, 0x4E, 0x23, 0x46, 0xF8, 0x04, 0x11, 0x41, 0xFF, 0x1A, 0xE6, 0x02]);
    const sig_zgb_2020_0_pushbank = new Uint8Array([0x34, 0x4E, 0x23, 0x46, 0x02, 0x01, 0x00, 0x20, 0x02]);
    const sig_zgb_2020_0_popbank = new Uint8Array([0x35, 0x4E, 0x23, 0x46, 0x0A, 0x01, 0x00, 0x20, 0x02]);
    const sig_zgb_2020_1_plus_pushbank = new Uint8Array([0x34, 0x4E, 0x23, 0x46, 0xFA, 0x90, 0xFF, 0x02, 0xF8, 0x02, 0x7E, 0xEA, 0x90, 0xFF, 0xEA, 0x00, 0x20]);
    const sig_zgb_2020_1_plus_popbank = new Uint8Array([0x4E, 0x23, 0x46, 0x0A, 0xEA, 0x90, 0xFF, 0xEA, 0x00, 0x20, 0x2B, 0x35]);


    // Present in 2020.1
    // https://github.com/Zal0/ZGB/compare/v2020.1...v2020.2#diff-807655bd4ab08ec4b981f43ea2fc0d095db3078ea2b7f1ab4a3d985aa8528e0fL60
    const sig_zgb_2020_1_settile = new Uint8Array([0xF8 ,0x02 ,0x4E ,0x23 ,0x46 ,0xF8 ,0x04 ,0x11 , 0x41, 0xFF, 0x1A ,0xE6 ,0x02 ,0x20 ,0xF9 ,0x7E ,0x02 ,0xC9]);
    // Present in 2020.2+
    // https://github.com/Zal0/ZGB/compare/v2020.1...v2020.2#diff-807655bd4ab08ec4b981f43ea2fc0d095db3078ea2b7f1ab4a3d985aa8528e0fR60
    const sig_zgb_2020_2_plus_settile = new Uint8Array([0xF8 ,0x02 ,0x4E ,0x23 ,0x46 ,0xF8 ,0x04 ,0xFA ,0x41 ,0xFF ,0xE6 ,0x02 ,0x20 ,0xF9 ,0x7E ,0x02 ,0xC9]);

    // Present until 2021.0, removed in 2021.1
    // https://github.com/Zal0/ZGB/compare/v2021.0...v2021.1#diff-931c0cc99a46f6a0f5a477d9ff63eb1e31108cb60e6e40bb50529fa6f2380d00L75
    const sig_zgb_2021_0_flushoamsprite = new Uint8Array([0x2A, 0x02, 0x0c, 0x2A, 0x02, 0x0C, 0x2A, 0x02, 0x0C, 0x2A, 0x02, 0x0C]);

// ==== GBDK refs ====
    // For ZGB 2020.2 vs 2021.0
    const sig_zgb_gbdk_bmp = new Uint8Array([0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80]);
    const sig_zgb_gbdk_bmp_2x_to_2020_320_at = 0x0010;


// TODO: early ZGB titles (2016 - 2017) aren't reliably detected. Consider dropping the sound table requirement.

// Check ZGB engine
//
// If match is found: calls setTools() and returns true
//
function checkZGB(u8RomBuffer) {

    var entry = {type: TYPE_ENGINE, name: "ZGB", version: ""};

    // Exception to the rule: The Squire fails this due to removing ZGB default sound consts
    // https://freshdeus.itch.io/the-squire-gameboy
    // So the requirement is relaxed for versions after 2020.0 which have additional tests
    //
    // Require sound const pattern, as starting filter
    if (findPattern_u8(u8RomBuffer, sig_zgb_sound)) {

        if (findPattern_u8(u8RomBuffer, sig_zgb_2017)) {
            entry_add_with_version(entry, "2016-2017");
            return true;
        }

        // ZGB 2020.0
        if ((findPattern_u8(u8RomBuffer, sig_zgb_2020_0_pushbank)) &&
            (findPattern_u8(u8RomBuffer, sig_zgb_2020_0_popbank))) {

            entry_add_with_version(entry, "2020.0");
            return true;
        }
    }

    // ZGB 2020.1
    if ((findPattern_u8(u8RomBuffer, sig_zgb_2020_1_plus_pushbank)) &&
        (findPattern_u8(u8RomBuffer, sig_zgb_2020_1_plus_popbank))) {

        if (findPattern_u8(u8RomBuffer, sig_zgb_2020_1_settile)) {
            entry_add_with_version(entry, "2020.1");
            return true;
        }
        else if (findPattern_u8(u8RomBuffer, sig_zgb_2020_2_plus_settile)) {

            // v2020.2 - gbdk 2020 v3.1.1 - Jun 5, 2020
            // Use sig for: GBDK 2.x - GBDK-2020 3.2.0
            if (checkPatternAtAddr_u8(u8RomBuffer, sig_zgb_gbdk_bmp, sig_zgb_gbdk_bmp_2x_to_2020_320_at)) {
                entry_add_with_version(entry, "2020.2");
                return true;
            }

            // 2021.0 -  gbdk 2020 v4.0.2 - Jan 22, 2021
            // Could also check via GBDK version
            // const uint8_t sig_gbdk_0x150[] = {0xF3, 0x57, 0xAF, 0x31};
            // const uint32_t sig_gbdk_0x150_GBDK_2020_401_to_402_at  = 0x0153;
            //
            if (findPattern_u8(u8RomBuffer, sig_zgb_2021_0_flushoamsprite)) {
                entry_add_with_version(entry, "2021.0");
                return true;
            }

            // 2021.1 could also be checked with GBDK 4.0.5
            // const uint8_t sig_gbdk_0x157_GBDK_2020_405_plus[] = {0xF3, 0x57, 0x58, 0x31};
            // const uint32_t sig_gbdk_0x157_GBDK_2020_405_plus_at = 0x0157;
            //
            entry_add_with_version(entry, "2021.1+");
            return true;
        }
    }

    return false;
}
