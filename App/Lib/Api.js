import store from 'react-native-simple-store';

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

  getMessagesForThread(id) {
    return store.get('session').then((session) => {
      let auth_token = session.token;
      let url = `https://www.bloc.io/api/v1/message_threads/index_with_messages`;
      let init = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth_token}`
        }
      };

      return fetch(url, init)
      .then((res) => {
        let items = JSON.parse(res._bodyText).items;
        console.log(res);
        let messages = items.messages.filter({id: id});
        return messages;
      })
      .catch((error) => console.log(`API messages error: ${error}`));
    })
  },

  getMessageThreads() {
    return store.get('session').then((session) => {
      let auth_token = session.token;
      let url = `https://www.bloc.io/api/v1/message_threads`;
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
