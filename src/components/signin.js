import React, 
  { Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  AsyncStorage,
  AlertIOS,
  ActivityIndicatorIOS
} from 'react-native'

const ACCESS_TOKEN = 'access_token';

var Button = require('../common/button');

module.exports = React.createClass({
  
  getInitialState: function(){
    return {
       email: '' ,
       password: '',
       errorMessage: '',
       progressVisible: false
    };
  },

  async storeToken(access_token){

    try{
        await AsyncStorage.setItem(ACCESS_TOKEN,access_token);
        this.getToken();  
    }catch(error){
      console.log("Somethign went wrong");
    }
  },

  //This method signs the user in
  async onSigninPress(){
    
    this.setState({progressVisible: true});

    try {
      let response = await fetch('http://localhost:3000/api/login',{
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                session:{
                                  email: this.state.email,
                                  password: this.state.password,
                                }
                              })
                            });

       let res = await response.text();

      if (response.status >= 200 && response.status < 300) {

          this.setState({errorMessage: ""});
          //Handle success
          let accessToken = res;
          this.storeToken(accessToken);
          //console.log("res token is : "+ accessToken);   
          AlertIOS.alert('Welcome to Donorhome!');


          this.props.navigator.push({name: 'dashboard'});

      } else {

          //Handle error
          let error = res;
          throw error;
        } //else ends
      } //try ends 
      catch(error) {
        this.setState({errorMessage: error});
        console.log("errorMessage " + error);
        this.setState({progressVisible: false});
       }
    },
     
  render: function () {
    return (
      <View style={styles.container}>
        <Image
            source={require('../../assets/logo.png')} style={{width: 32, height: 50}} />
        
        <Text style = {styles.label}>Email</Text>
        <TextInput style={styles.input}
          value={this.state.email}
          onChangeText={(text)=> this.setState({email: text})}
          placeholder={"Email Address"}/>
        <Text style = {styles.label}>Password</Text>
        <TextInput 
          secureTextEntry = {true} 
          style={styles.input}
          value={this.state.password}
          onChangeText={(text)=>this.setState({password: text})}
          placeholder={"Password"}/>
        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button text={'Sign In'} onPress={this.onSigninPress}/>
        <Button text={'Create Account'} onPress={this.onSignupPress}/>

        <Text style={styles.error}>
          {this.state.error}
        </Text>
      
        <ActivityIndicatorIOS 
        animating={this.state.progressVisible} 
        size="large" 
        style={[styles.loader, {transform: [{scale: 2.5}]}]}
        color="#aa3300"/>

      </View>
    );
  },
  onSignupPress: function(){
    //navigate over to signup
    //ideal => navigator.push('signup')
    this.props.navigator.push({name: 'signup'});
  }
});

var styles = StyleSheet.create({
  container: {
    flex : 1,
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
     },
     error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  }
});