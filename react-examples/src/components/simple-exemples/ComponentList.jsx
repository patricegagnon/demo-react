import React from 'react'

export default ({components}) => {
  return <div>
    {components.map(componentInfo => {
      const Component = componentInfo.component
      const props = componentInfo.props || {}
      return <div><Component {...props}/></div>
    })}
  </div>
}

export const ComponentListHighOrder = (components) => {
  return () => {
    return <div>
      {components.map(componentInfo => {
        const Component = componentInfo.component
        const props = componentInfo.props || {}
        return <div><Component {...props}/></div>
      })}
    </div>
  }
}