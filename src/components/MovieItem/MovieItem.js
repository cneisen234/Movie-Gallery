import React, { Component } from 'react';
// import './App.css';
import { connect } from 'react-redux';


class MovieItem extends Component {
    // Renders the entire app on the DOM
    render() {
        return (
            // <div className="App">
            //     We made it here!
            // </div>
                <li>
                    <span><img src={this.props.movie.poster}></img></span>
                <span>{this.props.movie.title}</span>
                <span>{this.props.movie.description}</span>
                </li>
             
        );
    }
}

export default connect()(MovieItem);