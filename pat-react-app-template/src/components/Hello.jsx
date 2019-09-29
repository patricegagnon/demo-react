import React from 'react'
import {CssClassNames} from './const'
import StyledButton from "./common/StyledButton";
import PropTypes from 'prop-types';

class Hello extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {count: 0}
    this.click = this.click.bind(this)
  }
  click () {
    this.setState({count: this.state.count + 1})
  }
  render() {
    return <div>
      <Titre titre="Allo"/>
      <Description>Le bouton a été cliqué {this.state.count} fois</Description>
      <StyledButton
        actionOnClick={this.click}
        buttonText="Cliquez ici"
        icon="icon-office" />
    </div>
  }
}

const Titre = ({titre}) => {
  return <h1 className={CssClassNames.titre}>{titre}</h1>
}

Titre.propTypes = {
  titre: PropTypes.string.isRequired
}

const Description = ({children}) => {
  return <div className={CssClassNames.description}>{children}</div>
}

export default Hello