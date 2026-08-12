// ------------------------------------------------------------------
// UNDERVISNINGS-MANUSKRIPT: ML & KNN (Chart.js Version)
// ------------------------------------------------------------------
// MÅL FOR TIMEN:
// 1. Indlæse data fra CSV
// 2. Rense data og konvertere til objekter
// 3. Visualisere data med Chart.js (Scatter plot)
// 4. Implementere KNN algoritmen (Afstand, Sortering, Afgørelse)
// ------------------------------------------------------------------

// -------------------------------------------------------------
// TRIN 1: GLOBALE VARIABLER OG INDSTILLINGER
// (Start her: Vi skal definere hvad vores program skal kunne huske)
// -------------------------------------------------------------
var table           // Her gemmer vi den rå CSV fil fra p5's loadTable
var data = []       // Her gemmer vi vores rensede data (objekter med x, y, label)
var myChart         // Her gemmer vi selve graf-objektet fra Chart.js

// INDSTILLINGER FOR DATA
var filename = 'assets/6_class_csv.csv'
var colX = 'Temperature (K)'     // X-aksen: Variabel 1 (input)
var colY = 'Radius(R/Ro)'      // Y-aksen: Variabel 2 (input)
var colLabel = 'Star color' // Facit: Hvilken gruppe hører man til?

// GUI Overskrifter (Gør det pænt for brugeren)
var mainTitle = "classifiering af stjerner ud fra deres fysiske egenskaber"
var sectionTitle1 = "1. Indtast dine tal"
var instructionText = "Angiv antal pauser og søvntimer:"
var sectionTitle2 = "2. Se Resultat i Grafen"

// Farver til vores grupper (Labels) - Chart.js bruger disse
var colorList = {
    "Red": "Red",
    "Blue-White":"Aqua",
    "Yellowish White":"LemonChiffon",
    "Blue":"Blue",
    "Blue-White":"lightblue",
    "white":"white",

}
function preload() {
    // Indlæs data fil før programmet starter
    table = loadTable(filename, 'csv', 'header')
}

function setup() {
    // 0. SÆT TITLER I HTML
    select('#main-header').html(mainTitle)
    select('#section-1-title').html(sectionTitle1)
    select('#instruction-text').html(instructionText)
    select('#section-2-title').html(sectionTitle2)
    select('#label-x').html(colX)
    select('#label-y').html(colY)

    // -------------------------------------------------------------
    // TRIN 2: RENS DATA
    // (Forklar: Vi konverterer tekst-rækker til rigtige Javascript-objekter)
    // -------------------------------------------------------------
    var rows = table.rows
    rows = shuffle(rows).slice(0, 1000) // Vi begrænser til 1000 punkter for hastighedens skyld
    console.log('rene rows', rows)
    data = rows.map(row => {
        // Hent værdier fra de kolonner vi valgte i toppen
        // HUSK: Alt fra CSV er tekst, så vi bruger Number() til tallene
        var x = Number(row.get(colX))
        var y = Number(row.get(colY))
        var label = row.get(colLabel)
        
        // Tjek om data er gyldig (ikke NaN og har en label)
        if (!isNaN(x) && !isNaN(y) && label) {
            return { x, y, label }
        }
    }).filter(p => p) // Fjern tomme pladser i arrayet

    console.log("Data klar:", data.length, "punkter")
    //console.log(data), "her er det færdige array"


    //Nu skal vi forbedre data til at blive vist med chart.js
    //vi skal have fat i de unikke labels for hver gruppe i data

    var uniqueLabels = []
    data.map(point => {
        //vi kigger på punktes label. HVIS vi ikke har set det label før, må det være et unik, nyt et
        if(!uniqueLabels.includes(point.label)) {
            !uniqueLabels.push(point.label)
        }
    })
    console.log('vi kiggede alle punkter igennem og fandt disse labels', uniqueLabels)
    //man kunne sortere labels alfabetisk ved 'uniqueLabels.sort()'
    
    //omdan data til grupper ud fra de forskellige labels
    var datasets = uniqueLabels.map((label, index) => {
        //filter funktionen giver os en gruppe med en bestemt label
        var groupData = data.filter(point => {
            return point.label == label
        })
        //var col = colorList[index]
        var col = colorList[label]
        //retuner den færsige gruppe med datapunkterne for hvert label til DATASETS
        return {
            label: label, 
            data: groupData,
            backgroundColor: col,
            pointRadius: 5,
            pointHoverRadius: 8
        }

    })


    //Nu indsætter vi et enkel datasets med brugerens gæt
    datasets.push ({

        label: "Dit gæt",
        data: [],
        pointStyle: "crossRot",
        pointRadius: 12,
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 4

    })



    

    console.log('så det vi lavet dataset grupperne', datasets)

    //vi vil nu oprette grafen med chart.js 
    const canvasChart = document.getElementById('chartCanvas')
    //så kommer vi til noget lidt objektorienteret kode
    myChart = new Chart(canvasChart, {
        //scatter er et punktdiagram i 2d (x,y)
        type: 'scatter',
        data: {datasets: datasets},
        options:{
            //scales styrer hvad x og y aksenerne HEDDER
            scales: {
                x:{title:{display:true, text: colX}},
                y:{title:{display:true, text: colY}},
            
            }
        }
    })
    setupControls()
    
}


