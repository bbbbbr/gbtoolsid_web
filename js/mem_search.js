// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2020

var memsearch_u8RomBuffer;
var addr_last_match = 0;

function get_addr_last_match() {
    return addr_last_match;
}

// Compare two memory buffers at given adddress offsets for [length]
//
// Expects Uint8Array() for both buffer parameters
//
function memcmp_at_u8(buf1, addr1, buf2, addr2, compare_length)
{
    if ((compare_length > (buf1.byteLength - addr1)) ||
        (compare_length > (buf2.byteLength - addr2)))
        return false;

    let bin1 = new Uint8Array(buf1);
    let bin2 = new Uint8Array(buf2);

    for (var i = 0 ; i < compare_length ; i++)
    {
        if (bin1[addr1 + i] !== bin2[addr2 + i]) return false;
    }
    addr_last_match = addr1;
    return true;
}


// Test for a pattern at a specific address
//
// Expects Uint8Array() for both buffer parameters
//
function checkPatternAtAddr_u8(u8DataBuf, u8PatternBuf, index) {

    if (memcmp_at_u8(u8DataBuf, index, u8PatternBuf, 0, u8PatternBuf.length)) {
        // appendInfoText("checkPatternAtAddr_u8 yes found\n");
        return true;
    } else {
        // appendInfoText("checkPatternAtAddr_u8 NOT FOUND\n");
        return false;
    }
}



// Try to find a pattern in a buffer
//
// No memmem on MinGW, so use the same for both instead of:
// return (memmem(g_p_searchbuf, g_searchbuf_len, p_pattern, pattern_len) != NULL);
//
// Expects Uint8Array() for both parameters
//
function findPattern_u8(u8DataBuf, u8PatternBuf) {

    if ((u8DataBuf.length === 0) ||
        (u8PatternBuf.length === 0)  ||
        (u8PatternBuf.length > u8DataBuf.length))
        return false;

    let maxLength = (u8DataBuf.length - u8PatternBuf.length);

    // Loop through search buffer (end index is adjusted down based on pattern length
    let pat_match_idx;
    for (let c = 0; c < maxLength; c++) {

            pat_match_idx = 0;
            // Try to match the whole pattern
            while (u8DataBuf[c] === u8PatternBuf[pat_match_idx]) {
                c++;
                pat_match_idx++;
                if (pat_match_idx >= u8PatternBuf.length) {
                    addr_last_match = c - pat_match_idx; // Get stat of match as rom buffer index - match count
                    return true;
                }
                if (c >= maxLength) return false;
            }
            // If pattern match failed then rewind by current amount matched (if no match then 0, no change)
            c -= pat_match_idx;
    }

    return false;
}

// To avoid having to pass the buffer in for each search,
// allow calling function to set a local version.
function set_memsearch_u8RomBuffer(u8RomBuffer) {
    memsearch_u8RomBuffer = u8RomBuffer;
}

// For code copy & paste compat between C version and JS version
function FIND_PATTERN_BUF(u8PatternBuf) {
    return findPattern_u8(memsearch_u8RomBuffer, u8PatternBuf);
}

function FIND_PATTERN_STR_NOTERM(u8PatternBuf) {
    return findPattern_u8(memsearch_u8RomBuffer, u8PatternBuf);
}

function FORMAT_ENTRY(e_type, e_name, e_version) {
    return {type: e_type, name: e_name, version: e_version};
}

// For code copy & paste compat between C version and JS version
function CHECK_PATTERN_AT_ADDR(u8PatternBuf, check_addr) {
    return checkPatternAtAddr_u8(memsearch_u8RomBuffer, u8PatternBuf, check_addr);
}


// To avoid having to pass the buffer in for each search,
// allow calling function to set a local version.
function set_memsearch_u8RomBuffer(u8RomBuffer) {
    memsearch_u8RomBuffer = u8RomBuffer;
}


function window_add_property(prop_name, prop_value){
  if (! window.hasOwnProperty(prop_name)) {
    Object.defineProperty(window, prop_name, {
        value: prop_value,
        configurable: false,
        writable: false
    });
  }
}

function DEF_NAME_STR(varname, str_content) {

    let utf8Encoder = new TextEncoder();
    // Equiv example: const STR_GBDK_2_x_to_2020_3_2_0 = "2.x - 2020.3.2.0";
    window_add_property(varname, str_content);
}


function DEF_PATTERN_STR(varname, str_content) {

    let utf8Encoder = new TextEncoder();
    // Equiv example: const sig_str_devsound_lite = utf8Encoder.encode("DevSound Lite");
    window_add_property(varname, utf8Encoder.encode(str_content));
}

function DEF_PATTERN_ADDR(varname, addr) {

    // Equiv example: let sig_gbdk_0x30_at = "sig_gbdk_0x30_at";
    window_add_property(varname, addr);
}

function AR_ARGS() {
    return new Uint8Array ([...arguments]);
}

function DEF_PATTERN_BUF(varname, buf_content) {

    // Equiv example: const sig_gbsoundsystem_MultiSFXLoop = new Uint8Array([0x2A, 0x4E, 0x06, 0x00, 0x87, 0xCB, 0x10, 0x87, 0xCB, 0x10, 0x87, 0xCB, 0x10]);
    window_add_property(varname, buf_content);
}

function GET_ADDR_LAST_MATCH() {
    return get_addr_last_match();
}