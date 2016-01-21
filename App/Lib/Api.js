let api = {
  getToken(user_info) {
    let email = user_info['email'].toLowerCase().trim();
    let password = user_info['password'].toLowerCase().trim();
    let url = `https://www.bloc.io/api/v1/sessions`;

    return fetch(url, {
      method: 'POST',
      body: `email=${email}&password=${password}`,
    })
    .then((res) => {
      return JSON.parse(res._bodyText);
    })
    .catch((error) => console.log('token creation error'));
  },
};

export default api;
