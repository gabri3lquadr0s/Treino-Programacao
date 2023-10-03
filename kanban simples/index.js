const columns = document.querySelectorAll('.column');

document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
})
document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
})

columns.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        const dragging = document.querySelector(".dragging");
        const applyAfter = getNewPos(item, e.clientY);

        if(applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            item.prepend(dragging)
        }
    })
})

function getNewPos(column, positionY) {
    const cards = column.querySelectorAll(".item:not(.dragging)");
    var result;

    for(let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;
        if(positionY >= boxCenterY) {
            result = refer_card;
        }
    }
    return result;
}