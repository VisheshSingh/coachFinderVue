export default {
  async signup({ dispatch }, payload) {
    return dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  async login({ dispatch }, payload) {
    return dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async auth({ commit }, payload) {
    const mode = payload.mode;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxV8RPHEpVXo44K6jinM1Pe4cIayNj630`;
    if (mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxV8RPHEpVXo44K6jinM1Pe4cIayNj630`;
    }
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });
    const resData = await res.json();
    console.log({ resData });

    if (!res.ok) {
      const error = new Error(
        resData.error.message || 'Something went wrong. Please try again...'
      );
      throw error;
    }

    localStorage.setItem('token', resData.idToken);
    localStorage.setItem('userId', resData.localId);

    commit('SET_USER', {
      token: resData.idToken,
      userId: resData.localId,
      expiresIn: resData.expiresIn
    });
  },
  logout({ commit }) {
    commit('SET_USER', {
      token: null,
      userId: null,
      expiresIn: null
    });
  },
  tryLogin({ commit }) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      commit('SET_USER', {
        token,
        userId,
        expiresIn: null
      });
    }
  }
};
