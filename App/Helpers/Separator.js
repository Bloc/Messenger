import React from 'react-native';

const {
  View,
  StyleSheet,
} = React;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#E4E4E4',
    height: 1,
    marginLeft: 15,
    width: 400,
  },
});

export default class Separator extends React.Component {
  render() {
    return (
      <View style={styles.separator} />
    );
  }
}
