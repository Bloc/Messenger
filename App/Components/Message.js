import React from 'react-native';

let {
  View,
  StyleSheet,
  Text,
  ListView,
  PropTypes,
} = React;

export default class Message extends React.Component {
  constructor(props) {
    super(props)

    let {message} = this.props;
  }

  static propTypes = {
    message: PropTypes.object
  };

  render() {
    return (
    );
  }
}

let styles = StyleSheet.create({
  container: {},
});
