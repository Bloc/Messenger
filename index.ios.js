import React from 'react-native';
import Main from './App/Components/Main';
import Settings from './App/Components/Settings';

let {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet,
  Text,
  View
} = React;

class BlocMessenger extends Component {
  goToSettings() {
    this.refs.nav.push({
      component: Settings,
      title: 'Settings'
    })
  }

  render() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.container}
        initialRoute={{
          title: 'Bloc Messenger',
          rightButtonTitle: 'Settings',
          onRightButtonPress: this.goToSettings.bind(this),
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
