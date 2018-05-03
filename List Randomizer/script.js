listsNode = document.getElementById('lists');

/**
 * create <li><input placeholder="Type your text here..."></li> elements
 */
function createLi(value){
    var li = document.createElement('li');

    var input = document.createElement('input');
    input.placeholder = "Type your text here and press 'Enter' to next..."
    input.value = value == undefined?  "" : value;

    li.appendChild(input);
    return li;
}

function insertToNext(elem, refElem){
    const parent = refElem.parentElement;
    if(refElem === parent.lastElementChild){
        parent.appendChild(elem);
    }
    else {
        parent.insertBefore(elem, refElem.nextElementSibling);
    }
}

function cleanLists(){
    var inputs = listsNode.querySelectorAll('input');
    for(var i = 0; i < inputs.length; ++i){
        var input = inputs[i];
        if(input.value == ""){
            input.parentElement.remove()
        }
    }

    if(listsNode.childElementCount == 0){
        listsNode.appendChild(createLi());
    }

}

document.onpaste = function(e){
    e.preventDefault();
    target = e.target;
    if(!listsNode.hasChildNodes(target))
        return;
    
    data = e.clipboardData.getData("text");
    lists = data.split('\n').filter(value => value !== "");

    const listsLength = lists.length;

    if(listsLength){
        target.value += lists[0];
    }

    var currentLi = target.parentElement;
    for(var i = 1; i < listsLength; ++i){
        var li = createLi(lists[i]);
        insertToNext(li, currentLi);
        currentLi = li;
    }

    cleanLists();
}

document.onkeydown = function(e){
    if(!listsNode.hasChildNodes(e.target))
        return;
    
    if(e.keyCode == 13){// Enter
        if(e.target.value != ""){
            cleanLists();
            var li = createLi("");
            insertToNext(li, e.target.parentElement);
            li.querySelector('input').focus();
        }
    }
    else if(e.keyCode == 27){
        cleanLists();
    }
    console.log(e);
}

function randomize(){
    cleanLists();
    var inputs = listsNode.querySelectorAll('input');
    var list = [];
    for(var i = 0; i < inputs.length; ++i){
        list.push(inputs[i].value);
    }
    for(var j = 0; j < 3; ++j){
        list = list.sort(()=> Math.random() - 0.5);
    }
    
    for(var i = 0; i < inputs.length; ++i){
        inputs[i].value = list[i];
    }
}

cleanLists();
