// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2020


let g_tools_name = "";
let g_tools_version = "";
let g_tools_found = false;

let g_engine_name = "";
let g_engine_version = "";
let g_engine_found = false;


function reset_info() {
    g_tools_name = "";
    g_tools_version = "";
    g_tools_found = false;

    g_engine_name = "";
    g_engine_version = "";
    g_engine_found = false;
}


function setTools(tools_name, tools_version) {
    g_tools_name = tools_name;
    g_tools_version = tools_version;
    g_tools_found = true;
}


function setEngine(engine_name, engine_version) {
    g_engine_name = engine_name;
    g_engine_version = engine_version;
    g_engine_found = true;
}


///------------


function gbToolsDetect(u8RomBuffer, filename) { // , strict_mode) {

    let strict_mode = false;

    let result_gbdk     = false;
    let result_zgb      = false;
    let result_gbstudio = false;

    reset_info();

    result_gbdk = checkGBDK(u8RomBuffer);

    // If strict mode is turned on, only test
    // for ZGB and GBStudio when GBDK is present
    if ((strict_mode === false) || (result_gbdk === true)) {
        result_zgb      = checkZGB(u8RomBuffer);
        result_gbstudio = checkGBStudio(u8RomBuffer);
    }
    
    prependInfoText(renderOutput(filename));
}


function renderOutput(filename) {

    let output_style = ""; // Output mode not configurable in UI for now
    let str_result = "";
    if (output_style ===" OUTPUT_JSON") {
        str_result += '{\n';

        str_result +=  '"file": ' + filename + ',\n';

        if (g_tools_found)
            str_result += '"toolsName": ' + g_tools_name + ', "toolsVersion": ' + g_tools_version + ',\n';
        else
            str_result += '"toolsName": null,   "toolsVersion": null,\n';

        if (g_engine_found)
            str_result += '"engineName": ' + g_engine_name + ', "engineVersion": ' + g_engine_version + ',\n';
        else
            str_result += '"engineName": null, "engineVersion": null\n';

        str_result += "}\n";
   }
   else if (output_style === "OUTPUT_CSV") {

        str_result += '"File","' + filename + '",';
        str_result += '"Tools Name","' + g_tools_name + '","Tools Version","' + g_tools_version + '",';
        str_result += '"Engine Name","' + g_engine_name + '","Engine Version","' + g_engine_version + '"\n';
    }
    else if (output_style === "OUTPUT_CSV_BARE") {
        str_result += '"' + filename + '",';
        str_result += '"' + g_tools_name + '","' + g_tools_version + '",';
        str_result += '"' + g_engine_name + '","' + g_engine_version + '"\n';
    } 
    else { // OUTPUT_DEFAULT

        str_result += "File: " + filename + "\n";


        if (g_tools_found)
            str_result += "Tools: " + g_tools_name + ", Version: " + g_tools_version + "\n";
        else
            str_result += "Tools: <unknown> \n";

        if (g_engine_found)
            str_result += "Engine: " + g_engine_name + ", Version: " +  g_engine_version + "\n";

        str_result += "\n";

        return str_result;
   }
}
