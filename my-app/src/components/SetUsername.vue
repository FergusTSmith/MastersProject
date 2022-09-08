<!----------
- The SetUsername.vue file is the component responsible for rendering the page for users to set their username upon initial login. 
- Parents: App.vue
- Children: None
------------->
<template>
    <h2>TrackerHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackerHunt Logo"/><br/>
    <br/><br/>
    <label>Enter a username for your account:</label><br/>
    <input ref="nickname" type="text">
    <br/>
    <button @click="setUsername" type="button">Enter</button>
    <button @click="usernameToIntro" type="button">Back</button>
</template>

<script>
export default {
    methods: {
        // Only two methods, and these delegate the majority of the logic to the App.vue component
        setUsername(){
            if(this.$refs.nickname.value === null || this.$refs.nickname.value === ''){
                return;
            }else{
                var UsersID = this.$refs.nickname.value;
                this.$emit('setUsername', UsersID)
            }
        },
        usernameToIntro(){
            this.$emit('usernameToIntro');
        },
    }
}
</script>