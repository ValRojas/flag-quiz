import React from 'react';
import { Link } from 'react-router-dom'
import './GuessCountry.css'
const wcc = require('world-countries-capitals');

let repeat;
//Creates options
const FlagOptions = function(){
  let Names = []
  for(let i = 0; Names.length < 6; i++){
    let select = wcc.getRandomCountry()

     //doesn't let names repeat
     if(Names.indexOf(select) === -1){
      Names.push(select)
    }
  } 
  return Names
}

const Options = FlagOptions()

class GuessCountry extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        options: Options, // array nombre de banderas
        correct: Options[Math.floor(Math.random() * (6 - 1) + 1)], //almacena un elemento del array | nombre bandera
        wins: 0,
        lose: 0,

      }
      this.restartApp = this.restartApp.bind(this)
    }
  
    clickButton(e){
      let selected = e.target.value

      if(selected === this.state.correct){
        document.getElementById(selected).style.outline="3px solid green";
        this.setState(state =>({
          wins: state.wins + 1
        }))

        repeat = setInterval(() => {
          this.restartApp()
        }, 1000)
      }else{
        document.getElementById(selected).style.outline="3px solid red";

        this.setState(state =>({
          lose: state.lose + 1
        }))

        setTimeout(() => {
          document.getElementById(selected).style.outline="1px solid rgb(17, 52, 66)";
        }, 1000)

       }
    }

    restartApp(){
      for(let i = 0; i < this.state.options.length; i++){  //Gets rid of green outline
        document.getElementById(this.state.options[i]).style.outline="1px solid rgb(17, 52, 66)";
      }

      const Options = FlagOptions()

      this.setState(state =>({
        options: Options,
        correct: Options[Math.floor(Math.random() * (6 - 1) + 1)],
      }))

      clearInterval(repeat);      
    }

    render(){
      //data
      const flagName = wcc.getCountryDetailsByName(this.state.correct); //this returns object
      const flagImg = flagName[0]['flag'] //link

      //renders
      const renderFlag = <input class="chosenFlag" type="image" src={flagImg} id="chosenFlag" alt={this.state.correct}/>
      
      const buttons = this.state.options.map(road => <button 
        id={road} 
        value={road}
        onClick={this.clickButton.bind(this)}
        >{road}</button>)      

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
            <div class="points">
              <div style={{color: "green"}}>{this.state.wins}</div>
              <div> - </div>
              <div style={{color: "red"}}>{this.state.lose}</div>
            </div>            
            {renderFlag}    
            
            <div class="buttons">
              {buttons}
            </div>

          </div>

        </div>
      )
    }
}
  
export default GuessCountry;