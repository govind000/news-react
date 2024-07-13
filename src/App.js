import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<News key="general"  country="in" pageSize={5} category="general" />} />
            <Route exact path="/general" element={<News key="general"  country="in" pageSize={5} category="general" />} />
            <Route exact path="/business" element={<News key="business" country="in" pageSize={5} category="business" />} />
            <Route exact path="/science" element={<News key="science" country="in" pageSize={5} category="science" />} />
            <Route exact path="/sports" element={<News key="sports" country="in" pageSize={5} category="sports" />} />
            <Route exact path="/health" element={<News key="health" country="in" pageSize={5} category="health" />} />
            <Route exact path="/technology" element={<News key="technology" country="in" pageSize={5} category="technology" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" country="in" pageSize={5} category="entertainment" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
