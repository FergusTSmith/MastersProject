//import { createSecureServer } from "http2";

export async function returnUserList(){
    const response = await fetch('/api/users/');
    return await response.json;
}

export async function addUser(data){
    const response = await fetch('api/user/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
    })
    return await response.json();
}