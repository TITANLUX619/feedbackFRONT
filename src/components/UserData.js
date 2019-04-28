import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Button, Card, CardSection } from "./common";
import { logoutUser, loadToken } from "../actions";

class UserData extends Component {
	render() {
		return (
			<View style={styles.containerStyle}>
				<Card>
					<CardSection>
						<Text style={{ fontSize: 20}}> Name: {this.props.name}</Text>
					</CardSection>
                    <CardSection>
						<Text style={{ fontSize: 20}}> Email: {this.props.email}</Text>
					</CardSection>
                    <CardSection>
						<Text style={{ fontSize: 20}}> UVUS: {this.props.uvus}</Text>
					</CardSection>
                    <CardSection>
						<Text style={{ fontSize: 20}}> Group: {this.props.group}</Text>
					</CardSection>
					<CardSection>
                        <Text style={{ fontSize: 20}}> Name: {this.props.group}</Text>
					</CardSection>
					<View style={{ alignItems: 'center' }}>
						<Text style={{ fontSize: 15}}>
							Access {this.props.message}
						</Text>
					</View>
					<CardSection>
						<Button customOnPress={this.props.logoutUser.bind(this)}>
							Logout
						</Button>
					</CardSection>
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
	containerStyle: {
		position: "relative",
		flex: 1,
		justifyContent: "center"
	},
	textStyle: {
		fontSize: 20
	}
};

export default connect(
	mapStateToProps,
	{ logoutUser, loadToken }
)(UserData);