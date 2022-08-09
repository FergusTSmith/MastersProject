<template>
    <h2>TrackHunt</h2>
  <p class="HelpText">Passive Mode - Complete list of Countries</p>
  <li v-for="item in passiveModeCountries" :key="item" class="TrackedCountry">
      <img class="CountryFlag" v-bind:src="'./staticimages/CountryFlags/' + item.shortname + '.jpeg'"/>{{ item.name }} - {{ item.count }}
  </li>
  <button @click="exitToHomePage">HomePage</button>
  <button @click="CountToPassive">Back</button> 
</template>

<script>
import _ from 'lodash';

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
    },
    computer: {
        orderedCountries(){
            return _.orderBy(this.passiveModeCountries, 'count', 'desc');
        }
    }
}
</script>