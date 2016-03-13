import React from 'react-native';

const {
  View,
  StyleSheet,
  Text,
  ListView,
  PropTypes,
} = React;

const styles = StyleSheet.create({
  container: {},
});

export default class Message extends React.Component {
  constructor(props) {
    super(props)

    const {message} = this.props;
  }

  static propTypes = {
    message: PropTypes.object
  };

  render() {
    return (
    );
  }
}
