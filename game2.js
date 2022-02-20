function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function makeBoard() {
    for (let i = 1; i <= 49; i++) {
        document.getElementById("game-container").innerHTML += `<div id="${i}" class="item" occupied="none" onclick="clicked(${i})">${i}</div>`;
    }
}

function placePlayer(playerPos) {
    let playerTile = document.getElementById(playerPos)

    playerTile.setAttribute("occupied", "player")
    playerTile.innerHTML = '<img src="assets/player.png" alt="a stick figure wearing a pointy hat">'
    
    updatePlayerPos(playerPos)
}
function clearSpace(space) {
    document.getElementById(space).innerHTML = ''
}

function getPlayerPosition() {
    return(document.getElementById("player").getAttribute("pos"))
}
function updatePlayerPos(pos) {
    document.getElementById("player").setAttribute("pos", pos)
}

function isOccupied(space) {
    let occupied = document.getElementById(space).getAttribute("occupied")

    if (occupied != "none") {
        return(occupied)
    }
    else {
        return(false)
    }
}

function isSpaceInRange(space) {
    pos = getPlayerPosition()
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
function movePlayer(space) {
    console.log(`moving player to ${space}`)
    clearSpace(getPlayerPosition())
    placePlayer(space)
    updatePlayerPos(space)
}

function clicked(space) {
    console.log(`${space} has been clicked!`)
    itemInSpace = isOccupied(space)
    if (!itemInSpace) {
        if (isSpaceInRange(space)) {
            console.log("space is in range!")
            movePlayer(space)
        }
    }
    else {

    }
}

function gameStart(){
    makeBoard()
    placePlayer(27)
}