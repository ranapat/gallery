/**
 * Side Bar component
 *
 * o Shows hide button
 * o Show controls like view and filter
 */

<template>
  <div class="sidebar-wrapper">
    <div class="row">
      <div class="col-md-12 hide">
        <b-btn size="sm" @click.stop="closeSidebar()">
          Hide
        </b-btn>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 form-group">
        <label class="col-form-label">View</label>
        <select class="form-control form-control-sm" v-model="viewValue">
          <option v-for="view in views" v-bind:value="view.key">
            {{ view.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 form-group">
        <label class="col-form-label">Filter</label>
        <select class="form-control form-control-sm" v-model="filterValue">
          <option v-for="filter in filters" v-bind:value="filter.key">
            {{ filter.label }}
          </option>
        </select>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    /**
     * Maps the needed actions
     */
    ...mapActions([
      'closeSidebar', 'setView', 'setFilter'
    ])
  },
  computed: {
    viewValue: {
      get () {
        return this.view
      },
      set (value) {
        this.setView(value)
      }
    },
    filterValue: {
      get () {
        return this.filter
      },
      set (value) {
        this.setFilter(value)
      }
    },
    /**
     * Maps the needed getters
     */
    ...mapGetters([
      'views', 'filters', 'view', 'filter'
    ])
  }
}
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  height: calc(100%);
  min-height: 200px;
  padding: 15px;
  border: 1px solid #efefef;
  border-radius: 5px;

  .row {
    .form-group {
      label {
        text-align: left;
        display: block;
      }
    }
  }
}
</style>
