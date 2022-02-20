// Functions for getting info
function getRandomIntInclusive(min, max) { //thanks stackoverflow!!
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isChestOpen(chest) {
    if (document.getElementById(chest).getAttribute('cheststatus') == 'closed') {
        return(false)
    } else {
        return(true)
    }
}

// stats
function getHealth() {
    return (document.getElementById('hp').getAttribute('hp'))
}

function getMaxHealth() {
    return (document.getElementById('hp').getAttribute('maxhp'))
}

function getAttack() {
    return (document.getElementById('attack').getAttribute('attack'))
}

function getDefence() {
    return (document.getElementById("def").getAttribute('def'))
}

// movement
function getPlayerPosition() {
    return (document.getElementById("player").getAttribute("pos"))
}

function isOccupied(space) {
    let occupied = document.getElementById(space).getAttribute("occupied")

    if (occupied != "none") {
        return (occupied)
    }
    else {
        return (false)
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

// Functions for doing things

function makeBoard() {
    for (let i = 1; i <= 49; i++) {
        document.getElementById("game-container").innerHTML += `<div id="${i}" class="item" occupied="none" onclick="clicked(${i})">${i}</div>`;
    }
}

//placing things

function placePlayer(playerPos) {
    let playerTile = document.getElementById(playerPos)

    playerTile.setAttribute("occupied", "player")
    playerTile.innerHTML = '<img src="assets/player.png" alt="a stick figure wearing a pointy hat">'

    updatePlayerPos(playerPos)
}

function placeDoor(doorPos) {
    let doorTile = document.getElementById(doorPos)

    doorTile.setAttribute("occupied", "door")
    doorTile.innerHTML = `<img src="assets/door.png" alt="a door">`
}

function placeChest(chestPos) {
    let chestTile = document.getElementById(chestPos)
    chestTile.setAttribute("occupied", "chest")
    chestTile.setAttribute("cheststatus", "closed")
    chestTile.innerHTML = `<img src="assets/chest.png" alt="a closed chest">`
}

function chestLoot(chestSpace) {
    chestTile = document.getElementById(chestSpace)
    loot = getRandomIntInclusive(1, 3)
    if (loot == 1) {
        increaseHealth(10)
    }
    else if (loot == 2) {
        increaseAttack(5)
    }
    else if (loot == 3) {
        increaseDef(5)
    }

    chestTile.setAttribute('cheststatus', closed)
    chestTile.innerHTML = `<img src="assets/open-chest.png" alt="an open chest">`

    updateStats()
}

// stats
function increaseHealth(amount) {
    let hp = document.getElementById('hp')
    hp.setAttribute('maxhp', parseInt(getMaxHealth()) + parseInt(amount))
    hp.setAttribute('hp', parseInt(getHealth()) + parseInt(amount))

    tellPlayer(`Your health has increased by ${amount}`)
}

function increaseAttack(amount) {
    let attack = document.getElementById('attack')
    attack.setAttribute('attack', parseInt(getAttack()) + parseInt(amount))
    tellPlayer(`Your attack has increased by ${amount}!`)
}

function increaseDef(amount) {
    let def = document.getElementById('def')
    def.setAttribute('def', parseInt(getDefence()) + parseInt(amount))
    tellPlayer(`Your defence has increased by ${amount}!`)
}

function updateStats() {
    defInfo = document.getElementById('definfo')
    hpInfo = document.getElementById('hpinfo')
    attackInfo = document.getElementById('attackinfo')

    defInfo.innerHTML = (getDefence())
    hpInfo.innerHTML = (`${getHealth()}/${getMaxHealth()}`)
    attackInfo.innerHTML = (getAttack())
}

function clearSpace(space) {
    document.getElementById(space).innerHTML = ''
    document.getElementById(space).setAttribute("occupied", "none")
}

function updatePlayerPos(pos) {
    document.getElementById("player").setAttribute("pos", pos)
}

function tellPlayer(message) {
    let messageContainer = document.getElementById("stuff")
    messageContainer.innerHTML += `<p>${message}</p>`
    scrollToBottom("stuff")
}

function scrollToBottom(id) { //thanks stackoverflow!
    var div = document.getElementById(id);
    div.scrollTop = div.scrollHeight - div.clientHeight;
}


function movePlayer(space) {
    clearSpace(getPlayerPosition())
    placePlayer(space)
    updatePlayerPos(space)
}


function clicked(space) {
    itemInSpace = isOccupied(space)
    if (!itemInSpace) {
        if (isSpaceInRange(space)) {
            movePlayer(space)
        }
    }
    else if (itemInSpace == 'chest') {
        if (!isChestOpen(space)) {
            chestLoot(space)
        } else {
            tellPlayer('This chest has already been looted!')
        }
    }
    else {
        tellPlayer(`Cant move here! There is a ${itemInSpace} in the way!`)
    }
}

function gameStart() {
    makeBoard()
    placePlayer(27)
    placeDoor(23)
    placeChest(11)

    updateStats()
}