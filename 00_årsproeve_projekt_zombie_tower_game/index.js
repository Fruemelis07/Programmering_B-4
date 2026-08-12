
var currentPage = '#page12'
var videoButton, theVideo
var videoPlaying = true


import { testDictionary, realDictionary } from './dictionary.js';

console.log('test dictionary:', testDictionary);

const dictionary = realDictionary;
const state = {
  secret: "apple",
  grid: Array(6).fill().map(() => Array(5).fill('')),
  currentRow: 0,
  currentCol: 0,
};



function setup(){
    document.getElementById('page9').classList.add('show')
    shiftPage(currentPage)
    startup()
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
                            },2000)
                        },2000)
                    },1000)
                },5000)
            },8000)
        },5000)
    })
}




function shiftPage(newPage){
    if (currentPage) {
        const old = document.querySelector(currentPage);
        if (old) old.classList.remove('show');
    }
    const next = document.querySelector(newPage);
    if (next) next.classList.add('show');
    currentPage = newPage;
}

var zombieCounter = 0

function draw(){
    if (currentPage == "#page8"){
        if (frameCount % 80 == 0){
            var z = createImg("./Assets/Zombie.png")
            .size("100px")
            .addClass('zombie')
            .position(random(windowWidth), random(windowHeight))
            .mousePressed(()=>{
                zombieCounter++
                z.remove()
                if (zombieCounter == 10){
                    shiftPage("#page9")
                }
            })
            select("#page8").child(z)
        }
    }
}



function drawGrid(container) {
  const grid = document.createElement('div');
  grid.className = 'grid';
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      drawBox(grid, i, j);
    }
  }
  container.appendChild(grid);
}

function updateGrid() {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function drawBox(container, row, col, letter = '') {
  const box = document.createElement('div');
  box.className = 'box';
  box.textContent = letter;
  box.id = `box${row}${col}`;
  container.appendChild(box);
  return box;
}

function registerKeyboardEvents() {
  document.addEventListener('keydown', (e) => {
    if (currentPage !== '#page9') return;
    const key = e.key;
    if (key === 'Enter') {
      if (state.currentCol === 5) {
        const word = getCurrentWord();
        if (isWordValid(word)) {
          revealWord(word);
          state.currentRow++;
          state.currentCol = 0;
        } else {
          alert('Not a valid word.');
        }
      }
    }
    if (key === 'Backspace') {
      removeLetter();
    }
    if (isLetter(key)) {
      addLetter(key);
    }
    updateGrid();
  });
}

function getCurrentWord() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {
  return dictionary.includes(word);
}

function getNumOfOccurrencesInWord(word, letter) {
  let result = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) result++;
  }
  return result;
}

function getPositionOfOccurrence(word, letter, position) {
  let result = 0;
  for (let i = 0; i <= position; i++) {
    if (word[i] === letter) result++;
  }
  return result;
}

function revealWord(guess) {
  const row = state.currentRow;
  const animation_duration = 500;

  for (let i = 0; i < 5; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const letter = box.textContent;
    const numOfOccurrencesSecret = getNumOfOccurrencesInWord(state.secret, letter);
    const numOfOccurrencesGuess = getNumOfOccurrencesInWord(guess, letter);
    const letterPosition = getPositionOfOccurrence(guess, letter, i);

    setTimeout(() => {
      if (numOfOccurrencesGuess > numOfOccurrencesSecret && letterPosition > numOfOccurrencesSecret) {
        box.classList.add('empty');
      } else {
        if (letter === state.secret[i]) {
          box.classList.add('right');
        } else if (state.secret.includes(letter)) {
          box.classList.add('wrong');
        } else {
          box.classList.add('empty');
        }
      }
    }, ((i + 1) * animation_duration) / 2);

    box.classList.add('animated');
    box.style.animationDelay = `${(i * animation_duration) / 2}ms`;
  }

  const isWinner = state.secret === guess;
  const isGameOver = state.currentRow === 5;

  setTimeout(() => {
    if (isWinner) {
      shiftPage('#page10');
    } else if (isGameOver) {
      alert(`☠️ YOU DIED The word was ${state.secret}.`);
      shiftPage('#page1');
    }
  }, 3 * animation_duration);
}

function isLetter(key) {
  return key.length === 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
  if (state.currentCol === 5) return;
  state.grid[state.currentRow][state.currentCol] = letter;
  state.currentCol++;
}

function removeLetter() {
  if (state.currentCol === 0) return;
  state.grid[state.currentRow][state.currentCol - 1] = '';
  state.currentCol--;
}

function startup() {
  const game = document.getElementById('game');
  drawGrid(game);
  registerKeyboardEvents();
}

document.addEventListener('DOMContentLoaded', startup);


///// næste etage

document.addEventListener('click', (e) => {
  if (e.target.id === 'checkCode') {
    const code = document.getElementById('d1').value + 
                 document.getElementById('d2').value + 
                 document.getElementById('d3').value;
    if (code === '042') {
      document.getElementById('codeMsg').textContent = ' CORRECT!';
      setTimeout(() => shiftPage('#page13'), 1500);
    } else {
      document.getElementById('codeMsg').textContent = ' WRONG CODE!';
    }
  }

  if (e.target.id === 'nextBtn') {
    shiftPage('#page12');
  }
});

if (isWinner) {
  shiftPage('#page11');
} else if (isGameOver) {
  shiftPage('#page10');
}




// først kommer man ind på en menu, hvor man kan starte spillet, så trykker man på "start spil" knappen

//derefter starter spillet, og en cutscene af tårn med zombier omkring (der er text , og det ændre sig efter 10sek)

//nu er man foran tørne og går ind, og lukker døren

//så er man på stueegtagen

//for at komme op på næste etage skal man løse en gåde



//easter egg - kom til toppen

//hvis du løser gåden inde timeren er ovre kommer du vidre op på næste etage(1.sal), men hvis du ikke går dør du

//på først etage skal man lave connect the dots for at komme vidre til næste etage ellets dør man

//oh nej! zombierne kommer oppe fra derfor skal du skyde dem med et våben for at nå op på næste etage(15sek)

//dræb eller bliv drabt

// hvis man er i live, så kommer man op på næste etage (3.etage)


//Lav wordle game på x antal tid på 3. etage () Løs opgaven eller End (die by being pushed out the window))




// på 4.etage skal du løse en hemmelig opgave (matematik) får at låse sidste dør op

//Løs opgaven eller End (die by ???)

// Du når op til toppen af tårnet, sætter dig ind i helikopteren, og flyver væk

//Cutscene af spilleren der flyver afsted i helikopter

//Du har vundet, og spillet er slut


