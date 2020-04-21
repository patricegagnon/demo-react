import React from 'react';

export default (props) => {
  return <div>
    <h1>{props.title}</h1>
    <p>{props.message}</p>
  </div>
}


 class HtmlWithPlaceHoldersExample extends React.PureComponent {
  render () {
    return <div>
      <h1>{this.props.title} (classe)</h1>
      <p>{this.props.message}</p>
    </div>
  }
}