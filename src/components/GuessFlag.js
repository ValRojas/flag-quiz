import React from 'react';
import './GuessFlag.css';
const wcc = require('world-countries-capitals');

//Flag to Guess
const CountryName = wcc.getRandomCountry();
const FlagToGuess = wcc.getCountryDetailsByName(CountryName);

//Creates other flag options
const FlagOptions = function(){
  let array = []
  let randomNum = Math.floor(Math.random() * (10 - 1) + 1)
      for(let i = 0; i < 11; i++){
        if(i == randomNum){
          array.push(FlagToGuess[0]['flag'])
        }
        let country = wcc.getCountryDetailsByName(wcc.getRandomCountry());
        array.push(country[0]['flag'])
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