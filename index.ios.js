import React from 'react-native';
import Main from './App/Components/Main';
import Login from './App/Components/Login';

let {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} = React;

class BlocMessenger extends Component {
  render() {
    return (
      <NavigatorIOS
      style={styles.container}
        initialRoute={{
          title: 'Github NoteTaker',
          component: Main
        }} />
    );
  }
}

const styles = StyleSheet.create({
 container:{
    flex: 1,
    backgroundColor: '#111111'
  },
});

AppRegistry.registerComponent('BlocMessenger', () => BlocMessenger);
