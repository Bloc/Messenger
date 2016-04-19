import React, {
  View,
  StyleSheet,
  Component
} from 'react-native';

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#E4E4E4',
    height: 1,
    marginLeft: 15,
    width: 400,
  },
});

export default class Separator extends Component {
  render() {
    return (
      <View style={styles.separator} />
    );
  }
}
