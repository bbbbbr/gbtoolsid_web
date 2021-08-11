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
    //const uint8_t sig_gbdk_0x20_GBDK_2x_to_2020_320 = new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
    const sig_gbdk_0x20_GBDK_2020_400 = new Uint8Array([0xE9, 0xFF, 0xFF, 0xFF]);
    const sig_gbdk_0x20_GBDK_2020_401_plus = new Uint8Array([0xE9, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x22, 0x0D, 0x20, 0xFC, 0xC9, 0xFF, 0xFF, 0xFF]);
// 0x30
    const sig_gbdk_0x30_at = 0x0030;
    // First Entry is ambiguous, must be combined
    // const sig_gbdk_0x20_GBDK_2x_to_2020_400 = = new Uint8Array([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
    const sig_gbdk_0x30_GBDK_2020_401_plus = new Uint8Array([0x1A, 0x22, 0x13, 0x0D, 0x20, 0xFA, 0xC9, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]);
// 0x80
    const sig_gbdk_0x80_at = 0x0080;
    const sig_gbdk_0x80_GBDK_4_0_0 = new Uint8Array([0xC5, 0xD5, 0x2A, 0xB6, 0x28, 0x09, 0xE5, 0x3A, 0x6E, 0x67, 0xE7, 0xE1, 0x23, 0x18, 0xF3, 0xD1, 0xC1, 0xE1, 0xF0, 0x41, 0xE6, 0x02, 0x20, 0xFA, 0xF1, 0xD9]);
// 0x100
    const sig_gbdk_0x100_at = 0x0100;
    const sig_gbdk_0x100_GBDK_4_0_4 = new Uint8Array([0x18, 0x51]);
// 0x150
    // These should only be used when stacked on other entries
    const sig_gbdk_0x150 = new Uint8Array([0xF3, 0x57, 0xAF, 0x31]);
    const sig_gbdk_0x150_GBDK_2x_to_2020_401_at   = 0x0150;
    const sig_gbdk_0x150_GBDK_2020_401_to_402_at  = 0x0153;
    // 0x153
    const sig_gbdk_0x153 = new Uint8Array([0xF3, 0x57, 0x31]);
    const sig_gbdk_0x153_GBDK_2020_403_plus_at = 0x0153;


// Check for GBDK 2.x - GBDK-2020
//
// If match is found: calls setTools() and returns true
//
function checkGBDK(u8RomBuffer) {

    const str_gbdk = "GBDK";

    // GBDK-2020 4.0.0
    if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x80_GBDK_4_0_0, sig_gbdk_0x80_at)) {
        // GBDK-2020 4.0.0 (Additional test to strengthen match)
        if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x20_GBDK_2020_400, sig_gbdk_0x20_at)) {
            setTools(str_gbdk, "2020.4.0.0");
            return true;
        }
    }

    // GBDK 2.x - GBDK-2020 3.2.0
    if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_bmp, sig_gbdk_bmp_2x_to_2020_320_at)) {
        setTools(str_gbdk, "2.x - 2020-3.2.0");
        return true;
    }


    // GBDK-2020 4.0.1 and later
    if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x20_GBDK_2020_401_plus, sig_gbdk_0x20_at)) {
        // GBDK-2020 4.0.1 and later (Additional test to strengthen match)
        if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x30_GBDK_2020_401_plus, sig_gbdk_0x30_at)) {

            // GBDK Part 4 (0x150) GBDK-2020 4.0.1
            if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x150, sig_gbdk_0x150_GBDK_2x_to_2020_401_at)) {
                setTools(str_gbdk, "2020.4.0.1");
                return true;
            }

            //  GBDK-2020 4.0.2
            if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x150, sig_gbdk_0x150_GBDK_2020_401_to_402_at)) {
                setTools(str_gbdk, "2020.4.0.2");
                return true;
            }

            // GBDK-2020 4.0.3 and later
            if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x153, sig_gbdk_0x153_GBDK_2020_403_plus_at)) {
                setTools(str_gbdk, "2020.4.0.3+");

                // GBDK-2020 4.0.4 and later
                if (checkPatternAtAddr_u8(u8RomBuffer, sig_gbdk_0x100_GBDK_4_0_4, sig_gbdk_0x100_at)) {
                    setTools(str_gbdk, "2020.4.0.4+");
                    return true;
                }

                return true;
            }
        }
    }

    return false;
}
