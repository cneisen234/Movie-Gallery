import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList.js'
import Footer from "../Footer/Footer";


class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <MovieList />
        <Footer />
      </div>
    );
  }
}

export default App;
