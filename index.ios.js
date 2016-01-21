import React from 'react-native';
import Main from './App/Components/Main';

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
          title: 'Bloc Messenger',
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
