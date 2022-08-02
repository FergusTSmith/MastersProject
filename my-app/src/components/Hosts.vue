<template>
    <h2>TrackHunt</h2>
  <p class="HelpText">Passive Mode - Complete list of Hosts</p>
  <li v-for="item in passiveModeHosts" :key="item" class="TrackedCountry">
      {{ item.URL }} - {{ item.count }}
  </li>
  <button @click="exitToHomePage">HomePage</button>
  <button @click="HostToPassive">Back</button>
</template>

<script>
export default {
    props: {
        passiveModeHosts: {
            type: Array,
            required: true
        }
    },
    methods: {
        exitToHomePage(){
            this.$emit('exitToHomePage');
        },
        HostToPassive(){
            this.$emit('HostToPassive');
        }
    }
}
</script>