import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { Card, TextLink } from "./common";
import { loadToken } from "../actions";

class Welcome extends Component {
	onLinkPress() {
		this.props.loadToken();
	}

	render() {
		console.log("Welcome!");
		return (
			<View style={styles.containerStyle}>
				<Image source ={require('../images/welcome.png')} resizeMode = "contain"  style={styles.image}/>
				<Card>
					<View style={{ alignItems: "center" }}>
						<Text style={{ fontSize: 25}}>BIENVENIDO!</Text>
					</View>
					<View style={{ alignItems: 'center' }}>
					<TextLink onPress={this.onLinkPress.bind(this)}>
						¡Accede!
					</TextLink>
				</View>
				</Card>
			</View>
		);
	}
}

const styles = {
	image: {
		alignSelf: "center",
		width:300, 
		height:400
	},
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
	null,
	{ loadToken }
)(Welcome);
