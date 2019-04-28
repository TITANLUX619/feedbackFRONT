import axios from "axios"
import { Actions } from "react-native-router-flux"
import {
	EUVUS_CHANGED,
	SESSION_CHANGED,
	PS_CHANGED,
	GO_TO_EVALUATION,
	GO_TO_EVALUATION_SUCCESS,
	GO_TO_EVALUATION_FAIL,
	EVALUATE_USER,
	EVALUATE_USER_SUCCESS,
	EVALUATE_USER_FAIL,
	ADD_RESULT,
	CHECK
} from "./types"

export const eUvusChanged = text => ({
	type: EUVUS_CHANGED,
	payload: text
})

export const sessionChanged = text => ({
	type: SESSION_CHANGED,
	payload: text
})

export const PSChanged = text => ({
	type: PS_CHANGED,
	payload: text
})

export const check = (checks, index, checked) => dispatch => {
	checks[index]=checked
	checks2 =new Array(checks[0], checks[1], checks[2], checks[3], checks[4], checks[5])
  dispatch({ type: CHECK, payload: checks2 })
}

export const addResult = (results, result) => dispatch => {
  results.push(result)
  dispatch({ type: ADD_RESULT, payload: results })
}

export const goToEvaluation = (eUvus, session, checks) => dispatch => {
	dispatch({ type: GO_TO_EVALUATION, payload: eUvus })
  console.log('eUvus: ', eUvus)
  console.log('session: ', session)

	if (!checks.includes(false)) {
  axios.get(`http://192.168.0.30:3000/api/v1/feedbacks/${session}`)
		.then(response => {
			goToEvaluationSuccess(dispatch, response.data)
		})
		.catch(error => {
			console.log(error)
			goToEvaluationFail(dispatch)
		})
	} else {
		goToEvaluationFail(dispatch)
	}
}

const goToEvaluationSuccess = (dispatch, data) => {
  dispatch({ type: GO_TO_EVALUATION_SUCCESS, payload: data.feedback.points })
  Actions.evaluation()
}

export const goToEvaluationFail = dispatch => {
	console.log('goToEvaluationFail')
	dispatch({ type: GO_TO_EVALUATION_FAIL })
}

export const evaluateUser = (eUvus, session, results, ps) => dispatch => {
  dispatch({ type: EVALUATE_USER })
  if (results.includes(true)) {	
	axios.put(`http://192.168.0.30:3000/api/v1/user/${eUvus}/${session}`, {result: 'true', ps})
	.then(response => {
    evaluateUserSuccess(dispatch)
	})
	.catch(error => {
    console.log(error)  
    evaluateUserFail(dispatch) 
	})
  } else {
	axios.put(`http://192.168.0.30:3000/api/v1/user/${eUvus}/${session}`, {result: 'false', ps})
	.then(response => {    
		evaluateUserSuccess(dispatch)
	})
	.catch(error => {
	  console.log(error)
    evaluateUserFail(dispatch) 
	})
  }
}

const evaluateUserSuccess = (dispatch) => {
	dispatch({ type: EVALUATE_USER_SUCCESS })
  Actions.start()
}

const evaluateUserFail = dispatch => {
	dispatch({ type: EVALUATE_USER_FAIL })
  Actions.start()
}
