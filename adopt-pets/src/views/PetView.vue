<template>
  <div>
    {{ pet().name }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'cats',
      'dogs'
    ])
  },
  methods: {
    pet () {
      // this.cats
      // this['cats']
      const animal = this[this.$route.params.species][this.$route.params.id]
      return animal
    }
  }
}
</script>
