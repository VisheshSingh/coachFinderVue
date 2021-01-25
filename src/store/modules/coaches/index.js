import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      coaches: [
        {
          id: 'c1',
          firstName: 'Max',
          lastName: 'Schwarmuller',
          areas: ['frontend', 'backend', 'career'],
          description:
            'A subject matter expert in all things related to JavaScript',
          hourlyRate: 40
        },
        {
          id: 'c2',
          firstName: 'Manu',
          lastName: 'Muller',
          areas: ['frontend', 'career'],
          description: 'A great guide for tech consultation',
          hourlyRate: 37
        }
      ]
    };
  },
  getters,
  mutations,
  actions
};
