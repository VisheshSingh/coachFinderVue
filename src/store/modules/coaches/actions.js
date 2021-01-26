export default {
  addCoach({ commit, rootGetters }, coachData) {
    const {
      firstName,
      lastName,
      rate: hourlyRate,
      areas,
      description
    } = coachData;

    const coachObj = {
      id: rootGetters.getUserId,
      firstName,
      lastName,
      description,
      areas,
      hourlyRate
    };
    commit('ADD_COACH', coachObj);
  }
};
