export default {
  async signup({ commit }, payload) {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxV8RPHEpVXo44K6jinM1Pe4cIayNj630`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );
    const resData = await res.json();
    console.log({ resData });

    if (!res.ok) {
      const error = new Error(
        resData.error.message || 'Sign up failed. Please try again...'
      );
      throw error;
    }

    commit('SET_USER', {
      token: resData.idToken,
      userId: resData.localId,
      expiresIn: resData.expiresIn
    });
  },
  async login({ commit }, payload) {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxV8RPHEpVXo44K6jinM1Pe4cIayNj630`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );
    const resData = await res.json();
    console.log({ resData });

    if (!res.ok) {
      const error = new Error(
        resData.error.message || 'Login failed. Please try again...'
      );
      throw error;
    }

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
  }
};
