const draggables = document.querySelectorAll('.draggable');
const places = document.querySelectorAll('.place');

const highlightClass = 'table-info';
const errorClass = 'table-danger';

draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });
    draggable.addEventListener('dragend', (e) => {
        draggable.classList.remove('dragging');
        const place = getPlaceOver(e);
        if (place) {
            place.classList.remove(highlightClass)
            place.classList.remove(errorClass)
            if (place != draggable) {
                console.log('droppedInto', place);
                draggable.remove();
            }
        }
    });
});

places.forEach((place) => {
    place.addEventListener('dragleave', (e) => {
        e.preventDefault();
        place.classList.remove(highlightClass);
        place.classList.remove(errorClass);
    })
    place.addEventListener('dragover', (e) => {
        e.preventDefault();
        console.log(place.classList.contains('dragging'));
        place.classList.contains('dragging') ? place.classList.add(errorClass) : place.classList.add(highlightClass);

    });
});

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function getPlaceOver(e) {
    let retPlace;
    places.forEach((place) => {
        if (isBetween(e.clientY, place.getBoundingClientRect().top, place.getBoundingClientRect().bottom))
            retPlace = place;
    });
    return retPlace;
}

function isBetween(value, a, b) {
    return a < value && value < b;
};