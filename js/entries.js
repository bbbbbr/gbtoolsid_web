

const TYPE_TOOLS   = 0;
const TYPE_ENGINE  = 1;
const TYPE_MUSIC   = 2;
const TYPE_SOUNDFX = 3;

const TYPE_MIN     = TYPE_TOOLS;
const TYPE_MAX     = TYPE_SOUNDFX;

// var types_found[TYPE_MAX + 1]; TODO
var cur_entry = 0;
var tool_entries = new Array();

function reset_entries() {
    cur_entry = 0;

    while (tool_entries.length) {
        tool_entries.pop();
    }

}


// Register an entry
function entry_add(new_entry) {

    tool_entries.push(new_entry);
        // if ((new_entry.type >= TYPE_MIN) && (new_entry.type <= TYPE_MAX))
        //     types_found[new_entry.type] = true;
}


// Register an entry
function entry_add_with_version(new_entry, version) {

    new_entry.version = version;
    entry_add(new_entry);
}


// // Check if an entry of a given type has been found
// bool entry_type_is_found(int tool_type) {
//     if ((tool_type >= TYPE_MIN) && (tool_type <= TYPE_MAX))
//         return types_found[tool_type];
//     else
//         return false;
// }


// Get a tool entry by reference
function entry_get(index) {
     if ((index >= 0) && (index < tool_entries.length))
         return tool_entries[tool_entry_count];
     else
         return null;
}


// Get the first entry of a given tool type
function entry_get_first_of_type(tool_type) {

    for (let c = 0; c < tool_entries.length; c++) {
        if (tool_entries[c].type === tool_type) {
           cur_entry = c;
           return tool_entries[c];
        }
    }

    return null;
}


// Get the next entry of a given tool type
function entry_get_next_of_type(tool_type) {

     for (let c = cur_entry + 1; c < tool_entries.length; c++) {
        if (tool_entries[c].type === tool_type) {
           cur_entry = c;
           return tool_entries[c];
        }
    }

    return null;
}



// Get max number of entries
function entry_get_count(index) {
    return tool_entries.length;
}

