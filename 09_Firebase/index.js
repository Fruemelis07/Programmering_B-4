//lav en ref til din collection
var quotesRef = db.collection('quotes_data')
console.log('oprettet reference til quotes collection')

//P5 setup() bliver kaldt EN gang før siden vises 
function setup(){
    //NU KOMMER DET GENIALE: ONSNAPSHOT 
    quotesRef.onSnapshot( snap => {
        console.log('Modtog snap', snap.size)
        //ryd quotes div og sæt de nye quotes ind
        select("#quotes").html("")
        snap.forEach( doc => {
            var d = doc.data()
            console.log(d)
            var card = createDiv().addClass('card')
            var nQ = createDiv(d.text)
            card.child(nQ)
            if(d.timestamp){
                var t = createDiv(d.timestamp.toDate().toLocaleDateString())
                card.child(t)
            }
            select("#quotes").child(card)
        })
    })
}

//key pressed er en indbygget p5.js funktion 
function keyPressed(){
    //console.log(key)
    if(key == "Enter"){
        //hent teksten fra input feltet
        var q = select('#newQuote').value()
        if(q == "") {
            confirm('skriv venligst noget FØR DU TRYKKER ENTER')
            return
        }
        var o = select('#origin').value()
        //nu skal vi gemme det nye quote i firestore
        //funktionen add() på en collectionref 
        //OPRETTER en ny collection hvis den IKKE findes 
        quotesRef.add({
            text: q,
            origin: o,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            //.then kaldes asynkront NÅR add er færdig
        }).then(
            console.log('Quote gemt i databasen', q)
        )
        select('#newQuote').value('')
    }
}

