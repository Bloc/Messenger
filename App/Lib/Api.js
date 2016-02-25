import store from 'react-native-simple-store';
import {find} from 'lodash';

let api = {
  setToken(user_info) {
    let email = user_info['email'].toLowerCase().trim();
    let password = user_info['password'].toLowerCase().trim();
    let url = `https://www.bloc.io/api/v1/sessions`;

    return fetch(url, {
      method: 'POST',
      body: `email=${email}&password=${password}`,
    })
    .then((res) => {
      let resBody = JSON.parse(res._bodyText);

      store.save('session', {
        token: resBody.auth_token,
        current_user: resBody.user,
      });

      return resBody;
    })
    .catch((error) => console.log('token creation failure'));
  },

  sendMessage(id=null, text) {
    let body = {
      token: id,
      'stripped-text': text,
    };

    store.get('session').then((session) => {
      let auth_token = session.token;
      let user = session.current_user;
      // let url = `https://www.bloc.io/api/v1/message_threads/index_with_messages`;
      let url = `http://localhost:3000/api/v1/messages`;

      body['user_id'] = user.id;

      let init = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth_token}`
        },
        body: body,
      };

      fetch(url, init)
    });

    console.log('success');
  },

  getMessagesForThread(id) {
    return store.get('session').then((session) => {
      let auth_token = session.token;
      // let url = `https://www.bloc.io/api/v1/message_threads/index_with_messages`;
      let url = `http://localhost:3000/api/v1/message_threads/index_with_messages`;
      let init = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth_token}`
        }
      };

      return fetch(url, init)
      .then((res) => {
        let items = JSON.parse(res._bodyText).items;
        let messages = find(items, {id: id}).messages;
        return messages;
      })
      .catch((error) => console.log(`API messages error: ${error}`));
    })
  },

  getMessageThreads() {
    return store.get('session').then((session) => {
      let auth_token = session.token;
      // let url = `https://www.bloc.io/api/v1/message_threads`;
      let url = `http://localhost:3000/api/v1/message_threads`;
      let init = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth_token}`
        }
      };

      return fetch(url, init)
      .then((res) => {
        let resBody = JSON.parse(res._bodyText);
        return resBody.items;
      })
      .catch((error) => console.log(`API threads error: ${error}`));
    })
  }
};

export default api;
