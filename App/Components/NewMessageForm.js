import React from 'react-native';
import api from './../Lib/Api';
import store from 'react-native-simple-store';

let {
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
    let {id} = this.props
    hintText = "**bold** _italic_ `code` >quote • - bullet list";

    return(
      <View style={styles.container}>
        <TextInput style={styles.form}
           value={this.state.messageText}
           multiline={true}
           onLayout={() => 0,0,300,10}
           placeholder="Send a message"
           onChange={this.setMessageText.bind(this, id)}
           />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          autoCorrect={true}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}>Send</Text>
        </TouchableHighlight>
      </View>
    );
  }

  handleSubmit() {
    let {id} = this.props
    let text = this.state.messageText

    api.sendMessage(id, text);
  }

  setMessageText(id, e) {
    let text = e.nativeEvent.text;
    this.setState({messageText: text});

    store.save('newMessage', {
      id: id,
      text: text,
    });
  }
}

let styles = StyleSheet.create({
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
