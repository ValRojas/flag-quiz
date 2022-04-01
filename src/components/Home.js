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
             <h1 id="title">Flag Quiz</h1>

            <div id="Games-container">
                <Link to="/GuessFlag"><button id="choose" className="GuessFlag">Guess the flag</button></Link>
                <Link to="/GuessCountry"><button id="choose" className="GuessCountry">Guess the country</button></Link>
                <Link to="/ChooseCategory"><button id="choose" className="ChooseCategory">Choose Category</button></Link>
            </div>
        </div>
      )
    }
}
  
export default Home;