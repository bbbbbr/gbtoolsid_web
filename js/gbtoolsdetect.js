// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2020


///------------


function gbToolsDetect(u8RomBuffer, filename) { // , strict_mode) {

    let strict_mode = false;

    let result_gbdk     = false;
    let result_zgb      = false;
    let result_gbstudio = false;

    // Reset detected results to avoid showing previous data in new output
    reset_entries();

    result_gbdk = checkGBDK(u8RomBuffer);

    // If strict mode is turned on, only test
    // for ZGB and GBStudio when GBDK is present
    if ((strict_mode === false) || (result_gbdk === true)) {
        result_zgb      = checkZGB(u8RomBuffer);
        result_gbstudio = checkGBStudio(u8RomBuffer);
    }

    prependInfoText(renderOutput(filename));
}


