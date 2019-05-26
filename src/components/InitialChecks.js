/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  FlatList,
  ScrollView
} from 'react-native';
import { Checkbox } from 'react-native-material-ui'
var {height, width} = Dimensions.get('window');
import Nav from './global-widgets/Nav'
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Button, Card, CardSection } from "./common";
import { goToEvaluation, goToEvaluationFail, check } from "../actions";

class InitialChecks extends Component {

  onButtonPress() {
      this.props.goToEvaluation(this.props.eUvus, this.props.session, this.props.checks)
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Nav toProfile = {() => Actions.start()}/>
        <ScrollView style={styles.container}>
          <Card>
            <CardSection>
              <Text style={{ fontSize: 20}}>Antes de empezar, abrir en el portátil:</Text>
            </CardSection>
            <Checkbox 
              label='Una pestaña con el workspace de Cloud9 correspondiente a su usuario (abierto, de forma que se vean los directorios)' 
              value=""
              checked={this.props.checks[0]} 
              onCheck={checked => {this.props.check(this.props.checks, 0, checked)}}
            />
            <Checkbox 
              label='Una pestaña con el repositorio Github SOS1819-XX en la página de "boards"' 
              value=""
              checked={this.props.checks[1]} 
              onCheck={checked => {this.props.check(this.props.checks, 1, checked)}}
            />
            <Checkbox 
              label='Una pestaña con la web de Toggl del equipo con un informe horas de las horas invertidas' 
              value=""
              checked={this.props.checks[2]} 
              onCheck={checked => {this.props.check(this.props.checks, 2, checked)}}
            />
            <Checkbox 
              label='Una pestaña con la web de la clase de Piazza' 
              value=""
              checked={this.props.checks[3]} 
              onCheck={checked => {this.props.check(this.props.checks, 3, checked)}}
            />
            <Checkbox 
              label='Una pestaña con la web del Slack de la asigatura' 
              value=""
              checked={this.props.checks[4]} 
              onCheck={checked => {this.props.check(this.props.checks, 4, checked)}}
            />
            <Checkbox 
              label='Una pestaña con la hoja de la propuesta de trabajo de su grupo en Google Drive' 
              value=""
              checked={this.props.checks[5]} 
              onCheck={checked => {this.props.check(this.props.checks, 5, checked)}}
            />
              <Button customOnPress={this.onButtonPress.bind(this)}>Go to Evaluation!</Button>
            <View style={{ backgroundColor: "white" }}>
						  <Text style={styles.errorTextStyle}>{this.props.error}</Text>
					  </View>
          </Card>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
	eUvus: state.eval.eUvus,
  session: state.eval.session,
  error: state.eval.error,
  checks: state.eval.checks
})

const styles = {
  errorTextStyle: {
		fontSize: 20,
		alignSelf: "center",
		color: "red"
	},
  containerStyle: {
    position: "relative",
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  textStyle: {
    fontSize: 20
  }
}

export default connect(
mapStateToProps,
{ goToEvaluation, goToEvaluationFail, check }
)(InitialChecks)