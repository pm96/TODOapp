import React from 'react';

const TitleStyle = {
  paddingBottom: '25px'
};

const Title = ({onSubmit, onUpdateInput, errorMessageStyle}) => {
  return(
    <div className="ui two column doubling stackable grid container" style={TitleStyle}>
      <div className="column">
        <h3>TODO</h3>
      </div>
      <div className="column">
        <div className="ui action input right floated">
            <input
              type="text"
              id="inputinput"
              placeholder="Get groceries.."
              onChange={onUpdateInput}
            />
            <button className="ui button" onClick={onSubmit} >Add TODO</button>
        </div>
        <div className={`${errorMessageStyle}`}>
          <p>You need to enter some text</p>
        </div>
      </div>
    </div>
  );
};

export default Title;
