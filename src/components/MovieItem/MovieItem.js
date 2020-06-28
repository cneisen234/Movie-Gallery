import React, { Component } from 'react';
// import './App.css';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Typography } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { TextField, Button, Paper } from "@material-ui/core";
import { withRouter } from "react-router";


class MovieItem extends Component {
  //local state preset values, title and description set to values of redux state which match database values. 
  //those values will populate in the input boxes for edited purposes
  state = {
    toggle: false,
    title: this.props.movie.title,
    description: this.props.movie.description,
  };
  //changes boolean value of this.state.toggle
  toggle = () => {
             this.setState({
               toggle: !this.state.toggle,
             });
           };
  //function that allows you to edit the movie
  editMovie = (event) => {
    //prevents default action
    event.preventDefault();
    //sweet alerts
    swal({
      title: "Save changes?",
      text: `Are you sure you want to save these changes? This action can't be undone.`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
      //end sweet alerts
    }).then((confirm) => {
      if (confirm) {
        axios({
          //start axios
          method: "PUT",
          url: `/movie/${this.props.movie.id}`, //grabs id of array in component interacted with, stores in path
          data: {
            title: this.state.title,
            description: this.state.description,
          }, //grabs local state and stores it in data to get sent off via axios
        }) //end axios
          .then((response) => {
            //start .then
          }) //end .then
          .catch((error) => {
            //start .catchError
            console.log(error);
          }); //end .catchError
        //success! Changes saved
        swal("You're changes have been saved!", {
          icon: "success",
        });
      } else {
        //...else cancel
        swal("Your request to edit has been canceled!");
      }
            setTimeout(() => {
              this.navToHome();
            }, 2000);
      //runs navToHome function after a 2 second period
    });
  };

  navToEdit = () => {
    //function to go to edit page
    this.props.history.push("/edit");
  };

  navToHome = () => {
    //changes toggle value in local state
    this.toggle();
    //goes back to home page
    this.props.history.push("/");
    //refreshes page to update contents
    window.location.reload();
  };

  navToDetails = () => {
    //changes toggle value in local state
    this.toggle();
    //goes to details page
    this.props.history.push("/details");
  };
//sets localstate to the value of the input value
  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  }; //end handleChange
  // Render function
  render() {
    return (
      <div className="paperContainer">
        {/* homepage */}
        <Route exact path="/">
          <Paper
            style={{ borderRadius: "10%", height: "450px", width: "300px" }}
            elevation="24"
            className="movieBox"
          >
            <span>
              {/* className used to trigger appearance of info box on hover */}
              <div className="photo">
                {/* when you click the photo, go to details, also toggle local state value of toggle */}
                <img
                  onClick={this.navToDetails}
                  src={this.props.movie.poster}
                  alt={this.props.movie.title}
                ></img>
              </div>
              {/* more info box, this is display: none as a default */}
              <div className="info">
                Click here to see more information on {this.props.movie.title}
              </div>
            </span>
            <br />
            {/* renders the name of the title */}
            <div>
              <p>{this.props.movie.title}</p>
            </div>
          </Paper>
        </Route>
        {/* end homepage */}

        {/* details */}
        <Route exact path="/details">
          {/* if this.state.toggle === not true */}
          {this.state.toggle !== true ? (
            // render nothing
            <span></span>
          ) : (
            //... else render the item

            //... class animate to link to css animation
            <div className="animate">
              {/* displays movie poster */}
              <img
                src={this.props.movie.poster}
                alt={this.props.movie.title}
                className="descriptionImage"
              ></img>
              <Paper
                style={{ borderRadius: "10%", height: "800px", width: "600px" }}
                elevation="24"
                className="movieBox"
              >
                <div>
                  {/* shows title on details page */}
                  <p className="movieTitle">{this.props.movie.title}</p>
                  <div className="textBox">
                    {/* ...and description */}
                    <p>{this.props.movie.description}</p>
                  </div>
                  {/* list of genres */}
                  <ul className="genre">
                    {/* title as list item with individaul values for positioning purposes */}
                      <li className="genres">Genre</li>
                      {/* map through array within genre colomn in database */}
                      {this.props.movie.genres.map((genre) => {
                        //...and display
                        return <li>{genre}</li>;
                      })}
                  </ul>
                  {/* line breaks to help with positioning */}
                  <br /><br /><br />
                  {/* button runs navToHome */}
                  <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    onClick={this.navToHome}
                  >
                    Back To List
                  </Button>
                  {/* button runs navToEdit */}
                  <Button
                    onClick={this.navToEdit}
                    variant="contained"
                    color="primary"
                    className="button"
                  >
                    Edit
                  </Button>
                </div>
              </Paper>
            </div>
          )}
        </Route>
        {/* end details */}

        {/* edit */}
        <Route exact path="/edit">
          {/* if this.state.toggle === not true */}
          {this.state.toggle !== true ? (
            //...render nothing...
            <span></span>
          ) : (
            //...else render the information

            //...class to link to css animations
            <div className="animate">
              <Paper
                style={{ borderRadius: "10%", height: "500px", width: "500px" }}
                elevation="24"
                className="movieBox"
              > 
                  {/* directions listed at top */}
                <p>Please edit the title and description below</p>
                {/* start submission form */}
                {/* onSubmit run editMovie */}
                <form onSubmit={this.editMovie}>
                  {/* edit movie title */}
                  <TextField
                    variant="outlined"
                    label="Title"
                    name="edit"
                    placeholder="Edit Movie Title"
                    // value of local state as text value
                    value={this.state.title}
                    type="text"
                    maxLength={1000}
                    //runs handleChange on input change
                    onChange={(event) => this.handleChange(event, "title")}
                  />
                  {/* edit movie description */}
                  <TextField
                  //per material UI changes textfield to act like a textarea tag
                    multiline
                    //input field takes up for rows by defaults
                    rows={4}
                    //...will expand up to 8 rows
                    rowsMax={8}
                    variant="outlined"
                    label="Description"
                    name="edit"
                    placeholder="Edit Movie Description"
                    // value of local state as text value
                    value={this.state.description}
                    type="text"
                    maxLength={10000}
                    //runs handleChange on input change
                    onChange={(event) =>
                      this.handleChange(event, "description")
                    }
                  />
                  {/* line breaks for positioning */}
                  <br /> <br /> <br />
                  <br />
                  {/* button to submit form */}
                  <Button
                    className="button"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Done Editing
                  </Button>{" "}
                </form>
                {/* end form */}
              </Paper>
            </div>
            // end edit
          )}
        </Route>
      </div>
    );
  } //end return
} //end MovieItem

export default withRouter(connect()(MovieItem));