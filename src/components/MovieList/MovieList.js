import React, { Component } from 'react';
// import './App.css';
import MovieItem from '../MovieItem/MovieItem'
import { connect } from "react-redux";

class MovieList extends Component {
    componentDidMount() {
        this.props.dispatch({ type: "FETCH_MOVIES" });
    }
    // Renders the entire app on the DOM
    render() {
        return (
            <ul>
                {this.props.reduxState.movies.map((movie) => {
                    return <MovieItem key={movie.id} movie={movie} />;
                })}
            </ul>
        );
    }
}

const mapReduxStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapReduxStateToProps)(MovieList);
