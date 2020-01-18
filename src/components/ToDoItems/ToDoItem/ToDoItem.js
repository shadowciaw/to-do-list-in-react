import React from "react";

import Button from "../../../../node_modules/react-bootstrap/Button";

import classes from "./ToDoItem.module.css";

const toDoItem = props => {
  console.log("[ToDoItem.js] rendering...");
  let toDoItemStyle = [classes.ToDoItem];
  let status = "";

  // sets up which colour and text to display based on the complete status of the to-do item
  if (props.complete) {
    toDoItemStyle.push(classes.complete);
    status = "complete";
  } else {
    toDoItemStyle.push(classes.incomplete);
    status = "incomplete";
  }

  return (
    <div className={toDoItemStyle.join(" ")}>
      <div align="center">
        <p>
          <b>Assignee:</b> {props.assignee}
        </p>
        <p>
          <b>Due date:</b> {props.dueDate}
        </p>
        <p>
          <i>Description:</i> {props.description}
        </p>
        <p>
          <strong>Status: </strong> {status}
        </p>
      </div>

      {/* &nbsp; (non-breaking space ) is used to space out each button */}
      <div>
        <Button size="sm" onClick={props.editClick}>
          edit
        </Button>
        &nbsp;
        <Button size="sm" onClick={props.completeClick}>
          mark as complete
        </Button>
        &nbsp;
        <Button size="sm" onClick={props.moveUpClick}>
          ↑
        </Button>
        &nbsp;
        <Button size="sm" onClick={props.moveDownClick}>
          ↓
        </Button>
        &nbsp;
        <Button size="sm" onClick={props.removeClick}>
          remove
        </Button>
      </div>
    </div>
  );
};

export default toDoItem;
