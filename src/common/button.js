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
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		borderColor: 'black',
		marginTop: 10
	},
	buttonText: {
		flex: 1,
		alignSelf: 'center',
        fontSize: 20
	}
});