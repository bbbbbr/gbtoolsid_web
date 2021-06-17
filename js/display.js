// This is free and unencumbered software released into the public domain.
// For more information, please refer to <https://unlicense.org>
// bbbbbr 2020


function setInfoText(newText) {

    let elInfo = document.getElementById("info_area_text")

    if (elInfo) {
        elInfo.value = newText;
    }
}

function prependInfoText(newText) {

    let elInfo = document.getElementById("info_area_text")

    if (elInfo) {
        elInfo.value = newText + elInfo.value;
    }
}


function appendInfoText(newText) {

    let elInfo = document.getElementById("info_area_text")

    if (elInfo) {
        elInfo.value = elInfo.value + newText;
    }
}


function hasClass(ele,cls) {
  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}


function addClass(ele,cls) {
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
  }
}

