import React from 'react-native';
// import Separator from './../Helpers/Separator';

let {
  View,
  StyleSheet,
  Text,
} = React;

let styles = StyleSheet.create({
  container: {
    height: 500,
    backgroundColor: 'red',
    marginTop: 65,
  },
});

export default class MessageThreads extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text> TBD </Text>
      </View>
    );
  }
};
