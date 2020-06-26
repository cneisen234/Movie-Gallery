import React, { Component } from 'react';
// import './App.css';
import { connect } from 'react-redux';


class MovieItem extends Component {
    state = {
        toggle: false,
    }

    toggle = () => {
        this.setState({
                toggle: !this.state.toggle,
        });
    } 
    // Renders the entire app on the DOM
    render() {
        return (
            // <div className="App">
            //     We made it here!
            // </div>
                <li>
                    <span><img onClick={this.toggle} src={this.props.movie.poster}></img></span>
                <span>{this.props.movie.title}</span>
                {this.state.toggle === false ? "Click movie poster for more details" : <span>{this.props.movie.description}</span>} 
                </li>
             
        );
    }
}

export default connect()(MovieItem);