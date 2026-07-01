fetch("adminMenu.html")
.then(res => res.text())
.then(html => {

document.getElementById("adminMenu").innerHTML = html;

// Highlight current page
const currentPage =
window.location.pathname.split("/").pop();

document.querySelectorAll(".admin-nav a").forEach(link => {

const href = link.getAttribute("href");

if(href === currentPage){

link.classList.add("active");

}

});

// Logout
const logout = document.getElementById("logoutBtn");

if(logout){

logout.onclick = function(){

if(window.netlifyIdentity){

window.netlifyIdentity.logout();

}

window.location.href = "index.html";

};

}

});