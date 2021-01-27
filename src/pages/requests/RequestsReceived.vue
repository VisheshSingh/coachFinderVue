<template>
  <base-dialog :show="!!error" title="An error occured" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <base-card>
    <header>
      <h2>Requests Received</h2>
    </header>
    <base-spinner v-if="isLoading"></base-spinner>
    <ul v-else-if="hasRequests && !isLoading">
      <request-item
        v-for="req in requests"
        :key="req.id"
        :email="req.email"
        :message="req.message"
      ></request-item>
    </ul>
    <h3 v-else>You haven't received any requests yet!</h3>
  </base-card>
</template>

<script>
import RequestItem from '../../components/RequestItem';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    RequestItem
  },
  data() {
    return {
      isLoading: false,
      error: null
    };
  },
  computed: {
    ...mapGetters('requests', ['requests', 'hasRequests'])
  },
  async created() {
    this.isLoading = true;
    try {
      await this.fetchRequests();
    } catch (err) {
      this.error = err.message || 'Something went wrong!';
    }
    this.isLoading = false;
  },
  methods: {
    ...mapActions('requests', ['fetchRequests']),
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
