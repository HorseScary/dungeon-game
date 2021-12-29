function grid() {
    // Creates the game board and places the player at the starting point
    for (let i = 1; i <= 49; i++) {
        document.getElementById("game-container").innerHTML += `<div id="${i}" class="item" occupied="false" onclick="clicked(${i})">${i}</div>`; 
    }
    document.getElementById("27").innerHTML = '<img src="assets/player.png" alt="a stick figure with a pointy hat">';
    document.getElementById("22").innerHTML = '<img src="assets/door.png" alt="a door">';
    document.getElementById("22").setAttribute("occupied", "door") 
    document.getElementById("11").innerHTML = '<img src="assets/chest.png" alt="a chest">';
    document.getElementById("11").setAttribute("occupied", "chest")

}

function isValid(space) {
    // checks if a space is in range
    pos = document.getElementById("pos").getAttribute("position");
    valid = false    

    posUp = pos + 7;
    posDown = pos - 7;

    spaceUp = space + 7 
    spaceDown = space - 7;

    if (pos == space + 1 || pos == space - 1 || pos == spaceUp || pos == spaceUp + 1 || pos == spaceUp - 1 || pos == spaceDown || pos == spaceDown - 1 || pos == spaceDown + 1){
        valid = true
    }
    
    // Checks if the space is on the other side of the board
    if (pos % 7 == 0 && (space - 1) % 7 == 0) {
        valid = false;
    } 
    else if ((pos - 1) % 7 == 0 && space % 7 == 0) {
        valid = false;
    }
    
    return(valid)
}

function clicked(space) {
    move = false;
    open = false;

    // Checks if a space is valid
    if (document.getElementById(space).getAttribute("occupied") != "false") {
        move = false
    }

    // Moves the player
    if (isValid(space)) {
        document.getElementById(pos).innerHTML = '';
        document.getElementById(space).innerHTML = `<img src="assets/player.png" alt ="a stick figure with a pointy hat">`;
        document.getElementById('pos').setAttribute("position", space);
        
    }
}

function chest() {
    console.log("chest :)")
}

function door() {
    console.log ("door :)")
}