import React from 'react';
import './GuessFlag.css';
const wcc = require('world-countries-capitals');

//Flag to Guess
const CountryName = wcc.getRandomCountry();
const FlagToGuess = wcc.getCountryDetailsByName(CountryName);

let selected = []

//Creates other flag options
const FlagOptions = function(){
  let array = []
  let randomNum = Math.floor(Math.random() * (11 - 1) + 1) //random number to hide chosen flag

   //keep looping till completes twelve unrepeated flags
  for(let i = 0; array.length < 12; i++){
    let select = wcc.getRandomCountry() //name
    let country = wcc.getCountryDetailsByName(select); //object
    let randomFlag = country[0]['flag'] //shortcut

     //hides flag randomly
    if(i == randomNum){
      array.push(FlagToGuess[0]['flag'])
    }

     //doesn't let flags repeat
    if(randomFlag != FlagToGuess[0]['flag'] && array.indexOf(randomFlag) == -1){
      array.push(randomFlag)
      selected.push(select)
    }
  }
  return array
}

const Options = FlagOptions()

class GuessFlag extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        border: {},
        title: CountryName
      }
      this.clickButton = this.clickButton.bind(this)
      this.changleTitle = this.changleTitle.bind(this)
    }

    clickButton(e){
      let selected = e.target.value //link as id
      let flag = wcc.getCountryDetailsByName(this.state.title); //creates an object

       if(flag[0]['flag'] == selected){
        document.getElementById(flag[0]['flag']).style.outline="4px solid green";

        setTimeout(() => {
          document.getElementById(flag[0]['flag']).style.outline="none";
          this.changleTitle()
        }, 1000)

       }else{
        document.getElementById(selected).style.outline="4px solid red";
       }
    }

    changleTitle(){
      document.getElementsByClassName('flags').style.outline="none"
      
      this.setState(state =>({
        title: ""
      }))
    }

    render(){
      const options = Options.map(road => 
        <input type="image" src={road} className="flags" id={road} value={road} onClick={this.clickButton}/>)

      return(
        <div id="container">
          <h1 id="countryname">{this.state.title}</h1>

          <div id="flagsContainer">
            {options}
          </div>

        </div>
      )
    }
}
  
export default GuessFlag;