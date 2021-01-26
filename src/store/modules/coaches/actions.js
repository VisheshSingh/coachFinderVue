export default {
  async addCoach({ commit, rootGetters }, coachData) {
    const {
      firstName,
      lastName,
      rate: hourlyRate,
      areas,
      description
    } = coachData;

    const userId = rootGetters.getUserId;
    const coachObj = {
      firstName,
      lastName,
      description,
      areas,
      hourlyRate
    };
    const response = await fetch(
      `https://vue-playlist-25566.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachObj)
      }
    );

    if (!response.ok) {
      // error
    }
    commit('ADD_COACH', {
      ...coachObj,
      id: userId
    });
  },
  async loadCoaches({ commit }) {
    const response = await fetch(
      `https://vue-playlist-25566.firebaseio.com/coaches.json`
    );
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to fetch');
      throw error;
    }

    const coaches = [];

    for (let key in data) {
      const coach = {
        id: key,
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        description: data[key].description,
        areas: data[key].areas,
        hourlyRate: data[key].hourlyRate
      };
      coaches.push(coach);
    }
    commit('LOAD_COACHES', coaches);
  }
};
