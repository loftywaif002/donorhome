import React, 
  { Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image
} from 'react-native'

  //Import Firebase
  const firebase = require("firebase");

var Button = require('../common/button');

module.exports = React.createClass({
  
  getInitialState: function(){
    return {
       email: '' ,
       password: ''
    };
  },
  render: function () {
    return (
      <View style={styles.container}>
        <Image
            source={require('../../assets/logo.png')} style={{width: 32, height: 50}} />
        
        <Text style = {styles.label}>Email:</Text>
        <TextInput style={styles.input}
          value={this.state.email}
          onChangeText={(text)=> this.setState({email: text})}
          placeholder={"Email Address"}/>
        <Text style = {styles.label}>Password:</Text>
        <TextInput 
          secureTextEntry = {true} 
          style={styles.input}
          value={this.state.password}
          onChangeText={(text)=>this.setState({password: text})}
          placeholder={"Password"}/>
        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button text={'Sign In'} onPress={this.onPress}/>
        <Button text={'Create Account'} onPress={this.onSignupPress}/>
      </View>
    );
  },
  onSignupPress: function(){
    //navigate over to signup
    //ideal => navigator.push('signup')
    this.props.navigator.push({name: 'signup'});
  },
  //This method signs the user in
  onPress: function(){
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
    // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     console.log(errorMessage);  
    });
    this.props.navigator.push({name: 'dashboard'});
  }
});

var styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#82E0AA'
  },
  input: {
      padding: 4,
      height: 40,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 5,
      margin: 5,
      width: 200,
      alignSelf: 'center'
     },
  label: {
     fontSize: 18
     }
});