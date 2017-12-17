/**
 * Home view
 *
 * o Defines how home page looks like
 * o Handles the main components and structure
 * o Does not work with any data from the store
 */

<template>
<div class="page">
  <div class="row">
    <topbar class="col-md-12"></topbar>
  </div>
  <div class="row body">
    <div v-if="sidebarOpened" class="col-md-2 component">
      <sidebar></sidebar>
    </div>
    <div v-bind:class="{ 'col-md-10': sidebarOpened, 'col-md-12': !sidebarOpened }" class="component">
      <list></list>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import List from '../components/List'

export default {
  /**
   * Defines the used components
   */
  components: {
    Topbar, Sidebar, List
  },
  computed: {
    /**
     * Maps the needed getters
     */
    ...mapGetters([
      'sidebarOpened'
    ])
  }
}
</script>

<style lang="scss" scoped>
.page {
  .body {
    padding: 5px 15px 5px 15px;

    .component {
      padding: 5px;
    }
  }
}
</style>
