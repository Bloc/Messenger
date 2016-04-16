import store from 'react-native-simple-store';
import {find} from 'lodash';
import squish from './Squish';

// use localhost:3000 or http://staging.bloc.io/ for testing purposes
// const apiRoot = 'http://localhost:3000';
// const apiRoot = 'https://staging.bloc.io';
const apiRoot = 'https://www.bloc.io';

const api = {
  setToken(userInfo) {
    const email = userInfo.email.toLowerCase().trim();
    const password = userInfo.password.toLowerCase().trim();
    const url = `${apiRoot}/api/v1/sessions?email=${email}&password=${password}`;
    const params = {
      method: 'POST'
    };

    return fetch(url, params).then((res) => {
      const resBody = JSON.parse(res._bodyText);

      if (res.status < 400) {
        store.save('session', {
          token: resBody.auth_token,
          current_user: resBody.user,
        });
      }

      return resBody;
    })
    .catch((error) => console.log('token creation failure'));
  },

  sendMessage(id = null, token, text) {
    store.get('session').then((session) => { //TODO: refactor a performAuthorizedAction function
      const authToken = session.token;
      const user = session.current_user;
      const params = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      };

      const url = `${apiRoot}/api/v1/messages?user_id=${user.id}&sender=${user.email}&token=${token}&stripped-text=${text}`;

      fetch(url, params)
      .then((res) => {
        if (res.status >= 400) { //TODO refactor a generic error handler to display to the user
          console.log(res);
        } else {
          console.log("Message Sent. Response on next line.");
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(`Send Message error: ${error}`);
      })
    });

  },

  getMessagesForThread(id) {
    return store.get('session').then((session) => {
      const authToken = session.token;
      const url = `${apiRoot}/api/v1/message_threads/index_with_messages`;
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
      const url = `${apiRoot}/api/v1/message_threads`;
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
