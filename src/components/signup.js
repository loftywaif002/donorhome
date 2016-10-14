import React, 
  {Component} from 'react';

import {
  Text, 
  View,
  StyleSheet,
  TextInput,
  Image
} 
from 'react-native';
//Import Firebase
  const firebase = require("firebase");

var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function(){
	 	return {
	 		email: '',
	 		passsword:'',
	 		passwordConfirmation: '',
            errorMessage: ''
	 	};
	 },
  render: function(){
    return (
      <View style={styles.container}>
        <Image
            source={require('../../assets/logo.png')} style={{width: 32, height: 50}} />
        
        <Text style={styles.label}>Email:</Text>
        <TextInput 
        value={this.state.email}
        onChangeText={(text)=> this.setState({email: text})}
        style={styles.input}
        placeholder={"Email Address"}/>
        
        <Text style={styles.label}>Password:</Text>
        <TextInput
        secureTextEntry={true} 
        value={this.state.password}
        onChangeText={(text)=> this.setState({password: text})}
        style={styles.input}
        placeholder={"Password"}/>

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
        secureTextEntry={true} 
        value={this.state.passwordConfirmation}
        onChangeText={(text)=> this.setState({passwordConfirmation: text})}
        style={styles.input}
        placeholder={"Password One More Time"}/>
        
        <Text style={styles.label}>{this.state.errorMessage}</Text> 
        <Button text={'SignUp'} onPress={this.onSignupPress}/>
        <Button text={'I have an account'} onPress={this.onSigninPress}/>
      </View>
    );
  },
  
  onSignupPress: function(){
    if(this.state.password!=this.state.passwordConfirmation){
          return this.setState({errorMessage:'Your password do not match'})
    	}
    //Create new User here
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
      //If no error, the redirect to dashboard
      
  });
  this.props.navigator.push({name: 'dashboard'});
},
  onSigninPress: function(){
    	this.props.navigator.pop();
    }
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#4CAF50'
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