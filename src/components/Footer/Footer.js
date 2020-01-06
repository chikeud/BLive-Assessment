import React from 'react';
import '../style.css';

// Footer component that takes in a bunch of state variables from the render and determines view as such.
const Footer = (props) => {
  if (props.hasErrors){
    return <div className="footer">
      <div className="save-button"> <a onClick={props.saveAction}> <i className="fa fa-check"> </i>SAVE</a></div>
      <div className="cancel-button err"> <a onClick={props.cancelAction}>CANCEL</a></div>
    </div>
  }

  if (props.isSaved){
    return <div className="footer">
      <div className="saved-button"><a> <i className="fa fa-check"> </i>SAVED</a></div>
      <div className="cancelled-button"> </div>
    </div>
  }

  else if (props.isSaving){
    return <div className="footer">
      <div className="save-button"><a>SAVING...</a></div>
      <div className="cancel-button"> </div>
    </div>
  }

  else if(props.isActive){
    return <div className="footer">
      <div className="save-button"> <a onClick={props.saveAction}> <i className="fa fa-check"> </i> SAVE</a></div>
      <div className="cancel-button"> <a onClick={props.cancelAction} >CANCEL</a></div>
    </div>
  }
  else {
    return <div className="footer">
    </div>
  }
};

export default Footer;