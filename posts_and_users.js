const fetch = require("node-fetch");
const POSTS_API = "https://jsonplaceholder.typicode.com/posts"
const USERS_API = "https://jsonplaceholder.typicode.com/users"

// Kocham Cię skarbie
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

//connecting users with their posts
const map_posts_to_users = (posts,users) => posts.map(post => users[(parseInt(post.userId))-1].posts.push(post));


//counting posts of every user
const count_users_posts = (users) =>{
    for(let i = 0; i < users.length; i++){
        console.log(users[i].name + " napisał(a) " + users[i].posts.length + " postów");
    }
}

//finding repeated posts
const find_non_unique_posts = (posts) => {
    let non_unique_titles = [];
    posts.map( post => non_unique_titles.push(post.title));
    non_unique_titles = non_unique_titles.filter((element, index, array) => array.indexOf(element) !==index);
    non_unique_titles.length !== 0 ? console.log(non_unique_titles) : console.log("Nie ma powtarzających się postów!");
}

// degrees to radians
let radians = (degree) => {
    let rad = degree * Math.PI / 180;
    return rad;
}

//calculating distance with haversine formula
const calculate_distance = (lat1, lon1, lat2, lon2) => {
    let dlat, dlon, a, c, R;
    R = 6372.8; // km
    dlat = radians(lat2 - lat1);
    dlon = radians(lon2 - lon1);
    lat1 = radians(lat1);
    lat2 = radians(lat2);
    a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.sin(dlon / 2) * Math.sin(dlon / 2) * Math.cos(lat1) * Math.cos(lat2)
    c = 2 * Math.asin(Math.sqrt(a));
    return R * c;
}



const find_closests_users = (users) =>{
    let cords = []
    for(let i = 0; i < users.length; i++){
        cords.push(users[i].address.geo);
    }
    for(let i = 0; i < users.length; i++){
        let closest_user = {distance:999999999, name:""};
        let distance;
        for(let j = 0; j < users.length; j++){
            if(j !== i){
                distance =  calculate_distance(cords[i].lat, cords[i].lng, cords[j].lat, cords[j].lng);
                if(distance < closest_user.distance){
                    closest_user.distance = distance;
                    closest_user.name = users[j].name; 
                }
            }       
        }
        console.log(users[i].name + " - najbliższy użytkownik: " + closest_user.name + " (" + Math.round(closest_user.distance) + " km)");
    }
}

const run_script = async () => {
    let users;
    let posts;
    await get_users().then ( data => {users = data; users.map(user => user.posts = []);});
    await get_posts().then ( data => posts = data);

    map_posts_to_users(posts,users);
    count_users_posts(users);
    
    console.log("-----------------");

    find_non_unique_posts(posts);

    console.log("-----------------");
    
    find_closests_users(users);
}

//run script if it is not test mode
if (process.env.npm_lifecycle_event !== 'test')
    run_script();

const functions = {
    radians,
    calculate_distance,
    get_posts,
    get_users,
    map_posts_to_users,
    count_users_posts,
    find_non_unique_posts,
    find_closests_users,
}

//exporting functions for testing, only if node.js is running code
if (typeof module !== 'undefined' && module.exports)
    module.exports = functions;
