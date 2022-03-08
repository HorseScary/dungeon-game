//Function to get a random int (inclusively)
//I stole this code from somewhere but idk where
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

    document.getElementById("27").innerHTML = '<img src="assets/player.png" alt="a stick figure with a pointy hat">';
    document.getElementById("27").setAttribute("occupied", "player")
    document.getElementById("22").innerHTML = '<img src="assets/door.png" alt="a door">';
    document.getElementById("22").setAttribute("occupied", "door")
    document.getElementById("11").innerHTML = '<img src="assets/chest.png" alt="a chest">';
    document.getElementById("11").setAttribute("occupied", "chest")

    //places a slime enemy in an unoccupied space
    while (true) {
        slimePos = getRandomIntInclusive(1, 49)
        //if the space is occupied choose a new space
        if (document.getElementById(slimePos).getAttribute("occupied") != "false") {
            a = getRandomIntInclusive(1, 49)
        }
        else {
            document.getElementById(slimePos).innerHTML = '<img src="assets/slime.png" alt="a slime">'
            document.getElementById(slimePos).setAttribute("occupied", "slime")

            a = document.createElement("meta")
            a.id = "slimePos"
            a.setAttribute("pos", slimePos)
            document.head.appendChild(a)

            break
        }
    }
    updateInfo()
}

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
                console.log("Space does not have a valid type")
            }
        }
        else {
            // Moves the player 
            // This should be its own function probably
            document.getElementById(pos).innerHTML = '';
            document.getElementById(pos).setAttribute("occupied", "false")
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
    function slimeOccupied(distance) {
        if (document.getElementById(parseInt(document.getElementById("slimePos").getAttribute("pos")) + distance).getAttribute("occupied")!= "false"){
            return(false)
        }
        else {
            return(true)
        }
    }

    slimePos = parseInt(document.getElementById("slimePos").getAttribute("pos"))
    player = parseInt(document.getElementById("pos").getAttribute("position"))

    if (slimePos > player) {
        if (slimePos - player > 7) {
            distance = -7
            notDistance = -1
        }
        else {
            distance = -1
            notDistance = -7
        }
        if (slimeOccupied(distance) == true) {
            distance = notDistance
        }

    }
    else if (slimePos < player){
        if (player - slimePos > 7) {
            distance = 7
            notDistance = 1
        } 
        else {
            distance = 1
            notDistance = 7
        }
        if (slimeOccupied(distance) == true) {
            distance = notDistance
        }
    }

    else{
        console.log("Slime cant be moved, wtf did you do?")
    }
    toSpace = slimePos + distance

    document.getElementById(slimePos).innerHTML = ''
    document.getElementById(slimePos).setAttribute("occupied", "false")
    document.getElementById(toSpace).innerHTML = '<img src="assets/slime.png" alt="a slime">'
    document.getElementById(toSpace).setAttribute("occupied", "slime")
    document.getElementById("slimePos").setAttribute("pos", toSpace)
    
}