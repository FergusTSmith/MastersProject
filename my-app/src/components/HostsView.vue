<template>
    <h2>TrackHunt</h2>
  <p class="HelpText">Passive Mode - Complete list of Hosts</p>
  <li v-for="item in orderedHosts" :key="item" class="TrackedCountry">
      {{ item.URL }} - {{ item.count }}
  </li>
  <button @click="exitToHomePage">HomePage</button>
  <button @click="HostToPassive">Back</button>
</template>

<script>
import _ from 'lodash';

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
    },
    computed: {
        orderedHosts(){
            return _.orderBy(this.passiveModeHosts, 'count', 'desc')
        }
    }
}
</script>