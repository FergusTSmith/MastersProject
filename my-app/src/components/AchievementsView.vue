<!----------
- The AchievementsView.vue file exclusively concerns the displaying of a user's achievements on the achievement page. 
- Parent: PassiveMode.vue
- Children: None
------------->

<template>
    <p class="HelpText">Passive Mode Achievements are unlocked while passively browsing. A notification will be received when this is achieved.</p>
  <li class="Achievements" v-for="item in achievements" :key="item">
      <p class="AchivementTitle" :class="{achieved:(item.achieved==='Unlocked')}">{{ item.name }} | {{ item.achieved }}</p>
      <p class="HelpText" :class="{achieved:(item.achieved==='Unlocked')}">{{ item.text }}</p>
      <hr/>
  </li>
  <button id="Back" @click="backToPassive">Back</button>
  <button id="Home" @click="exitToHomePage">HomePage</button>
</template>

<script>
export default {
    props: {
        achievements: {
            type: Array,
            required: true
        }
    },
    // Only methods for this component are view controllers that delegate work to PassiveMode.vue
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