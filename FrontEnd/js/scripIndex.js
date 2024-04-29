/******Variable*******/
const gallery = document.querySelector(".gallery");
const body = document.querySelector("body");
const containerFiltres = document.querySelector(".container-filters");
/**variables connexion**/
const token = window.sessionStorage.getItem("token");
const logOut = document.getElementById("login-link");
const sectionPortfolio = document.querySelector("#portfolio");
const sectionPortfolioH2 = document.querySelector("#portfolio h2");
const editionTextProject = "modifier";
const editionLogo = `<i class="fa-regular fa-pen-to-square"></i>`;
const adminEdit = document.querySelector(".admin-edit");
const divEdit = document.createElement("div");
const spanEdit = document.createElement("span");
const adminConnexionProject = `${editionLogo}  ${editionTextProject} `;

/******fonction qui retourne le tableau des works*******/

//récuperer le tableau des works
async function getWorks() {
  // Envoie une requête HTTP GET à l'URL spécifiée pour obtenir les works
  const requete = await fetch("http://localhost:5678/api/works");
  // Interprète la réponse comme JSON et la retourne
  return await requete.json();
}
getWorks();

async function getCategory() {
  const requete = await fetch("http://localhost:5678/api/categories");
  return requete.json();
}
getCategory();

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
  // Appelle la fonction getWorks() qui retourne une promesse avec les données des works
  getWorks().then((data) => {
    //cree pour chaque élément du tableau
    // console.log(data);
    data.forEach((work) => {
      // Appelle la fonction createWork pour créer et ajouter chaque work au DOM
      createWork(work);
    });
  });
}
// Fonction pour créer un élément 'figure' pour chaque work et l'ajouter au DOM
function createWork(work) { 
  // Crée un élément 'figure' pour chaque work
  const figure = document.createElement("figure");
  // Crée un élément 'img' pour l'image du work
  const img = document.createElement("img");
  // Crée un élément 'figcaption' pour le titre du work
  const figcaption = document.createElement("figcaption");
  // Définit le contenu textuel de 'figcaption' avec le titre du work
  figcaption.textContent = work.title;
  // Définit l'attribut 'src' de l'image avec l'URL de l'image du work et l'attribut 'alt' de l'image avec le titre du work
  img.src = work.imageUrl;
  img.alt = work.title;
  // Ajoute l'image et le figcaption à l'élément 'figure'
  figure.appendChild(img);
  figure.appendChild(figcaption);
  // Ajoute l'élément 'figure' à l'élément 'gallery' dans le DOM
  gallery.appendChild(figure);
}

//**********afiichage des boutons par catégories (filtres)**************/

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
  // appel de la fonction getCategory qui retourne une promesse avec les données des catégories
  getCategory().then((data) => {
    // parcours de chaque catégorie reçue
    data.forEach((category) => {
      // pour chaque catégorie, un bouton est créé
      createButton(category);
    });
  });
}
// Fonction pour créer un bouton pour une catégorie spécifique
function createButton(category) {
  // Création d'un élément bouton dans le DOM
  const btn = document.createElement("button");
  // Ajout de la classe 'buttons-filters' pour le style
  btn.classList.add("buttons-filters");
  // Définition du texte du bouton avec le nom de la catégorie
  btn.textContent = category.name;
  // Attribution de l'identifiant de la catégorie comme id du bouton
  btn.id = category.id;
  // Ajout du bouton créé dans un conteneur existant dans le DOM
  containerFiltres.appendChild(btn);
}

// Trie par classe sur les boutons filtres
async function displayByCategory() {
  // Récupère les données des travaux de manière asynchrone
  const works = await getWorks();
  const btn = document.querySelectorAll(".buttons-filters"); //Sélectionne tous les boutons avec la classe 'buttons-filters'
  // Parcourt chaque bouton
  btn.forEach((button) => {
    // Ajoute un écouteur d'événements à chaque bouton
    button.addEventListener("click", (e) => {
      // Enlève la classe 'active' de tous les boutons pour réinitialiser l'état actif
      btn.forEach((btn) => {
        // Enlève la classe 'active' de chaque bouton
        btn.classList.remove("active");
      });
      // Ajoute la classe 'active' au bouton cliqué
      button.classList.add("active");
      // Récupère l'ID du bouton cliqué
      const btnId = e.target.id;
      // Vide la galerie pour la nouvelle affichage
      gallery.innerHTML = "";
      // Parcourt tous les travaux et les affiche s'ils correspondent à la catégorie sélectionnée
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
  // Vérifie si le token d'authentification existe
  if (token) {
    // Si un token existe, cela signifie que l'utilisateur est connecté
    // et Change le texte d'un élément pour afficher "logout"
    logOut.textContent = "logout";
    // Insère du contenu HTML dans un élément 'spanEdit'
    spanEdit.innerHTML = adminConnexionProject;
    // Ajoute une classe CSS à 'divEdit' pour appliquer des styles spécifiques
    divEdit.classList.add("div-edit");
    // Ajoute des éléments au 'divEdit'
    divEdit.appendChild(sectionPortfolioH2);
    divEdit.appendChild(spanEdit);
    // Ajoute 'divEdit' au début de 'sectionPortfolio'
    sectionPortfolio.prepend(divEdit);
    // Affiche les options d'administration
    document.getElementById("portfolio");
    containerFiltres.style = "display:none"; // Cache le conteneur des filtres
    adminEdit.style = "display:flex"; // Affiche les options d'administration
    //console.log("adminEdit.style");
  } else { // Si aucun token n'existe, cela signifie que l'utilisateur n'est pas connecté
    //console.log("L'utilisateur n'est pas connecté");
  }
}

/*****Page utilisateur déconecté*****/
function logoutUser() { 
  // Ajoute un écouteur d'événements à l'élément 'logOut' pour gérer la déconnexion de l'utilisateur
  logOut.addEventListener("click", () => { 
    // Vérifie si un token d'authentification existe
    if (token) {
      // Supprime le token d'authentification de la session
      window.sessionStorage.setItem("token", "");
      // Change le texte de l'élément 'logOut' pour afficher "login"
      logOut.textContent = "login";
      // Supprime les options d'administration
      window.sessionStorage.setItem("userId", "");
      window.location.href = "index.html"; // Redirige l'utilisateur vers la page de connexion
    } else {
      //renvoi sur page conexion
      window.location.href = "login.html";
    }
  });
}
