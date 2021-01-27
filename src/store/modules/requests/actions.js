export default {
  async contactCoach({ commit }, payload) {
    const newRequest = {
      email: payload.email,
      message: payload.message
    };
    const res = await fetch(
      `https://vue-playlist-25566.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );

    const resData = await res.json();
    console.log({ resData });
    newRequest.id = resData.name;
    newRequest.coachId = payload.coachId;

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to send request');
      throw error;
    }
    commit('ADD_REQUEST', newRequest);
  },
  async fetchRequests({ commit, rootGetters }) {
    const coachId = rootGetters.getUserId;
    const res = await fetch(
      `https://vue-playlist-25566.firebaseio.com/requests/${coachId}.json`
    );
    const resData = await res.json();
    console.log({ resData });

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to fetch requests');
      throw error;
    }

    const requests = [];

    for (let key in resData) {
      const request = {
        id: key,
        coachId: coachId,
        email: resData[key].email,
        message: resData[key].message
      };
      requests.push(request);
    }

    commit('SET_REQUESTS', requests);
  }
};
