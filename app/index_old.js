/*La méthode fetch() renvoie une promesse (un objet de type Promise) qui va se résoudre avec un objet Response.
   La méthode json() de l'interface Response prend un flux Response
  et le lit jusqu'au bout. Elle renvoie une promesse qui se résout avec le
  résultat de l'analyse du corps du texte en JSON.
  Notez que bien que la méthode soit nommée json(), le résultat n'est pas JSON,
  mais le résultat de la prise de JSON en entrée et de son analyse pour produire
  un objet JavaScript.*/

console.log(`
      _                  _                       _            
     | |                | |                     | |           
     | | ___ _   _    __| | ___    ___ __ _ _ __| |_ ___  ___ 
 _   | |/ _ \\ | | |  / _  |/ _ \\  / __/ _\\ | | _| __/ _ \\/ __|
| |__| |  __/ |_| | | (_| |  __/ | (_| (_| | |  | ||  __/\\__ \\
 \\____/ \\___|\\__,_|  \\__,_|\\___|  \\___\\__,_|_|   \\__\\___||___/
by Atsuhiko Mochizuki
v1.0
April 2023
`);

// /*Enums==============================*/
const typeArticle = Object.freeze({
  CAT_HTML: 1,
  CAT_CSS: 2,
  CAT_JAVASCRIPT: 3,
  CAT_TOUS: 1,
});

/*Génération de la page d'accueil*/
display_generateTitle("Filtrez vos langages!");

rowButton = createRowContainerInBody("container", "div", "row");

let filtres = ["Tous", "HTML", "CSS", "JS"];
for (let i in filtres) addButtonFilter(filtres[i], rowButton);

let cardsZone = document.createElement("div");
cardsZone.className = "container mt-5 ml-5 mr-5 mb-5 ";
document.body.appendChild(cardsZone);

let cardsZone_lines = [4];
for (let i = 0; i < 4; i++)
  cardsZone_lines[i] = createRowContainerInParentBScontainer(cardsZone, "row");

/*Analyse du fichier Json, récupération des éléments et affichage dans 
la page*/
insertArticlesFromJsonFile("articles.json", cardsZone_lines);

/*Ajout des mentions en fin de document*/
let mentionsRow = createRowContainerInBody("container", "div", "row");
let mentionsCol = document.createElement("div");
mentionsCol.className = "col";
mentionsRow.appendChild(mentionsCol);

let logoDiginamic = document.createElement("img");
logoDiginamic.className = "mx-auto d-block";
logoDiginamic.src = "Logo-Diginamic.png";
mentionsCol.appendChild(logoDiginamic);

let mentionsText = document.createElement("p");
mentionsText.className = "h6 text-center m-2";
mentionsText.innerHTML =
  "Atsuhiko Mochizuki - Avril 2023 - for Diginamic formations";
mentionsRow.appendChild(mentionsText);

/*Déclarations des fonctions privées===============================================*/
function display_generateTitle(i_title) {
  rowTitle = createRowContainerInBody("container", "div", "row");

  let title = document.createElement("h1");
  title.className = "h1 text-center m-2 p-3";
  title.innerHTML = `${i_title}`;
  rowTitle.appendChild(title);
}

/*D'après la documentation de Boostrap, les objets sont alignés par colonnes, sur un 
total de 12 sur la largeur du viewport. Une colonne doit être toujours l'enfant d'une rangée.
Cette fonction permet de raccourcir le raccorci de création de rangée*/
function createRowContainerInBody(
  i_typeOfBSContainer,
  i_balise,
  i_rowClassAttributes
) {
  let container = document.createElement(i_balise);
  // if (
  //   i_typeOfBSContainer !== "container-fluid" ||
  //   i_typeOfBSContainer !== "container"
  // )
  //   throw new Error("TypeOfBSContainer not valid");

  document.body.appendChild(container);

  let row = document.createElement("div");
  row.className = `row ${i_rowClassAttributes}`;
  container.appendChild(row);

  return row;
}

function createRowContainerInParentBScontainer(
  i_ParentBSContainer,
  i_rowClassAttributes
) {
  let row = document.createElement("div");
  row.className = `row ${i_rowClassAttributes}`;
  i_ParentBSContainer.appendChild(row);
  return row;
}

/* Ajout rapide des boutons de filtres*/
function  (i_categorie, i_rowParent) {
  let buttonFilter = document.createElement("button");
  buttonFilter.className = "col btn btn-secondary mx-5 shadow-5";
  buttonFilter.type = "button";
  buttonFilter.innerHTML = i_categorie;
  i_rowParent.appendChild(buttonFilter);
}

function insertArticlesFromJsonFile(
  i_Jsonfile,
  i_arrayFourColumnsRowBsContainer
) {
  // if (i_arrayFourColumnsRowBsContainer.prototype.length != 4)
  //   throw new Error(
  //     "insertArticlesFromJsonFile: Nombre de colonnes fourni incorrect"
  //   );
  fetch("articles.json")
    .then((response) => response.json())
    .then((jsonResponse) => {
      let parsedObjectsNumber = 0;

      for (let readObject of jsonResponse) {
        let rowInProgress = 0;

        /*Création de la div qui contiendra la carte*/
        let divCorpse = document.createElement("div");
        switch (readObject.categorie) {
          case typeArticle.CAT_HTML:
            divCorpse.className = "col-3 p-3 border shadow bg-info rounded";
            break;
          case typeArticle.CAT_CSS:
            divCorpse.className = "col-3 p-3 border shadow bg-success rounded";
            break;
          case typeArticle.CAT_JAVASCRIPT:
            divCorpse.className = "col-3 p-3 border shadow bg-warning rounded";
            break;
          default:
            throw Error("Catégorie de l'article non reconnue");
        }

        /*On place la div dans la bonne rangée de la cardZone*/
        if (parsedObjectsNumber >= 0 && parsedObjectsNumber < 4)
          i_arrayFourColumnsRowBsContainer[0].appendChild(divCorpse);
        else if (parsedObjectsNumber >= 4 && parsedObjectsNumber < 8)
          i_arrayFourColumnsRowBsContainer[1].appendChild(divCorpse);
        else if (parsedObjectsNumber >= 8 && parsedObjectsNumber < 12)
          i_arrayFourColumnsRowBsContainer[2].appendChild(divCorpse);
        else i_arrayFourColumnsRowBsContainer[3].appendChild(divCorpse);

        /*Création de la carte à l'intérieur de cette div*/
        let divCardBody = document.createElement("article");
        divCardBody.className = "card-body text-justify";
        let cardContent = `
        <h5 class="card-title">${readObject.titre}</h5>\n
        <p class="card-text mt-5 lead header-6">${readObject.contenu}</p>`;
        divCardBody.innerHTML = cardContent;
        divCorpse.appendChild(divCardBody);

        parsedObjectsNumber++;
      }

      if (parsedObjectsNumber !== 16)
        throw new Error(
          "Le nombre d'articles contenus dans le fichier JSON est inccorect"
        );
    });
}
