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
    
    
    select('#Btn1').mousePressed( ()=>{
        client.publish('nugga/page', '1')
    }) 

     select('#Btn1').mousePressed( ()=>{
        client.publish('nugga/page', 'open')
    }) 
     select('#Btn1').mousePressed( ()=>{
        client.publish('nugga/page', '2')
    }) 



}


