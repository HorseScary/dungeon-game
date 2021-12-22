function grid() {
    for (let i = 1; i <= 49; i++) {
        document.getElementById("grid-container").innerHTML += `<div id="${i}" class="item" onclick="clicked(${i})">${i}</div>`; 
    }
    document.getElementById("28").innerHTML = '<img src="assets/player.png" alt="a stick figure with a pointy hat">';
}

function clicked(space) {
    pos = document.getElementById("pos").getAttribute("position");
    spaceUp = space + 7;
    spaceDown = space - 7;
    move = false;
    if (pos == space + 1 || pos == space - 1 || pos == spaceUp || pos == spaceUp + 1 || pos == spaceUp - 1 || pos == spaceDown || pos == spaceDown - 1 || pos == spaceDown + 1){
        document.getElementById(pos).innerHTML = '';
        document.getElementById(space).innerHTML = `<img src="assets/player.png" alt ="a stick figure with a pointy hat">`;
        document.getElementById('pos').setAttribute("position", space);
    }
}


// if a mod b = a minus b 