import React, { Component } from 'react';
// import './App.css';
import MovieItem from '../MovieItem/MovieItem'
import { connect } from "react-redux";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import Header from "../Header/Header";

class MovieList extends Component {
  //fetches dataquery on load
    componentDidMount() {
        this.props.dispatch({ type: "FETCH_MOVIES" });
    }
    // start render
    render() {
        return (
          <Router>
            {/* only load header tag on homepage */}
            <Route exact path="/">
              {/* header component */}
              <Header />
            </Route>
            {/* line breaks for positioning */}
            <br /> <br /> <br />
            <div>
              {/* map through entire data query */}
              {this.props.reduxState.movies.map((movie) => {
                // create MovieItem component for each mapped item, pass movie in as props, this gives us access to everything
                // for each mapped item within it's designated component
                return <MovieItem key={movie.id} movie={movie} />;
              })}
            </div>
          </Router>
        ); //end return
    } //end render
} //end MovieList

//reduxState which stores our dataquery
const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(MovieList);
