import {
	NAME_CHANGED,
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	UVUS_CHANGED,
	GROUP_CHANGED,
	LOGIN_USER_SUCCESS,
	JWT_SETTED,
	JWT_DELETED,
	ACCESS_ALLOWED,
	ACCESS_FORBIDDEN,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_FAIL,
	REGISTER_USER_FAIL,
	LOGIN_USER,
	REGISTERING_USER
} from "../actions/types"

const INITIAL_STATE = {
	name: "",
	email: "",
	password: "",
	uvus: "",
	group: "",
	user: null,
	jwt: null,
	error: "",
	message: "",
	loading: false
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NAME_CHANGED:
			return { ...state, name: action.payload }
		case EMAIL_CHANGED:
			return { ...state, email: action.payload }
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload }
		case UVUS_CHANGED:
			return { ...state, uvus: action.payload }
		case GROUP_CHANGED:
			return { ...state, group: action.payload }
		case JWT_SETTED:
			return { ...state, jwt: action.payload }
		case JWT_DELETED:
			return { ...state, ...INITIAL_STATE }
		case ACCESS_ALLOWED:
			return { ...state, ...action.payload }
		case ACCESS_FORBIDDEN:
			return { ...state, error: action.payload }
		case LOGIN_USER:
			return { ...state, loading: true, error: "" }
		case REGISTERING_USER:
			return { ...state, loading: true, error: "" }
		case LOGIN_USER_SUCCESS:
			return { ...state, ...action.payload, loading: false,}
		case REGISTER_USER_SUCCESS:
			return { ...state, data: action.payload }
		case LOGIN_USER_FAIL:
			return {
				...state,
				loading: false,
				error: "Autenticacion Fallida.",
				password: ""
			}
		case REGISTER_USER_FAIL:
			return {
				...state,
				loading: false,
				error: "Registro Fallido.",
				password: ""
			}
		default:
			return state
	}
}
