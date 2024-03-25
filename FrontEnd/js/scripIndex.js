/******Variable*******/

const gallery = document.querySelector(".gallery");
const body = document.querySelector("body");
const containerFiltres = document.querySelector(".container-filters");
/**variables connexion**/
const token = window.sessionStorage.getItem("token");
const user = window.sessionStorage.getItem("userId");
const logOut = document.getElementById("login-link");
const sectionPortfolio = document.querySelector("#portfolio");
const sectionPortfolioH2 = document.querySelector("#portfolio h2");
const editionText = "Mode édition";
const editionLogo = `<i class="fa-regular fa-pen-to-square"></i>`;
const adminConnexionUP = `<div class="admin-edit"><p>${editionLogo} ${editionText}</p></div>`;
const divEdit = document.createElement("div");
const spanEdit = document.createElement("span");
const adminConnexionDown = `${editionLogo}  ${editionText} `;


/******fonction qui retourne le tableau des works*******/

async function getWorks() {
  const requete = await fetch("http://localhost:5678/api/works");
  return await requete.json();
}
getWorks();

async function getCategory() {
  const requete = await fetch("http://localhost:5678/api/categories");
  return requete.json();
}
async function main() {
  displayWorksGallery();
  createAllButtons();
  displayByCategory();
  loginUser();
  logoutUser();
}
main();


/*affichage des works dans le dom */

function displayWorksGallery() {
  gallery.innerHTML = "";
  getWorks().then((data) => {
    //cree pour chaque élément du tableau
    // console.log(data);
    data.forEach((work) => {
      createWork(work);
    });
  });
}

function createWork(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = work.title;
  img.src = work.imageUrl;
  img.alt = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}


//**********afiichage des boutons par catégories**************/

//récuperer le tableau des catégories

async function getWorks() {
  const requete = await fetch("http://localhost:5678/api/works");
  return requete.json();
}

async function getCategorys() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}
getCategorys();


//creation des boutons

function createAllButtons() {
  getCategory().then((data) => {
    // console.log(data);
    data.forEach((category) => {
      createButton(category);
    });
  });
}
function createButton(category) {
  const btn = document.createElement("button");
  btn.classList.add("buttons-filters");
  btn.textContent = category.name;
  btn.id = category.id;
  containerFiltres.appendChild(btn);
  //console.log(category.id);
  //console.log(category.name);
}


// Trie par classe sur les boutons filtres

async function displayByCategory() {
  const works = await getWorks();
  const buttons = document.querySelectorAll(".container-filters"); //probleme selecteur (pas tous les boutons)

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      const btnId = e.target.id;

      gallery.innerHTML = "";
      works.forEach((work) => {
        if (btnId == work.categoryId) {
          createWork(work);
        }
        if (btnId == "0") {
          createWork(work);
        }
      });
    });
  });
}


/*****Page utilisateur conecté*****/

function loginUser() {
  if (user) {
    logOut.textContent = "logout";
    document.body.insertAdjacentHTML("afterbegin", adminConnexionUP);
    spanEdit.innerHTML = adminConnexionDown;
    divEdit.classList.add("div-edit");
    divEdit.appendChild(sectionPortfolioH2);
    divEdit.appendChild(spanEdit);
    sectionPortfolio.prepend(divEdit);
    containerFiltres.style = "display:none";
  } else {
    //console.log("L'utilisateur n'est pas connecté");
  }
}


/*****Page utilisateur déconecté*****/

function logoutUser() {
  logOut.addEventListener("click", () => {
    if (user) {
      window.sessionStorage.setItem("token", "");
      logOut.textContent = "login";
      window.sessionStorage.setItem("userId", "");
      window.location.href = "index.html";
    }
  });
}
