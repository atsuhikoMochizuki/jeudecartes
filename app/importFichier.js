import { open } from "node:fs/promises";
const CSV_SOURCE = "articles.json";

export const importerDonneesCSV = async () => {
  const file = await open(CSV_SOURCE);

  let idQuestion = 0;

  const tableauQuestions = [];

  for await (const ligneDuFichier of file.readLines()) {
    // traiter

    // écarter la première ligne
    if (idQuestion > 0) {
      // Quel architecte fût à l'origine des plans du Woolworth building?,Cass Gilbert
      const lineTab = ligneDuFichier.split("?,");
      const question = lineTab[0] + " ?";
      const reponse = lineTab[1];

      const questionJSON = {
        id: idQuestion,
        question: question,
        reponse: reponse,
      };

      tableauQuestions.push(questionJSON);
    }
    idQuestion++;
  }

  const json = {
    "questions-reponses": tableauQuestions,
  };

  const jsonString = JSON.stringify(json, null, 2);

  // écrire le fichier de sortie
  fileOutput.write(jsonString);
  fileOutput.close();
};
