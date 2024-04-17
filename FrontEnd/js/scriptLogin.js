/********page de connexion js*********/

/***variables globale login***/
const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const logOut = document.getElementById("login-link");

/***recupération email et password***/
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userEmail = email.value;
  const userPassword = password.value;
  const login = {
    email: userEmail,
    password: userPassword,
  };
  const user = JSON.stringify(login);

  /**envoi requette**/
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: user,
  })
    /**recupération réponse**/
    .then((response) => {
      if (!response.ok) {
        email.style.border = "2px solid #FF0000";
        password.style.border = "2px solid #FF0000";
        const wrongLogin = document.querySelector(".p-wrong");
        wrongLogin.textContent =
          "Le mot de passe ou l'identifiant que vous avez fourni est incorrect.";
        throw new Error(
          "Le mot de passe ou l'identifiant que vous avez fourni est incorrect."
        );
      }
      return response.json();
    })
    .then((data) => {
      const userToken = data.token;
      window.sessionStorage.setItem("token", userToken);
      window.location.href = "index.html";
    })
    .catch((error) => {
      //console.error("Une erreur est survenue : ", error);
    });
});
