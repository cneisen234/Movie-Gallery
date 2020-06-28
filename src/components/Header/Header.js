import React, { Component } from "react";
import { connect } from "react-redux";

// Header is a controlled component that renders the header of the site
class Header extends Component {
  //generates and random number used to select a random photo, random multiplied by the amount of movies in database
    randomNum = () => {
  let newNum = Math.floor(Math.random() * this.props.reduxState.movies.length);
  return newNum;
} //end randomNum
  // React render function
  render() {
    //resets a new random number every 20 seconds and forces a rerender of the header
     setInterval(() => {
        this.randomNum();
       this.forceUpdate();
        }, 20000);
    
        //value saved to varible for later use
      let newNum = this.randomNum()
    return (
      <div className="App">
        <header className="App-header">
          <br />
          <h1 className="App-title">Now Showing:</h1>
          <div className="photoGallery">
            {/* map through reduxState.movies */}
            {this.props.reduxState.movies.map((movie) => {
              //...if the index of the array matches the random number...
              return this.props.reduxState.movies.indexOf(movie) === newNum ? (
                //...display the image...
                <img src={movie.poster}></img>
              ) : (
                //...else display nothing
                <span></span>
              );
            })}
          </div>
        </header>
      </div>
    );
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(Header);