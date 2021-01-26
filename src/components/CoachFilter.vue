<template>
  <base-card>
    <h2>Filter coaches based on areas of expertise:</h2>
    <div>
      <span class="filter-option">
        <input type="checkbox" id="frontend" checked @change="updateFilter" />
        <label for="frontend">Frontend</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="backend" checked @change="updateFilter" />
        <label for="backend">Backend</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="career" checked @change="updateFilter" />
        <label for="career">Career</label>
      </span>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ['update-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  methods: {
    updateFilter(e) {
      const selectedId = e.target.id;
      const isActive = e.target.checked;
      const updatedFilter = {
        ...this.filters,
        [selectedId]: isActive
      };
      this.filters = updatedFilter;
      this.$emit('update-filter', updatedFilter);
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option input:checked + label {
  font-weight: bold;
}
</style>
