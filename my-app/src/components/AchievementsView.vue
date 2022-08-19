<template>
    <p class="HelpText">Passive Mode Achievements are unlocked while passively browsing. A notification will be received when this is achieved.</p>
  <li class="Achievements" v-for="item in achievements" :key="item">
      <p class="AchivementTitle" :class="{achieved:(item.achieved==='Unlocked')}">{{ item.name }} | {{ item.achieved }}</p>
      <p class="HelpText" :class="{achieved:(item.achieved==='Unlocked')}">{{ item.text }}</p>
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

<style>
li.Achievements{
  color: white;
  font-size: smaller;
  list-style: none;
}
p.HelpText {
  font-size: 9px;
  color: lightgrey;
}

.achieved {
    color: #20C20E;
}
</style>