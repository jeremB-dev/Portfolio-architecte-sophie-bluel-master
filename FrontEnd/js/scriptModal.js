const containerModal = document.querySelector("#container-modal");
const xmark = document.querySelector("#container-modal .fa-xmark");

//affichage de la modale au click sur le bouton modifier(X mode édition)
spanEdit.addEventListener("click", function () {
  console.log("spanEdith");
  containerModal.style.display = "flex";
});
xmark.addEventListener("click", function () {
  console.log("xmark");
  containerModal.style.display = "none";
});
