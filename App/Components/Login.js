import React from 'react-native';
import api from './../Lib/Api';
import MessageThreads from './MessageThreads';

const {
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = React;

const styles = StyleSheet.create({
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

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_token: '',
      username: '',
      password: '',
      isLoading: false,
      error: false
    };
  }

  static propTypes = {
    navigator: PropTypes.object,
  };

  handleEmailChange(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.nativeEvent.text
    });
  }

  handleSubmit() {
    this.setState({
      isLoading: true
    });

    const userInfo = {
      email: this.state.username,
      password: this.state.password,
    };

    api.setToken(userInfo)
    .then((res) => {
      const fullName = `${res.user.first_name} ${res.user.last_name}`;

      this.props.navigator.resetTo({
        title: fullName,
        component: MessageThreads,
      });

      this.setState({
        isLoading: false,
        error: false,
        username: '',
        password: '',
      });
    })
    .catch((error) => {
      this.setState({
        error: 'User not found',
        isLoading: false,
      });
    });
  }

  render() {
    const _handleSubmit = this.handleSubmit.bind(this);
    const _handleEmailChange = this.handleEmailChange.bind(this);
    const _handlePasswordChange = this.handlePasswordChange.bind(this);
    const showErr = (
      this.state.error ? <Text> {this.state.error} </Text> : <View />
    );
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Login using your Bloc.io username and password</Text>
          <TextInput
            style={styles.searchInput}
            value={this.state.username}
            autoCorrect={false}
            placeholder='Email'
            autoCapitalize='none'
            onChange={_handleEmailChange}
          />
          <TextInput
            style={styles.searchInput}
            value={this.state.password}
            secureTextEntry
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Password'
            onChange={_handlePasswordChange}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={_handleSubmit}
            underlayColor='white'
          >
            <Text style={styles.buttonText}> LOGIN </Text>
          </TouchableHighlight>
          {showErr}
      </View>
    );
  }
}
