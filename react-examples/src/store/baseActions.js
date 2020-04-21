import {mapValues} from 'lodash'

export const BaseActions = {
  SET_FETCHING: 'SET_FETCHING'
}


export const createActions = (prefix, actions) => {
  const newActions = {...BaseActions, ...actions}
  const newActionsWithPrefix = mapValues(newActions , (value) => `${prefix}/${value}`)
  return newActionsWithPrefix
}