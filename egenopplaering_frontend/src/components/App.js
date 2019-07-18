import React from 'react';
import 'semantic-ui-css/semantic.min.css';

import Title from './Title';
import Todos from './Todos';
import ModalModalExample from './ModalModalExample';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      temp: '',
      standardStyle: 'ui clearing segment',
      errorMessageStyle: 'ui negative message hidden',
      handling: [
        {
          name:'Buy groceries',
          style: 'ui clearing segment',
          disabled: '',
          finish_unfinishButtonText: 'Finish',
          finish_unfinishButtonIcon: 'check icon',
        },
        {
          name:'Run a mile',
          style: 'ui clearing segment',
          disabled: '',
          finish_unfinishButtonText: 'Finish',
          finish_unfinishButtonIcon: 'check icon',
        }
      ],
      todoStyle: '',
      finished: false,
      showModal: false,
      editingTodoIndex: null,
    };
  }

  addTodo = (e) => {
    e.preventDefault(); //prevents default
    //joins old objectArray and
    if(this.state.temp === '' || this.state.temp === ' '){
      this.setState({errorMessageStyle: 'ui negative message'})
    }else{
      const joinedState = [
        ...this.state.handling,
          {
            name:this.state.temp,
            style:this.state.standardStyle,
            finish_unfinishButtonText: 'Finish',
            finish_unfinishButtonIcon: 'check icon',
            disabled:''
          }
      ];
      this.setState({
        handling: joinedState,

        errorMessageStyle: 'ui negative message hidden',
      });
    }
  };

  handleChange = (e) => {
    if (this.state.temp !== '' || this.state.errorMessageStyle === 'ui negative message') {
      this.setState({errorMessageStyle:  'ui negative message hidden'})
    }
    //gets input as its input and puts it in a stateField called temp
    this.setState({
      temp: e.target.value
    });
  };

  deleteTodo = (index) => {
    //gets entire objectArray
    const todoList = [...this.state.handling];
    //splices array at index
    todoList.splice(index,1);
    //sets new state without old object in objectArray
    this.setState({handling:todoList});
  };

  editTodo = (index, e) => {this.setState(
      {
        showModal: !this.state.showModal,
        editingTodoIndex: index
      });};

  changeTodoName= (index, e) => {
    //gets entire handling object array
    const entireTodoState = [...this.state.handling];
    //changes correct object of objectarray from state.editingTodoIndex and assignes the value written
    entireTodoState[this.state.editingTodoIndex].name = this.state.temp;
    this.setState({
      handling:entireTodoState,
      showModal: false,
      temp: '',
    });
  }

  finishTodo = (index, e) => {
    //get full objectArray
    const objectArray = this.state.handling;
    //get particular object in array
    const todoObject = this.state.handling[index];

    var extraStyle = this.state.handling[index].disabled === ' disabled' ? '' : ' disabled'
    //assign disabled to appropriate fields
    todoObject.style = this.state.standardStyle + extraStyle;
    todoObject.disabled = extraStyle;

    //conditional rendering of text on finish/unfinish button
    var btnTxt = this.state.handling[index].disabled === ' disabled' ? 'Unfinish' : 'Finish';
    //conditional rendering of button on finish/unfinish button
    var btnIcon = this.state.handling[index].disabled === ' disabled' ? 'redo icon' : 'check icon'

    //assign appropriate values to fields
    todoObject.finish_unfinishButtonText = btnTxt;
    todoObject.finish_unfinishButtonIcon = btnIcon;

    //overwrite object at index with new object
    objectArray[index] = todoObject;
    //set state
    this.setState({todoStyle: 'disabled'});

  };

  render(){
    //conditionally renders modal
    let modal;
    if(this.state.showModal){
      modal = <ModalModalExample
                showModal={this.state.showModal}
                onUpdateInput={this.handleChange}
                changeTodoName={this.changeTodoName}
              />
    }else{
      modal = null;
    }

    return (
      <div className="ui container segment">
        <Title
          onSubmit={this.addTodo}
          onUpdateInput={this.handleChange}
          errorMessageStyle={this.state.errorMessageStyle}
        />
        <Todos
          handling={this.state.handling}
          deleteTodo={this.deleteTodo}
          editTodo={this.editTodo}
          finishTodo={this.finishTodo}
          todoStyle={this.state.todoStyle}
          btnTxt={this.state.handling.finish_unfinishButtonText}
          btnIcon={this.state.handling.finish_unfinishButtonIcon}
        />
        <div className="modal-container">
        {modal}
        </div>
      </div>
    );
  };

}
export default App;
