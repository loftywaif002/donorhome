import React, 
  {Component} from 'react';

import {
  Text, 
  View,
  StyleSheet,
  TextInput,
  Image,
  AlertIOS,
  AsyncStorage,
  ActivityIndicatorIOS
} 
from 'react-native';

var Button = require('../common/button');



module.exports = React.createClass({
  getInitialState: function(){
	 	return {
	 		email: '',
	 		passsword:'',
	 		passwordConfirmation: '',
      username: '',
      errors: [],
	 	};
	 },

   async storeToken(accessToken) {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        console.log("Token was stored successfull ");
    } catch(error) {
        console.log("Something went wrong");
    }
  },

   async onSignupPress(){
    //if(this.state.password!=this.state.passwordConfirmation){
        //return this.setState({errorMessage:'Your password do not match'})
      //}
    try{

      let response = await fetch('http://localhost:3000/api/users', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user:{
                                  username: this.state.username,
                                  email: this.state.email,
                                  password: this.state.password,
                                  password_confirmation: this.state.passwordConfirmation,
                                }
                              })
                            });

      let res = await response.text();
      
      if (response.status >= 200 && response.status < 300) {
          
          //Handle success
          let accessToken = res;
          console.log(accessToken);

          //Storing the access_token in the AsyncStorage
          this.storeToken(accessToken);
          
          AlertIOS.alert('Welcome to Donorhome!');


        this.props.navigator.push({name: 'dashboard'}); 
      } else {
        let errors = res;
        throw errors;
      }

    } catch(errors) {
      
      console.log("cought freakin errors: "+ errors);

      //Find out how to parse JSON errors
      let fieldErrors = JSON.parse(errors);
      let errorsArray = [];
      for(var key in fieldErrors) {
        //If array is bigger than one we need to split it.
        if(fieldErrors[key].length > 1) {
            fieldErrors[key].map(error => errorsArray.push(`${key} ${error}`));
        } else {
            errorsArray.push(`${key} ${fieldErrors[key]}`);
        }
      }
      this.setState({errors: errorsArray});
    }

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

        <Text style={styles.label}>Username:</Text>
        <TextInput        
        value={this.state.username}
        onChangeText={(text)=> this.setState({username: text})}
        style={styles.input}
        placeholder={"Username"}/>
        
        <Text style={styles.label}>{this.state.errorMessage}</Text> 
        <Button text={'SignUp'} onPress={this.onSignupPress}/>
        <Button text={'I have an account'} onPress={this.onSigninPress}/>

        <ErrorMessage errors={this.state.errors}/>

      </View>
    );
  },

  onSigninPress: function(){
    	this.props.navigator.pop();
    }
});

const ErrorMessage = (props) => {
  return (
    <View>

      {props.errors.map((error, index) => <Text key={index} style={styles.error}> {error} </Text>)}

    </View>
  );
}

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