let banners = [
    "images/banner1.jpg",
    "images/banner2.jpg",
    "images/banner3.jpg"
];

let current = 0;

setInterval(function () {
    current++;

    if(current >= banners.length){
        current = 0;
    }

    document.getElementById("banner").src = banners[current];

},3000)
;function searchGame() {
    let input = document.getElementById("search").value.toLowerCase();
    let games = document.getElementsByClassName("game-card");

    for (let i = 0; i < games.length; i++) {
        let name = games[i].getElementsByTagName("h3")[0].innerText.toLowerCase();

        if (name.includes(input)) {
            games[i].style.display = "block";
        } else {
            games[i].style.display = "none";
        }
    }
}function login(){

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    let savedUser = localStorage.getItem("username");
    let savedPass = localStorage.getItem("password");

    if(user===savedUser && pass===savedPass){
        document.getElementById("message").innerHTML="✅ Login Successful";
        window.location.href="index.html";
    }else{
        document.getElementById("message").innerHTML="❌ Wrong Username or Password";
    }

}

}function signup(){

    let user = document.getElementById("newUser").value;
    let pass = document.getElementById("newPass").value;

    if(user=="" || pass==""){
        document.getElementById("signupMessage").innerHTML="❌ Fill all fields";
        return;
    }

    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    document.getElementById("signupMessage").innerHTML="✅ Account Created Successfully!";
}window.addEventListener("load", function () {

    let profile = document.getElementById("profileName");

    if(profile){
        profile.innerHTML = localStorage.getItem("username");
    }

});

function logout(){

    localStorage.removeItem("username");
    localStorage.removeItem("password");

    window.location.href = "login.html";

function addGame(){

    let name = document.getElementById("gameName").value;
    let size = document.getElementById("gameSize").value;
    let link = document.getElementById("gameLink").value;

    if(name=="" || size=="" || link==""){
        alert("Fill all fields!");
        return;
    }

    let games = JSON.parse(localStorage.getItem("games")) || [];

    games.push({
        name:name,
        size:size,
        link:link
    });

    localStorage.setItem("games",JSON.stringify(games));

    loadGames();

    document.getElementById("gameName").value="";
    document.getElementById("gameSize").value="";
    document.getElementById("gameLink").value="";
}function loadGames(){

    let list = document.getElementById("gameList");

    if(!list) return;

    let games = JSON.parse(localStorage.getItem("games")) || [];

    list.innerHTML = "";

    games.forEach(function(game,index){

        list.innerHTML += `
        <div class="game-card">
            <h3>${game.name}</h3>

            <p>📦 ${game.size}</p>

            <a href="${game.link}" target="_blank">
                <button>📥 Download</button>
            </a>

            <button onclick="deleteGame(${index})">🗑 Delete</button>

        </div>
        `;

    });

}
function deleteGame(index){

    let games = JSON.parse(localStorage.getItem("games")) || [];

    games.splice(index,1);

    localStorage.setItem("games",JSON.stringify(games));

    loadGames();

}