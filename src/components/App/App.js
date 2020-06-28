import React, { Component } from 'react';
import './App.css';
import MovieList from '../MovieList/MovieList.js'
import Footer from "../Footer/Footer";


class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        {/* everything but the footer lives in the MovieList component */}
        <MovieList />
        {/* component for the footer */}
        <Footer />
      </div>
    );
  }
}

export default App;
