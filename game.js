function grid() {
    for (let i = 1; i <= 49; i++) {
        document.getElementById("grid-container").innerHTML += `<div id="${i}" class="item" onclick="clicked(${i})">${i}</div>`; 
    }
    document.getElementById("28").innerHTML = '<img src="assets/player.png" alt="a stick figure with a pointy hat">';
}

function clicked(space) {
    pos = document.getElementById("pos").getAttribute("position");
    console.log(`space: ${space}\npos: ${pos}`)
    posUp = pos + 7;
    posDown = pos - 7;

    spaceUp = space + 7 
    spaceDown = space - 7;

    move = false;
    open = false;

    if (pos == space + 1 || pos == space - 1 || pos == spaceUp || pos == spaceUp + 1 || pos == spaceUp - 1 || pos == spaceDown || pos == spaceDown - 1 || pos == spaceDown + 1){
        move = true
    }
    if (pos % 7 == 0 && space - posDown == 1 || pos % 7 == 0 && space - pos == 1 || pos % 7 == 0 && space - posUp == 1) {
        move = false
    }
    
    if (move) {
        document.getElementById(pos).innerHTML = '';
        document.getElementById(space).innerHTML = `<img src="assets/player.png" alt ="a stick figure with a pointy hat">`;
        document.getElementById('pos').setAttribute("position", space);
        
    }
}


// if a mod b = a minus b 