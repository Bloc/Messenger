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
    const url = `${apiRoot}/api/v1/sessions`;
    const params = { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`
      })
    };

    return fetch(url, params).then((res) => {  
      const resBody = res.json();
      if (res.ok) {
        store.save('session', {
          token: resBody.auth_token,
          current_user: resBody.user,
        });
      }
      return resBody;
    })
    .catch((error) => console.log(error, `error: ${error.message}`));
  },

  sendMessage(id = null, token, text) {
    store.get('session').then((session) => {
      const authToken = session.token;
      console.log(authToken);
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
        if (!res.ok) {
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

      return fetch(url, init)
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        const items = resData.items;
        return find(items, {id: id}).messages;   
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

      return fetch(url, init)
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          return resData.items;
        })
        .catch((error) => console.log(`API threads error: ${error.message}`));
    });
  }
};

export default api;
