var client

function setup(){
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    client.on('connect', msg => {
        var toast = select('#toast')
        console.log('Forbundet til NEXT MQTT server')
        toast.html('Forbundet til NEXT MQTT server')
        toast.addClass('toastShow')
        setTimeout(()=>{
            toast.removeClass('toastShow')
        }, 2000)
    })

        // Subscribe = vi LYTTER efter beskeder på disse topics
    client.subscribe('nugga')
    client.subscribe('nugga/page')

    selectAll('.page').forEach(p => {
    let btn = createButton(p.attribute('title'))
    btn.mousePressed(() => shiftPage('#' + p.attribute('id')))
    select('#menu').child(btn)
})

    client.on('message', (topic, msg) => {
        console.log(topic, msg.toString())
        msg = msg.toString()

        if(topic == 'nugga/page'){
            msg = '#page' + msg
            shiftPage(msg)
        }

        if(topic == 'nugga'){
            if(msg === 'kat'){
                shiftPage('#page4')
                visKat()
            } else {
                select('#msg').elt.textContent = 'Besked på topic ' + topic + ' med teksten ' + msg
            }
        }
    })

    client.publish('programmering/page', '1')
}

var currentPage = "#page1"

// shiftPage skifter synlig side ved at fjerne/tilføje klassen "show"
// removeClass('show') gemmer den gamle side
// addClass('show') viser den nye side
function shiftPage(newPage){
    if( !select(newPage) ) return
    select(currentPage).removeClass('show')
    currentPage = newPage
    select(currentPage).addClass('show')
}

// viser et katte billede og afspiller lyd inde i #katContainer
function visKat(){
    var container = select('#katContainer')
    container.html(`
        <div class="kat-popup">
            <img src="assets/2d36b488c1e80986550be9b8053df674-removebg-preview.png">
        </div>
    `)

    var lyd = new Audio('assets/dffdv-tiger-roar-loudly-193229.mp3')
    lyd.play()
}
