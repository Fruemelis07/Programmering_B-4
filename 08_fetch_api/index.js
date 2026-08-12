let currentPage = '#page1'
let deckData

let player = {
    hand: [],
}

let dealer = {
    hand: [],
}

let money = 1000
let bet = 0
let gameState = "start"


function setup(){
    shiftPage(currentPage)
    loadDeck()

    select('#playerDrawBtn').mousePressed(playerHit)
    select('#playerStandBtn').mousePressed(playerStand)
    select('#restartBtn').mousePressed(resetGame)

    setupChips()

    disablePlayerControls()

    select('#placeBetBtn').mousePressed(placeBet)
}


async function loadDeck(){
    let res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    deckData = await res.json()
    startRound()
}


async function startRound(){
    player.hand = []
    dealer.hand = []

    player.hand.push(await draw(), await draw())
    dealer.hand.push(await draw(), await draw())

    dealer.hand[0].hidden = true

    updateUI()

    checkBlackjack()
}

// ===== PLAYER ACTIONS =====
async function playerHit(){
    if(gameState !== "player") return

    player.hand.push(await draw())
    updateUI()

    let total = getTotal(player.hand)

    if(total > 21){
        gameState = "done"
        showResult("Bust")
    }
}

function playerStand(){
    gameState = "dealer"
    dealerTurn()
}

// ===== DEALER =====
async function dealerTurn(){
    dealer.hand[0].hidden = false
    updateUI()

    while(getTotal(dealer.hand) < 17){
        dealer.hand.push(await draw())
        updateUI()
        await sleep(700)
    }

    decideWinner()
}

// ===== WINNER =====
function decideWinner(){
    let p = getTotal(player.hand)
    let d = getTotal(dealer.hand)
    let text = ""

    if(d > 21){
        text = "Dealer har tabt! Du vinderrrrrrer "
        money += bet * 2
    } 
    else if(p > d){
        text = "Playyyerrrr vinder"
        money += bet * 2
    } 
    else if(d > p){
        text = "Dealer vinderrr"
    } 
    else {
        text = "Push"
        money += bet
    }

    select('#balance-display').html(`Balance: ${money}`)
    showResult(text)
}


function placeBet(){
    if(bet <= 0 || bet > money){
        select('#current-bet').html(`Bet: ${bet} - nope 😖`)
        return
    }

    money -= bet
    select('#balance-display').html(`Balance: ${money}`)

    enablePlayerControls()
    select('#placeBetBtn').hide()

    gameState = "player"
}

// ===== HELPERS =====
function getValue(card){
    if(isNaN(card.value)){
        return card.value === "ACE" ? 11 : 10
    }
    return Number(card.value)
}

function getTotal(cards){
    let sum = 0
    let aceCount = 0

    cards.forEach(c => {
        if(c.hidden) return
        if(c.value === "ACE") aceCount++
        sum += getValue(c)
    })

    while(sum > 21 && aceCount > 0){
        sum -= 10
        aceCount--
    }

    return sum
}

async function draw(){
    let res = await fetch(`https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=1`)
    let data = await res.json()
    return data.cards[0]
}

function sleep(ms){
    return new Promise(r => setTimeout(r, ms))
}

// ===== UI =====
function updateUI(){
    renderCards(player.hand, '#player .cards')
    renderCards(dealer.hand, '#dealer .cards')

    select('#player-total').html(`Total: ${getTotal(player.hand)}`)

    let visible = dealer.hand.filter(c => !c.hidden)
    select('#dealer-total').html(`Total: ${getTotal(visible)}`)
}

function renderCards(cards, target){
    select(target).html('')
    cards.forEach((c, i) => {
        let img = createImg(c.hidden 
            ? 'https://deckofcardsapi.com/static/img/back.png'
            : c.image
        )
        img.style('transform', `translate(${i*30}px,0px)`)
        select(target).child(img)
    })
}


function setupChips(){
    selectAll('.jeton').forEach(j => {
        j.mousePressed(() => {
            let value = Number(j.attribute('data-værdi'))

            if(bet + value <= money){
                bet += value
                select('#current-bet').html(`Bet: ${bet}`)
            }
        })
    })
}


function disablePlayerControls(){
    select('#playerDrawBtn').attribute('disabled','')
    select('#playerStandBtn').attribute('disabled','')
}

function enablePlayerControls(){
    select('#playerDrawBtn').removeAttribute('disabled')
    select('#playerStandBtn').removeAttribute('disabled')
}

// restart gameee ithn
function resetGame(){
    bet = 0
    gameState = "start"

    select('#current-bet').html('Bet: 0')
    select('#result').html('')
    select('#placeBetBtn').show()

    disablePlayerControls()
    shiftPage('#page1')

    startRound()
}

// ===== RESULT =====
function showResult(text){
    select('#result').html(text)
    shiftPage('#page2')
}

// ===== BLACKJACK CHECK =====
function checkBlackjack(){
    let p = getTotal(player.hand)
    let d = getTotal(dealer.hand)

    if(p === 21 && d === 21){
        showResult("Begge blackjackk")
    }
    else if(p === 21){
        money += bet * 2
        showResult("du vandtttttt")
    }
    else if(d === 21){
        showResult("dealerrrr blackhackkkk")
    }
}

// ===== PAGE SWITCH =====
function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
