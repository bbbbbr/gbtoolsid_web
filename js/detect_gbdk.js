// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2020


// Check for GBDK 2.x - GBDK-2020
//
// If match is found: calls setTools() and returns true
//
function checkGBDK(u8RomBuffer) {

    set_memsearch_u8RomBuffer(u8RomBuffer);
    let entry;

    // ==== SHARED CODE WITH C STARTS HERE ====

    entry = FORMAT_ENTRY(TYPE_TOOLS, STR_GBDK, "");

    // GBDK-2020 4.0.0
    if (CHECK_PATTERN_AT_ADDR(sig_gbdk_0x80_GBDK_4_0_0, sig_gbdk_0x80_at)) {
        // GBDK-2020 4.0.0 (Additional test to strengthen match)
        if (CHECK_PATTERN_AT_ADDR(sig_gbdk_0x20_GBDK_2020_400_0x20, sig_gbdk_0x20_at)) {
            entry_add_with_version(entry, STR_GBDK_2020_4_0_0);
            return true;
        }
    }

    // GBDK 2.x - GBDK-2020 3.2.0
    if (CHECK_PATTERN_AT_ADDR(sig_gbdk_bmp, sig_gbdk_bmp_2x_to_2020_320_at)) {
        entry_add_with_version(entry, STR_GBDK_2_x_to_2020_3_2_0);
        return true;
    }


    // GBDK-2020 4.0.1 and later
    if ((CHECK_PATTERN_AT_ADDR(sig_gbdk_0x20_GBDK_2020_401_plus_0x20, sig_gbdk_0x20_at)) &&
        (CHECK_PATTERN_AT_ADDR(sig_gbdk_0x20_GBDK_2020_401_plus_0x28, sig_gbdk_0x28_at))) {

        // GBDK-2020 4.0.1 and later (Additional test to strengthen match)
        if (CHECK_PATTERN_AT_ADDR(sig_gbdk_0x30_GBDK_2020_401_plus, sig_gbdk_0x30_at)) {

            //  GBDK-2020 4.0.1 - 4.0.2
            if (CHECK_PATTERN_AT_ADDR(sig_gbdk_0x150, sig_gbdk_0x150_GBDK_2020_401_to_402_at)) {
                entry_add_with_version(entry, STR_GBDK_2020_4_0_1_to_4_0_2);
                return true;
            }

            // GBDK-2020 4.0.3 - 4.0.4
            if (CHECK_PATTERN_AT_ADDR(sig_gbdk_0x153_GBDK_2020_403_plus, sig_gbdk_0x153_GBDK_2020_403_plus_at)) {

                // GBDK-2020 4.0.4 and later
                if (CHECK_PATTERN_AT_ADDR(sig_gbdk_0x100_GBDK_4_0_4, sig_gbdk_0x100_at)) {
                    entry_add_with_version(entry, STR_GBDK_2020_4_0_4);
                    return true;
                }

                entry_add_with_version(entry, STR_GBDK_2020_4_0_3);
                return true;
            }

            // 4.0.5+
            if (CHECK_PATTERN_AT_ADDR(sig_gbdk_0x157_GBDK_2020_405_plus, sig_gbdk_0x157_GBDK_2020_405_plus_at)) {

                // 4.0.5.v1 was retracted and binaries replaced after 2 months. Maybe only available in ZGB 2021.2?
                if (CHECK_PATTERN_AT_ADDR(sig_gbdk_clear_WRAM_tail_GBDK_2020_405_v1, sig_gbdk_clear_WRAM_tail_GBDK_2020_405_v1_at)) {
                    entry_add_with_version(entry, STR_GBDK_2020_4_0_5_v1_retracted);
                    return true;
                }
                // Standard 4.0.5 (non-retracted 4.0.5.v1) cannot be distinguished from 4.0.6 based on the contents of crt0.s
                else if (CHECK_PATTERN_AT_ADDR(sig_gbdk_clear_WRAM_tail_GBDK_2020_405_v2_to_406, sig_gbdk_clear_WRAM_tail_GBDK_2020_405_v2_to_406_at)) {
                    entry_add_with_version(entry, STR_GBDK_2020_4_0_5_to_4_0_6);
                    return true;
                }
                // 4.1.0+
                else if (CHECK_PATTERN_AT_ADDR(sig_gbdk_clear_WRAM_tail_GBDK_2020_410_plus, sig_gbdk_clear_WRAM_tail_GBDK_2020_410_plus_at)) {

                    if (CHECK_PATTERN_AT_ADDR(sig_gbdk_0xCC_GBDK_4_2_0_vsync, sig_gbdk_0xCC_at))
                        entry_add_with_version(entry, STR_GBDK_2020_4_2_0_plus);
                    else
                        entry_add_with_version(entry, STR_GBDK_2020_4_1_0_to_4_1_1);

                    return true;
                }
                // Some ZGB versions uses a GBDK version somewhere between 4.0.4 and 4.0.5.v1
                else if(CHECK_PATTERN_AT_ADDR(sig_gbdk_0x100_GBDK_4_0_5_v0_zgb, sig_gbdk_0x100_at)) {
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

   // ==== SHARED CODE WITH C ENDS HERE ====
}
