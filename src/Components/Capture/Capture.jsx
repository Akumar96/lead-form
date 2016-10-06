// React
import React from 'react';

// Capture component
export default class Capture extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: ''
      }
    }
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.props.onFormSubmit(this.state.form)
  }

  handleChange(event) {
    let form = this.state.form
    form.email = event.target.value
    this.setState({
      form: form
    });
  }

  render () {

    return (
      <div>

        <div className="leadform-note-title" dangerouslySetInnerHTML={{__html: this.props.info.title}}></div>

        <p dangerouslySetInnerHTML={{__html: this.props.info.content}}></p>

        <form onSubmit={this.onFormSubmit.bind(this)}>
          <div className="leadform-note-form-group">
            <input type="email" placeholder="Email" required onChange={this.handleChange.bind(this)} />
          </div>
          <div className="leadform-note-form-group">
            <input type="submit" value={this.props.form.buttonText} />
          </div>
        </form>

      </div>
    )

  }

}