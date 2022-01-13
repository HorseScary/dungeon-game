function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function grid() {
    // Creates the game board and places the player at the starting point
    for (let i = 1; i <= 49; i++) {
        document.getElementById("game-container").innerHTML += `<div id="${i}" class="item" occupied="false" onclick="clicked(${i})">${i}</div>`;
    }

    // Places things in the "starting room" on the board
    document.getElementById("27").innerHTML = '<img src="assets/player.png" alt="a stick figure with a pointy hat">';
    document.getElementById("27").setAttribute("occupied", "player")
    document.getElementById("22").innerHTML = '<img src="assets/door.png" alt="a door">';
    document.getElementById("22").setAttribute("occupied", "door")
    document.getElementById("11").innerHTML = '<img src="assets/chest.png" alt="a chest">';
    document.getElementById("11").setAttribute("occupied", "chest")

    while (true) {
        slimePos = getRandomIntInclusive(1, 49)
        if (document.getElementById(slimePos).getAttribute("occupied") != "false") {
            a = getRandomIntInclusive(1, 49)
        }
        else {
            document.getElementById(slimePos).innerHTML = '<img src="assets/slime.png" alt="a slime">'

            a = document.createElement("meta")
            a.id = "slimePos"
            a.setAttribute("pos", slimePos)
            document.head.appendChild(a)

            console.log(document.getElementById("slimePos").getAttribute("pos"))
            break
        }
    }
    updateInfo()
}

// Updates the game information in the "info" section based off of the info meta tags
function updateInfo() {
    hp = document.getElementById("hp").getAttribute("hp")
    def = document.getElementById("def").getAttribute("def")
    attack = document.getElementById("attack").getAttribute("attack")

    document.getElementById("info-container").innerHTML = `
    <img src="assets/heart.png" alt="a heart"> <div class="stat">${hp}</div>
    <img src="assets/chestplate.png" alt="a chestplate"> <div class="stat">${def}</div>
    <img src="assets/sword.png" alt="a sword"> <div class="stat">${attack}</div>
    `
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

function chest(space) {
    chestLoot = getRandomIntInclusive(0, 3);
    if (chestLoot == 0) {
        document.getElementById("hp").setAttribute("hp", parseInt(document.getElementById("hp").getAttribute("hp")) + 5)
        updateInfo()
    }
    else if (chestLoot == 1) {
        document.getElementById("def").setAttribute("def", parseInt(document.getElementById("def").getAttribute("def")) + 5)
        updateInfo()
    }
    else {
        document.getElementById("attack").setAttribute("attack", parseInt(document.getElementById("attack").getAttribute("attack")) + 5)
        updateInfo()
    }

    document.getElementById(space).innerHTML = `<img src="assets/open-chest.png" alt="an open chest">`
    document.getElementById(space).setAttribute("occupied", "oChest")
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
                chest(space);
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
            document.getElementById(space).setAttribute("occupied", "player")
            document.getElementById('pos').setAttribute("position", space);
        }

    }
    else {
        console.log("Space is not valid!");
    }
    moveSlime()
}

function moveSlime() {
    slimePos = parseInt(document.getElementById("slimePos"))
    player = parseInt(document.getElementById("pos"))

    if (slimePos > player) {
        if (slimePos - player > 7) {
            distance = -7
        }
        else {
            distance = -1
        }
    }
    else if (slimePos < player){
        if (player - slimepos > 7) {
            distance = 7
        } 
        else {
            distance = 1
        }
    }
}