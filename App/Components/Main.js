import React from 'react-native';
import Login from './Login';
import MessageThreads from './MessageThreads';
import store from 'react-native-simple-store';

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
      auth_token: '',
    };
  }

  checkForKey() {
    store.get('session').then((session) => {
      this.setState({
        auth_token: session.auth_token
      });
    })
    .catch((error) => console.log(`error: Not key found`));
  }
  render() {
    return(
     this.state.auth_token === '' ? <Login navigator={this.props.navigator} /> : <MessageThreads />
    )
  }
};
