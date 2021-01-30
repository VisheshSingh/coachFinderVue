export default {
  async addCoach({ commit, rootGetters }, coachData) {
    const {
      firstName,
      lastName,
      rate: hourlyRate,
      areas,
      description
    } = coachData;

    const userId = rootGetters['auth/userId'];
    console.log('userId: ', userId);
    const coachObj = {
      firstName,
      lastName,
      description,
      areas,
      hourlyRate
    };

    const token = rootGetters['auth/token'];

    const response = await fetch(
      `https://vue-playlist-25566.firebaseio.com/coaches/${userId}.json?auth=${token}`,
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
  async loadCoaches({ commit, rootGetters }) {
    const response = await fetch(
      `https://vue-playlist-25566.firebaseio.com/coaches.json`
    );
    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to fetch');
      throw error;
    }

    const coaches = [];

    const token = rootGetters['auth/token'];
    const userId = rootGetters['auth/userId'];
    console.log({ token, userId });
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
