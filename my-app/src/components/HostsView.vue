<!----------
- The HostsView.vue file is the component responsible for rendering the page for the passive mode Hosts. 
- Parents: PassiveMode.vue
- Children: None
------------->
<template>
    <h2>TrackerHunt</h2>
  <p class="HelpText">Passive Mode - Complete list of Hosts</p>
  <li v-for="item in orderedHosts" :key="item" class="TrackedCountry">
      {{ item.URL }} - {{ item.count }}
  </li>
  <button id="Home" @click="exitToHomePage">HomePage</button>
  <button id="Back" @click="HostToPassive">Back</button>
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
        // Only real methods for this component are view controllers. 
        exitToHomePage(){
            this.$emit('exitToHomePage');
        },
        HostToPassive(){
            this.$emit('HostToPassive');
        }
    },
    computed: {
        // Using the lodash package to order the hosts by number
        orderedHosts(){
            return _.orderBy(this.passiveModeHosts, 'count', 'desc')
        }
    }
}
</script>