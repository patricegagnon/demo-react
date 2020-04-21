import React from 'react';
import StyledButton from "../common/StyledButton";

class ComponentWithState extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)  //Nécessaire pour que la méthode puisse utiliser this
    this.state = {clickCount: 0}
  }
  handleClick () {
    this.setState({clickCount: this.state.clickCount+1})
  }
  render() {
    const buttonText  = `Bouton cliqué ${this.state.clickCount} fois`
    return <div>
      <Title title="ComponentWithState" />
      <Description>
        <p>Attention!!</p>
        <p>Ce texte des important</p>
      </Description>
      <StyledButton
        actionOnClick={this.handleClick}
        buttonText={buttonText}
        icon="icon-office"
      />
    </div>
  }
}

//Composante fonction stateless
const Title = ({title}) => { //Utilisation de la destructuration du paramètre en ses composantes
  return <h1>{title}</h1>
}

const Description = ({children}) => {
  return <div className="shadow-lg p-3 mb-5 bg-white rounded">{children}</div>
}

export default ComponentWithState