import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import React from 'react';
import Home from "./components/Home";
import GuessFlag from "./components/GuessFlag";
import GuessCountry from "./components/GuessCountry";
import ChooseCategory from "./components/ChooseCategory";

function App() {
  return ( 
      <BrowserRouter>
          <Routes>          
            <Route exact path='/flags-quiz' element={<Home/>}/>
            <Route exact path='/GuessFlag' element={<GuessFlag/>}/>
            <Route exact path='/GuessCountry' element={<GuessCountry/>}/>
            <Route exact path='/ChooseCategory' element={<ChooseCategory/>}/>
          </Routes> 
      </BrowserRouter>
  );
}

export default App;
