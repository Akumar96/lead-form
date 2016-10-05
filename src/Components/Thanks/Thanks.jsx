// React
import React from 'react';

// Thanks component
export default class Thanks extends React.Component {

  render () {

    return (
      <div>

        <div className="leadform-note-title" dangerouslySetInnerHTML={{__html: this.props.thanks.title}}></div>

        <div dangerouslySetInnerHTML={{__html: this.props.thanks.content}}></div>

      </div>
    )

  }

}