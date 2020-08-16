import React from 'react';
import ReactDOM from 'react-dom';

//console.log('All begin here')
//document.write('<h1>All begin here!</h1>')

const HelloReact = () => {
  return <h1>Hello React!</h1>
}

ReactDOM.render(<HelloReact/>, document.getElementById('root'))
