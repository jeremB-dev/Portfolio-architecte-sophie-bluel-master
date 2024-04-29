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
    returnToModalPortfolio();
    addWorks();
    verifValidForm();
  }
}
//affichage de la modale au click sur le bouton modifier
spanEdit.addEventListener("click", function () {
  //console.log("spanEdith");
  containerModal.style.display = "flex";
  modalPortfolio.style.display = "flex";
  modalAddWorks.style.display = "none";
});

//Fermuture de la modal sur la croix 1
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
    // Vérifie si l'élément cliqué est le containerModal lui-même
    // Si c'est le cas, change le style de display à 'none' pour cacher la modale
    containerModal.style.display = "none";
  }
});
sectionPortfolio.appendChild(containerModal);  // Ajoute le containerModal à la sectionPortfolio dans le DOM

//affichage de la gallerie dans la modale
async function displayGallery() {
  modalGallery.innerHTML = ""; // Vide le contenu actuel de 'modalGallery'
  const gallery = await getWorks(); // Attend la récupération des œuvres (works) de manière asynchrone
  // Pour chaque œuvre dans la galerie
  gallery.forEach((works) => {
    // Crée un élément 'figure'
    const figure = document.createElement("figure");
    const img = document.createElement("img"); // Crée un élément 'img' pour l'image
    const span = document.createElement("span"); // Crée un élément 'span' pour contenir l'icône de suppression
    const trash = document.createElement("i"); // Crée un élément 'i' pour l'icône de suppression
    trash.classList.add("fa-solid", "fa-trash-can"); // Ajoute des classes pour l'icône de la corbeille (FontAwesome)
    trash.id = works.id; // Attribue l'identifiant de l'œuvre à l'icône de suppression
    img.src = works.imageUrl; // Définit l'URL de l'image et le texte alternatif
    img.alt = works.title;
    span.appendChild(trash); // Ajoute l'icône de suppression au 'span'
    figure.appendChild(img); // Ajoute l'image et le 'span' au 'figure'
    figure.appendChild(span);
    modalGallery.appendChild(figure); // Ajoute 'figure' à 'modalGallery'
  });
  deletePhoto(); //appel de la fonction deletePhoto apres la creation de la gallerie et des poubelles
}
displayGallery();
displayCategoryModal();
prevImg();

