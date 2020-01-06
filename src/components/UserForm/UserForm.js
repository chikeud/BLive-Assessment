import React from 'react';
import ReactDOM from "react-dom";
import '../../style.css';
import Footer from "../Footer/Footer";
import axios from 'axios';


class VideoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      headerLabel: "The Best Video",
      isActive: false,
      isSaving: false,
      isSaved: false,
      hasErrors: false,
      fields: {
        label: "The Best Video",
        description: "This is definitely the best video. Everything about it is wonderful."
      },
      errors: {
        label: "",
        description:""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.activate = this.activate.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.turnBack = VideoForm.turnBack.bind(this);
    this.turnGrey = VideoForm.turnGrey.bind(this);
    this.updateSaveState = this.updateSaveState.bind(this);
    this.updateErrorState = this.updateErrorState.bind(this);

  };

  // handle live change of field values in states
  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  // helper function to activate
  activate() {
    this.setState({isActive: true});
  }

  // ensures label and description fields match reasonable format
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (fields.label === "")  {
      formIsValid = false;
      errors.label = "Please enter a label.";
    }

    if (!fields.label.match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      errors.label = "Please enter alphabet characters only.";
    }

    if (fields.description === "") {
      formIsValid = false;
      errors.description = "Please enter your description.";
    }

    if (!fields.description.match(/^(.|\s)*[a-zA-Z]+(.|\s)*$/)) {
      formIsValid = false;
      errors.description = "Please enter valid description.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  // clears state and returns to default form mode.
  cancelHandler() {
    let curr = Number(localStorage.getItem("cancel-clicks"));
    let new_val = curr + 1;
    localStorage.setItem("cancel-clicks", new_val.toString());
    this.setState({
      isActive: false,
      isSaving: false,
      isSaved: false,
      hasErrors: false,
      fields: {
        label: "The Best Video",
        description: "This is definitely the best video. Everything about it is wonderful."
      },
      errors: {}
    });
  }

  // greys out page while saving
  static turnGrey() {
    let formDiv = document.getElementsByName("videoForm")[0];
    formDiv.style.opacity = 0.5;

    let title = document.getElementsByClassName("heading")[0];
    title.style.opacity = 0.5;
  }

  // turns back to active form after saving
  static turnBack() {
    let formDiv = document.getElementsByName("videoForm")[0];
    formDiv.style.opacity = 1;

    let title = document.getElementsByClassName("heading")[0];
    title.style.opacity = 1;
  }

  updateSaveState() {
    let curr = Number(localStorage.getItem("successes"));
    let new_val = curr + 1;
    localStorage.setItem("successes", new_val.toString());

    setTimeout(() => {
      this.setState({
        hasErrors: false,
        headerLabel: this.state.fields.label,
        isSaved: true,
        isActive: false,
        isSaving: false,
      });
    }, 1000);
    setTimeout(this.turnBack, 1000);
  }

  updateErrorState() {
    this.setState({
      hasErrors: true
    });
    let curr = Number(localStorage.getItem("errors"));
    let new_val = curr + 1;
    localStorage.setItem("errors", new_val.toString());
    setTimeout(this.turnBack, 1000);
  }

  // checks for validity of form and saves fields or returns error
  async saveHandler() {
    let curr = Number(localStorage.getItem("save-clicks"));
    let new_val = curr + 1;
    localStorage.setItem("save-clicks", new_val.toString());

    this.setState({
      isSaving: true
    });
    this.turnGrey();
    let isValid = this.validateForm();

    if (isValid) {
      /** MOCK FORM SUBMISSION POST REQUEST. As I don't have an actual endpoint that will
      definitely return a valid response with our fields data object I'm just using a random url and accounting
      for the 404 and continuation in the finally clause.  **/

      let data = this.state.fields;

      try {
        await axios.post('/video-info', {
          data
        });

      } catch (e) {
        // pass

      } finally {
        this.updateSaveState();
      }
    }
    else {
      this.updateErrorState();
    }
    return false;
  }

  render() {
    return (
      <div id="main">
        <div className="heading">{this.state.headerLabel}</div>
        <form name="videoForm" >
          <div className="field">
            <label>Label</label>
            <input  onClick={this.activate} defaultValue={this.state.fields.label} type="text" name="label" value={this.state.fields.label} onChange={this.handleChange} />
            <span>{this.state.errors.label}</span>
          </div>
          <div className="field" >
            <label>Description</label>
            <textarea  onClick={this.activate} defaultValue={this.state.fields.description}  name="description" value={this.state.fields.description} onChange={this.handleChange}  />
            <span>{this.state.errors.description}</span>
          </div>
        </form>
        <Footer cancelAction={this.cancelHandler} saveAction={this.saveHandler} fields={this.state.fields} hasErrors={this.state.hasErrors} isActive={this.state.isActive} isSaving={this.state.isSaving} isSaved={this.state.isSaved}/>
      </div>
    );
  }
}

export default VideoForm;
const wrapper = document.getElementById("create-video-form");
wrapper ? ReactDOM.render(<VideoForm />, wrapper) : false;