import axios from "axios";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
import {
	NAME_CHANGED,
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	UVUS_CHANGED,
	GROUP_CHANGED,
	JWT_SETTED,
	JWT_DELETED,	
	ACCESS_ALLOWED,
	ACCESS_FORBIDDEN,
	LOGIN_USER_SUCCESS,
	REGISTER_USER_SUCCESS,
	LOGIN_USER_FAIL,
	REGISTER_USER_FAIL,
	LOGIN_USER,
	REGISTERING_USER
} from "./types";

export const nameChanged = text => ({
	type: NAME_CHANGED,
	payload: text
});

export const emailChanged = text => ({
	type: EMAIL_CHANGED,
	payload: text
});

export const passwordChanged = text => ({
	type: PASSWORD_CHANGED,
	payload: text
});

export const uvusChanged = text => ({
	type: UVUS_CHANGED,
	payload: text
});

export const groupChanged = text => ({
	type: GROUP_CHANGED,
	payload: text
});

export const loginUser = ({ uvus, password }) => dispatch => {
	dispatch({ type: LOGIN_USER });

	axios
		.post("http://192.168.0.30:3000/api/v1/signin", {
			uvus: uvus,
			password: password
		})
		.then(response => {
			deviceStorage.saveItem(dispatch, "id_token", response.data.token);
			console.log(response.data);
			loginUserSuccess(dispatch, response.data);
		})
		.catch(error => {
			console.log(error);
			loginUserFail(dispatch);
		});
};

export const registerUser = ({ name, email, password, uvus, group }) => dispatch => {
	dispatch({ type: REGISTERING_USER });
	axios
		.post("http://192.168.0.30:3000/api/v1/signup", {
			name: name,
			email: email,
			password: password,
			uvus: uvus,
			group: group
		})
		.then(response => {
			deviceStorage.saveItem(dispatch, "id_token", response.data.token);
			registerUserSuccess(dispatch,  response.data);
		})
		.catch(error => {
			console.log(error);
			registerUserFail(dispatch);
		});
};

export const logoutUser = () => dispatch => {
	deviceStorage.deleteJWT(dispatch);
};

export const loadToken = () => dispatch => {
	deviceStorage.loadJWT(dispatch);
};


const loginUserSuccess = (dispatch, data) => {
	console.log(data)
	dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
	Actions.main({ type: 'reset' });
};

const registerUserSuccess = (dispatch, data) => {
	dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
	Actions.main({ type: 'reset' });
};

const loginUserFail = dispatch => {
	dispatch({ type: LOGIN_USER_FAIL });
};

const registerUserFail = dispatch => {
	dispatch({ type: REGISTER_USER_FAIL });
};


const deviceStorage = {
	async loadJWT(dispatch) {
		console.log('Loading token');
		try {
			const value = await AsyncStorage.getItem("id_token");
			if (value !== null) {
				console.log('Finded token in memory: ', value);
				const headers = {
					Authorization: "Bearer " + value
				};
				axios({
					method: "GET",
					url: "http://192.168.0.30:3000/api/v1/private",
					headers: headers
				})
					.then(response => {
						console.log(response);
						axios({
							method: "GET",
							url: `http://192.168.0.30:3000/api/v1/user/${response.data.user.uvus}`,
							headers: headers
						})
							.then(response => {
								console.log('Getting access', response)
								dispatch({ type: ACCESS_ALLOWED, payload: { name: response.data.user.name, email: response.data.user.email, uvus: response.data.user.uvus, group: response.data.user.group, evaluations: response.data.user.evaluations, message: response.data.user.message } });
								Actions.main();
							})
							.catch(error => {
								console.log(error)
								dispatch({ type: ACCESS_FORBIDDEN, payload: {error: error} });
								Actions.login({ type: 'reset' });
							});
					})
					.catch(error => {
						dispatch({ type: ACCESS_FORBIDDEN, payload: {error: error} });
						Actions.login({ type: 'reset' });
					});
			} else {
				console.log('No token')
				dispatch({
					type: JWT_SETTED,
					payload: null
				});
				Actions.login({ type: 'reset' });
			}
		} catch (error) {
			console.log("AsyncStorage Error: " + error.message);
		}
	},

	async saveItem(dispatch, key, value) {
		try {
			await AsyncStorage.setItem(key, value);
			dispatch({
				type: JWT_SETTED,
				payload: value
			});
		} catch (error) {
			console.log("AsyncStorage Error: " + error.message);
		}
	},

	async deleteJWT(dispatch) {
		try {
			await AsyncStorage.removeItem("id_token").then(() => {
				dispatch({
					type: JWT_DELETED
				});
				Actions.auth({ type: 'reset' });
			});
		} catch (error) {
			console.log("AsyncStorage Error: " + error.message);
		}
	}
};
