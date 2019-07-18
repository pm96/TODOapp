import React from 'react';

const Todo = ({handling, deleteTodo, index, editTodo, finishTodo}) => {
  return(
    <div className={`ui clearing segment ${handling.style}`}>
        <div className="ui contaner">
          <div className={`ui animated button right floated ${handling.disabled}`} onClick={editTodo}>
            <div className="visible content">Edit</div>
            <div className="hidden content">
              <i className="pencil alternate icon"></i>
            </div>
          </div>
          <div className={`ui animated button right floated`} onClick={deleteTodo}>
            <div className="visible content">Delete</div>
            <div className="hidden content">
              <i className="trash icon"></i>
            </div>
          </div>
          <div className={`ui primary animated button right floated`} onClick={finishTodo}>
            <div className="visible content">{handling.finish_unfinishButtonText}</div>
            <div className="hidden content">
              <i className={`${handling.finish_unfinishButtonIcon}`}></i>
            </div>
          </div>
        </div>
        <div className="content">
          {handling.name}
        </div>

    </div>
  );
};

export default Todo;
