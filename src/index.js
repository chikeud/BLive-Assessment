import ReactDOM from 'react-dom';
import VideoForm from './components/UserForm/UserForm'
import React from 'react';
import axios from 'axios';

// Set analytics variables in local storage
localStorage.setItem("cancel-clicks", "0");
localStorage.setItem("save-clicks", "0");
localStorage.setItem("errors", "0");
localStorage.setItem('successes', "0");

// function to send analytics data to random external endpoint for saving.
const sendAnalytics = async () =>{
  let data = {
    cancelClicks: localStorage.getItem("cancel-clicks"),
    saveClicks: localStorage.getItem("save-clicks"),
    errors: localStorage.getItem("errors"),
    successes: localStorage.getItem("successes")
  };
  try {
    await axios.post('/analytics', {
      data
    });
  } catch (e) {
    //console.error(e);
  } finally {
    //pass
    console.log(data);
  }
};

// performs sendAnalytics function before the page is refreshed and localStorage is cleared.

window.addEventListener('beforeunload', function (e) {
  // Cancel the event
  e.preventDefault();
  // Chrome requires returnValue to be set
  e.returnValue = '';
  sendAnalytics();
  setTimeout(delete e['returnValue'], 2000);
});

ReactDOM.render(<VideoForm /> , document.getElementById('create-video-form'));

