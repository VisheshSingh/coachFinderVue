<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @update-filter="updateFilter"></coach-filter>
    </section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
          >Login to Register as Coach</base-button
        >
        <base-button
          v-if="isLoggedIn && !isCoach && !isLoading"
          link
          to="/register"
          >Register a Coach</base-button
        >
      </div>
      <div v-if="isLoading"><base-spinner></base-spinner></div>
      <ul v-else-if="!isLoading && hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        >
        </coach-item>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CoachFilter from '../../components/CoachFilter';
import CoachItem from '../../components/CoachItem';

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  computed: {
    ...mapGetters('coaches', ['coaches', 'isCoach', 'hasCoaches']),
    ...mapGetters('auth', ['isAuthenticated']),
    isLoggedIn() {
      return this.isAuthenticated;
    },
    filteredCoaches() {
      return this.coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    }
  },
  async created() {
    this.isLoading = true;
    try {
      await this.loadCoaches();
    } catch (err) {
      this.error = err.message || 'Something went wrong!';
    }
    this.isLoading = false;
  },
  methods: {
    ...mapActions('coaches', ['loadCoaches']),
    updateFilter(filters) {
      this.activeFilters = filters;
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
