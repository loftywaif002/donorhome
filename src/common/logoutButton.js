import React,
  { Component } from
  'react';

import {
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

module.exports = React.createClass({
  render: function(){
    return(
       <TouchableHighlight
         style={styles.button}
         //Color of the button when the user taps it
         underlayColor= {'gray'}
         //When we use this button, we need to pass a function
         onPress={this.props.onPress}
         >
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
	button: {
		justifyContent: 'space-between',
    flexDirection: 'column',
		alignItems: 'center',
    width: 100, 
    height: 50,
		padding: 2,
		borderColor: 'black'
	},
	buttonText: {
		flex: 0.5,
		alignSelf: 'center',
    fontSize: 14,
    fontWeight: '300'
	}
});