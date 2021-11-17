import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home.js';
import Welcome from './components/pages/Welcome/Welcome.js';
import Header from './components/Header/Header.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/welcome" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    ) 
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
