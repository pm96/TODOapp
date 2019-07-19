import React from 'react';
import axios from 'axios';
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
      handling: [],
      todoStyle: '',
      finished: false,
      showModal: false,
      editingTodoIndex: null,
    };
  }

  componentDidMount(){
    fetch('http://localhost:8080/TODOActions/')
    .then(res => res.json())
    .then((data) => {
      this.setState({handling: data._embedded.tODOActionList});
    })
    .catch(res => console.log(res));
  }

  addTodo = (e) => {
    e.preventDefault(); //prevents default
    //joins old objectArray and

    if(this.state.temp === '' || this.state.temp === ' '){
      this.setState({errorMessageStyle: 'ui negative message'})
    }else{
      const newTODO = {
        name:this.state.temp,
        style:this.state.standardStyle,
        finish_unfinishButtonText: 'Finish',
        finish_unfinishButtonIcon: 'check icon',
        disabled: ''
      }
      axios.post('http://localhost:8080/TODOActions/', newTODO)
        .then( res => {
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
            handling:joinedState,
            errorMessageStyle: 'ui negative message hidden',
          })
        })
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
    const item = this.state.handling[index];
    axios.delete(`http://localhost:8080/${item.id}`)
      .then(axios.get('http://localhost:8080/TODOActions/'))
      .catch(res => console.log(res));
    //gets entire objectArray
    const todoList = [...this.state.handling];
    //splices array at index
    todoList.splice(index,1);
    //sets new state without old object in objectArray
    this.setState({handling:todoList});


  };

  editTodo = (index, e) => {
    this.setState(
      {
        showModal: !this.state.showModal,
        editingTodoIndex: index+1
      });};

  changeTodoName= (index, e) => {
    //gets entire handling object array
    const entireTodoState = [...this.state.handling];
    //changes correct object of objectarray from state.editingTodoIndex and assignes the value written
    entireTodoState[this.state.editingTodoIndex-1].name = this.state.temp;
    this.setState({
      handling:entireTodoState,
      showModal: false,
      temp: '',
    });
    const object = this.state.handling[this.state.editingTodoIndex-1];
    axios.put(`http://localhost:8080/TODOActions/${this.state.editingTodoIndex}`, object, this.state.editingTodoIndex)
      .catch(res => console.log(res));
  }

  finishTodo = (index, e) => {
    //get full objectArray
    const objectArray = this.state.handling;
    //get particular object in array
    const todoObject = this.state.handling[index];

    var actualStyleForTODO = this.state.handling[index].style === 'ui clearing segment' ? 'ui clearing segment disabled' : 'ui clearing segment'
    todoObject.style = actualStyleForTODO;

    var extraStyle = this.state.handling[index].disabled === ' disabled' ? '' : ' disabled'
    //assign disabled to appropriate fields
    ////todoObject.style = this.state.standardStyle + extraStyle;
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
    axios.put(`http://localhost:8080/TODOActions/${index+1}`, todoObject, index+1)
      .catch(res => console.log(res));

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
