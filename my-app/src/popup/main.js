import { createApp } from 'vue';
import { createAuth0 } from '@auth0/auth0-vue';
import App from "./App.vue";
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';


//Vue.use(new VueSocketIO({
//	debug: true,
//	connection: SocketIO('http://localhost:3080', {})
//}))

const optionsVueIO = {
	debug: true,
	//connection: SocketIO('http://138.68.132.17:3080/')
	//connection: SocketIO('http://localhost:3080')
	connection: SocketIO('http://138.68.132.17:3080')
}

const app = createApp(App).use(new VueSocketIO(optionsVueIO)).use(
	createAuth0({
		domain: "dev-li-9809u.eu.auth0.com",
		client_id: "s449g7DqINXUA9dZNRPdVTwPswnMX9qJ",
		redirect_uri: window.location.origin
	})
);
app.mount('#app');