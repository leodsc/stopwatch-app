import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login"></Route>
        </Routes>
      </BrowserRouter>
    ) 
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
