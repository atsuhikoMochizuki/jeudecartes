# jeudecartes
Jeu de cartes - exercice javascript

![image](https://user-images.githubusercontent.com/129963944/235356974-06e43de9-7320-4ba9-9bae-fd67f3e3334c.png)


En accord avec l'image ci-dessus, l'exercice consiste à créer en Javascript
- 4 boutons correspondant chacun aux thématiques suivantes:
    - Tous
    - HTML
    - CSS
    - JS
- 16 cartes en balise article qui contiennent chacune au minimum un paragraphe.
  Les articles ont au moins une classe (au sens de l'attribut html, par exemple class="css) qui correspond à une thématique.
 
Déroulement du programme:

- Au clic sur un bouton, vérifiez si la classe des article correspond à l'intitulé du bouton. 
- Dans la négative, sauf si on a cliqué sur le bouton "tous", on cache les articles correspondants en utilisant par exemple la propriété "hidden".

Nota : Il est demandé d'utiliser la fonction "createLarkup" vue en tp ainsi que les méthodes querySelectorAll et forEach.
