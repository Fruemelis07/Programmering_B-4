var currentPage = '#page3'
var capture 
var otterSound, girlsgenerationSound
var recBtn, recorder 
var isRecording = flase 


function preload(){
    otterSound = loadSound('./assets/ottersound.mp3') 
    girlsgenerationSound = loadSound('./assets/Girls Generation 소녀시대 I GOT A BOY MV.mp3')

}

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    console.log('P5 setup kaldt inshallah')
    
    //skift til current page 
    shiftPage(currentPage)

    capture = createCapture(VIDEO, {flipped:true})
    capture.size(720,468)
    select('#page1').child(capture)

    //SOUND 
    //Make a sound play on moused press
    select('#otter').mousePressed(()=>{
        otterSound.play()
    })
    girlsgenerationSound = createAudio('./assets/Girls Generation 소녀시대 I GOT A BOY MV.mp3')
    girlsgenerationSound.showControls()
    select('#page2').child(rainSound)

    
    //Sæt menu op
    //Hent alle sider som et array
    var allPages = selectAll('.page')
    //Løb listen igennem en for en 
    allPages.map(
       page => {
        //Lav et nyt <a> element 
        var menuItem = createElement('a')
        //Sæt a taggets html til sidens titel
        menuItem.html(page.attribute('title'))
        //sæt eventlistener på a tagget
        menuItem.mousePressed(
            () => shiftPage('#' + page.attribute('id'))
        )
        //sæt a tagget ind i sidebaren
        select('.sidebar').child(menuItem)
       }
    )

}

function shiftPage(newPage){
    select(currentPage).removeClass('show')
    select(newPage).addClass('show')
    currentPage = newPage
}
