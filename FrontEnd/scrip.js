/*Variable*/
const gallery = document.querySelector(".gallery");
const body = document.querySelector("body");
const containerFiltres = document.querySelector(".container-filtres");

/* fonction qui retourne le tableau des works*/
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
