var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");
var Signup = document.getElementById("signUp")
var storage = JSON.parse(localStorage.getItem("Users"));
var SignIn = document.querySelector("#SignIn")
var userEmailInput = document.querySelector("#emailInput")
var userPasswordInput = document.querySelector("#passwordInput")
let alert =document.querySelector("#alert");
let alertValid= document.querySelector("#valid")
let sayHi=document.querySelector("#username")
var users =[];
let allPizza=[];

var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}
// console.log(location.hostname,location.pathname,location.protocol,location.port);
if(storage != null){
    users = storage
}
function addUsers(){
    var user ={
        name:userName.value,
        email:userEmail.value,
        password:userPassword.value,
    }
    if(emailExist(user)){
        console.log("Already Exist");
        alert.classList.remove("d-none")
        clear();
    }
    else if(user.name == "" || user.email=="" || user.password==""){
        console.log("basha");
        alert.classList.remove("d-none")
    }
    else{
        users.push(user)
        console.log(users);
        localStorage.setItem("Users",JSON.stringify(users))
        alert.classList.add("d-none")
        clear();
    }
       
}
function clear(){
    userEmail.value=""
    userPassword.value=""
    userName.value=""
}

function checkEmailPassword(){
    let name=passwordEmailExist()
    if(name){
         console.log("correct");
         alertValid.classList.add("d-none")
         localStorage.setItem("session", name)
         location.replace( location.protocol+'/loginSystem/home.html')
    }else{
            console.log("invalid");
            alertValid.classList.remove("d-none")
            // clear();
        }
    }

function emailExist(user){
    for(let i=0;i<users.length;i++){
        if(user.email==users[i].email){
            return true
        }
    }
}
function passwordEmailExist(){
    for(let i=0;i<users.length;i++){
        if(userPasswordInput.value==users[i].password && userEmailInput.value==users[i].email){
            return users[i].name
        }
    }
}

function logOut(){
    localStorage.removeItem("session")
    location.replace(location.protocol+"/signIn.html")
    
}
let Hi = localStorage.getItem("session")
sayHi.innerHTML="Welcome "+ Hi;

function getAllPizza(){
    let pizza = new XMLHttpRequest();
    pizza.open("get","https://forkify-api.herokuapp.com/api/search?q=pizza")
    pizza.send()
    pizza.addEventListener("readystatechange",function(){
        if(pizza.readyState == 4 && pizza.status == 200){
            allPizza = JSON.parse(pizza.response).recipes;
            displayRecipes();
        }
    })
}
function displayRecipes(){
    let cartona="";
    for(let i =0;i<allPizza.length;i++){
        cartona+=`
                <div class="col-4">
                    <div class="content bg-white p-2">
                        <a href="${allPizza[i].source_url}">
                            <img src="${allPizza[i].image_url}" alt="" width="350" height="230" class="w-100">
                        </a>
                        <p class="text-center">${allPizza[i].title}</p>
                    </div>
                </div>`
    }
    document.querySelector("#content1").innerHTML=cartona
}
getAllPizza();
