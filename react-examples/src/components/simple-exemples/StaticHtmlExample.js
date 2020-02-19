import React from 'react';

export const FunctionComponentStaticExample = (props) => {
  return <div>
    <h1>Application React de base avec composante fonction</h1>
    <p>Tout fonctionne!!</p>
  </div>
}

export class ClassComponentStaticExample extends React.Component {
  render () {
    return <div>
      <h1>Application React de base avec composante classe</h1>
    <p>Tout fonctionne!!</p>
    </div>
  }
}

const createNoJsxComponent  = () => {
  const h1 = React.createElement('h1', {key: 'h1'}, 'Application React de base sans Jsx')
  const p = React.createElement('p', {key: 'p'}, 'Tout fonctionne!!')
  const rootDiv =  React.createElement('div', {key: 'div'}, [h1, p])
  return rootDiv
}

export const NoJsxComponentStaticExample = createNoJsxComponent()
