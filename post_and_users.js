const fetch = require("node-fetch");
const POSTS_API = "https://jsonplaceholder.typicode.com/posts"
const USERS_API = "https://jsonplaceholder.typicode.com/users"


// fetching data from api
const get_posts = async () =>{
    try{
        const response = await fetch(POSTS_API);
        const json = await response.json();
        return json;
    } catch(e){
        console.error(e);
    }
}

const get_users = async () =>{
    try{
        const response = await fetch(USERS_API);
        const json = await response.json();
        return json;
    } catch(e){
        console.error(e);
    }
}
let posts,users;
get_users().then ( data => {users = data; users.map(user => user.posts = []);});
get_posts().then ( data => posts = data);