// React
import React from 'react';
import { render } from 'react-dom';

// Superagent
import Request from 'superagent';

// Components
import Thanks from './Components/Thanks/Thanks.jsx'
import Capture from './Components/Capture/Capture.jsx'
import ErrorCmp from './Components/ErrorCmp/ErrorCmp.jsx'

// Get widget info
var wrapper = document.getElementById('leadform-wrapper');
var widget_id = wrapper.getAttribute('data-widget-id');
var widget_position = wrapper.getAttribute('data-widget-position');

// Styles
require('./styles.scss');

// App
class App extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      api_url: 'https://jsonplaceholder.typicode.com/posts',
      open: false,
      captured: true,
      error: false,
      error_info: {
        title: 'Error',
        content: '<p>Something went wrong. Please try again.</p>'
      },
      info: {
        bartitle: 'Sign up to our newsletter',
        title: 'Sign up to our newsletter',
        content: '' 
      },
      thanks: {
        title: 'Thanks for signing up',
        content: 'Thanks for signing up to our newsletter.'
      },
      form: {
        buttonText: 'Sign up'
      }
    }
  }

  componentDidMount() {
    this.setDefaults()
    this.checkIfShouldPopup()
  }

  setDefaults() {

    // Api url
    let api_url = (typeof leadform.api_url !== 'undefined') ? leadform.api_url : this.state.api_url

    // Info
    let info = Object.assign(this.state.info, leadform.info)
    
    // Thanks
    let thanks = Object.assign(this.state.thanks, leadform.thanks)
    
    // Form
    let form = Object.assign(this.state.form, leadform.form)

    // Error
    let error_info = Object.assign(this.state.error_info, leadform.error_info)

    // Set new defaults
    this.setState({
      api_url: api_url,
      info: info,
      thanks: thanks,
      form: form,
      error_info: error_info
    })

  }

  checkIfShouldPopup() {
    let isCaptured = localStorage.getItem('leadform-captured-'+widget_id)
    if(isCaptured == null) {
      this.setState({
        captured: false
      })
    }
  }

  openLeadCapture() {
    this.setState({
      open: true
    })
  }

  closeLeadCapture() {
    this.setState({
      open: false
    })
    // Set error to false after 0.5s
    setTimeout(() => {
      this.setState({
        error: false
      })
    }, 501)
  }

  onFormSubmit(form) {
    Request
    .post(this.state.api_url)
    .send({ form: form })
    .set('Accept', 'application/json')
    .then((res, err) => {
        if(err) {
          this.setState({
            error: true
          })
        } else {
          this.setState({
            captured: true
          })
          localStorage.setItem('leadform-captured-'+widget_id, 'yes')
        }
    });
  }

  render() {

    // Wrapper class
    let leadClassName = ''

    // Open - Closed
    leadClassName += (this.state.open) ? 'open ' : 'closed '

    // Right - Left
    leadClassName += (widget_position) ? widget_position : 'right'

    // Content
    let innerContent
    if (this.state.error) {
      innerContent = <ErrorCmp error={this.state.error_info} />
    } else if (this.state.captured) {
      innerContent = <Thanks thanks={this.state.thanks} />
    } else {
      innerContent = <Capture onFormSubmit={this.onFormSubmit.bind(this)} info={this.state.info} form={this.state.form} />
    }

    // Is form is captured and is closed, render nothing
    if (this.state.captured && !this.state.open) {
      return (
        <div id="leadform-wrapper"></div>
      )
    }

    // Images
    let arrowImage = require('./images/arrow.png');
    let closeImage = require('./images/close.png');

    return (
      <div id="leadform-wrapper" className={leadClassName}>
        <div className="leadform-opennote" onClick={this.openLeadCapture.bind(this)}>
          <div className="leadform-opennote-title">
            {this.state.info.bartitle}
          </div>
          <div className="leadform-opennote-arrow">
            <img src={arrowImage} />
          </div>
        </div>
        <div className="leadform-note">
          <div className="leadform-note-inner">
            <div className="leadform-note-close" onClick={this.closeLeadCapture.bind(this)}>
              <img src={closeImage} />
            </div>

            {innerContent}

          </div>
        </div>
      </div>
    ) 
  }

}

// Render widget
var temp = document.createElement("div");
var container = document.getElementsByTagName('body')[0];
render(
  <App widgetId={widget_id} />, 
  temp
);
container.replaceChild(temp.querySelector("#leadform-wrapper"), document.getElementById("leadform-wrapper"));