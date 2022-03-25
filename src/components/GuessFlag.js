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


class GuessFlag extends React.Component{
    constructor(props){
      super(props)
      this.state = {}
    }

    render(){ 
      const options = FlagOptions().map(mapa => <a className="flagsButton"><img src={mapa} id="flags"></img></a>)
      return(
        <div id="container">
          <h1 id="title">{CountryName}</h1>

          <div id="flagsContainer">
            {options}
          </div>

          <div>In progress</div>
        </div>
      )
    }
}
  
export default GuessFlag;