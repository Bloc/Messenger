import React from 'react-native';
import api from './../Lib/Api';

let {
  View,
  StyleSheet,
  Text,
  ListView,
  TouchableHighlight,
  TextInput,
  Image,
  PropTypes
} = React;

export default class ViewMessage extends React.Component {
  static propTypes = {
    messages: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }
}

let styles = StyleSheet.create({});