function setupControls(){
    //1) find alle x og y værdierne i data
    //2) FORDI vi skal bruge dem til at bestemme hvaf de der silderen skal gå fra og til
    // det her betyder at map data arrayet og retunere alle pont.x værdier
    var xValues = data.map(point => point.x)
    var yValues = data.map(point => point.y)
    //Beregn mindste og største værdier
    var minX = Math.min(...xValues)
    var maxX = Math.max(...xValues)
    var minY = Math.min(...yValues)
    var maxY = Math.max(...yValues)
    console.log(minX, maxX, minY, maxY, 'her er min og max for alle data')

    var xSlider = select('#input-x')
    var ySlider = select('#input-y')
    
    xSlider.attribute('min',Math.floor (minX))
    xSlider.attribute('max',Math.ceil(maxX))
    xSlider.attribute('step',(maxX-minX)/100)

    xSlider.value(minX + maxX /2)

    ySlider.attribute('min', Math.floor(minY))
    ySlider.attribute('max', Math.ceil(maxY))
    ySlider.attribute('step', (maxY-minY)/100)
    ySlider.value(minY + maxY /2)

    //INPUT er sliderens "on change" event, altså npr man flytrter den kaldes input funktionen 
    xSlider.input(() => select('#val-x').html(xSlider.value()))
    ySlider.input(() => select('#val-y').html(ySlider.value()))


    //DOM binding til k-slider
    var kSlider = select('#k-slider')
    select('#k-slider').input(() => select('#k-value').html(select('#k-slider').value()))

    select('#predict-btn').mousePressed(classifyUnknow)

}

function classifyUnknow(){
    //vi har tænk os at aflæse værdierne fra silderne og gem dem i to variabler
    var inputX = select('#input-x').value()
    var inputY = select('#input-y').value()

    //indsæt punkttet fra silderne i grafen
    var guessDataset = myChart.data.datasets[myChart.data.datasets.length -1]
    guessDataset.data = [{x:inputX, y:inputY}]
    myChart.update()


    //løb data igennem - alts ALLE dataåunkterne  - og find vær og ens afstand til vores gæt
    data.map( p =>{
        //dist ligger i p5.js og den laver pythagoras for os
        p.distance = dist(inputX, inputY, p.x, p.y)
        return p
     })

    //så sortere vi dem så dem med mindst afstand til gættet kommer 
    //Sort (a,b) => tag hvert punkt og sammenlign deres distance og sæt den mindste forrest
    data.sort((a,b) => a.distance - b.distance)

    //spørg de [k] næsrmeste hvilken gruppe de hører til
    var k = select('#k-slider').value()
    //neigbors er nu de første k eleemter i data arrayet
    var neighbors = data.slice(0,k) 
    //de stemmer om resiltater og vinderen er fundet
    var votes = {}
    neighbors.map( n => {
        //Vi kigger nu på hvert nyt punkts label
        //Hvis det er et nyt label for os, er vi nød til at lige at sætte dets værdi til 0
        //Ellers kan vi ikke lægge poin til bagefter
        if(votes[n.label] === undefined){
            votes[n.label] = 0
        }
        votes[n.label]+= 1
    })

    console.log(votes, 'her er votes')
    //Object.keys() giver os navnene på nøglerne som i dette tilfælde er vores labels (object skal være med stor O)

    var allLabels = Object.keys(votes)

    //start med bare at sige at vinderene er den første label
    var winner = allLabels[0]

    //løb alle labelsene igennem og se hvem der så virkelig er vinderne
    allLabels.map( l =>{
        if(votes[l]> votes[winner]){
            winner = l
        }
    })

    //vis i resulatat feltet hvilken klasse gætte tilhører
    
    console.log('Og vinderne er', winner)

    select('#winner').html(winner)


  

}

