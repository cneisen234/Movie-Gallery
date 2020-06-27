import React, { Component } from 'react';
// import './App.css';
import MovieItem from '../MovieItem/MovieItem'
import { connect } from "react-redux";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

class MovieList extends Component {
    componentDidMount() {
        this.props.dispatch({ type: "FETCH_MOVIES" });
    }
    // Renders the entire app on the DOM
    render() {
        return (
            <Router>
            <div>
                {this.props.reduxState.movies.map((movie) => {
                    return <MovieItem key={movie.id} movie={movie} />;
                })}
            </div>
            </Router>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(MovieList);
