import React from 'react-native';
import Login from './Login';
import MessageThreads from './MessageThreads';

let {
  View,
  Text,
  StyleSheet,
} = React;

let styles = StyleSheet.create({});

export default class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      api_token: '',
    }
  }

  render() {
    return(
     this.state.api_token === '' ? <Login /> : <MessageThreads />
    )
  }
};
