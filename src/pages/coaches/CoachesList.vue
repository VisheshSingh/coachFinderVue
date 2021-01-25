<template>
  <section>
    FILTER
  </section>
  <section>
    <div class="controls">
      <button>Refresh</button>
      <router-link to="/register">Register a Coach</router-link>
    </div>
  </section>
  <section>
    <ul>
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
  </section>
</template>

<script>
import CoachItem from '../../components/CoachItem';

export default {
  components: { CoachItem },
  computed: {
    filteredCoaches() {
      return this.$store.getters['coaches/coaches'];
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
