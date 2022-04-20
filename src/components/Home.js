import React from 'react';
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends React.Component{
    constructor(props){
      super(props)
    }
  
    render(){
      return(
        <div id="container">

          <h1 id="title">Flags Quiz</h1>

          <div id="Games-container">
            <div id="choose" className="GuessFlag">
              <div id="emoji">🧩</div>
              <h2>Flags</h2>        
              <p>A country name will be shown to you, guess the flag that belongs to it</p> 
              <Link to="/GuessFlag"><button id="redirect">start playing →</button></Link>  
            </div>

            <div id="choose" className="GuessCountry">  
              <div id="emoji">🗺️</div>  
              <h2>Countries</h2>        
              <p>A flag will be shown to you, guess the name that belongs to it</p> 
              <Link to="/GuessCountry"><button id="redirect">start playing →</button></Link>  
            </div>

            <div id="choose" className="ChooseCategory">   
              <div id="emoji">🛫</div> 
              <h2>Categories</h2>        
              <p>Guess capital, phone code, drive direction or alcohol prohibition</p> 
              <Link to="/ChooseCategory"><button id="redirect">start playing →</button></Link>  
            </div>                
          </div>
          
        </div>
      )
    }
}
  
export default Home;