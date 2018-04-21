import { combineReducers } from 'redux'
import { createReducer } from 'redux-act'
import * as actions from '~/actions'

export const initialState = {
  sample: {
    data: [],
  },
}


const sample = createReducer({
  [actions.registData]: (state, payload) => {
    state.data.push(payload)
    return { data: [...state.data] }
  },
}, initialState.sample)

export default combineReducers(
  {
    sample,
  }
)

