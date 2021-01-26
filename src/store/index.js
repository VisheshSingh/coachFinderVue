import { createStore } from 'vuex';
import CoachModule from './modules/coaches/index.js';

const store = createStore({
  modules: {
    coaches: CoachModule
  },
  state() {
    return {
      userId: 'c3'
    };
  },
  getters: {
    getUserId(state) {
      return state.userId;
    }
  }
});

export default store;
