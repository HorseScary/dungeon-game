function grid() {
    for (let i = 1; i <= 49; i++) {
        document.getElementById("grid-container").innerHTML += `<div id="${i}" class="item">${i}</div>`; 
    }
    document.getElementById("28").innerHTML = '<img src="assets/player.png" alt="a stick figure with a pointy hat">';
}