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

import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';

export default class Nav extends Component {

  home(){
    return (
      <View  style={styles.container}>
        <Image source ={require('../../images/logo.png')} resizeMode = "contain" style={{width:100, height:50}} />
        <TouchableOpacity onPress ={this.props.toProfile}>
        <Iconz name="ios-person" color ="#888" size={25} style={{margin:10}} />
        </TouchableOpacity>
      </View>
    )
  }

  profile(){
    return (
      <View  style={styles.container}>
        <View style = {{width:25, height:25, margin:10}}/>
        <Image source ={require('../../images/logo.png')} resizeMode = "contain" style={{width:100, height:50}}/>
        <TouchableOpacity onPress ={this.props.toStart}>
        <Iconz name="ios-home" color ="#888" size={25} style={{margin:10}} />
        </TouchableOpacity>
      </View>
    )
  }


  render() {
    if (this.props.type == "profile"){
      return (
      <View>{this.profile()}</View>
      )
    } else {
      return (
        <View>{this.home()}</View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    elevation: 2,
		position: 'relative',
    height:60,
    flexDirection:'row',
    paddingTop:10,
    justifyContent: 'space-between',
    alignItems:'center',
    backgroundColor: '#f7f7f7',
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.1)'
  },
});
