import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import EvaluationReducer from './EvaluationReducer'

export default combineReducers({
  auth: AuthReducer,
  eval: EvaluationReducer
})
