import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { nameChanged, emailChanged, passwordChanged, uvusChanged, groupChanged, registerUser } from "../actions";

class RegisterForm extends Component {
	onNameChange(text) {
		//Call to uvusChanged ACTION-CREATOR
		this.props.nameChanged(text);
	}

	onEmailChange(text) {
		//Call to emailChanged ACTION-CREATOR
		this.props.emailChanged(text);
	}

	onPasswordChange(text) {
		//Call to passwordChanged ACTION-CREATOR
		this.props.passwordChanged(text);
	}

	onUvusChange(text) {
    //Call to uvusChanged ACTION-CREATOR
		this.props.uvusChanged(text);
	}

	onGroupChange(text) {
    //Call to uvusChanged ACTION-CREATOR
		this.props.groupChanged(text);
	}
	
	onButtonPress() {
		const { name, email, password, uvus, group } = this.props;
		this.props.registerUser({ name, email, password, uvus, group });
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return <Button customOnPress={this.onButtonPress.bind(this)}>¡Registrarse!</Button>;
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
							placeholder="nombre"
							label="Nombre"
							onChangeText={this.onNameChange.bind(this)}
							value={this.props.name}
						/>
					</CardSection>

					<CardSection>
						<Input
							placeholder="user@gmail.com"
							label="Email"
							onChangeText={this.onEmailChange.bind(this)}
							value={this.props.email}
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
							placeholder="grupo"
							label="Grupo"
							onChangeText={this.onGroupChange.bind(this)}
							value={this.props.group}
						/>
					</CardSection>

					{this.renderError.bind(this)}

					<CardSection>{this.renderButton()}</CardSection>
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
	error: state.auth.error,
	loading: state.auth.loading
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
	{ nameChanged, emailChanged, passwordChanged, uvusChanged, groupChanged, registerUser }
)(RegisterForm);
