import React, {
  Image,
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Component
} from 'react-native';

import Login from '../Login';
import store from 'react-native-simple-store';

const styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  button: {
    backgroundColor: 'red',
    margin: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 50,
    padding: 20,
    textAlign: 'center',
  },
  image: {
    borderRadius: 30,
    height: 60,
    marginLeft: 10,
    marginRight: 15,
    width: 60,
  },
  name: {
    textAlign: 'center',
    fontSize: 30,
  },
});

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
    };
  }

  static propTypes = {
    navigator: PropTypes.object,
  };


  componentDidMount() {
    store.get('session').then((res) => {
      if (res) {
        console.log(res.current_user)
        this.setState({
          firstName: res.current_user.first_name,
          lastName: res.current_user.last_name,
        });
      }
    });
  }

  logOut() {
    store.delete('session');
    this.props.navigator.replace({
      title: 'Login',
      component: Login
    });
  }

  render() {
    const {firstName, lastName} = this.state;
    const name = `${firstName} ${lastName}`;
    const _logout = this.logOut.bind(this);

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={_logout}>
          <Text style={styles.buttonText} > Log Out </Text>
        </TouchableHighlight>
        <Text style={styles.name} >{name}</Text>
      </View>
    );
  }
}
