import React from 'react-native';
import Login from './Login';

let {
  View,
  Text,
  StyleSheet,
} = React;

let styles = StyleSheet.create({});

export default class Main extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Login />
    )
  }
};
