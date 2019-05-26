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
} from "../actions/types"

const INITIAL_STATE = {
	eUvus: "",
	session: "",
	individual: [],
	group: [],
	optionalResults: [],
  	results: [],
  	ps: "P",
	checks: [false, false, false, false, false, false],
	loading: false,
	error: ""
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EUVUS_CHANGED:
			return { ...state, eUvus: action.payload }
		case SESSION_CHANGED:
      		return { ...state, session: action.payload }
    	case PS_CHANGED:
			return { ...state, ps: action.payload }
		case GO_TO_EVALUATION:
      		return { ...state, loading: true, error: "", eUvus: action.payload }
		case GO_TO_EVALUATION_SUCCESS:
			return { ...state, individual: action.payload.individual, group: action.payload.group, optional: action.payload.optional, }
		case GO_TO_EVALUATION_FAIL:
			return {
				...state,
			 	loading: false,
			 	error: "Algo salió mal."
			}
		case GO_TO_INITIAL_CHECKS_FAIL:
			return {
				...state,
			 	loading: false,
				error: "Introduce un UVUS y una sesión."
			}
		case GO_TO_INITIAL_CHECKS_SUCCESS:
			return {
				...state,
			 	loading: false,
				error: ""
			}
		case EVALUATE_USER:
			return { ...state, loading: true, error: "" }
		case EVALUATE_USER_SUCCESS:
			return { ...state, ...INITIAL_STATE }
		case EVALUATE_USER_FAIL:
		 	return { 
				...state, 
				loading: false,
				error: "Algo salió mal." 
			}
		case ADD_RESULT:
			return { ...state, results: action.payload}
		case ADD_OPTIONAL_RESULT:
			return { ...state, optionalResults: action.payload}
		case CHECK:
			return { ...state, checks: action.payload}
		default:
			return state
	}
}
