<template>
<div>

  <button @click="add" type="button">add</button>
  </div>
</template>

<script>

export default {
 
  data () {
    return {
    
    }
  },

  methods: {
     add () {
      this.$store.commit('add')
    }
  },

}
</script>

<style>

</style>
