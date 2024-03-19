/******Variable*******/

const gallery = document.querySelector(".gallery");
const body = document.querySelector("body");
const containerFiltres = document.querySelector(".container-filters");

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
  const buttons = document.querySelectorAll(".container-filters");
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
