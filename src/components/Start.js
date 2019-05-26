import React, { Component } from "react";
import { Text, View } from "react-native";
import { Checkbox } from 'react-native-material-ui'
import { connect } from "react-redux";
import Nav from './global-widgets/Nav'
import { Actions } from "react-native-router-flux";
import { Card, CardSection, Input, Button, Spinner } from "./common";
import { eUvusChanged, sessionChanged, PSChanged, goToEvaluation, goToInitialChecks } from "../actions";

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
		console.log(text)
    this.props.PSChanged(text);
  }

	onButtonPress() {
		console.log('P/S: ', this.props.ps)
		this.props.goToInitialChecks(this.props.eUvus, this.props.session)
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return <Button customOnPress={this.onButtonPress.bind(this)}>Ir a la evaluación</Button>;
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
              <Text style={{ fontSize: 20, paddingRight: 5, paddingLeft: 20}}>Sesión:</Text>
              <Checkbox 
                label='Primera' 
								value=""
								checked={this.state.checked} 
                onCheck={checked => {
									this.props.PSChanged('P')
                  this.setState({checked})}}
                />
              <Checkbox 
								label='Segunda' 
								value=""
								checked={!this.state.checked} 
                onCheck={checked => {
									this.props.PSChanged('S')
                  this.setState({checked: !checked})}}
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
	ps: state.eval.ps,
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
	{ eUvusChanged, sessionChanged, PSChanged, goToEvaluation, goToInitialChecks }
)(Start);
