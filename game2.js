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
    
    document.getElementById(playerPos).appendChild(playerTile)
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

function isSpaceValid(space) {
    return(false)
}

function clicked(space) {
    if (!isOccupied(space)) {
        if isSpaceValid(space) {
            return(null)
        }
    }
    else {

    }
}

function gameStart(){
    makeBoard()
    placePlayer(27)
}