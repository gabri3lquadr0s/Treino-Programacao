const todoColums = document.getElementById("TODO");

function createCard() {
    var cardTitle = document.getElementById("cardTitle").value;
    var colorImportance;
    if(document.getElementById("low").checked) {
        colorImportance = '#0000FF';
    } else if(document.getElementById("mid").checked) {
        colorImportance = '#FFFF00';
    } else if(document.getElementById("high").checked) {
        colorImportance = "#FFA500";
    } else if(document.getElementById("vhigh").checked) {
        colorImportance = "#FF0000"
    }
    return(todoColums.insertAdjacentHTML("beforebegin", `<div class="item" draggable="true" style="background-color:${colorImportance}">${cardTitle}</div>`));
}