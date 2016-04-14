/**
 * Created by user on 11/4/2016.
 */
// [name1, title1, name2, title2, ...]
var nameLists = [];
var current = 0;

function addNameList() {
    clearEmpty();
    var list_elem = document.createElement("div");
    list_elem.classList.add("list");
    list_elem.style.top = ((nameLists.length) * 70) + 30 + "px";

    var name_elem = document.createElement("div");
    name_elem.classList.add("name");
    list_elem.appendChild(name_elem);

    var nameValue_elem = document.createElement("div");
    nameValue_elem.setAttribute("contenteditable", "true");
    name_elem.appendChild(nameValue_elem);

    var speechTitle_elem = document.createElement("div");
    speechTitle_elem.classList.add("speechTitle");
    list_elem.appendChild(speechTitle_elem);

    var speechTitleValue_elem = document.createElement("div");
    speechTitleValue_elem.setAttribute("contenteditable", "true");
    speechTitle_elem.appendChild(speechTitleValue_elem);
    speechTitleValue_elem.innerText = "Speech Title";
    speechTitleValue_elem.style.color = "darkgray";
    speechTitleValue_elem.style.fontStyle = "italic";

    document.getElementById("screen2").appendChild(list_elem);

    nameLists.push(list_elem);
    nameValue_elem.focus();

    nameValue_elem.addEventListener("blur", function (e) {
        if (nameValue_elem.innerText == "") {
            nameValue_elem.innerText = "Name";
            nameValue_elem.style.color = "darkgray";
            nameValue_elem.style.fontStyle = "italic";
        }
    });

    nameValue_elem.addEventListener("focus", function (e) {
        if (nameValue_elem.innerText == "Name") {
            nameValue_elem.innerText = "";
            nameValue_elem.style.color = "black";
            nameValue_elem.style.fontStyle = "normal";
        }
    });

    speechTitleValue_elem.addEventListener("blur", function (e) {
        if (speechTitleValue_elem.innerText == "") {
            speechTitleValue_elem.innerText = "Speech Title";
            speechTitleValue_elem.style.color = "darkgray";
            speechTitleValue_elem.style.fontStyle = "italic";
        }
    });

    speechTitleValue_elem.addEventListener("focus", function (e) {
        if (speechTitleValue_elem.innerText == "Speech Title") {
            speechTitleValue_elem.innerText = "";
            speechTitleValue_elem.style.color = "black";
            speechTitleValue_elem.style.fontStyle = "normal";
        }
    });

    speechTitleValue_elem.addEventListener("keydown", function (e) {
        if (list_elem == nameLists[nameLists.length - 1] && e.keyCode == 9) {
            e.preventDefault();
            addNameList();
        }
    });
}

function randomSort() {
    current = 0;
    for (var m = 0; m < 10; m++) {
        nameLists.sort(function () {
            return Math.random() - 0.5;
        });
    }
    sort();
}

function sort() {
    var length = nameLists.length;
    for (var n = 0; n < length; n++) {
        var nameList = nameLists[n];
        nameList.style.top = ((n) * 70) + 30 + "px"
    }
}

function clearCurrent() {
    var currentLists = document.getElementsByClassName("current");
    var length = currentLists.length;

    for (var n = 0; n < length; n++) {
        var currentList = currentLists[n];
        currentList.classList.remove("current");
    }
}

function nextCurrent() {
    clearEmpty();
    if (current >= nameLists.length) {
        return false;
    }
    current++;
    clearCurrent();
    nameLists[current - 1].classList.add("current");
    updateScreen1();
}

function prevCurrent() {
    clearEmpty();
    if (current <= 1) {
        return false;
    }
    current--;
    clearCurrent();
    nameLists[current - 1].classList.add("current");
    updateScreen1();
}

function updateScreen1() {
    var scene_elem = document.createElement("div");
    scene_elem.classList.add("scene");

    var tableCell_elem = document.createElement("div");
    tableCell_elem.classList.add("tableCell");
    tableCell_elem.innerText = nameLists[current - 1].innerText;
    scene_elem.appendChild(tableCell_elem);

    document.getElementById("screen1").appendChild(scene_elem);
    setTimeout(function () {
        scene_elem.style.opacity = 1;
    }, 10);
}

function toggleScreen() {
    if (listBtn.classList.contains("toggled")) {
        listBtn.classList.remove("toggled");
        document.getElementById("screen2").style.opacity = 0;
        document.getElementById("screen1").style.opacity = 1;
    } else {
        listBtn.classList.add("toggled");
        document.getElementById("screen2").style.opacity = 1;
        document.getElementById("screen1").style.opacity = 0;
    }
}

function clearEmpty() {
    if (nameLists.length > 1) {
        for (var n = 0; n < nameLists.length; n++) {
            var nameList = nameLists[n];
            if (isEmptyNameList(nameList)) {
                nameList.remove();
                nameLists.splice(n, 1);
            }
        }
        sort();
    }
}

function isEmptyNameList(nameList) {
    var name = nameList.firstChild;
    var title = nameList.lastChild;
    return (name.innerText == "Name\n" || name.innerText == "") && (title.innerText == "Speech Title\n" || title.innerText == "");
}

document.getElementById("random").addEventListener("click", function () {
    clearCurrent();
    current = 0;
    randomSort();
});

document.getElementById("add").addEventListener("click", function () {
    addNameList();
});

var listBtn = document.getElementById("listBtn");
document.getElementById("listBtn").addEventListener("click", toggleScreen);

window.addEventListener("keydown", function (e) {
    if (e.keyCode == 40 || e.keyCode == 39) {//keydown keyRight
        nextCurrent();
    } else if (e.keyCode == 37 || e.keyCode == 38) {// keyup keyleft
        prevCurrent();
    } else if (e.keyCode == 45 && listBtn.classList.contains("toggled")) {// insert
        addNameList();
    } else if (e.keyCode == 36) {// home
        toggleScreen();
    } else if (e.altKey && e.keyCode == 82 && listBtn.classList.contains("toggled")) {// home
        randomSort();
        clearCurrent();
    } else if (e.keyCode === 116) {
        e.preventDefault();
    }
});

addNameList();

document.getElementById("title").focus();