<template>
    <p>Passive Mode Achievements are unlocked while passively browsing. A notification will be received when this is achieved.</p>
  <li class="Achievements" v-for="item in achievements" :key="item">
      <p class="AchivementTitle">{{ item.name }} | {{ item.achieved }}</p>
      <p class="HelpText">{{ item.text }}</p>
      <hr/>
  </li>
  <button @click="backToPassive">Back</button>
  <button @click="exitToHomePage">HomePage</button>
</template>

<script>
export default {
    props: {
        achievements: {
            type: Array,
            required: true
        }
    },
    methods: {
        backToPassive(){
            this.$emit('backToPassive')
        },
        exitToHomePage(){
            this.$emit('exitToHomePage')
        }
    }
}
</script>