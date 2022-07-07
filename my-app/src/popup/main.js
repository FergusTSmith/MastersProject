import { createApp } from 'vue';
import App from "./App.vue";
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';
//Vue.use(VueSocketIO, 'http://localhost:3080');

//Vue.use(new VueSocketIO({
//	debug: true,
//	connection: SocketIO('http://localhost:3080', {})
//}))

const optionsVueIO = {
	debgu: true,
	connection: SocketIO('http://localhost:3080')
}

const app = createApp(App).use(new VueSocketIO(optionsVueIO));
app.mount('#app');