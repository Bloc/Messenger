import React, {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  PropTypes,
  TextInput,
  Component
} from 'react-native';

import api from './../Lib/Api';
import store from 'react-native-simple-store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    paddingLeft: 14,
    paddingTop: 14,
    fontSize: 12,
    height: 10,
    flex: .5,
    borderWidth: 9,
    borderColor: '#E4E4E4',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    height: 20,
    backgroundColor: '#48BBEC',
    flex: .2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class NewMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {messageText: ''};
  }

  static propTypes = {
    id: PropTypes.number,
    token: PropTypes.string,
  };

  render() {
    const {token} = this.props;
    const _setMessage = this.setMessageText.bind(this, token);
    const _handleSubmit = this.handleSubmit.bind(this);

    return (
      <View style={styles.container}>
        <TextInput style={styles.form}
          value={this.state.messageText}
          multiline
          placeholder='Send a message'
          onChange={_setMessage}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={_handleSubmit}
          autoCorrect
          underlayColor='#88D4F5'
        >
            <Text style={styles.buttonText}>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }

  handleSubmit() {
    const {id, token} = this.props;
    const text = this.state.messageText;

    api.sendMessage(id, token, text);
  }

  setMessageText(token, e) {
    const text = e.nativeEvent.text;
    this.setState({messageText: text});

    store.save('newMessage', {
      id: token,
      text: text,
    });
  }
}
