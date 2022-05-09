const damageTable = {
    "slime":5
}

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

function doesSpaceExist(space) {
    if (document.getElementById(space)) {
        return (true)
    }
    return (false)
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
    if (!doesSpaceExist(space)) {
        return(null)
    }
    let occupied = document.getElementById(space).getAttribute("occupied")

    if (occupied != "none") {
        return (occupied)
    }
    return (false)
}

function isSpaceInRange(space) {
    playerPos = getPlayerPosition()
    distance = Math.abs(playerPos - space)

    if (!space) {
        return(false)
    }

    else if (distance == 1 || distance == 10 || distance == 9 || distance == 11) {
        return(true)
    }

    return(false)
}

function isOnPlayersRow(space) {
    player = getPlayerPosition().toString()

    if (player[1] == space.toString()[1]) {
        return(true)
    }
    return(false)
}

function isOnPlayersColumn(space) {
    player = getPlayerPosition().toString()
    
    if (player[0] == space.toString()[0]) {
        return(true)
    }
    return(false)
}

function getRandomUnoccupiedSpace() {
    while (true) {
        x = getRandomIntInclusive(1,7)
        y = getRandomIntInclusive(1,7)
        tile = `${x}${y}`
        if (!isOccupied(tile)) {
            return(tile)
        }
    }
}

function getLevel() {
    return(parseInt(document.getElementById('level')))
}

function getSlimes() {
    return(document.querySelectorAll('[occupied="slime"]'))
}

function isAbovePlayer (spaceY) {
    playerY = getPlayerPosition()[1]
    spaceY = spaceY.toString()[1]
    if (spaceY > playerY) {
        return (true)
    }
    return(false)
}

function isRightOfPlayer(space) {
    spaceX = space.toString()[0]
    spaceY = space.toString()[1]
    playerX = getPlayerPosition()[0]
    playerY = getPlayerPosition()[1]

    if (spaceX == playerX) {
        return (null)
    }
    else if (playerX < spaceX) {
        return(true)
    }
    return(false)
}

function getRandomUnoccupiedAdjacentSpace(space) {
    offsets = [-10, -1, 1, 10]
    falseCounter = 0

    for (i = 0; i < 4; i++) {
        spaceToCheck = space + offsets[i]
        if (isOccupied(spaceToCheck)) {
            falseCounter += 1
            offsets[i] = null
        }
    }

    if (falseCounter == 4) {
        return(null)
    }

    while (true) {
        randomOffset = getRandomIntInclusive(0,3)
        if (offsets[randomOffset]) {
            return (space + offsets[randomOffset])
        }
    }
}

function isSpaceOnTheOppositeSideOfTheMapUsingASpecifiedSpaceAsTheStartingPoint (space1, space2) {
    if ((space1 % 7 == 0 && space2 % 7 == 1) || (space1 % 7 == 1 && space2 % 7 == 0)) {
        return(true)
    }
    else {
        return(false)
    }
}
// Functions for doing things

function makeBoard() {
    for (let i = 1; i <= 7; i++) {
        for (let a = 1; a<=7; a++) {
            document.getElementById("game-container").innerHTML += `<div id="${a}${i}" class="item" occupied="none" onclick="clicked(${a}${i})">${a}${i}</div>`
        }
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
    
    if (!isSpaceInRange(chestSpace)) {
        tellPlayer('This chest appears to be too far away...')
    }
    else {
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
}

function placeSlime(tile) {
    let slimeTile = document.getElementById(tile)
    slimeTile.innerHTML = '<img src="assets/slime.png" alt="a blob of slime with eyes">'
    slimeTile.setAttribute('occupied', 'slime')
}

// THIS IS FUCKED UP
// THE X AND Y MOVEMENT IS INVERTED
// IT ALSO JUST DOESNT WORK FOR SOME OTHER REASON THAT I HAVNT FIGURED OUT
function moveSlimes() {
    var slimes = getSlimes()

    for (let i = 0; i < slimes.length; i++) {
        let space = parseInt(slimes[i].id)
        var quad = getQuadrant(space)
        var cantMoveHere = canIMove(space)

        if (!cantMoveHere) {
            tellPlayer("A slime got trapped and disintegrated into a pile of goo!")
            //return(undefined)
            //The "return" would early exit the entire function, meaning that the rest of the slimes wouldn't even attempt to move if the code reaches this line.
            //If you're looking to restart the for loop, you'll want to use "continue"
        }

        if (isOnPlayersRow(space)) {
            amountToMove = 1 * quad[0]
        }  
        else if (isOnPlayersColumn(space)) {
            amountToMove = 10 * quad[1]
        }
        else {
            upOrDown = !!getRandomIntInclusive(0,1)
            if (upOrDown) {
                amountToMove = 10 * quad[1]
            }
            else {
                amountToMove = 1 * quad[1]
            }
        }

        if (cantMoveHere.includes(amountToMove)) {
            amountToMove = getRandomUnoccupiedAdjacentSpace(space)
        }

        placeSlime(amountToMove)
        clearSpace(space)
    }
}

function canIMove(space) {
    offsets = [-10, 1, 10, -1]
    cantMove = []

    for (i in offsets) {
        if (isOccupied(space+offsets[i])) {
            cantMove.push(offsets[i])
        }
    }

    if (cantMove.length == 4) {
        return(false)
    }
    return(cantMove)
}

function getQuadrant(space) {
    player = getPlayerPosition()
    quad = []

    if (isRightOfPlayer(space)) {
        quad[0] = 1
    }
    else {
        quad[0] = -1
    }

    if (isAbovePlayer(space)) {
        quad[1] = 1
    }
    else {
        quad[1] = -1 
    }

    return(quad)
}

function attackPlayer(attacker) {
    damage = damageTable[attacker]
    playerDef = getDefence()
    level = getLevel()
    
    attackRoll = getRandomIntInclusive(1,100)
    if (attackRole < playerDef) {
        tellPlayer(`The ${attacker} hit glanced off your armor!`)
    } 
    else {
        finalDamage = damage * (1 + (level * .1))
        increaseHealth(-damage)
    }
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
            moveSlimes()
        }
    }

    else if (itemInSpace == 'chest') {
        if(!isChestOpen(space)) {
            chestLoot(space)
        }
        else {
            tellPlayer('This chest has already been looted!')
        }
    }

    else {
        tellPlayer(`Cant move here! There is a ${itemInSpace} in the way!`)
    }
}

function gameStart() {
    makeBoard()
    placePlayer(64)
    placeDoor(24)
    placeChest(42)
    placeSlime(getRandomUnoccupiedSpace())

    updateStats()
}