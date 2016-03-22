import store from 'react-native-simple-store';
import {find} from 'lodash';

const api = {
  setToken(userInfo) {
    const email = userInfo.email.toLowerCase().trim();
    const password = userInfo.password.toLowerCase().trim();
    const url = 'https://www.bloc.io/api/v1/sessions';

    return fetch(url, {
      method: 'POST',
      body: `email=${email}&password=${password}`,
    })
    .then((res) => {
      const resBody = JSON.parse(res._bodyText);

      store.save('session', {
        token: resBody.auth_token,
        current_user: resBody.user,
      });

      return resBody;
    })
    .catch((error) => console.log('token creation failure'));
  },

  sendMessage(id = null, text) {
    const body = {
      token: id,
      'stripped-text': text,
    };

    store.get('session').then((session) => {
      const authToken = session.token;
      const user = session.current_user;
      const url = 'https://www.bloc.io/api/v1/messages';

      body.user_id = user.id;
      body.sender = user.email;

      const init = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(body),
      };


      fetch(url, init)
      .then((res) => console.log(res))
      .catch((error) => console.log(`Send Message error: ${error}`));
    });

  },

  getMessagesForThread(id) {
    return store.get('session').then((session) => {
      const authToken = session.token;
      const url = 'https://www.bloc.io/api/v1/message_threads/index_with_messages';
      const init = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      };

      return fetch(url, init)
      .then((res) => {
        const items = JSON.parse(res._bodyText).items;
        const messages = find(items, {id: id}).messages;
        return messages;
      })
      .catch((error) => console.log(`API messages error: ${error}`));
    });
  },

  getMessageThreads() {
    return store.get('session').then((session) => {
      const authToken = session.token;
      const url = 'https://www.bloc.io/api/v1/message_threads';
      const init = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      };

      return fetch(url, init)
      .then((res) => {
        const resBody = JSON.parse(res._bodyText);
        return resBody.items;
      })
      .catch((error) => console.log(`API threads error: ${error}`));
    });
  }
};

export default api;
