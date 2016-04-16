import React, {
  PropTypes,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Component
} from 'react-native';

import Login from './Login';
import store from 'react-native-simple-store';

const styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  buttonText: {
    color: 'red',
    fontSize: 50,
    textAlign: 'center',
    backgroundColor: '#dcdcdc',
  },
});

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: ''
    };
  }

  static propTypes = {
    navigator: PropTypes.object,
  };


  componentDidMount() {
    store.get('session').then((res) => {
      if (res) {
        this.setState({
          firstName: res.user.first_name,
          lastName: res.user.last_name,
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
    const _logout = this.logOut.bind(this);

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={_logout}>
          <Text style={styles.buttonText} > Log Out </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
