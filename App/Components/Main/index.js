import React, {
  PropTypes,
} from 'react-native';

import Login from '../Login';
import MessageThreads from '../MessageThreads';
import store from 'react-native-simple-store';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_token: '',
    };
  }

  static propTypes = {
    navigator: PropTypes.object,
  };

  checkForKey() {
    store.get('session').then((session) => {
      if (session) {
        this.setState({
          auth_token: session.token
        });
      }
    });
  }
  render() {
    this.checkForKey();
    const {navigator} = this.props;

    return (
     this.state.auth_token === '' ? <Login navigator={navigator} /> :
       <MessageThreads navigator={navigator} />
    );
  }
}
