// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2021


// ==== Various
// Records can be at any location

// Check for misc sound drivers
function check_music(u8RomBuffer) {


    let utf8Encoder = new TextEncoder();

    const sig_str_ghx_audio = utf8Encoder.encode("GHX Audio Engine");
    const sig_str_ghx_sound = utf8Encoder.encode("GHX Sound Engine");

    const sig_str_devsound_standard = utf8Encoder.encode("DevSound GB music player");
    const sig_str_devsound_lite = utf8Encoder.encode("DevSound Lite");

    const sig_str_gbmusicplayer_audio = utf8Encoder.encode("GB Music Player Copyright VISUAL IMPACT BVBA");

    const sig_str_MusyX_1 = utf8Encoder.encode("MusyX Audio Tools");
    const sig_str_MusyX_2 = utf8Encoder.encode("MUSYX AUDIO TOOLS");
    const sig_str_MusyX_3 = utf8Encoder.encode("MusyX Soundtool");

    const sig_str_freaq_1 = utf8Encoder.encode("Stilianos Doussis");
    const sig_str_freaq_2 = utf8Encoder.encode("Gameboy Audio-System coded and Music composed by Stilianos Doussis");

    const sig_str_lsdj_1 = utf8Encoder.encode("LITTLESOUNDDJ.COM");
    const sig_str_lsdj_2 = utf8Encoder.encode("LITTLE SOUND DJ");

    // GBSoundSystem only (not 100% sure) : soundsys.asm : SSFP_multi_sfx
    const sig_gbsoundsystem_blitterobj_SSFP_multi_sfx = new Uint8Array([0x57, 0x78, 0x06, 0x00, 0x87, 0xCB, 0x10, 0x87, 0xCB, 0x10, 0x87, 0xCB, 0x10, 0x83, 0x6F, 0x3E, 0x00, 0x8A, 0x80, 0x67]);
    // Paragon5 only : sndsys_c.asm : MultiSFXLoop
    const sig_gbsoundsystem_MultiSFXLoop = new Uint8Array([0x2A, 0x4E, 0x06, 0x00, 0x87, 0xCB, 0x10, 0x87, 0xCB, 0x10, 0x87, 0xCB, 0x10]);
    const sig_str_gbsoundsystem_1 = utf8Encoder.encode("SoundSystem");
    const sig_str_gbsoundsystem_2 = utf8Encoder.encode("Hockenhull");

    // hUGEDriver
        // _load_note_data -> lookup_note : https://github.com/untoxa/hUGEBuild/blame/master/hUGEDriver.asm#L332
        // const sig_hugetracker_load_note_data = new Uint8Array([0x67, 0x84, 0x84, 0xC6, 0x02, 0x26, 0x00, 0x6F, 0x09, 0x3A, 0x4F, 0x3A, 0x47, 0x7E, 0xC9]);
        // https://github.com/SuperDisk/hUGEDriver/blob/e996cfab0b16bea6e394f269e89a5729d8421bb2/hUGEDriver.asm#L295 -> 308
        // const uint8_t sig_hugetracker_load_note_data_v2[] = {0x67, 0x84, 0x84, 0x26, 0x00, 0x6F, 0x09, 0x2A, 0x46, 0x23, 0x4E, 0xC9}
    // https://github.com/SuperDisk/hUGEDriver/blame/3e67d4ea8a27f5317fd5be73a534c543614130ef/hUGEDriver.asm#L760 -> 772
    const sig_hugetracker_fx_vol_slide_base_v1 = new Uint8Array([0x79, 0xE6, 0x0F, 0x57, 0x79, 0xE6, 0xF0, 0x5F, 0xCB, 0x33   ,0x7E, 0xE6, 0xF0, 0xCB, 0x37, 0x92]);
    // https://github.com/SuperDisk/hUGEDriver/blob/e996cfab0b16bea6e394f269e89a5729d8421bb2/hUGEDriver.asm#L736 -> 743
    const sig_hugetracker_fx_vol_slide_base_v2 = new Uint8Array([0x79, 0xE6, 0x0F, 0x57, 0x79, 0xE6, 0xF0, 0x5F, 0xCB, 0x33   ,0x78, 0x87, 0x87, 0x80, 0xC6, 0x12, 0x4F, 0xF2, 0xE6, 0xF0, 0xCB, 0x37, 0x92]);


    // engine.asm, tbe_thumbprint::
    const sig_tbengine_noisetable = utf8Encoder.encode("tbengine - sound driver by stoneface");

    // Black Box Music Player
    // May not be entirely accurate. Also, many trainers added to ROMs used it
    // From a 3 way diff between Infinite Bobs, Player.bin and Pocket Voice
    const sig_blackboxplayer_1 = new Uint8Array([0x09, 0x11, 0x30, 0xFF, 0x06, 0x10, 0x2A, 0x12, 0x13, 0x05, 0x20, 0xFA, 0x3E, 0x80, 0xE0, 0x1A, 0xC9, 0xAF, 0xE0, 0x1A, 0xC9]);
    const sig_blackboxplayer_2 = new Uint8Array([0xCB, 0x27, 0x4F, 0x06, 0x00, 0x09, 0x2A, 0xFE, 0x00, 0x28, 0x08, 0x47, 0x7E, 0x3D, 0x05, 0xCD]);


    // From "Sliced" 32KB SRAM File (*.sav) into two files (or ROM banks for assembler)
    // Slices a 32KB SRAM File (*.sav) into two files (or ROM banks for assembler):
        // 1) 16KB music player code and music data (*.bin)
        // "CARILLON PLAYER Version 1.0 (c)2000 Aleksi Eeben (email:aleksi@cncd.fi)";
        const sig_carillon_player_1 = utf8Encoder.encode("CARILLON PLAYER");
        // "CARILLON EDITOR Version 1.2 Free for all non-commercial use (c)2000-2001 Aleksi Eeben";
        const sig_carillon_player_2 = utf8Encoder.encode("CARILLON EDITOR");

    // PLAYER.asm / LP1.297.c, l_wave / wave[]
    // It's possible this doesn't pick up uses where the default wave instrument has changed
    const sig_lemon_wave_default = new Uint8Array([
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFD, 0xCB, 0xA8, 0x75, 0x43, 0x21, 0x00, 0x00, 0x00, 0x00, 0x00,
            0xFF, 0xFF, 0xFF, 0xFF, 0xB7, 0x42, 0x23, 0x46, 0x9B, 0xCD, 0xDB, 0x84, 0x00, 0x00, 0x00, 0x00,
            0xFF, 0x89, 0xCB, 0x88, 0xBA, 0x78, 0x99, 0x77, 0x88, 0x66, 0x78, 0x54, 0x77, 0x43, 0x67, 0x00]);
            // Continues below, but above is probably sufficient
            // 0xF8, 0xB8, 0xA9, 0x99, 0x89, 0x89, 0x88, 0x78, 0x78, 0x78, 0x77, 0x67, 0x66, 0x65, 0x74, 0x70,
            // 0x9B, 0xDE, 0xEF, 0xFF, 0xFF, 0xFE, 0xED, 0xB9, 0x64, 0x22, 0x10, 0x00, 0x00, 0x01, 0x22, 0x46,
            // 0xAD, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xDA, 0x52, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x25,
            // 0xFF, 0xFE, 0xDD, 0xCC, 0xBB, 0xAA, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x10, 0x00,
            // 0xBE, 0xEC, 0xBA, 0x98, 0x76, 0x54, 0x31, 0x14, 0xBE, 0xEC, 0xBA, 0x98, 0x76, 0x54, 0x31, 0x14]);

    // ==== gbt_player
    // gbt_wave: ; 8 sounds
    const sig_gbtplayer_gbt_wave = new Uint8Array([
        0xA5, 0xD7, 0xC9, 0xE1, 0xBC, 0x9A, 0x76, 0x31, 0x0C, 0xBA, 0xDE, 0x60, 0x1B, 0xCA, 0x03, 0x93,
        0xF0, 0xE1, 0xD2, 0xC3, 0xB4, 0xA5, 0x96, 0x87, 0x78, 0x69, 0x5A, 0x4B, 0x3C, 0x2D, 0x1E, 0x0F,
        0xFD, 0xEC, 0xDB, 0xCA, 0xB9, 0xA8, 0x97, 0x86, 0x79, 0x68, 0x57, 0x46, 0x35, 0x24, 0x13, 0x02]);

    // ==== MPlay (doesn't find all instances, may not be entirely accurate)
        // A possible LUT with "MPlay2" appended to the end
        // { 0x01, 0x6B, 0x01, 0xC9, 0x01, 0x23, 0x02, 0x77, 0x02, 0xC6, 0x02, 0x12, 0x03, 0x56, 0x03, 0x9B,
        // 0x03, 0xDA, 0x03, 0x16, 0x04, 0x4E, 0x04, 0x83, 0x04, 0xB5, 0x04, 0xE5, 0x04, 0x11, 0x05, 0x3B,
        // 0x05, 0x63, 0x05, 0x89, 0x05, 0xAC, 0x05, 0xCE, 0x05, 0xED, 0x05, 0x0A, 0x06, 0x27, 0x06, 0x42,
        // 0x06, 0x5B, 0x06, 0x72, 0x06, 0x89, 0x06, 0x9E, 0x06, 0xB2, 0x06, 0xC4, 0x06, 0xD6, 0x06, 0xE7,
        // 0x06, 0xF7, 0x06, 0x06, 0x07, 0x14, 0x07, 0x21, 0x07, 0x2D, 0x07, 0x39, 0x07, 0x44, 0x07, 0x4F,
        // 0x07, 0x59, 0x07, 0x62, 0x07, 0x6B, 0x07, 0x73, 0x07, 0x7B, 0x07, 0x83, 0x07, 0x8A, 0x07, 0x90,
        // 0x07, 0x97, 0x07, 0x9D, 0x07, 0xA2, 0x07, 0xA7, 0x07, 0xAC, 0x07, 0xB1, 0x07, 0xB6, 0x07, 0xBA,
        // 0x07, 0xBE, 0x07, 0xC1, 0x07, 0xC4, 0x07, 0xC8, 0x07, 0xCB, 0x07, 0xCE, 0x07, 0xD1, 0x07, 0xD4, 0x07, 0xD6,
        // Continues above, but above is probably sufficient
    const sig_mplay2 = new Uint8Array([0x07, 0xD9, 0x07, 0xDB, 0x07, 0xDD, 0x07, 0xDF, 0x07, 0x4D, 0x50, 0x6C, 0x61, 0x79, 0x32]);
    const sig_mplay1 = new Uint8Array([0x07, 0xD9, 0x07, 0xDB, 0x07, 0xDD, 0x07, 0xDF, 0x07, 0xCC, 0xCC, 0xCC, 0xCC, 0x00, 0x00, 0x00, 0x00, 0xCC, 0xCC, 0xCC, 0xCC, 0x00, 0x00, 0x00, 0x00]);


    let entry;

    entry = {type: TYPE_MUSIC, name: "GHX", version: ""};
    if (findPattern_u8(u8RomBuffer, sig_str_ghx_audio) ||
        findPattern_u8(u8RomBuffer, sig_str_ghx_sound))
        entry_add(entry);

    entry = {type: TYPE_MUSIC, name: "DevSound", version: "Standard"};
    if (findPattern_u8(u8RomBuffer, sig_str_devsound_standard))
        entry_add(entry);
    else {
        entry = {type: TYPE_MUSIC, name: "DevSound", version: "Lite"};
        if (findPattern_u8(u8RomBuffer,sig_str_devsound_lite))
            entry_add(entry);
    }

    entry = {type: TYPE_MUSIC, name: "Visual Impact", version: ""};
    if (findPattern_u8(u8RomBuffer, sig_str_gbmusicplayer_audio))
        entry_add(entry);

    entry = {type: TYPE_MUSIC, name: "MusyX", version: ""};
    if (findPattern_u8(u8RomBuffer, sig_str_MusyX_1) ||
        findPattern_u8(u8RomBuffer, sig_str_MusyX_2) ||
        findPattern_u8(u8RomBuffer, sig_str_MusyX_3))
        entry_add(entry);

    entry = {type: TYPE_MUSIC, name: "Freaq", version: ""};
    if (findPattern_u8(u8RomBuffer, sig_str_freaq_1) ||
        findPattern_u8(u8RomBuffer, sig_str_freaq_2))
        entry_add(entry);

    entry = {type: TYPE_MUSIC, name: "LSDJ", version: ""};
    if (findPattern_u8(u8RomBuffer, sig_str_lsdj_1) ||
        findPattern_u8(u8RomBuffer, sig_str_lsdj_2))
        entry_add(entry);

    entry = {type: TYPE_MUSIC, name: "hUGETracker", version: ""};
    if (findPattern_u8(u8RomBuffer, sig_hugetracker_fx_vol_slide_base_v1))
        entry_add(entry);
    else if (findPattern_u8(u8RomBuffer, sig_hugetracker_fx_vol_slide_base_v2))
        entry_add(entry);

    entry = {type: TYPE_MUSIC, name: "Trackerboy engine", version: ""};
    if (findPattern_u8(u8RomBuffer, sig_tbengine_noisetable))
        entry_add(entry);

    entry = {type: TYPE_MUSIC, name: "Black Box Music Box", version: ""};
    if (findPattern_u8(u8RomBuffer, sig_blackboxplayer_1) &&
        findPattern_u8(u8RomBuffer, sig_blackboxplayer_2))
        entry_add(entry);

    entry = {type: TYPE_MUSIC, name: "Lemon", version: ""};
    if (findPattern_u8(u8RomBuffer, sig_lemon_wave_default))
        entry_add(entry);

    entry = {type: TYPE_MUSIC, name: "GBT Player", version: ""};
    if (findPattern_u8(u8RomBuffer, sig_gbtplayer_gbt_wave))
        entry_add(entry);

    entry = {type: TYPE_MUSIC, name: "Carillon Player", version: ""};
    if (findPattern_u8(u8RomBuffer, sig_carillon_player_1) ||
        findPattern_u8(u8RomBuffer, sig_carillon_player_2))
        entry_add(entry);

    entry = {type: TYPE_MUSIC, name: "MPlay", version: ""};
    if (findPattern_u8(u8RomBuffer, sig_mplay2))
        entry_add_with_version(entry, "2");
    else if (findPattern_u8(u8RomBuffer, sig_mplay1))
        entry_add_with_version(entry, "1");

    entry = {type: TYPE_MUSIC, name: "GBSoundSystem", version: "BlitterObject"};
    if (findPattern_u8(u8RomBuffer, sig_gbsoundsystem_blitterobj_SSFP_multi_sfx)) {
        entry_add(entry);
    }
    else {
        entry = {type: TYPE_MUSIC, name: "GBSoundSystem", version: "Classic"};
        if (findPattern_u8(u8RomBuffer, sig_str_gbsoundsystem_1) &&
            findPattern_u8(u8RomBuffer, sig_str_gbsoundsystem_2))
            entry_add(entry);
        else if (findPattern_u8(u8RomBuffer, sig_gbsoundsystem_MultiSFXLoop))
            entry_add(entry);
    }

}
