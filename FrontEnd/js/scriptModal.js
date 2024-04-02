//fonction principale
const containerModal = document.querySelector("#container-modal");
const modalGallery = document.querySelector(".modal-gallery");

//Variables pour l'affichage de la deuxieme mmodale partie
const buttonAddPhoto = document.querySelector(".modal-button button");
const modalPortfolio = document.querySelector(".modal");
const modalAddWorks = document.querySelector(".modalAddWorks");
//Variables Pour le form
const formAddWorks = document.querySelector("#formAddWorks");
const labelFile = document.querySelector("#formAddWorks label");
const paragraphFile = document.querySelector("#formAddWorks p");
const inputTitle = document.querySelector("#title");
const inputCategory = document.querySelector("#categoryInput");
const inputFile = document.querySelector("#file");
const previewImage = document.getElementById("previewImage");

//Fonction Principale pour l'affichage des works dans la Modale
function mainModal() {
  if (user) {
    displayWorksGallery();
    displayModalAddWorks();
    returnToModalPortfolio();
  }
}

//affichage de la modale au click sur le bouton modifier / je n'arrive pas creer une fonction pour cette partie

spanEdit.addEventListener("click", function () {
  //console.log("spanEdith");
  containerModal.style.display = "flex";
  modalPortfolio.style.display = "flex";
  modalAddWorks.style.display = "none";
});

//Fermuture de la modal sur la croix 1 / je n'arrive pas creer une fonction pour cette partie

const xmark = document.querySelector("#container-modal .fa-xmark");
xmark.addEventListener("click", function () {
  containerModal.style.display = "none";
});

//Fermuture de la modal sur la croix 2
const xmark2 = document.querySelector(".modalAddWorks .fa-xmark");
xmark2.addEventListener("click", function () {
  containerModal.style.display = "none";
  modalAddWorks.style.display = "none";
});

//Fermeture de la modal sur le container grisé
containerModal.addEventListener("click", function (e) {
  if (e.target === containerModal) {
    containerModal.style.display = "none";
  }
});
sectionPortfolio.appendChild(containerModal);

//affichage de la gallerie dans la modale
async function displayGallery() {
  modalGallery.innerHTML = "";
  const gallery = await getWorks();
  gallery.forEach((works) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const span = document.createElement("span");
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    trash.id = works.id;
    img.src = works.imageUrl;
    img.alt = works.title;
    span.appendChild(trash);
    figure.appendChild(img);
    figure.appendChild(span);
    modalGallery.appendChild(figure);
  });
  deletePhoto(); //appel de la fonction deletePhoto apres la creation de la gallerie et des poubelles
}
displayGallery();

//Objet de paramétrage pour requette DELETE avec token
const deleteWorkID = {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "same-origin",
};

//suppression d'une photo dans la modale
function deletePhoto() {
  const trashs = document.querySelectorAll(".fa-trash-can");
  // console.log(trashs);
  trashs.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      const workID = trash.id;
      // console.log(trash);
      fetch(`http://localhost:5678/api/works/${workID}`, deleteWorkID).then(
        () => {
          displayGallery();
          displayWorksGallery();
        }
      );
    });
  });
}

//fonction d'affichage au click sur btn:"ajouter-photo" de la modalAddWorks
function displayModalAddWorks() {
  buttonAddPhoto.addEventListener("click", () => {
    containerModal.style.display = "flex";
    modalPortfolio.style.display = "none";
    modalAddWorks.style.display = "flex";
  });
}
displayModalAddWorks();

// Retour sur modal depuis la flèche de la modalAddWorks
function returnToModalPortfolio() {
  const arrowLeftModalWorks = document.querySelector(
    ".modalAddWorks .fa-arrow-left"
  );
  arrowLeftModalWorks.addEventListener("click", () => {
    //Supréssion de la prewiew a clik sur retour dans la modale
    inputFile.value = "";
    containerModal.style.display = "flex";
    modalPortfolio.style.display = "flex";
    modalAddWorks.style.display = "none";
  });
}
returnToModalPortfolio();
