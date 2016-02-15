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

  fakeIt() {
    return Promise.all(
      [
        {
          id: 1,
          subject: 'Hey there',
          messages_count: 10,
          updated_at: '2015-09-26T19:30:49.772-04:00',
          user_image: 'https://cdn.bloc.io/path/to/image',
          preview: 'Hey there, I was confused about this...',
          first_name: 'Mike',
          last_name: 'Jewett',
          unread: true
        },
        {
          id: 2,
          subject: 'Yo',
          messages_count: 10,
          updated_at: '2015-09-26T19:31:49.772-04:00',
          user_image: 'https://cdn.bloc.io/path/to/image',
          preview: 'Hey there, I was confused about this...',
          first_name: 'Bill',
          last_name: 'Paxton',
          unread: true
        },
      ]
    );
  },

  getMessages() {
    store.get('session').then((session) => {
      let auth_token = session.token;
      let url = `https://www.bloc.io/api/v1/message_threads/?page=1"`;
      fetch(url, {
        method: 'POST',
        body: auth_token,
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
