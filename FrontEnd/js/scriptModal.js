//fonction principale
const containerModal = document.querySelector("#container-modal");
const modalGallery = document.querySelector(".modal-gallery");
const xmark = document.querySelector("#container-modal .fa-xmark");
const buttonAddPhoto = document.querySelector(".modal-button button");
const modalPortfolio = document.querySelector(".modal");
const modalAddWorks = document.querySelector(".modalAddWorks");

//affichage de la modale au click sur le bouton modifier
spanEdit.addEventListener("click", function () {
  console.log("spanEdith");
  containerModal.style.display = "flex";
  modalPortfolio.style.display = "flex";
  modalAddWorks.style.display = "none";

});

//Fermuture de la modal sur la croix
xmark.addEventListener("click", function () {
  console.log("xmark");
  containerModal.style.display = "none";
});

//Fermeture de la modal sur le container grisé
containerModal.addEventListener("click", function (e) {
  if (e.target === containerModal) {
    containerModal.style.display = "none";
  }
});
sectionPortfolio.appendChild(containerModal);

//récupération des works & appel de la fonction de création de works dans la gallery
async function displayGallery () {
  modalGallery.innerHTML = ""
  const gallery = await getWorks()
  console.log(gallery);
  gallery.forEach(works => {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const span = document.createElement("span")
    const trash = document.createElement("i")
    trash.classList.add("fa-solid", "fa-trash-can")
    trash.id = works.id
    img.src = works.imageUrl
    img.alt = works.title
    span.appendChild(trash)
    figure.appendChild(img)
    figure.appendChild(span)
    modalGallery.appendChild(figure)
  });
}
displayGallery()

