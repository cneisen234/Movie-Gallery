import React, { Component } from "react";
import { connect } from "react-redux";

// Header is a controlled component that renders the header of the site
class Header extends Component {
    randomNum = () => {
  let newNum = Math.floor(Math.random() * this.props.reduxState.movies.length);
  return newNum;
} //end randomNum
  // React render function



  render() {
     setInterval(() => {
        this.randomNum();
       this.forceUpdate();
        }, 25000);
    
        
      let newNum = this.randomNum()
    return (
      <div className="App">
        <header className="App-header">
          <br />
          <h1 className="App-title">Now Showing:</h1>
          <div className="photoGallery">
            {this.props.reduxState.movies.map((movie) => {
              return this.props.reduxState.movies.indexOf(movie) === newNum ? (
                <img src={movie.poster}></img>
              ) : (
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