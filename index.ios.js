import React, {Component} from "react";
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} from 'react-native';

import Main from './App/Components/Main';
import Settings from './App/Components/Settings';

class Messenger extends Component {
  goToSettings() {
    this.refs.nav.push({
      component: Settings,
      title: 'Settings'
    });
  }

  render() {
    return (
      <NavigatorIOS
        ref='nav'
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
  container: {
    flex: 1,
    backgroundColor: '#111111'
  }
});

AppRegistry.registerComponent('Messenger', () => Messenger);

