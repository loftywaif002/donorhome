import React,
  { Component } from
  'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';

//Import Firebase
  const firebase = require("firebase");

var Signin = require ('./components/signin');
var Signup = require ('./components/signup');
var Dash   = require ('./side-menu/dashboard');

//Just a key value container
var ROUTES = {
  signin: Signin,
  signup: Signup,
  dashboard : Dash 
};

module.exports = React.createClass({
  componentWillMount: function(){
    //Initialize Firebase
  const firebaseConfig = {
  apiKey: "AIzaSyAr0l-nGZ4LapfLlyz6NCPGWKdKmJ0X4UU",
  authDomain: "donorhome-957a6.firebaseapp.com",
  databaseURL: "https://donorhome-957a6.firebaseio.com",
  storageBucket: "donorhome-957a6.appspot.com",
   };
  firebase.initializeApp(firebaseConfig);
  //Create a reference with .ref() instead of new Firebase(url)
  const rootRef = firebase.database().ref();
  const itemsRef = rootRef.child('items');
  },
  //Whatever we return from this function, will be on the stack 
  renderScene: function(route, navigator){
    var Component = ROUTES[route.name]; // ROUTES['signin']=> Signin
    //passing navigator will allow other components let access to this using props
    return <Component route={route} navigator={navigator}/>;
  },
  render: function(){
    return (
      <Navigator
        style={styles.conatiner}
        initialRoute={{name: 'signin'}} //The first scene user will see
        renderScene={this.renderScene}
        //Handles the animation
        configureScene={()=>{return Navigator.SceneConfigs.FloatFromRight;}} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center'
  }
});
