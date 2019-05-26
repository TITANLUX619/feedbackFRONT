import axios from "axios"
import { Actions } from "react-native-router-flux"
import {
	EUVUS_CHANGED,
	SESSION_CHANGED,
	PS_CHANGED,
	GO_TO_EVALUATION,
	GO_TO_EVALUATION_SUCCESS,
	GO_TO_EVALUATION_FAIL,
	GO_TO_INITIAL_CHECKS_SUCCESS,
	GO_TO_INITIAL_CHECKS_FAIL,
	EVALUATE_USER,
	EVALUATE_USER_SUCCESS,
	EVALUATE_USER_FAIL,
	ADD_RESULT,
	ADD_OPTIONAL_RESULT,
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

export const addOptionalResult = (optionalResults, optionalResult) => dispatch => {
  optionalResults.push(optionalResult)
  dispatch({ type: ADD_OPTIONAL_RESULT, payload: optionalResults })
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
  dispatch({ type: GO_TO_EVALUATION_SUCCESS, payload: data.feedback })
  Actions.evaluation()
}

const goToEvaluationFail = dispatch => {
	console.log('goToEvaluationFail')
	dispatch({ type: GO_TO_EVALUATION_FAIL })
}

export const goToInitialChecks = (eUvus, session) => dispatch => {
	console.log('goToInitialChecks')
	if (eUvus==='' || session===''){
		goToInitialChecksFail(dispatch)
	} else {
		goToInitialChecksSuccess(dispatch)
	}
}

const goToInitialChecksFail = (dispatch) => {
	console.log('goToInitialChecksFail')
	dispatch({ type: GO_TO_INITIAL_CHECKS_FAIL })
}

const goToInitialChecksSuccess = (dispatch) => {
	console.log('goToInitialChecksSuccess')
	Actions.initialChecks()
	dispatch({ type: GO_TO_INITIAL_CHECKS_SUCCESS })
}

export const evaluateUser = (eUvus, session, results, optionalResults, ps) => dispatch => {
	console.log('Results: ', results)
	console.log( 'Optional Results: ', optionalResults)
	console.log( 'P/S: ', ps)
	dispatch({ type: EVALUATE_USER })
  if (!results.includes(false) && !optionalResults.includes(false)) {	
		axios.put(`http://192.168.0.30:3000/api/v1/user/${eUvus}/${session}`, {result: 'true', optionalResult: 'true', ps: ps})
		.then(response => {
			evaluateUserSuccess(dispatch)
		})
		.catch(error => {
			console.log(error)  
			evaluateUserFail(dispatch) 
		})
  } else if (!results.includes(false) && optionalResults.includes(false)) {
		axios.put(`http://192.168.0.30:3000/api/v1/user/${eUvus}/${session}`, {result: 'true', optionalResult: 'false', ps: ps})
		.then(response => {    
			evaluateUserSuccess(dispatch)
		})
		.catch(error => {
			console.log(error)
			evaluateUserFail(dispatch) 
		})
  } else if (results.includes(false) && !optionalResults.includes(false)){
		axios.put(`http://192.168.0.30:3000/api/v1/user/${eUvus}/${session}`, {result: 'false', optionalResult: 'true', ps: ps})
		.then(response => {    
			evaluateUserSuccess(dispatch)
		})
		.catch(error => {
			console.log(error)
			evaluateUserFail(dispatch) 
		})
	} else if (results.includes(false) && optionalResults.includes(false)) {
		axios.put(`http://192.168.0.30:3000/api/v1/user/${eUvus}/${session}`, {result: 'false', optionalResult: 'false', ps: ps})
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
