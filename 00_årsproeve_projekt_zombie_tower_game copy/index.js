var currentPage = '#page11'
var videoButton, theVideo
var videoPlaying = true
 
// PUZZLE VARIABLER
var tiles = []
var emptyIndex = 8
var tileSize = 400/3
var puzzleSolved = false
var moveCount = 0
 
// Opretter et 400x400 canvas og sætter det i canvas-container.
// Sætter startknappen op som starter cutscene-sekvensen med timeouts der automatisk skifter sider
function setup(){
    var canvas = createCanvas(400,400)
    canvas.parent("canvas-container")
    shiftPage(currentPage)
    select("#startBtn")
    .mousePressed(()=>{
        shiftPage("#page2")
        setTimeout(()=>{
            shiftPage("#page3")
            setTimeout(()=>{
                shiftPage("#page4")
                setTimeout(()=>{
                    shiftPage("#page5")
                    setTimeout(()=>{
                        shiftPage("#page6")
                        setTimeout(()=>{
                            shiftPage("#page7")
                            setTimeout(()=>{
                                shiftPage("#page8")
                                setTimeout(()=>{
                                    shiftPage("#page9")
                                },2000)
                            },2000)
                        },2000)
                    },1000)
                },5000)
            },8000)
        },5000)
    })
}
 
// Fjerner 'show' fra den gamle side og tilføjer det til den nye.
// Slår canvas-klik fra på alle sider undtagen page14.
// Starter puzzle når vi lander på page14, og sætter nøgleknapper op på page9
function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
 
    var canvasEl = document.querySelector('#canvas-container canvas')
    if (canvasEl) {
        canvasEl.style.pointerEvents = (newPage === '#page14') ? 'auto' : 'none'
    }
 
    if (newPage == "#page14") {
        setupPuzzle()
    }
 
    if (newPage == "#page9") {
        select("#rightKey").mousePressed(()=>{
            shiftPage("#page10")
            setTimeout(()=>{
                shiftPage("#page11")
            },2000)
        })
        select("#wrongKey3").mousePressed(()=>{
            shiftPage("#easterEgg")
        })
    }
}
 
var zombieCounter = 0
var zombieTimer = 15
var lastTime = 0
 
// Kører hvert frame og håndterer to sider:
// page11: viser nedtælling, tæller ned hvert sekund med millis(), spawner zombiebilleder hvert 50. frame der forsvinder efter 3sek.
// Klik på zombie øger counter, ved 10 dræbte zombier fortsættes til page12→13→14.
// page14: rydder canvas og tegner puzzle-brættet
function draw(){
    if (currentPage == "#page11"){
        clear()
        fill(255)
        textSize(30)
        textAlign(CENTER, TOP)
        text("Tid tilbage: " + zombieTimer, width / 2, 10)
 
        if(millis() - lastTime >= 1000 && zombieTimer > 0){
            zombieTimer--
            lastTime = millis()
        }
 
        if(zombieTimer == 0){
            shiftPage("#pageDead")
        }
 
        if (frameCount % 50 == 0){
            var z = createImg("./Assets/Zombie.png")
                .size("100px")
                .addClass('zombie')
                .position(random(windowWidth), random(windowHeight))
                setTimeout(()=>{
                    z.hide()
                },3000)
 
            z.mousePressed(() => {
                zombieCounter++
                z.remove()
                if (zombieCounter == 10){
                    shiftPage("#page12")
                    setTimeout(() => {
                        shiftPage("#page13")
                        setTimeout(() => {
                            shiftPage("#page14")
                        }, 3000)
                    }, 3000)
                }
            })
            select("#page11").child(z)
        }
    }
 
    if (currentPage == "#page14"){
        clear()
        drawPuzzle()
    }
}
 
// p5's globale museklik-funktion. Sender koordinaterne videre til clickPuzzle() når vi er på puzzle-siden
function mousePressed() {
    if (currentPage == "#page14") {
        clickPuzzle(mouseX, mouseY)
    }
}
 
// Bygger et nyt tile-array [0-8], kalder shufflePuzzle() for at blande,
// finder det tomme felts startposition og nulstiller moveCount og puzzleSolved
function setupPuzzle() {
    tiles = []
    for (var i = 0; i < 9; i++) {
        tiles.push(i)
    }
    shufflePuzzle()
    emptyIndex = tiles.indexOf(8)
    puzzleSolved = false
    moveCount = 0
}
 
// Laver 1000 tilfældige lovlige træk fra det tomme felt for at sikre et løsbart og godt blandet bræt
function shufflePuzzle() {
    var empty = tiles.indexOf(8)
    for (var i = 0; i < 1000; i++) {
        var neighbors = getNeighbors(empty)
        var randomNeighbor = neighbors[floor(random(neighbors.length))]
        tiles[empty] = tiles[randomNeighbor]
        tiles[randomNeighbor] = 8
        empty = randomNeighbor
    }
}
 
// Udregner hvilke felter der er gyldige naboer til et givent index i 3x3 grid.
// Tjekker op/ned/venstre/højre og undgår at gå udenfor brættets kanter
function getNeighbors(index) {
    var neighbors = []
    var row = floor(index / 3)
    var col = index % 3
    if (row > 0) neighbors.push(index - 3)
    if (row < 2) neighbors.push(index + 3)
    if (col > 0) neighbors.push(index - 1)
    if (col < 2) neighbors.push(index + 1)
    return neighbors
}
 
// Looper alle 9 felter og tegner en blå firkant med tal for hver brik.
// Felt 8 springes over da det er det tomme felt. Viser "LØST!" tekst midt på canvas hvis puzzleSolved er true
function drawPuzzle() {
    for (var i = 0; i < 9; i++) {
        var x = (i % 3) * tileSize
        var y = floor(i / 3) * tileSize
       
        if (tiles[i] == 8) continue
       
        fill(70, 130, 180)
        stroke(0)
        strokeWeight(2)
        rect(x, y, tileSize, tileSize, 4)
       
        fill(255)
        noStroke()
        textSize(24)
        textAlign(CENTER, CENTER)
        text(tiles[i] + 1, x + tileSize / 2, y + tileSize / 2)
    }
   
    if (puzzleSolved) {
        fill(0, 200, 0)
        textSize(40)
        textAlign(CENTER, CENTER)
        text("LØST!", width / 2, height / 2)
    }
}
 
// Omregner musens x/y koordinater til et felt-index i 3x3 grid.
// Hvis det klikkede felt er nabo til det tomme felt, byttes de to felter og moveCount øges
function clickPuzzle(mx, my) {
    var col = floor(mx / tileSize)
    var row = floor(my / tileSize)
    var clicked = row * 3 + col
   
    var neighbors = getNeighbors(emptyIndex)
    if (neighbors.includes(clicked)) {
        tiles[emptyIndex] = tiles[clicked]
        tiles[clicked] = 8
        emptyIndex = clicked
        moveCount++
        checkSolved()
    }
}
 
// Gennemgår alle 9 felter og tjekker om hvert tile sidder på sin korrekte plads (tile[i] == i).
// Hvis alle passer sættes puzzleSolved til true og der skiftes til page15 efter 1 sekund
function checkSolved() {
    for (var i = 0; i < 9; i++) {
        if (tiles[i] != i) {
            puzzleSolved = false
            return
        }
    }
    puzzleSolved = true
    setTimeout(() => {
        shiftPage("#page15")
    }, 1000)
}