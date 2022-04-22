import React from 'react';
import { Link } from 'react-router-dom'
import './GuessCountry.css'
const wcc = require('world-countries-capitals');

//en qué consiste?
/*
 Aparece una bandera en pantalla, dele estilo preguntads
 abajo de ell o de preferencia al costado, cuatro opciones de nombres
 Cuando se elije una opcion incorrecta, boton se pone en rojo y no se puede clickear más hasta elegir la correcta
 Cuando se elije opcion correcta, se actualiza y cambia la badera seleccionada y los nombres a elegir.
 Se van sumando puntos al costado, por niveles. 
*/

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
        options: Options,
        correct: Options[Math.floor(Math.random() * (6 - 1) + 1)]
      }
    }
  
    render(){
      //data
      const flagName = wcc.getCountryDetailsByName(this.state.correct);
      const flagImg = flagName[0]['flag']

      //renders
      const renderFlag = <input class="chosenFlag" type="image" src={flagImg} id={flagName} value={flagName}/>
      const buttons = this.state.options.map(road => <button id={flagName} value={flagName}>{road}</button>)      

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