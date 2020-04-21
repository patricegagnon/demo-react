import React from 'react'

const withBorders = (WrappedComponent) => {
  class ComponentWithBorders extends React.Component {
    render () {
      return <div className="border border-primary rounded p-3">
        <WrappedComponent {...this.props}/>
      </div>
    }
  }
  return ComponentWithBorders
}

export default withBorders


