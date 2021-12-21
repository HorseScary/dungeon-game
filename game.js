function grid() {
    for (let i = 0; i < 49; i++) {
        document.getElementById("grid-container").innerHTML += `<div id="${i}" class="item"></div>`; 
    }
}