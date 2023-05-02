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

/*=====================================================================*/
const typeArticle = Object.freeze({
  CAT_HTML: 1,
  CAT_CSS: 2,
  CAT_JAVASCRIPT: 3,
  CAT_TOUS: 1,
});

const header = createMarkup("div", null, document.body, [
  { name: "class", value: "container bg-success" },
]);

const header_row0 = createMarkup("div", null, header, [
  { name: "class", value: "row" },
]);

const header_title = createMarkup(
  "h1",
  "Choissisez votre langage préféré...Et bonne lecture!",
  header_row0,
  [{ name: "class", value: "col h1 text-center mt-5" }]
);

const header_row1 = createMarkup("div", null, header, [
  { name: "class", value: "row m-5" },
]);

const filters = ["Tous", "Ctml", "Css", "Js"];

filters.forEach(function (filter) {
  btn = createMarkup("button", filter, header_row1, [
    {
      name: "class",
      value: "col btn btn-secondary shadow-5 m-5 p-2 active",
    },
  ]);
});

const main = createMarkup("div", null, document.body, [
  { name: "class", value: "container bg-warning" },
]);

const main_row0 = createMarkup("div", null, main, [
  { name: "class", value: "row text-left" },
]);

fetch("articles.json")
  .then((response) => response.json())
  .then((jsonResponse) => {
    let parsedObjectsNumber = 0;

    for (let readObject of jsonResponse) {
      let rowInProgress = 0;
      let article = 0;
      switch (readObject.categorie) {
        case typeArticle.CAT_HTML:
          article = createMarkup("article", null, main_row0, [
            {
              name: "class",
              value: "col bg-info",
            },
          ]);
          break;
        case typeArticle.CAT_CSS:
          article = createMarkup("article", null, main_row0, [
            {
              name: "class",
              value: "col bg-warning",
            },
          ]);
          break;
        case typeArticle.CAT_JAVASCRIPT:
          article = createMarkup("article", null, main_row0, [
            {
              name: "class",
              value: "col bg-success",
            },
          ]);
          break;
        default:
          throw Error("Catégorie de l'article non reconnue");
      }

      let article_titre = createMarkup("h1", readObject.titre, article, [
        {
          name: "class",
          value: `text-left h4 `,
        },
      ]);

      const article_content = createMarkup("p", readObject.contenu, article, [
        {
          name: "class",
          value: `text-left mt-5`,
        },
      ]);
    }
  });

//   if (parsedObjectsNumber !== 16)
//     throw new Error(
//       "Le nombre d'articles contenus dans le fichier JSON est inccorect");

/*Déclaration des fonctions*/
/**
 * Crée un élément du dom, lui ajoute du texte, le place comme dernier
 * enfant de parent et ajoute un attribut en utilisant le paramètre attribute
 * @param {String} markup_name
 * @param {String} text
 * @param {domElement} parent
 * @param {Array} attributes  (doit comprendre les propriétés name et value)
 * @returns domElement
 */
function createMarkup(markup_name, text, parent, attributes = []) {
  const markup = document.createElement(markup_name);
  markup.textContent = text;
  parent.appendChild(markup);
  attributes.forEach((attribute) => {
    if (
      attribute &&
      attribute.hasOwnProperty("name") &&
      attribute.hasOwnProperty("value")
    ) {
      markup.setAttribute(attribute.name, attribute.value);
    }
  });

  return markup;
}
