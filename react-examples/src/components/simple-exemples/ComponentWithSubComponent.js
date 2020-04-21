import React from 'react';
import {CssClassNames} from '../const'
const ComponentWithSubComponent = () => {
  return <div>
    <Title title="ComponentWithSubComponent" />
    <Description>
      <p>Attention!!</p>
      <p>Ce texte est important</p>
    </Description>
  </div>
}

//Composante fonction stateless
const Title = ({title}) => { //Utilisation de la destructuration du paramètre en ses composantes
  return <h1>{title}</h1>
}

const Description = ({children}) => {
  return <div className={CssClassNames.description}>{children}</div>
}

export default ComponentWithSubComponent