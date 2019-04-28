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
} from "../actions/types"

const INITIAL_STATE = {
	eUvus: "",
	session: "",
	points:[],
  results:[],
  ps: "",
	checks:[false, false, false, false, false, false],
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
			return { ...state, points: action.payload }
		case GO_TO_EVALUATION_FAIL:
			return {
				...state,
			 	loading: false,
			 	error: "Algo salió mal."
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
		case CHECK:
			return { ...state, checks: action.payload}
		default:
			return state
	}
}
