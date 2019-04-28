import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Card, CardSection, Input, Button, Spinner, TextLink } from "./common";
import { uvusChanged, passwordChanged, loginUser, loadToken } from "../actions";

class LoginForm extends Component {
  
	onUvusChange(text) {
		//Call to uvusChanged ACTION-CREATOR
		this.props.uvusChanged(text);
	}

	onPasswordChange(text) {
		//Call to passwordChanged ACTION-CREATOR
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { uvus, password } = this.props;
		this.props.loginUser({ uvus, password });
	}

	onLinkPress() {
		Actions.register();
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return <Button customOnPress={this.onButtonPress.bind(this)}>Login</Button>;
	}

	renderError() {
		if (this.props.error) {
			return (
				<View style={{ backgroundColor: "white" }}>
					<Text style={styles.errorTextStyle}>{this.props.error}</Text>
				</View>
			);
		}
	}

	render() {
		return (
			<View style={styles.containerStyle}>
				<Card>
					<CardSection>
						<Input
							placeholder="UVUS"
							label="UVUS"
							onChangeText={this.onUvusChange.bind(this)}
							value={this.props.uvus}
						/>
					</CardSection>

					<CardSection>
						<Input
							secureTextEntry
							placeholder="password"
							label="Password"
							onChangeText={this.onPasswordChange.bind(this)}
							value={this.props.password}
						/>
					</CardSection>
					<View style={{ backgroundColor: "white" }}>
						<Text style={styles.errorTextStyle}>{this.props.error}</Text>
					</View>
					<CardSection>{this.renderButton()}</CardSection>
					<View style={{ alignItems: 'center' }}>
						<TextLink onPress={this.onLinkPress.bind(this)}>
							No tienes cuenta? Regístrate!
						</TextLink>
					</View>
				</Card>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	name: state.auth.name,
	email: state.auth.email,
	password: state.auth.password,
	uvus: state.auth.uvus,
	group: state.auth.group,
	jwt: state.auth.jwt,
	error: state.auth.error,
	loading: state.auth.loading,
	user: state.auth.user
});

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: "center",
		color: "red"
	},
	containerStyle: {
		position: "relative",
		flex: 1,
		justifyContent: "center"
	}
};

export default connect(
	mapStateToProps,
	{ uvusChanged, passwordChanged, loginUser, loadToken }
)(LoginForm);
