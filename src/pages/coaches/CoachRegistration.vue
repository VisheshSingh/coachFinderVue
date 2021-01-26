<template>
  <coach-form @registration="registerCoach"></coach-form>
</template>

<script>
import CoachForm from '../../components/CoachForm';
import { mapActions } from 'vuex';
export default {
  components: { CoachForm },

  methods: {
    ...mapActions('coaches', ['addCoach']),
    registerCoach(coachData) {
      this.addCoach(coachData);
      this.$router.replace('/');
    }
  }
};
</script>

<style></style>
