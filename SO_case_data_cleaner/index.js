//this script takes a csv file and clean the data into javasqript array

var table
//clean data wil hold the javascript objekt we intend to use 
var cleanData = []

const csvFile = './assets/6_class_csv.csv'
//vi vil kun bruge 1000 rækker - da vi skal tegne dem på skærmen
const maxRows = 1000

function preload(){
    //loadTable er en p5 funktion der henter en funktkon fra en fil
    table = loadTable(csvFile, 'csv', 'header')
    console.log('data table loaded')

}


//Problemformulering: kan jeg lave en algoritme der kan forudsig, hvilken type stjene, stjernen er, basseret ud fra 
//temperatur og densititet
function setup(){
    console.log('Rå data kolonner:', table.columns)
    var xValue = 'Temperature (K)'
    var yValue = 'Density (g/cm³)'
    var labelValue = 'Type star'

    //table.rows er et array med alle data objekter i
    //map retunere et nyt array med de dimensioner vi gerne vil have
    cleanData = table.rows.map(row => {
        var x = row.get(xValue)
        var y = row.get(yValue)
        var returnObj = {
            [xValue]:Number(x),
            [yValue]:Number(y)

        }
        if(labelValue){
            returnObj.label = Number(row.get(labelValue))
        }
        return returnObj

    })
    //vi filtere så lige arrayet så vi kan sikre på at alle de dimensioner vi skal bruge er filteret{(
    cleanData = cleanData.filter(row => {
        //vaild er true - hvis begge felter er tal
        var vaild = !isNaN(row[xValue]) && !isNaN(row[yValue])
        //Men vi skal også tjekke om label er noget
        if(labelValue && !row.label){
            vaild = false

        })
        return vaild

        })
        //bland data vilåræogt (p5 funktion der er blandet med et array)

        cleanData.flush()
        cleanData = cleanData.slice(0, maxRows)
        
      

    console.log('så har vi renset data', cleanData)
    Select('#status').html('vi har nu renset data skåret det ned tul max 1000 rækker')
    
}

copy objekt data fra inspect 
var data = []