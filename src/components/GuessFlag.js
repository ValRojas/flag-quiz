import React from 'react';
import { Link } from 'react-router-dom'
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
      this.state = {
        title: CountryName, 
        options: Options, 
        names: Names, 
        array:[]
      }
      this.changleTitle = this.changleTitle.bind(this)
      this.arrayChecker = this.arrayChecker.bind(this)
      this.restartApp = this.restartApp.bind(this)
      this.deselector = this.deselector.bind(this)
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

      if(this.state.names.length == 0){
        this.setState(state =>({
          title:"terminado!!!"
        }))
        setTimeout(() => {
          this.restartApp()
        }, 1000)

      }else{
        this.setState(state =>({
          title: this.state.names[number]
        }))
      }
      
    }
    
    //returns an index
    arrayChecker(){
      let list = this.state.names

      //remove the title
      if(list.indexOf(this.state.title) >= 0){
        list.splice(list.indexOf(this.state.title), 1)
      }
      if(this.state.array.indexOf(this.state.title) === -1){
        this.setState(state =>({
          array: [...this.state.array, this.state.title], //add title to array 
          names: list, //set the updated list
        }))
      }

      //returns random number (use as an index)
      return Math.floor(Math.random() * list.length)
    }

    restartApp(){
      this.deselector(Options)
      const options = FlagOptions()

      this.setState(state =>({
        title: this.changleTitle(), 
        options: options, 
        names: Names, 
        array:[]
      }))
    }
    
    deselector(options){ //
      for(let i = 0; i < options.length; i++){
        document.getElementById(options[i]).style.outline="none"
        document.getElementById(options[i]).style.pointerEvents="all"
      }
    }

    render(){
      const options = this.state.options.map(road => 
        <input type="image" src={road} className="flags" id={road} value={road} onClick={this.clickButton.bind(this)}/>)

      return(
        <div id="allElements">
          <Link to="/flags-quiz"><h1>→</h1></Link>
          <div id="container">
            <h1 id="countryname">{this.state.title}</h1>
            <div id="flagsContainer">
              {options}
            </div>

          </div>
        </div>
      )
    }
}
  
export default GuessFlag;