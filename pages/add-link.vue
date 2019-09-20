<template>
  <div class="container w-25">
    <div class="row flex-column">
      <n-link :to="'/'" class="text-dark mb-5">
        <font-awesome-icon icon="arrow-left" />
        Return to List
      </n-link>
      <h4>Add New Link</h4>
    </div>

    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group id="name" label="Name:" label-for="name">
        <b-form-input
          id="name"
          v-model="item.name"
          required
          placeholder="e.g. Alphabet"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="url" label="Link URL:" label-for="url">
        <b-form-input
          id="url"
          v-model="item.url"
          required
          placeholder="e.g. http://hepsiburada.com"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Add</b-button>
      <b-button type="reset" variant="danger">Clear</b-button>
    </b-form>
  </div>
</template>

<script>
import { storeLink } from '@/utils/storage'
export default {
  components: {},
  data: () => ({
    item: {
      name: 'a',
      url: 'b'
    }
  }),
  methods: {
    onSubmit() {
      const toaster = 'b-toaster-top-center'
      const item = {
        date: new Date(),
        votes: 0,
        lastUpdated: null,
        ...this.item
      }

      // todo: Seperate toaster msgs

      if (storeLink({ item })) {
        this.$bvToast.toast(`${this.item.name} added`, {
          title: 'Created',
          variant: 'success',
          toaster
        })
        this.item = { name: null, url: null }
      } else {
        this.$bvToast.toast(`${this.item.name}`, {
          title: 'Name is already defined ',
          variant: 'warning',
          toaster
        })
      }
    },
    onReset() {
      this.item = { name: null, url: null }
    }
  }
}
</script>
