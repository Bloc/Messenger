import store from 'react-native-simple-store';
import {find} from 'lodash';
import squish from './Squish';
import axios from 'axios';

// use localhost:3000 or http://staging.bloc.io/ for testing purposes
// const apiRoot = 'http://localhost:3000';
// const apiRoot = 'https://staging.bloc.io';
const apiRoot = 'https://www.bloc.io';

const api = {
  setToken(userInfo) {
    const email = userInfo.email.toLowerCase().trim();
    const password = userInfo.password.toLowerCase().trim();
    const url = `${apiRoot}/api/v1/sessions`;
    const params = {
      email: `${email}`,
      password: `${password}`
    };

    return axios.post(url, params).then((res) => {
      const resBody = res.data;

      if (res.status >= 200 && res.status < 300) {
        store.save('session', {
          token: resBody.auth_token,
          current_user: resBody.user,
        });
      }

      if (res.status < 200 && res.status >= 300) {
        throw new Error(`Status ${res.status}: ${res.message}`)
      }

      return resBody;
    })
    .catch((error) => console.log(`error: ${error.message}`));
  },

  sendMessage(id = null, token, text) {
    store.get('session').then((session) => {
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
        if (res.status >= 400) {
          console.log(res);
        } else {
          console.log("Message Sent. Response on next line.");
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(`Send Message error: ${error.message}`);
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

      return axios.get(url, init)
      .then((res) => {
        const items = res.data.items;
        const messages = find(items, {id: id}).messages;
        return messages;
      })
      .catch((error) => console.log(`API messages error: ${error.message}`));
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

      return axios.get(url, init)
      .then((res) => {
        const resBody = res.data;
        return resBody.items;
      })
      .catch((error) => console.log(`API threads error: ${error.message}`));
    });
  }
};

export default api;
