<template>
    <h2>TrackHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackHunt Logo"/><br/>
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
        setUsername(){
            if(this.$refs.nickname.value === null){
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