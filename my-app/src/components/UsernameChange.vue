<!----------
- The UsernameChange.vue file is the component responsible for rendering the page for users to change their usernames
- Parents: OptionsView.vue
- Children: None
------------->
<template>
    <h2>TrackerHunt</h2>
    <img class="main-logo" src="staticimages/Logo.png" alt="TrackerHunt Logo"/><br/>
    <br/><br/>
    <p>Your current username is: {{ UsersID }}</p>
    <label>Enter a new username:</label><br/>
    <input ref="NewUsername" type="text">
    <br/>
    <button id="Save" @click="changeUsername" type="button">Save</button>
    <button id="Back" @click="backToOptions" type="button">Back</button>
</template>

<script>
export default {
    methods: {
        // Methods primarily delegate to OptionsView.vue
        changeUsername(){
            if(this.$refs.NewUsername.value != null && this.$refs.NewUsername.value != ''){
                this.$emit('changeUsername', this.$refs.NewUsername.value);
            }else{
                alert("Error. Please enter a valid username");
            }
        },
        backToOptions(){
            this.$emit('backToOptions');
        },
    },
    props: {
        UsersID: {
            type: String,
            required: true
        }
    }
}</script>