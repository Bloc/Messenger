import React from 'react-native';
// import Dashboard from './Dashboard';
// import api from './../Utils/api.js';

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

export default class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
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

  api.getBio(this.state.username)
    .then((res) => {
      if (res.message === 'Not Found') {
        this.setState({
          error: 'User not found',
          isLoading: false
        })
      } else {
        this.props.navigator.push({
         title: res.name || "select an Option",
          component: Dashboard,
          passProps: {userInfo: res}
        });
        this.setState({
          isLoading: false,
          error: false,
          username: ''
        })
      }
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
