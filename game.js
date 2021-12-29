function grid() {
    // Creates the game board and places the player at the starting point
    for (let i = 1; i <= 49; i++) {
        document.getElementById("game-container").innerHTML += `<div id="${i}" class="item" occupied="false" onclick="clicked(${i})">${i}</div>`;
    }

    // Creates things that are in the "start room"
    document.getElementById("27").innerHTML = '<img src="assets/player.png" alt="a stick figure with a pointy hat">';
    document.getElementById("22").innerHTML = '<img src="assets/door.png" alt="a door">';
    document.getElementById("22").setAttribute("occupied", "door")
    document.getElementById("11").innerHTML = '<img src="assets/chest.png" alt="a chest">';
    document.getElementById("11").setAttribute("occupied", "chest")

}

// checks if a space is in range of the player
function isValid(space) {
    pos = document.getElementById("pos").getAttribute("position");
    valid = false

    posUp = pos + 7;
    posDown = pos - 7;

    spaceUp = space + 7
    spaceDown = space - 7;

    if (pos == space + 1 || pos == space - 1 || pos == spaceUp || pos == spaceUp + 1 || pos == spaceUp - 1 || pos == spaceDown || pos == spaceDown - 1 || pos == spaceDown + 1) {
        valid = true
    }

    // Makes sure the space is not on the other side of the board
    if (pos % 7 == 0 && (space - 1) % 7 == 0) {
        valid = false;
    }
    else if ((pos - 1) % 7 == 0 && space % 7 == 0) {
        valid = false;
    }

    return (valid)
}

function chest() {
    console.log("chest :)");
}

function door() {
    console.log("door :)");
}

// Handles when a space is clicked
function clicked(space) {
    type = document.getElementById(space).getAttribute("occupied")

    if (isValid(space)) {
        // Checks if the space that was clicked is occupied
        if (type != "false") {
            if (type == "door") {
                door();
            }
            else if (type == "chest") {
                chest();
            }
            else {
                console.log("Somethings fucked up here")
            }
        }
        else {
            // Moves the player 
            // This should be its own function probably
            document.getElementById(pos).innerHTML = '';
            document.getElementById(space).innerHTML = `<img src="assets/player.png" alt ="a stick figure with a pointy hat">`;
            document.getElementById('pos').setAttribute("position", space);
        }

    }
    else {
        console.log("Space is not valid!");
    }
}