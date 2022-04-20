import React from 'react';
import { Link } from 'react-router-dom'
import './GuessFlag.css';
const wcc = require('world-countries-capitals');
let repeat;
//Creates other flag options
const FlagOptions = function(){
  let Names = [], array = []

   //keep looping till completes twelve unrepeated flags
  for(let i = 0; array.length < 12; i++){
    let select = wcc.getRandomCountry() //name
    let country = wcc.getCountryDetailsByName(select); //object
    let randomFlag = country[0]['flag'] //shortcut

     //doesn't let flags repeat
    if(array.indexOf(randomFlag) === -1){
      array.push(randomFlag)
      Names.push(select)
    }
  }  
  return {array, Names}
}

const Options = FlagOptions()

class GuessFlag extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        title: Options["Names"][Math.floor(Math.random() * (11 - 1) + 1)],
        options: Options["array"],
        names: Options["Names"],
        showMessage: false,
      }
      this.changleTitle = this.changleTitle.bind(this)
      this.arrayChecker = this.arrayChecker.bind(this)
      this.restartApp = this.restartApp.bind(this)
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
          title:":)",
        }))
        
        repeat = setInterval(() => {
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

      this.setState(state =>({
        names: list, //set the updated list
      }))
      //returns random number (use as an index)
      return Math.floor(Math.random() * list.length)
    }

    showMessage(){
      this.setState(state =>({
        showMessage: false,
      }))
      this.restartApp()
    }

    restartApp(){
      for(let i = 0; i < this.state.options.length; i++){  //Gets rid of green outlines
        document.getElementById(this.state.options[i]).style.outline="none"
        document.getElementById(this.state.options[i]).style.pointerEvents="all"
      }
      const Options = FlagOptions()

      this.setState(state =>({
        options: Options["array"],
        names: Options["Names"],
      }))
      
      //resets interval, prevents loop
      clearInterval(repeat);
      this.changleTitle()
    }    

    render(){
      const options = this.state.options.map(road => 
        <input type="image" src={road} className="flags" id={road} value={road} onClick={this.clickButton.bind(this)}/>)

      return(
        <div>
          <header>
            <Link to="/flags-quiz">
              <div id="backMenu">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/></svg>
              </div> 
            </Link>  
            BACK TO MENU 
          </header>     

          <div id="container">
            {this.state.showMessage && <button onClick={this.showMessage.bind(this)}>play again</button>}
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