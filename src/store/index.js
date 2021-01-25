import { createStore } from 'vuex';
import CoachModule from './modules/coaches/index.js';

const store = createStore({
  modules: {
    coaches: CoachModule
  },
  state() {
    return {};
  }
});

export default store;
