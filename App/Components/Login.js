import React from 'react-native';
import api from './../Lib/Api';
import MessageThreads from './MessageThreads';

let {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    paddingLeft: 15,
    marginRight: 5,
    marginBottom: 10,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

export default class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      api_token: '',
      username: '',
      password: '',
      isLoading: false,
      error: false
    }
  }

  handleEmailChange(event) {
    this.setState({
      username: event.nativeEvent.text
    })
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.nativeEvent.text
    })
  }

  handleSubmit() {
    this.setState({
      isLoading: true
    });

    let user_info = {
      email: this.state.username,
      password: this.state.password,
    }

    api.getToken(user_info)
    .then((res) => {
      let full_name = `${res.user.first_name} ${res.user.last_name}`

      this.props.navigator.replace({
       title: full_name,
        component: MessageThreads,
      });

      this.setState({
        isLoading: false,
        error: false,
        email: '',
        password: ''
      })
    })
    .catch((error) => {
      console.log(`error: ${error}`)
      this.setState({
        error: 'User not found',
        isLoading: false
      })
    });
}

  render() {
    let showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View></View>
    );
    return(
      <View style={styles.mainContainer}>
      <Text style={styles.title}> Login using your Bloc.io username and password</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          placeholder="Email"
          onChange={this.handleEmailChange.bind(this)} />
        <TextInput
          style={styles.searchInput}
          value={this.state.password}
          placeholder="Password"
          onChange={this.handlePasswordChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}> LOGIN </Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color='#111'
          size='large'></ActivityIndicatorIOS>
        {showErr}
      </View>
    )
  }
};
