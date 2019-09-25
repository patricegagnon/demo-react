import React from "react";
import PropTypes from 'prop-types';

class StyledButton extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log('StyledButton shouldComponentUpdate')
    console.log('  Current : ' + JSON.stringify(this.props))
    console.log('  Next : ' + JSON.stringify(nextProps))
    return true
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('StyledButton componentWillUpdate')
    console.log('  Current : ' + JSON.stringify(this.props))
    console.log('  Next : ' + JSON.stringify(nextProps))
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('StyledButton componentDidUpdate')
    console.log('  Before : ' + JSON.stringify(prevProps))
    console.log('  After : ' + JSON.stringify(this.props))
  }
  render () {
    console.log('StyledButtonFn render')
    const className = `${this.props.icon} mr-3`
    return <button className=" btn btn-primary p-3 mb-1"  onClick={this.props.actionOnClick}>
      {this.props.icon && <i className={className}></i>}
      {this.props.buttonText}
    </button>
  }
}

StyledButton.propTypes = {
  buttonText: PropTypes.string,
  actionOnClick: PropTypes.func
}

export default StyledButton