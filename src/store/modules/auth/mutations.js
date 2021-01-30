export default {
  SET_USER(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.expiresIn = payload.expiresIn;
  }
};
