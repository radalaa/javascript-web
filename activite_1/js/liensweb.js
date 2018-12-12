/* 
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];

// TODO : compléter ce fichier pour ajouter les liens à la page web

listeLiens.forEach( function(lien) {

    var url = lien.url;

    var divElt = document.createElement("div");
    divElt.classList.add("lien");
    var lienElt = document.createElement("a");
    lienElt.href = url;
    lienElt.style.textDecoration = 'NONE';

    var strongElt = document.createElement("strong");
    strongElt.textContent =  lien.titre;
    strongElt.style.color = '#428bca' ;


    var pElt = document.createElement("p");
    pElt.textContent = "Ajouté par " + lien.auteur;


    document.getElementById("contenu").appendChild(divElt);
   
  
    divElt.appendChild(lienElt);
    lienElt.appendChild(strongElt);
    divElt.appendChild(document.createTextNode(" " + url));
    divElt.appendChild(pElt);
    
 
});