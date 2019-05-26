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

var {height, width} = Dimensions.get('window');
import Nav from './global-widgets/Nav'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
import { logoutUser, loadToken } from "../actions";
import { connect } from "react-redux";
import { Button, Card, CardSection } from "./common";

class Profile extends Component {

  renderEvaluations() {
    return this.props.evaluations.map((item, i) => {
      let result = 'Fail'
      if (item===true) result='Pass' 
      return (
        {session: i+1, result: result}
      )
    })
  }

  renderOptionalEvaluations() {
    return this.props.optionalEvaluations.map((item, i) => {
      let optionalResult = 'Fail'
      if (item===true) optionalResult='Pass' 
      return (
        {session: i+1, optionalResult: optionalResult}
      )
    })
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Nav toProfile = {() => Actions.start()}/>
        <ScrollView style={styles.container}>
        <Card>
          <CardSection>
						<Text style={{ fontSize: 20}}> UVUS: {this.props.uvus}</Text>
					</CardSection>
					<CardSection>
						<Text style={{ fontSize: 20}}> Nombre: {this.props.name}</Text>
					</CardSection>
                    <CardSection>
						<Text style={{ fontSize: 20}}> Email: {this.props.email}</Text>
					</CardSection>
          <CardSection>
						<Text style={{ fontSize: 20}}> Grupo: {this.props.group}</Text>
					</CardSection>
          <CardSection>
						<Text style={{ fontSize: 20}}> Evaluaciones (Obligatorias):</Text>            
          </CardSection>
          <CardSection>
            <FlatList data={this.renderEvaluations()}
              renderItem={({item}) => { return <Text style={{ fontSize: 15, paddingLeft: 30}}>{item.session}: {item.result}</Text> }}					
            />
          </CardSection>
          <CardSection>
						<Text style={{ fontSize: 20}}> Evaluaciones (Opcionales):</Text>           
          </CardSection>
          <CardSection>
            <FlatList data={this.renderOptionalEvaluations()}
                  renderItem={({item}) => { return <Text style={{ fontSize: 15, paddingLeft: 30}}>{item.session}: {item.optionalResult}</Text> }} 
              />
          </CardSection>
          <CardSection>
						<Button customOnPress={this.props.logoutUser.bind(this)}>
							Logout
						</Button>
					</CardSection>
				</Card>
        </ScrollView>
      </View>
    )
}
}
//onPress = {() => this.renderNope()} 


const mapStateToProps = state => ({
  name: state.auth.name,
  email: state.auth.email,
  uvus: state.auth.uvus,
  group: state.auth.group,
  evaluations: state.auth.evaluations,
  optionalEvaluations: state.auth.optionalEvaluations,
  jwt: state.auth.jwt,
  error: state.auth.error,
  user: state.auth.user
});

const styles = {
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
};

export default connect(
mapStateToProps,
{ logoutUser, loadToken }
)(Profile);