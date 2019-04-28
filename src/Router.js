import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Welcome from './components/Welcome';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Start from './components/Start';
import InitialChecks from './components/InitialChecks'
import Evaluation from './components/Evaluation';
import Profile from './components/Profile'
const RouterComponent = () => (
	<Router hideNavBar={true}>
		<Scene key="root">
			<Scene key="auth">
				<Scene key="welcome" component={Welcome} title="SOS FeedBack" initial />
				<Scene key="login" component={LoginForm} title="Accede" />
				<Scene key="register" component={RegisterForm} title="Regístrate" />
			</Scene>
			<Scene key="main">
				<Scene key="start" component={Start}/>
				<Scene key="initialChecks" component={InitialChecks} title="Initial Checks" />
				<Scene key="evaluation" component={Evaluation} title="Evaluation" />
				<Scene key="profile" component={Profile} title="Profile" />
			</Scene>
		</Scene>
	</Router>
);

export default RouterComponent;
