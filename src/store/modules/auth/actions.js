let timer;
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
  async auth({ commit, dispatch }, payload) {
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

    const expiresIn = +resData.expiresIn * 1000;
    // const expiresIn = 5000;
    const tokenExpiration = new Date().getTime() + expiresIn;

    localStorage.setItem('token', resData.idToken);
    localStorage.setItem('userId', resData.localId);
    localStorage.setItem('tokenExpiration', tokenExpiration);

    timer = setTimeout(() => {
      dispatch('autoLogout');
    }, expiresIn);

    commit('SET_USER', {
      token: resData.idToken,
      userId: resData.localId
    });
  },
  logout({ commit }) {
    commit('SET_USER', {
      token: null,
      userId: null
    });
    clearTimeout(timer);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
  },
  tryLogin({ commit, dispatch }) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      commit('SET_USER', {
        token,
        userId
      });
    }
  },
  autoLogout({ commit, dispatch }) {
    dispatch('logout');
    commit('SET_AUTO_LOGOUT');
  }
};
