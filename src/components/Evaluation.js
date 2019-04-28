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
  View
} from 'react-native';
import { connect } from "react-redux";
import Nav from './global-widgets/Nav'
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card, CardSection, Input, Button, Spinner, TextLink } from "./common";
import { eUvusChanged, sessionChanged, goToEvaluation, addResult, evaluateUser } from "../actions";


class Evaluation extends Component {
  constructor(props){
    super(props)
    this.state = {
      cards: []
    }
  }

  componentWillMount () {
    console.log('1', this.props.points)
    let cards = []
    for (let i=0; i<=this.props.points.length-1; i++) {
      card = {"id": i, "text": this.props.points[i]}
      cards.push(card)
    }
    this.setState({cards: cards});
    console.log('1', this.state.cards)
  }

  Card(x){
    return (
      <View style={styles.card}>
        <View style={{width:350, height:70, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <View style={{ flex:1, position: "relative", justifyContent:'center'}} >
            <Text style={{fontSize:20, fontWeight:'300', color:'#444'}}>{x.id + 1}: </Text>
            <Text style={{fontSize:21, fontWeight:'200', color:'#444'}}>{x.text}</Text>
          </View>
        </View>
      </View>
    )
  }

  handleYup (card) {
    console.log(this.props)
    this.props.addResult(this.props.results, true)
    console.log(`Yup for ${card.text}`)
  }

  handleNope (card) {
    this.props.addResult(this.props.results, false)
    console.log(`Nope for ${card.text}`)
  }

  renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}
		return <Button customOnPress={this.evaluateUser.bind(this)}>EVALUATE!</Button>;
  }
  
  noMore(){
    return (
      <View style={styles.card} >
        <Text>Evaluation finished</Text>
        <CardSection>{this.renderButton()}</CardSection>
      </View>
    )
  }

  yup(){
    this.props.addResult(this.props.results, true)
    this.refs['swiper']._goToNextCard()  
  }

  nope(){
    this.props.addResult(this.props.results, false)
    this.refs['swiper']._goToNextCard()  }

  evaluateUser(){
    this.props.evaluateUser(this.props.eUvus, this.props.session, this.props.results, this.props.ps)
  }

  render() {
    return (
      <View style={styles.container}>
        <Nav/>
        <SwipeCards
          ref = {'swiper'}
          cards={this.state.cards}
          containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center', margin:20, padding:150}}
          renderCard={(cardData) => this.Card(cardData)}
          renderNoMoreCards={() => this.noMore()}
          handleYup={this.handleYup.bind(this)}
          handleNope={this.handleNope.bind(this)}/>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.nope()}>
              <Icon name='clear' size={45} color="#888" style={{}} />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttons} onPress = {() => this.yup()}>
              <Icon name='check' size={36} color="#888" style={{marginTop:5}} />
            </TouchableOpacity>
          </View>
        </View>
    )
  }
}
//onPress = {() => this.renderNope()} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  buttons:{
    width:80, 
    height:80, 
    borderWidth:10, 
    borderColor:'#e7e7e7', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:40
  },
  buttonSmall:{
    width:50, 
    height:50, 
    borderWidth:10, 
    borderColor:'#e7e7e7', 
    justifyContent:'center', 
    alignItems:'center',
    borderRadius:25
  },
   card: {
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#e3e3e3',
    width: 350,
    height: 420,
  }
 
});

const mapStateToProps = state => ({
  error: state.auth.error,
	loading: state.auth.loading,
  eUvus: state.eval.eUvus,
  session: state.eval.session,
  results: state.eval.results,
  ps: state.eval.ps,
  points: state.eval.points
});

export default connect(
	mapStateToProps,
	{ eUvusChanged, sessionChanged, goToEvaluation, addResult, evaluateUser }
)(Evaluation);
