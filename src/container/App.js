import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import classes from "./App.module.css";
import ToDoItems from "../components/ToDoItems/ToDoItems";
import Cockpit from "../components/Cockpit/Cockpit";

class App extends Component {
  // constructor for App component
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  /*
    state object containing:
    - toDoItems: the list of to-do items:
      - id: unique id of the item to act as a key
      - assignee: the user entered assignee
      - dueDate: the user set due date in html date format
      - description: an user written description for the to-do item
      - complete: a complete flag for the completion status of the item
    - currentID: the unique ID to give to the next created to-do item, is incremented upon creation of a new to-do item
    - mode: can be "add" or "edit", sets the mode of cockpit to either display empty fields or data from an editing to-do item
    - editItemIndex: the index of the item to be edited such that the correct item is updated in the toDoItems list
  */
  state = {
    toDoItems: [],
    currentID: 0,
    mode: "add",
    editItemIndex: 0
  };

  /*
    additionHandler: 
    - arguments: 
      - newItem: the new toDoItem that is to be added to the toDoItems array
    - returns: 
      - none
    - description: 
      - Grabs currentID and creates new to-do item with unique current ID. increments currentID and adds new to-do item to list of toDoitems
  */
  additionHandler = newItem => {
    let currentID = this.state.currentID;
    let newToDoItem = { currentID, ...newItem };
    currentID += 1;
    this.setState({
      toDoItems: [...this.state.toDoItems, newToDoItem],
      currentID: currentID
    });
  };

  /*
    removeHandler: 
    - arguments: 
      - itemIndex: the index of the to-do item in the array that is to be deleted from the array
    - returns: 
      - none
    - description: 
      - Grabs the list of to-do items, splice the item at itemIndex out of the array, and updates the array to reflect the removal.
  */
  removeHandler = itemIndex => {
    const toDoItems = [...this.state.toDoItems];
    toDoItems.splice(itemIndex, 1);
    this.setState({ toDoItems: toDoItems });
  };

  /*
    moveUpHandler: 
    - arguments: 
      - itemIndex: the index of the to-do item in the array that is to be switched with the preceeding item
    - returns: 
      - none
    - description: 
      - Checks if there is an item before the specified to-do item. If so, swaps the two items and updates the to-do items array
  */
  moveUpHandler = itemIndex => {
    let toDoItems = [...this.state.toDoItems];
    if (toDoItems[itemIndex - 1]) {
      let temp = toDoItems[itemIndex - 1];
      toDoItems[itemIndex - 1] = toDoItems[itemIndex];
      toDoItems[itemIndex] = temp;
      this.setState({ toDoItems: toDoItems });
    }
  };

  /*
    moveDownHandler: 
    - arguments: 
      - itemIndex: the index of the to-do item in the array that is to be switched with the following item
    - returns: 
      - none
    - description: 
      - Checks if there is an item after the specified to-do item. If so, swaps the two items and updates the to-do items array
  */
  moveDownHandler = itemIndex => {
    let toDoItems = [...this.state.toDoItems];
    if (toDoItems[itemIndex + 1]) {
      let temp = toDoItems[itemIndex + 1];
      toDoItems[itemIndex + 1] = toDoItems[itemIndex];
      toDoItems[itemIndex] = temp;
      this.setState({ toDoItems: toDoItems });
    }
  };

  /*
    completeHandler: 
    - arguments: 
      - itemIndex: the index of the to-do item in the array that is to be marked as complete
    - returns: 
      - none
    - description: 
      - checks if the item is currently not marked as compelte. If so, mark the item as complete and update it in the to-do items array
  */
  completeHandler = itemIndex => {
    let toDoItem = { ...this.state.toDoItems[itemIndex] };
    if (!toDoItem.complete) {
      toDoItem.complete = true;
      let toDoItems = [...this.state.toDoItems];
      toDoItems[itemIndex] = toDoItem;
      this.setState({ toDoItems: toDoItems });
    }
  };

  /*
    editHandler: 
    - arguments: 
      - itemIndex: the index of the to-do item in the array that is to be edited
    - returns: 
      - none
    - description: 
      - method is called upon pressing the edit button on a to-do item, sets mode to edit mode and re-renders the page to alow cockpit to change to edit mode.
  */
  editHandler = itemIndex => {
    this.setState({ mode: "edit", editItemIndex: itemIndex });
  };

  /*
    makeEditHandler: 
    - arguments: 
      - changedItem: the edited to-do item received from cockpit.js once user presses the button to change
    - returns: 
      - none
    - description: 
      - method is called upon pressing the "edit to-dd" in cockpit, it updates the item with index specified in this.state.editItemIndex and causes a re-render.
  */
  makeEditHandler = changedItem => {
    let toDoItems = [...this.state.toDoItems];
    toDoItems[this.state.editItemIndex] = changedItem;
    this.setState({ toDoItems: toDoItems, mode: "add" });
  };

  render() {
    console.log("[App.js] render");
    let toDoItems = null;

    toDoItems = (
      <ToDoItems
        toDoItems={this.state.toDoItems}
        editClick={this.editHandler}
        completeClick={this.completeHandler}
        moveUpClick={this.moveUpHandler}
        moveDownClick={this.moveDownHandler}
        removeClick={this.removeHandler}
      />
    );

    return (
      <div className={classes.App}>
        <head>
          {/* bootstrap */}
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
        </head>
        <body>
          <Cockpit
            title="To-Do List"
            additionHandler={this.additionHandler}
            mode={this.state.mode}
            toDoItems={this.state.toDoItems}
            editItemIndex={this.state.editItemIndex}
            makeEditHandler={this.makeEditHandler}
          />
          {toDoItems}
        </body>
      </div>
    );
  }
}

export default App;
