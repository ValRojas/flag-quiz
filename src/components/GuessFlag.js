import React from 'react';
import './GuessFlag.css';
const wcc = require('world-countries-capitals');

//Flag to Guess
const CountryName = wcc.getRandomCountry();
const FlagToGuess = wcc.getCountryDetailsByName(CountryName);

let Selected = [CountryName]

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
      Selected.push(select)
    }
  }
  return array
}
const Options = FlagOptions()

class GuessFlag extends React.Component{
    constructor(props){
      super(props)
      this.state = {title: CountryName, options: Options, selected: Selected, array:[]}
      this.clickButton = this.clickButton.bind(this)
      this.changleTitle = this.changleTitle.bind(this)
      this.arrayChecker = this.arrayChecker.bind(this)
    }

    //Clicked flag
    clickButton(e){
      let selected = e.target.value //link as id
      let flag = wcc.getCountryDetailsByName(this.state.title); //creates an object

       if(flag[0]['flag'] == selected){
        document.getElementById(flag[0]['flag']).style.outline="4px solid green";
        document.getElementById(flag[0]['flag']).style.pointerEvents="none";

        setTimeout(() => {
          this.changleTitle()
        }, 1000)

       }else{
        document.getElementById(selected).style.outline="4px solid red";
        setTimeout(() => {
          document.getElementById(selected).style.outline="none";
        }, 1000)

       }
    }

    //Select random number set title state
    changleTitle(){
      let number = this.arrayChecker()
      this.setState(state =>({
        title: this.state.selected[number]
      }))
    }

    /*cosas a tener en cuenta
    ir sacando los nombres de los paises ganados de SELECTED
    si SELECTED queda en 0, restart todo
    */

    //Prevents name flag repeats, returns another random names
    arrayChecker(){
      return 8
    }

    render(){
      const options = this.state.options.map(road => 
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