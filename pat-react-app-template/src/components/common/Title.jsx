import React from "react";

export default (props) => {
  const {children, background} = props
  return <h1 className={`text-uppercase shadow-lg p-3 mb-5 ${background} rounded`}>{children}</h1>
}