import React, { Component } from 'react';
// import './App.css';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import swal from "sweetalert";
import axios from "axios";
import { TextField, Button, Paper } from "@material-ui/core";
import { withRouter } from "react-router";

class MovieItem extends Component {
  state = {
    toggle: false,
    title: this.props.movie.title,
    description: this.props.movie.description,
  };

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };

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
          url: `/movie/${this.props.movie.id}`,
          data: {
            title: this.state.title,
            description: this.state.description,
          },
        }) //end axios
          .then((response) => {
            //start .then
          }) //end .then
          .catch((error) => {
            //start .catchError
            console.log(error);
          }); //end .catchError
        //success! Review flagged
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
      //reloads page showing current info from database with newly flagged item
    });
  };

  navToEdit = () => {
    this.props.history.push("/edit");
  };

  navToHome = () => {
    this.toggle();
    this.props.history.push("/");
    window.location.reload();
  };

  navToDetails = () => {
    this.toggle();
    this.props.history.push("/details");
  };

  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  }; //end handleChange
  // Renders the entire app on the DOM
  render() {
    return (
      // <div className="App">
      //     We made it here!
      // </div>
      <div>
        <Route exact path="/">
          <span>
            <img
              onClick={this.navToDetails}
              src={this.props.movie.poster}
              alt={this.props.movie.title}
            ></img>
          </span>
          <span>{this.props.movie.title}</span>
        </Route>
        <Route exact path="/details">
          {this.state.toggle === false ? (
            <span></span>
          ) : (
            <div>
              <span>{this.props.movie.description}</span>
              <Button
                variant="contained"
                color="primary"
                onClick={this.navToHome}
              >
                Back To List
              </Button>
                <Button onClick={this.navToEdit} variant="contained" color="primary">
                  Edit
                </Button>
            </div>
          )}
        </Route>
        <Route exact path="/edit">
          {this.state.toggle === false ? (
            <span></span>
          ) : (
            <form onSubmit={this.editMovie}>
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
              <TextField
                multiline
                rows={4}
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
                onChange={(event) => this.handleChange(event, "description")}
              />
              <br />
              {/* button to submit comments */}
              <Button
                className="editButton"
                variant="contained"
                color="primary"
                type="submit"
              >
                Done Editing
              </Button>{" "}
            </form>
          )}
        </Route>
      </div>
    );
  }
}

export default withRouter(connect()(MovieItem));