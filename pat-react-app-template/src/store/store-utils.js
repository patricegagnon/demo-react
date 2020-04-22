import {mapValues} from 'lodash'

export const createActions = (prefix, actions) => {
  const newActions = {...actions}
  const newActionsWithPrefix = mapValues(newActions , (value) => `${prefix}/${value}`)
  return newActionsWithPrefix
}
