<template>
  <div class="container w-25">
    <b-button class="text-uppercase" variant="primary" @click="goToAddLinkPage"
      ><font-awesome-icon icon="plus" class="mr-2" />Submit a link</b-button
    >

    <div v-if="lists.length" class="row border-top mt-2 pt-2">
      <b-form-select
        v-model="selectedSortOption"
        class="mb-3"
        :options="sortOptions"
        @change="changeSort"
      ></b-form-select>
      <b-list-group class="w-100">
        <b-list-group-item v-for="(l, i) in lists" :key="i" class="d-flex">
          <div
            class="d-flex align-items-center w-25 justify-content-center bg-light text-dark font-weight-bold flex-column mr-3"
          >
            <span>{{ l.votes }}</span>
            <span>Points</span>
          </div>
          <div class="d-flex w-75 justify-content-between flex-column">
            <div class="flex-fill flex-column">
              <h5 class="mb-1 font-weight-bold">{{ l.name }}</h5>
              <small>({{ l.url }})</small>
              <font-awesome-icon
                icon="minus-circle"
                class="text-danger position-absolute icon-remove"
                @click="openModal(l)"
              />
            </div>
            <div class="d-flex justify-content-between mt-3">
              <b-button
                variant="success"
                @click="vote({ type: 'increment', item: l })"
                ><font-awesome-icon icon="arrow-up" class="mr-2" />Up
                Vote</b-button
              >
              <b-button
                variant="danger"
                @click="vote({ type: 'decrement', item: l })"
                ><font-awesome-icon icon="arrow-down" class="mr-2" />Down
                Vote</b-button
              >
            </div>
          </div>
        </b-list-group-item>
      </b-list-group>
      <div class="mt-4 mt-4 d-flex w-100 flex-column">
        <b-button class="text-uppercase" variant="primary" @click="clearAll"
          >Clear All</b-button
        >
      </div>
      <div class="mt-4 mt-4 d-flex w-100 flex-column">
        <b-pagination
          v-model="currentPage"
          align="center"
          :total-rows="list.length"
          :per-page="perPage"
        />
      </div>
    </div>

    <b-alert v-if="!lists.length" class="mt-4" show>
      Nothing to show
      <n-link :to="'/add-link'" class="text-dark"
        >Follow up this link to add</n-link
      >
    </b-alert>

    <b-modal v-model="modalShow" title="Remove Link" @ok="deleteLink">
      <p>
        Do you want to remove
        <span class="font-weight-bold">{{
          selectedLink && selectedLink.name
        }}</span>
      </p>
    </b-modal>
  </div>
</template>

<script>
import { updateLink, getKeys, removeLink, clearLinks } from '@/utils/storage'
import { sortByDate, sortByVoteCount } from '@/utils/sort'

export default {
  data: () => ({
    selectedSortOption: null,
    sortOptions: [
      { value: null, text: 'Please select an option' },
      { value: 'most', text: 'Most Voted (Z - A)' },
      { value: 'less', text: 'Last Voted (A - Z)' }
    ],
    modalShow: false,
    selectedLink: null,
    list: [],
    perPage: 5,
    currentPage: 1
  }),

  computed: {
    lists() {
      const items = this.list

      return items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      )
    }
  },

  beforeMount() {
    this.list = getKeys()

    sortByDate('date', this.list)
  },

  methods: {
    clearAll() {
      clearLinks()
    },
    changeSort() {
      // todo: put into utils sort folder
      if (this.selectedSortOption === 'most') {
        this.list = this.list
          .sort((a, b) => {
            return b.votes - a.votes
          })
          .sort((a, b) => b.name - a.name)
      }

      if (this.selectedSortOption === 'less') {
        this.list = this.list
          .sort((a, b) => {
            return a.votes - b.votes
          })
          .sort((a, b) => a.name - b.name)
      }
    },

    openModal(item) {
      this.selectedLink = item
      this.modalShow = true
    },

    deleteLink() {
      removeLink(this.selectedLink)
      // todo: try to remove it from storage and list for change?
      this.list = this.list.filter(
        (item) => item.name !== this.selectedLink.name
      )
    },

    vote({ type, item }) {
      updateLink({ item }, type)

      sortByVoteCount('votes', 'lastUpdated', this.lists)
    },

    goToAddLinkPage() {
      this.$router.push('add-link')
    }
  }
}
</script>

<style>
.icon-remove {
  transition: opacity 0.3s linear;
  opacity: 0;
  cursor: pointer;
  top: -8px;
  right: -8px;
}
.list-group-item:hover {
  transition: background-color 0.3s linear;
  background-color: lightgrey;
}
.list-group-item:hover .icon-remove {
  opacity: 1;
}
.top-enter-active,
.top-leave-active {
  transition: 0.5s;
}
.top-enter,
.top-leave-to {
  opacity: 0;
  transform: translate3d(0, -40px, 0);
}
.top-move {
  opacity: 0.5;
  transition: 0.5s;
}
</style>
