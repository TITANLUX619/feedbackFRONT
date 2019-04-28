import React, { Component } from "react";
import { Text, View } from "react-native";
import { Checkbox } from 'react-native-material-ui'
import { connect } from "react-redux";
import Nav from './global-widgets/Nav'
import { Actions } from "react-native-router-flux";
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { eUvusChanged, sessionChanged, PSChanged, goToEvaluation } from "../actions";

class Start extends Component {

  constructor(props){
    super(props)
    this.state = {
      checked: true
    }
  }

	onEUvusChange(text) {
		//Call to eUvusChanged ACTION-CREATOR
		this.props.eUvusChanged(text);
	}

	onSessionChange(text) {
		//Call to sessionChanged ACTION-CREATOR
		this.props.sessionChanged(text);
  }
  
  onPSChange(text) {
    this.props.PSChanged(text);
  }

	onButtonPress() {
		Actions.initialChecks()
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return <Button customOnPress={this.onButtonPress.bind(this)}>Go to evaluation</Button>;
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
			<View>
            	<Nav toProfile = {() => Actions.profile()}/>
				<View style={styles.containerStyle}> 
					<Card>
						<CardSection>
							<Input
								placeholder="uvus"
								label="UVUS"
								onChangeText={this.onEUvusChange.bind(this)}
								value={this.props.uvus}
							/>
						</CardSection>

						<CardSection>
							<Input
								placeholder="sessionNum"
								label="FeedBack Nº"
								onChangeText={this.onSessionChange.bind(this)}
								value={this.props.session}
							/>
						</CardSection>
            <CardSection>
              <Text style={{ fontSize: 20, paddingRight: 5, paddingLeft: 5}}>Sesión:</Text>
              <Checkbox 
                label='Primera' 
                checked={this.state.checked} 
                onCheck={checked => {
                  this.setState({checked})
                  this.onPSChange.bind(this, 'P')}}
                />
              <Checkbox 
                label='Segunda' 
                checked={!this.state.checked} 
                onCheck={checked => {
                  this.setState({checked})
                  this.onPSChange.bind(this, 'S')}}
              />
            </CardSection>
						<View style={{ backgroundColor: "white" }}>
							<Text style={styles.errorTextStyle}>{this.props.error}</Text>
						</View>

						<CardSection>{this.renderButton()}</CardSection>
					</Card>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	eUvus: state.eval.eUvus,
  session: state.eval.session,
  error: state.eval.error
});

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: "center",
		color: "red"
	},
	containerStyle: {
		marginTop: 200
	}
};

export default connect(
	mapStateToProps,
	{ eUvusChanged, sessionChanged, PSChanged, goToEvaluation }
)(Start);
