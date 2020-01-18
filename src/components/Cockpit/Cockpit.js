import React, { Component } from "react";

import classes from "./Cockpit.module.css";

class Cockpit extends Component {
  constructor(props) {
    super(props);
    console.log("[Cockpit.js] constructor");
  }

  // the state is used to represent a singular to-do item (with the exception of the editing flag and editIndex index, which is used to ensure getDerivedStateFromProps does not get continuously called so the user can make edits to the selected to-do item, as well as the item displayed to edit is the item last selected )
  state = {
    assignee: "",
    dueDate: "",
    description: "",
    complete: false,
    editing: false,
    editIndex: -1
  };

  /*
    getDerivedStateFromProps: 
    - arguments: 
      - props: the props given by the parent
      - state: the state of the component to be edited 
    - returns: 
      - the state of the component
    - description: 
      - method is called immediately before render(); if the app is set to edit mode and cockpit isnt already in edit mode, cockpit will enter edit mode and display the data of the editing item that was selected.
  */
  static getDerivedStateFromProps(props, state) {
    // if the user just finished adding or editing an item
    if (props.mode === "edit" && state.editing === false) {
      return {
        ...props.toDoItems[props.editItemIndex],
        editing: true,
        editIndex: props.editItemIndex
      };
    }
    // if the user is currently editing an item but decides to edit another item
    else if (
      props.mode === "edit" &&
      state.editing === true &&
      state.editIndex !== props.editItemIndex
    ) {
      return {
        ...props.toDoItems[props.editItemIndex],
        editIndex: props.editItemIndex
      };
    }

    // otherwise, return null (if changed to empty to-do item, cannot get input..???)
    return null;
  }

  /*
    submitHandler: 
    - arguments: 
      - none
    - returns: 
      - none
    - description: 
      - method is called when user clicks the add/edit to-do button, calls the correct handler from app.js to process the new/edited to-do item and resets the state.
  */
  submitHandler = () => {
    let { editing, editIndex, ...toDoItem } = this.state;

    if (this.props.mode === "add") {
      this.props.additionHandler(toDoItem);
      this.setState({
        assignee: "",
        dueDate: "",
        description: "",
        complete: false
      });
    } else if (this.props.mode === "edit") {
      this.props.makeEditHandler(toDoItem);
      this.setState({
        assignee: "",
        dueDate: "",
        description: "",
        complete: false,
        editing: false
      });
    }
  };

  render() {
    let status = "";

    // different colour for add mode and edit mode
    if (this.props.mode === "add") {
      status = classes.add;
    } else if (this.props.mode === "edit") {
      status = classes.edit;
    }

    return (
      <div className={[classes.Cockpit, status].join(" ")}>
        <h1>{this.props.title}</h1>
        <div>
          Assignee:{" "}
          <input
            type="text"
            onChange={event => this.setState({ assignee: event.target.value })}
            value={this.state.assignee}
          />
          <p />
          Due date:{" "}
          <input
            type="date"
            onChange={event => this.setState({ dueDate: event.target.value })}
            value={this.state.dueDate}
          />
          <p />
          Description:{" "}
          <input
            type="text"
            onChange={event =>
              this.setState({ description: event.target.value })
            }
            value={this.state.description}
          />
          <p />
          <button onClick={this.submitHandler}>{this.props.mode} to-do</button>
        </div>
      </div>
    );
  }
}

export default Cockpit;
