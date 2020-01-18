import React from "react";

import ToDoItem from "./ToDoItem/ToDoItem";

const toDoItems = props => {
  console.log("[ToDoItems.js] rendering...");

  return props.toDoItems.map((toDoItem, index) => {
    return (
      <ToDoItem
        assignee={toDoItem.assignee}
        dueDate={toDoItem.dueDate}
        description={toDoItem.description}
        complete={toDoItem.complete}
        key={toDoItem.id}
        editClick={() => props.editClick(index)}
        completeClick={() => props.completeClick(index)}
        moveUpClick={() => props.moveUpClick(index)}
        moveDownClick={() => props.moveDownClick(index)}
        removeClick={() => props.removeClick(index)}
      />
    );
  });
};

export default toDoItems;
