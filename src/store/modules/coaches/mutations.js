export default {
  ADD_COACH(state, coachData) {
    state.coaches.push(coachData);
  },
  LOAD_COACHES(state, coaches) {
    state.coaches = coaches;
  }
};
