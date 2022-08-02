<template>
    <h2>TrackHunt</h2>
  <p class="HelpText">Passive Mode - Complete list of Countries</p>
  <li v-for="item in passiveModeCountries" :key="item" class="TrackedCountry">
      {{ item.name }} - {{ item.count }}
  </li>
  <button @click="exitToHomePage">HomePage</button>
  <button @click="CountToPassive">Back</button> 
</template>

<script>
export default {
    props: {
        passiveModeCountries: {
            type: Array,
            required: true
        }
    },
    methods: {
        exitToHomePage(){
            this.$emit('exitToHomePage')
        },
        CountToPassive(){
            this.$emit('CountToPassive')
        }
    }
}
</script>