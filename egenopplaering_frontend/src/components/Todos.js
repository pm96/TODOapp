import React from 'react';

import Todo from './Todo';


const Todos = (props) => {
  const handlinger = props.handling.map((hand, index) => {
    return <Todo
      key={index}
      handling={hand}
      deleteTodo={props.deleteTodo.bind(this,index)}
      editTodo={props.editTodo.bind(this,index)}
      finishTodo={props.finishTodo.bind(this,index)}
      todoStyle={props.todoStyle}
      btnTxt={props.btnTxt}
      btnIcon={props.btnIcon}
    />
  });
  return <div className="ui container">{handlinger}</div>
};

export default Todos;