//Objet de paramétrage pour requette DELETE avec token
const deleteWorkID = {
  method: "DELETE", // Méthode HTTP utilisée pour la requête, ici DELETE pour supprimer une ressource
  headers: {
    Authorization: `Bearer ${token}`, // En-tête d'autorisation contenant un token pour l'authentification
    "Content-Type": "application/json", // Type de contenu de la requête, ici JSON
  },
  mode: "cors", // Mode "cors" pour les requêtes entre différentes origines
  credentials: "same-origin",  // Informations d'authentification à envoyer avec la requête, ici les cookies
};
//suppression d'une photo dans la modale
function deletePhoto() {
  const trashs = document.querySelectorAll(".fa-trash-can"); // Sélectionne tous les éléments avec la classe 'fa-trash-can' (icônes de poubelle)
  // console.log(trashs);
  // Parcourt chaque icône de poubelle
  trashs.forEach((trash) => {
    // Ajoute un écouteur d'événements pour réagir au clic sur l'icône
    trash.addEventListener("click", (e) => {
      // Récupère l'identifiant de l'image associé à l'icône de poubelle
      const workID = trash.id;
      // console.log(trash);
      // Envoie une requête DELETE au serveur pour supprimer l'œuvre
      fetch(`http://localhost:5678/api/works/${workID}`, deleteWorkID).then(
        () => {
          // Après la suppression, recharge la galerie dans la modale
          displayGallery();
          // Rafraîchit également la galerie principale
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
  addWorks();
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

//Fonction qui génère les catégorie dynamiquement pour la modale
async function displayCategoryModal() {
  const select = document.querySelector("form select"); // Sélectionne l'élément <select> dans le formulaire
  const categorys = await getCategory(); // Attend la récupération des catégories de manière asynchrone
  // Pour chaque catégorie reçue
  categorys.forEach((category) => {
    const option = document.createElement("option"); // Définit la valeur de l'option avec l'identifiant de la catégorie
    option.value = category.id; // Définit le texte de l'option avec le nom de la catégorie
    option.textContent = category.name;
    select.appendChild(option); // Ajoute l'option à l'élément <select>
  });
}

//fonction prévisualisation de l'image
function prevImg() {
  // Ajoute un écouteur d'événements sur l'input de type fichier
  inputFile.addEventListener("change", () => {
    // Récupère le premier fichier sélectionné par l'utilisateur
    const file = inputFile.files[0];
    // console.log(file);
    // Vérifie si un fichier a été sélectionné
    if (file) {
      const reader = new FileReader(); // Crée un nouvel objet FileReader
      // Définit ce qui se passe une fois que la lecture du fichier est terminée
      reader.onload = function (e) {
        // Met à jour la source de l'élément d'image pour la prévisualisation
        previewImage.src = e.target.result;
        previewImage.style.display = "block"; // Affiche l'élément d'image
        // labelFile.style.display ="none"
        // paragraphFile.style.display ="none"
      };
      // Commence la lecture du fichier comme une URL de données
      reader.readAsDataURL(file);
    } else {
      // Si aucun fichier n'est sélectionné, cache l'élément d'image
      previewImage.style.display = "none";
    }
  });
}

// fontion qui vérifie si tout les inputs sont remplis
function verifValidForm() {
  // Sélectionne le bouton dans le conteneur spécifié
  const buttonValidForm = document.querySelector(
    ".container-button-add-work  button"
  );
  // Ajoute un écouteur d'événements pour détecter toute saisie dans le formulaire
  formAddWorks.addEventListener("input", () => {
    // Vérifie si les champs 'inputTitle' et 'inputFile' ne sont pas vides
    if (!inputTitle.value == "" && !inputFile.files[0] == "") {
      // Si les champs sont remplis, modifie les classes du bouton pour refléter l'état valide
      buttonValidForm.classList.remove("button-add-work");
      buttonValidForm.classList.add("buttonValidForm");
    } else {
      // Si les champs ne sont pas remplis, remet les classes du bouton à l'état initial
      buttonValidForm.classList.remove("buttonValidForm");
      buttonValidForm.classList.add("button-add-work");
    }
  });
}
verifValidForm();

//fonction ajout d'une photo
function addWorks() {
  // Ajoute un écouteur d'événements sur le formulaire pour gérer la soumission
  formAddWorks.addEventListener("submit", (e) => {
    e.preventDefault(); // Empêche le comportement par défaut de rechargement de la page
    // Crée un objet FormData pour recueillir les valeurs du formulaire
    const formData = new FormData();
    formData.append("image", inputFile.files[0]); // Ajoute l'image sélectionnée
    formData.append("title", inputTitle.value); // Ajoute le titre de l'œuvre
    formData.append("category", inputCategory.value); // Ajoute la catégorie de l'œuvre
    //console.log(formData);
    // Envoie les données du formulaire au serveur pour créer une nouvelle œuvre
    fetch("http://localhost:5678/api/works", {
      method: "POST", // Utilise la méthode POST pour envoyer les données
      body: formData, // Attache les données du formulaire à la requête
      headers: {
        Authorization: `Bearer ${token}`, // Inclut le token d'authentification dans les en-têtes
      },
    })
          fetch("http://localhost:5678/api/works", {
            method: "POST", // Utilise la méthode POST pour envoyer les données
            body: formData, // Attache les données du formulaire à la requête
            headers: {
              Authorization: `Bearer ${token}`, // Inclut le token d'authentification dans les en-têtes
            },
          })
            .then((response) => { // Récupère la réponse de la requête
              if (!response.ok) {
                throw new Error("Une erreur est survenue"); // Lance une erreur si la réponse n'est pas OK
              }
              return response.json(); // Convertit la réponse en JSON
            })
            .then(() => {
              displayGallery(); // Met à jour la galerie pour afficher la nouvelle image
              displayModalAddWorks(); // Affiche ou met à jour le modal d'ajout d'œuvres
              displayWorksGallery(); // Met à jour la galerie principale
              formAddWorks.reset(); // Réinitialise le formulaire
              if (!response.ok) {
                throw new Error("Une erreur est survenue"); // Lance une erreur si la réponse n'est pas OK
              }
              return response.json(); // Convertit la réponse en JSON
            })
            .then(() => {
              displayGallery(); // Met à jour la galerie pour afficher la nouvelle image
              displayModalAddWorks(); // Affiche ou met à jour le modal d'ajout d'œuvres
              displayWorksGallery(); // Met à jour la galerie principale
              formAddWorks.reset(); // Réinitialise le formulaire
              modalPortfolio.style.display = "flex";
              modalAddWorks.style.display = "none";
              previewImage.style.display = "none";
            })
            .catch((error) => {
              console.error("Une erreur est survenue : ", error); // Affiche une erreur en cas de problème
            });
  });
}