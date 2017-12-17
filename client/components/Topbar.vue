/**
 * Top Bar component
 *
 * o Shows header
 * o Show conditional sidebar trigger
 */

<template>
  <div class="topbar-wrapper">
    <div class="row">
      <div class="col-md-3 label">Favorite 360 Example...</div>
      <div class="col-md-1 button" v-if="!sidebarOpened">
        <b-btn size="sm" @click.stop="openSidebar()">
          Open
        </b-btn>
      </div>
      <div v-bind:class="{ 'col-md-9': sidebarOpened, 'col-md-8': !sidebarOpened }" class="status">{{ status }}</div>
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
      'openSidebar'
    ])
  },
  computed: {
    /**
     * Maps the needed getters
     */
    ...mapGetters([
      'sidebarOpened', 'status'
    ])
  }
}
</script>

<style lang="scss" scoped>
.topbar-wrapper {
  background-color: #000;
  padding: 13px 3px 13px 3px;
  margin: 0 15px 0 15px;

  .label {
    color: #a8a8a8;
    text-align: left;
    text-indent: 5px;
  }

  .button {
    color: #fff;
    button {
      padding: 1px 5px 1px 5px;
    }
  }

  .status {
    color: #efefef;
    font-style: italic;
    text-align: left;
  }

}
</style>
