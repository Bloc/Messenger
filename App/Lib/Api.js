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

  getMessages() {
    store.get('session').then((session) => {
      let auth_token = session.token;
      let url = `https://www.bloc.io/message_threads`;
      fetch(url, {
        method: 'GET',
        headers: auth_token,
      })
      .then((res) => {
        console.info(`messages retrieved`)
        console.log(res)
      })
      .catch((error) => console.log(`error: message load failure}`));
    })
  }
};

export default api;
