import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Home from './components/pages/Home/Home.js';
import Login from './components/pages/Login/Login.js';
import Header from './components/Header/Header.js';
import Signup from './components/pages/Signup/Signup.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/entrar" element={<Login />} />
          <Route exact path="/cadastrar" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    ) 
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
