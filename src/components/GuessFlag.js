import React from 'react';
import './GuessFlag.css';
const wcc = require('world-countries-capitals');

//Flag to Guess
const CountryName = wcc.getRandomCountry();
const FlagToGuess = wcc.getCountryDetailsByName(CountryName);

//Creates other flag options
const FlagOptions = function(){
  let array = []
  let randomNum = Math.floor(Math.random() * (11 - 1) + 1) //random number to hide chosen flag

   //keep looping till completes twelve unrepeated flags
  for(let i = 0; array.length < 12; i++){
    let country = wcc.getCountryDetailsByName(wcc.getRandomCountry());
    let randomFlag = country[0]['flag']

     //hides flag randomly
    if(i == randomNum){
      array.push(FlagToGuess[0]['flag'])
    }

     //doesn't let flags repeat
    if(randomFlag != FlagToGuess[0]['flag'] && array.indexOf(randomFlag) == -1){
      array.push(randomFlag)
    }
  }
  return array
}

const Options = FlagOptions()
//ejemplo boton
//document.getElementById('start_stop').disabled=false;
class GuessFlag extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        border: {},
        title: CountryName
      }
      this.clickButton = this.clickButton.bind(this)
    }

    clickButton(e){
      let selected = e.target.value //is a link
      let flag = wcc.getCountryDetailsByName(this.state.title); //creates an object

       if(flag[0]['flag'] == selected){
        document.getElementById(flag[0]['flag']).style.outline="4px solid green";
       }else{
        document.getElementById(selected).style.outline="4px solid red";
       }
    }


    //el problema no es que las imagenes no puedan usar un OnClick, sino que parecen no poder mandar un e.target.value. Por eso, incluso si tocas la bandera correcta, aparece en borde rojo.
    //solucion: Buscar qué manda una imagen si no pueden con los E(events).

    //Cuando le saco el OnClick al button, el borde verde deja de funcionar, porque button es el unico que realmente manda su value a la función

    //vos podes!!!! hoy avanzaste mucho
    render(){ //cuando toco el boton funciona, cuando toco la bandera no. 
      const options = Options.map(road => 
      
        <input type="image" src={road} className="flags" id={road} value={road} onClick={this.clickButton}/>)

      return(
        <div id="container">
          <h1 id="title">{CountryName}</h1>

          <div id="flagsContainer">
            {options}
          </div>

        </div>
      )
    }
}
  
export default GuessFlag;