import React, { Component } from 'react';
// import './App.css';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Typography } from "react-router-dom";
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
      <div className="paperContainer">
        <Route exact path="/">
          <Paper
            style={{ borderRadius: "10%", height: "450px", width: "300px" }}
            elevation="24"
            className="movieBox hoverBox"
          >
            <span>
              <div className="photo">
                <img
                  onClick={this.navToDetails}
                  src={this.props.movie.poster}
                  alt={this.props.movie.title}
                ></img>
              </div>
              <div className="info">
                Click here to see more information on {this.props.movie.title}
              </div>
            </span>
            <br />
            <div>
              <p>{this.props.movie.title}</p>
            </div>
          </Paper>
        </Route>
        <Route exact path="/details">
          {this.state.toggle !== true ? (
            <span></span>
          ) : (
            <div className="animate">
              <img
                src={this.props.movie.poster}
                alt={this.props.movie.title}
                className="descriptionImage"
              ></img>
              <Paper
                style={{ borderRadius: "10%", height: "700px", width: "600px" }}
                elevation="24"
                className="movieBox"
              >
                <div>
                  <p className="movieTitle">{this.props.movie.title}</p>
                  <div className="textBox">
                    <p>{this.props.movie.description}</p>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    onClick={this.navToHome}
                  >
                    Back To List
                  </Button>
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
        <Route exact path="/edit">
          {this.state.toggle !== true ? (
            <span></span>
          ) : (
            <div className="animate">
              <Paper
                style={{ borderRadius: "10%", height: "500px", width: "500px" }}
                elevation="24"
                className="movieBox"
              >
                <p>Please edit the title and description below</p>
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
                    onChange={(event) =>
                      this.handleChange(event, "description")
                    }
                  />
                  <br /> <br /> <br />
                  <br />
                  {/* button to submit comments */}
                  <Button
                    className="button"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Done Editing
                  </Button>{" "}
                </form>
              </Paper>
            </div>
          )}
        </Route>
      </div>
    );
  }
}

export default withRouter(connect()(MovieItem));