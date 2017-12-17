/**
 * List component
 *
 * o Shows data in list and grid mode
 */

<template>
  <div class="list-wrapper">

    <div class="row">
      <div class="col-md-12" v-if="!dataLoading && !dataLoadError && reduced.length === 0">No data</div>
      <div class="col-md-12" v-if="dataLoading">Data loading...</div>
      <div class="col-md-12" v-if="dataLoadError">Data loading error : {{ dataLoadError && dataLoadError.response ? dataLoadError.response.data.message : '' }}</div>
    </div>

    <div class="row data" v-if="reduced.length > 0">
      <div class="col-md-12 hide">
        <ul>
          <li v-for="item in reduced" v-bind:class="{ 'grid': view === config.grid.key, 'list': view === config.list.key }">
            <span class="title">{{ item.title }}</span>
            <span class="date" v-if="view === config.list.key">{{ item.date | moment("Do MMMM YYYY") }}</span>
            <span class="date" v-if="view === config.grid.key">{{ item.date | moment("DD.MM.YYYY") }}</span>
            <span class="image" v-if="view === config.grid.key">
              <img :src="item.image" v-img-fallback="fallback" />
            </span>
            <span class="favorite">
              <b-btn class="remove" size="sm" @click.stop="removeFromFavorites(item.self)" v-if="item.favorite">
                Favorite
              </b-btn>
              <b-btn class="add" size="sm" @click.stop="addToFavorites(item.self)" v-if="!item.favorite">
                Add
              </b-btn>
            </span>
            <div class="clearfix"></div>
          </li>
        </ul>
      </div>
    </div>

    <div class="row navigation" v-if="next">
      <div class="col-md-12 hide">
        <b-btn size="sm" @click.stop="navigateNext()">
          Get more
        </b-btn>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { view } from '../config'

export default {
  methods: {
    /**
     * Navigates next
     */
    navigateNext () {
      this.loadData(this.next)
    },
    /**
     * Maps the needed actions
     */
    ...mapActions([
      'loadData', 'loadLocalFavorites', 'addToFavorites', 'removeFromFavorites'
    ])
  },
  computed: {
    fallback () {
      return {
        error: 'https://t4.ftcdn.net/jpg/01/73/72/33/240_F_173723331_FofDffDUsZhMOmsQYW3pvokpUzVnR5NX.jpg'
      }
    },
    /**
     * Passes the config
     */
    config () {
      return view
    },
    /**
     * Gets next link
     */
    next () {
      return this.data && this.data.next ? this.data.next : undefined;
    },
    /**
     * Transforms the data it shall
     * in the format it needs
     */
    reduced () {
      if (this.data && this.data.items) {
        const favorites = this.favorites;
        return this.data.items.map((item) => {
          return {
            title: item.data.title,
            date: item.data.created_at,
            image: item.data.images.thumbnails.find((thumbnail) => {
              return thumbnail.width <= 256;
            }).url,
            favorite: favorites.indexOf(item.self) !== -1,
            self: item.self
          }
        })
      } else {
        return []
      }
    },
    /**
     * Maps the needed getters
     */
    ...mapGetters([
      'data', 'dataLoading', 'dataLoadError',
      'view', 'filter',
      'favorites'
    ])
  },
  mounted: function () {
    this.loadLocalFavorites()
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  height: calc(100%);
  min-height: 200px;

  .data {
    .hide {
      ul {
        list-style: none;

        li {
          overflow: hidden;

          .favorite {
            button {
              width: 80px;
              border: none;
              color: #afafaf;
            }

            .add {
              background-color: #0f0;
            }
            .remove {
              background-color: #00f;
            }
          }

          &.grid {
            display: block;
            border: 2px solid #afafaf;
            border-radius: 5px;
            background-color: #efefef;
            margin: 5px;
            padding: 8px 5px 5px 5px;
            width: 270px;
            height: 140px;
            float: left;

            .title {
              display: block;
              float: left;
              width: 50%;
              margin-top: 100px;
              text-align: left;
              overflow: hidden;
              z-index: 10;
              position: relative;
              background-color: rgba(255, 255, 255, 0.75);
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .date {
              display: block;
              float: right;
              width: 50%;
              margin-top: 100px;
              text-align: right;
              z-index: 10;
              position: relative;
              background-color: rgba(255, 255, 255, 0.75);
            }

            .favorite {
              display: block;

              button {
                margin-top: -263px;
                margin-left: 177px;
                position: relative;
              }
            }

            .image {
              display: block;
              height: 128px;

              img {
                margin-top: -155px;
                width: 100%;
                height: 100%;
                position: relative;
                object-fit: contain
              }

            }

            .favorite {

            }

          }
          &.list {
            display: block;
            border: 1px solid #afafaf;
            border-radius: 5px;
            background-color: #efefef;
            margin: 5px;
            padding: 8px 5px 5px 5px;

            .title {
              float: left;
              text-align: left;
              padding-left: 15px;
              color: #afafaf;
              width: 60%;
              overflow: scroll;
              text-overflow: ellipsis;
            }

            .date {
              float: left;
              text-align: left;
              padding-left: 15px;
              color: #afafaf;
            }

            .image {
              display: none;
            }

            .favorite {
              float: right;

            }
          }
        }
      }
    }
  }
}
</style>
