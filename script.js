/**
 * Fonction d'initialisation de l'application
 *
 * Pour initialiser l'application nous allons récupérer les données depuis l'api pokeapi.co
 * et créer un objet pokemon avec les données récupérées
 *
 */

// Récupérer le container depuis le DOM où nous injecterons le code html
const pokeContainer = document.querySelector("#pokemonList");

// Récupérer le champ de recherche depuis le DOM
const searchInput = document.querySelector("#searchInput");

// Définir le nombre de pokemon à récupérer
const pokemonNumber = 151;

// Récupérer les données depuis l'api pokeapi.co
// https://pokeapi.co/api/v2/pokemon
// pour chaque pokemon nous allons récupérer les données grace à la fonction getRequest
// que nous definirons plus bas
const fetchPokemon = async () => {
  // Boucler sur le nombre de pokemon à récupérer
  for (let id = 1; id <= pokemonNumber; id++) {
    // Attendre la récupération des données de chaque pokemon
    await getRequest(id);
  }
};

// Nous allons récupérer les données de chaque pokemon
// et creer un objet pokemon avec les données récupérées
const getRequest = async (id) => {
  // Intéroger l'api pour récupérer les données du pokemon en fonction de son id
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  // Attendre la réponse de l'api
  const result = await fetch(url);

  // Attendre la conversion de la réponse en json
  const pokemon = await result.json();

  // Créer un objet pokemon avec les données récupérées
  createCard(pokemon);
};

// Créer un objet pokemon avec les données récupérées
const createCard = (props) => {
  // Récupérer les props du pokemon
  // La destructuration permet de récupérer les props de l'objet pokemon
  const { id, name, sprites, types } = props;

  // Créer un élément html pour chaque pokemon avec la méthode createElement
  // https://developer.mozilla.org/fr/docs/Web/API/Document/createElement
  const pokemonEl = document.createElement("div");

  // Ajouter un id à chaque element pokemon
  // https://developer.mozilla.org/fr/docs/Web/API/Element/id
  pokemonEl.id = `pokemon-${id}`;

  // Ajouter une classe css à chaque element pokemon
  // https://developer.mozilla.org/fr/docs/Web/API/Element/classList
  pokemonEl.classList.add("card");

  // Récupérer le type du pokemon
  const type = types[0].type.name;

  // Créer le code html pour chaque pokemon
  const pokeInnerHTML = `
    <figure class="card-image-container">
      <img class="card-image" src="${sprites.front_default}" alt="${name}" loading="lazy" />
    </figure>
    <div class="card-info">
      <strong class="card-info__name">${name}</strong>
      <span class="card-info__type">${type}</span>
    </div>
  `;

  // Injecter le code html dans l'élément pokemon
  // https://developer.mozilla.org/fr/docs/Web/API/Element/innerHTML
  pokemonEl.innerHTML = pokeInnerHTML;

  // Injecter l'élément pokemon dans le container
  // https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild
  pokeContainer.appendChild(pokemonEl);
};

// Enfin nous pouvons appeler la fonction fetchPokemon
fetchPokemon();

/**
 * Fonction de filtrage des pokémon en fonction de la saisie dans le champ de recherche
 *
 * Pour filtrer les pokémon nous allons utiliser la méthode filterPokemon
 * qui sera appelée à chaque fois que l'utilisateur saisira une lettre dans le champ de recherche
 */
const filterPokemon = () => {
  // Récupérer la valeur saisie dans le champ de recherche
  const searchValue = searchInput.value.toLowerCase();

  // Récupérer tous les pokémon qui sont dans le container en fonction de la classe css
  // https://developer.mozilla.org/fr/docs/Web/API/Document/querySelectorAll
  const cards = pokeContainer.querySelectorAll(".card");

  // Boucler sur tous les pokémon
  cards.forEach((card) => {
    // Récupérer le nom et le type du pokemon
    // https://developer.mozilla.org/fr/docs/Web/API/Element/querySelector
    const name = card
      .querySelector(".card-info__name")
      .textContent.toLowerCase();
    const type = card
      .querySelector(".card-info__type")
      .textContent.toLowerCase();

    // Si le nom ou le type du pokemon ne contient pas la valeur saisie dans le champ de recherche
    // Alors on cache le pokemon en ajoutant la classe css hide
    if (!name.includes(searchValue) && !type.includes(searchValue)) {
      // Ajouter la classe css hide
      // https://developer.mozilla.org/fr/docs/Web/API/Element/classList
      card.classList.add("hidden");
    }
    // Sinon on affiche le pokemon en supprimant la classe css hidden
    else {
      // Supprimer la classe css hide
      card.classList.remove("hidden");
    }
  });
};

// Écouter les changements dans le champ de recherche et déclencher le filtrage
searchInput.addEventListener("input", filterPokemon);

/**
 * Lightmode / Darkmode
 *
 * Pour passer du mode clair au mode sombre nous allons utiliser la méthode toggleDarkMode
 * qui sera appelée à chaque fois que l'utilisateur cliquera sur le bouton
 *
 */
// Récupérer le bouton depuis le DOM
const toggleButton = document.querySelector("#toggleButton");

// Vérifier le mode enregistré dans le localStorage
const isDarkModeEnabled = localStorage.getItem("darkMode");

// Définir le mode par défaut
let darkMode = isDarkModeEnabled === "true";

// Définir le mode sombre
const enableDarkMode = () => {
  // Ajouter l'attribut data-theme="dark" à la balise html
  document.documentElement.setAttribute("data-theme", "dark");

  // Modifier l'icone du bouton
  toggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M15 2h2v5h-2zm6.688 6.9l3.506-3.506l1.414 1.414l-3.506 3.506zM25 15h5v2h-5zm-3.312 8.1l1.414-1.413l3.506 3.506l-1.414 1.414zM15 25h2v5h-2zm-9.606.192L8.9 21.686l1.414 1.414l-3.505 3.506zM2 15h5v2H2zm3.395-8.192l1.414-1.414L10.315 8.9L8.9 10.314zM16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6Z"/></svg>`;

  // Enregistrer le mode sombre dans le localStorage
  localStorage.setItem("darkMode", "true");

  // Modifier le mode
  darkMode = true;
};

// Définir le mode clair
const disableDarkMode = () => {
  // Ajouter l'attribut data-theme="light" a l'élément html
  document.documentElement.setAttribute("data-theme", "light");

  // Modifier l'icone du bouton
  toggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z"/></svg>`;

  // Supprimer le mode sombre du localStorage
  localStorage.setItem("darkMode", "false");

  // Modifier le mode
  darkMode = false;
};

// Définir le mode sombre ou le mode clair en fonction du mode actuel
const toggleDarkMode = () => {
  // Si le mode est sombre
  if (darkMode) {
    // Alors on passe en mode clair
    disableDarkMode();
  }
  // Sinon on passe en mode sombre
  else {
    enableDarkMode();
  }
};

// Appliquer le mode initial
if (darkMode) {
  enableDarkMode();
} else {
  disableDarkMode();
}

// Ajouter un écouteur d'événement sur le bouton
// au clic sur le bouton nous allons déclencher la fonction toggleDarkMode
toggleButton.addEventListener("click", toggleDarkMode);
