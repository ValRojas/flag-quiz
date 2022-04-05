import React from 'react';
import './GuessFlag.css';
const wcc = require('world-countries-capitals');

//Flag to Guess
const CountryName = wcc.getRandomCountry();
const FlagToGuess = wcc.getCountryDetailsByName(CountryName);

let Names = [CountryName]

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
    if(i === randomNum){
      array.push(FlagToGuess[0]['flag'])
    }

     //doesn't let flags repeat
    if(randomFlag !== FlagToGuess[0]['flag'] && array.indexOf(randomFlag) === -1){
      array.push(randomFlag)
      Names.push(select)
    }
  }
  return array
}
const Options = FlagOptions()

class GuessFlag extends React.Component{
    constructor(props){
      super(props)
      this.state = {title: CountryName, options: Options, names: Names, array:[]}
      this.changleTitle = this.changleTitle.bind(this)
      this.arrayChecker = this.arrayChecker.bind(this)
    }

    //Clicked flag
    clickButton(e){
      let selected = e.target.value //link as id
      let flag = wcc.getCountryDetailsByName(this.state.title); //creates an object

       if(flag[0]['flag'] === selected){
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

    //Change country name by an unrepeated one
    changleTitle(){
      let number = this.arrayChecker()

      this.setState(state =>({
        title: this.state.names[number]
      }))
    }
    
    //returns an index
    arrayChecker(){
      //lista nombres banderas
      let list = this.state.names

      //si la lista tiene el titulo, entonces se lo saco
      //si no lo tiene, es por callback

      if(list.indexOf(this.state.title) >= 0){
        list.splice(list.indexOf(this.state.title), 1)
      }

      //saco numero random con lista actualizada. Despues de haber sacado los que faltan
      let randomNumber = Math.floor(Math.random() * list.length)

      //si el array no tiene el titulo actual, lo agrego al array, además, actualizo la lista de names
      if(this.state.array.indexOf(this.state.title) === -1){
        this.setState(state =>({
          array: [...this.state.array, this.state.title], //le agrego el titulo actual que falta
          names: list, //actualiza la lista, sin el titulo actual
        }))
      }

      //si el array no tiene el nombre que quiero poner (o sea no se repite) y el titulo actual no se parece al que quiero poner, lo mando
      if(this.state.array.indexOf(this.state.names[randomNumber] === -1) && this.state.title !== this.state.names[randomNumber]){
        return randomNumber
      }else{
        this.arrayChecker()
      }
    }

    render(){
      const options = this.state.options.map(road => 
        <input type="image" src={road} className="flags" id={road} value={road} onClick={this.clickButton.bind(this)}/>)

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