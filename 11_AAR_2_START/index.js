var client 


function setup(){
    //mqtt er et objekt vi får fra mqtt bilbioteket i html siden 
    client = mqtt.connect('wss://mqtt.nextservices.dk')

    client.on('connect', msg => {
        //console.log(msg)
        var toast = select('#toast')
        console.log('Forbundet til NEXT MQTT server')
        toast.html('Forbundet til NEXT MQTT server')
        toast.addClass('toastShow')
        setTimeout(()=>{
            toast.removeClass('toastShow')
        }, 2000)
    })


    client.subscribe('nugga')
    client.subscribe('nugga/page')

    //og her får vi beskeder på forskellige topics vi abonnere på
    client.on('message', (topic, msg) => {
        console.log(topic, msg)
        msg = msg.toString()
        if(topic.includes('nugga/page')){
            console.log('nu skal alle fuck af faktisk skifte side')
            //er det et tal
            msg = '#page' + msg
            shiftPage(msg)
           
        }
        //nu skal du se noget spænden
        if(topic == 'nugga')(
           select('#msg').elt.textContent = 'Besked få topic' + topic + 'med teksten' + msg)
    })

    client.publish('programmering/page', '2')

}

var currentPage = "#page1"
var readyToShift = true
function shiftPage(newPage){
    if(!select(newPage))return
    if(readyToShift){
      select(currentPage).removeClass('show')
      currentPage = newPage
      select(currentPage).addClass('show')
      readyToShift = false
      setTimeout(()=>readyToShift = true, 5000)
     }

}

