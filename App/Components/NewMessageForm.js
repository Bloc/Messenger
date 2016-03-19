import React from 'react-native';
import api from './../Lib/Api';
import store from 'react-native-simple-store';

const {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  PropTypes,
  TextInput,
} = React;

export default class NewMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messageText: ''};
  }

  static propTypes = {
    id: PropTypes.number,
  };

  render() {
    const {id} = this.props
    const layout = () => {0,0,300,10};

    return(
      <View style={styles.container}>
        <TextInput style={styles.form}
          value={this.state.messageText}
          multiline={true}
          onLayout={layout}
          placeholder='Send a message (API in the Bloc app is broken, no message will send)'
          onChange={this.setMessageText.bind(this, id)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          autoCorrect={true}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }

  handleSubmit() {
    const {id} = this.props
    const text = this.state.messageText

    api.sendMessage(id, text);
  }

  setMessageText(id, e) {
    const text = e.nativeEvent.text;
    this.setState({messageText: text});

    store.save('newMessage', {
      id: id,
      text: text,
    });
  }
}

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
    color: 'white'
  },
  button: {
    height: 20,
    backgroundColor: '#48BBEC',
    flex: .2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
