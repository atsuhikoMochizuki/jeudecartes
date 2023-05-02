/*Projet tri de cartes
2 mai 2023*/

/*Programme principal*/
/*========================================================================*/
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

let anchorMain = displayStatic_elements();

displayDynamic_elements(anchorMain);

const btn_Tous = document.querySelector(".Tous");
btn_Tous.addEventListener("click", filtrer_Tous);

const btn_Html = document.querySelector(".Html");
btn_Html.addEventListener("click", filtrer_html);

const btn_Css = document.querySelector(".Css");
btn_Css.addEventListener("click", filtrer_css);

const btn_Js = document.querySelector(".Js");
btn_Js.addEventListener("click", filtrer_js);

/*========================================================================*/

/*Déclaration des fonctions*/
/*========================================================================*/
function displayStatic_elements() {
  const header = createMarkup("div", null, document.body, [
    { name: "class", value: "container" },
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

  createFilteredButton("Tous", header_row1);
  createFilteredButton("Html", header_row1);
  createFilteredButton("Css", header_row1);
  createFilteredButton("Js", header_row1);

  let mainAnchor = createMarkup("main", null, document.body, [
    { name: "class", value: "container" },
  ]);

  let footer = createMarkup("footer", null, document.body, [
    { name: "class", value: "container mt-5" },
  ]);

  let mentions = createMarkup(
    "p",
    "@Atsuhiko Mochizuki - Avril 2023 - for Diginamic formations",
    footer,
    [{ name: "class", value: "h6 text-center mt-5  mb-5 " }]
  );

  return mainAnchor;
}

function displayDynamic_elements(anchor) {
  // const main = createMarkup("div", null, anchor, [
  //   { name: "class", value: "container" },
  // ]);

  const main_row0 = createMarkup("div", null, anchor, [
    { name: "class", value: "row text-left" },
  ]);

  fetch("articles.json")
    .then((response) => response.json())
    .then((jsonResponse) => {
      let parsedObjectsNumber = 0;

      for (let readObject of jsonResponse) {
        let rowInProgress = 0;
        let article = 0;
        let articleFilter = 0;
        switch (readObject.categorie) {
          case typeArticle.CAT_HTML:
            article = createMarkup("div", null, main_row0, [
              {
                name: "class",
                value: "col-3 rounded shadow p-5 border border-dark bg-success",
              },
            ]);
            articleFilter = createMarkup("div", null, article, [
              {
                name: "class",
                value: "readObject.categorie",
              },
            ]);
            break;
          case typeArticle.CAT_CSS:
            article = createMarkup("div", null, main_row0, [
              {
                name: "class",
                value: "col-3 rounded shadow p-5 border border-dark bg-info",
              },
            ]);
            articleFilter = createMarkup("div", null, article, [
              {
                name: "class",
                value: "readObject.categorie",
              },
            ]);
            break;
          case typeArticle.CAT_JAVASCRIPT:
            article = createMarkup("div", null, main_row0, [
              {
                name: "class",
                value: "col-3 rounded shadow p-5 border border-dark bg-warning",
              },
            ]);
            articleFilter = createMarkup("div", null, article, [
              {
                name: "class",
                value: "readObject.categorie",
              },
            ]);
            break;
          default:
            throw Error("Catégorie de l'article non reconnue");
        }

        let article_titre = createMarkup(
          "h1",
          readObject.titre,
          articleFilter,
          [
            {
              name: "class",
              value: `text-left h4 `,
            },
          ]
        );

        const article_content = createMarkup(
          "p",
          readObject.contenu,
          articleFilter,
          [
            {
              name: "class",
              value: `text-left mt-5`,
            },
          ]
        );
      }
    });
}

function createFilteredButton(name, parent) {
  let btnFilteredContainer = createMarkup("div", null, parent, [
    {
      name: "class",
      value: "col m-5",
    },
  ]);

  let btnFilter = createMarkup("div", null, btnFilteredContainer, [
    {
      name: "class",
      value: name,
    },
  ]);

  let divForInsertAndAlignButton = createMarkup("div", null, btnFilter, [
    {
      name: "class",
      value: "row",
    },
  ]);

  let btn = createMarkup("button", name, divForInsertAndAlignButton, [
    {
      name: "class",
      value: "col  btn btn-secondary rounded shadow-5 border border-dark  m-3",
    },
  ]);

  return btn;
}

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

/*enum =====================================================================*/
const typeArticle = Object.freeze({
  CAT_HTML: 1,
  CAT_CSS: 2,
  CAT_JAVASCRIPT: 3,
  CAT_TOUS: 1,
});

/*Fonctions callback affectées au boutons de l'interface*/
function filtrer_css() {
  console.log("Bonjour css");
}
function filtrer_Tous() {
  console.log("Bonjour tous");
}
function filtrer_html() {
  console.log("Bonjour html");
}
function filtrer_js() {
  console.log("Bonjour js");
}
