/* 
Activité 2
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)


var contenuElt = document.getElementById("contenu");
ajaxGet("https://oc-jswebsrv.herokuapp.com/api/liens", function (reponse) {
    // Transforme la réponse en un tableau d'articles
    var liens = JSON.parse(reponse);

    liens.forEach(function (lien) {
      var lienElt = creerElementLien(lien);
        contenuElt.appendChild(lienElt);

    });
});


// Crée et renvoie un élément DOM affichant les données d'un lien
// Le paramètre lien est un objet JS représentant un lien
function creerElementLien(lien) {
    var titreElt = document.createElement("a");
    titreElt.href = lien.url;
    titreElt.style.color = "#428bca";
    titreElt.style.textDecoration = "none";
    titreElt.style.marginRight = "5px";
    titreElt.appendChild(document.createTextNode(lien.titre));

    var urlElt = document.createElement("span");
    urlElt.appendChild(document.createTextNode(lien.url));

    // Cette ligne contient le titre et l'URL du lien
    var ligneTitreElt = document.createElement("h4");
    ligneTitreElt.style.margin = "0px";
    ligneTitreElt.appendChild(titreElt);
    ligneTitreElt.appendChild(urlElt);

    // Cette ligne contient l'auteur
    var ligneDetailsElt = document.createElement("span");
    ligneDetailsElt.appendChild(document.createTextNode("Ajouté par " + lien.auteur));

    var divLienElt = document.createElement("div");
    divLienElt.classList.add("lien");
    divLienElt.appendChild(ligneTitreElt);
    divLienElt.appendChild(ligneDetailsElt);

    return divLienElt;
}



// Crée et renvoie un élément DOM de type input
function creerElementInput(placeholder, taille) {
    var inputElt = document.createElement("input");
    inputElt.type = "text";
    inputElt.setAttribute("placeholder", placeholder);
    inputElt.setAttribute("size", taille);
    inputElt.setAttribute("required", "true");
    return inputElt;
}

var ajouterLienElt = document.getElementById("ajoutLien");
// Gère l'ajout d'un nouveau lien
ajouterLienElt.addEventListener("click", function () {
    var auteurElt = creerElementInput("Entrez votre nom", 20);
    var titreElt = creerElementInput("Entrez le titre du lien", 40);
    var urlElt = creerElementInput("Entrez l'URL du lien", 40);

    var ajoutElt = document.createElement("input");
    ajoutElt.type = "submit";
    ajoutElt.value = "Ajouter";

    var formAjoutElt = document.createElement("form");
    formAjoutElt.appendChild(auteurElt);
    formAjoutElt.appendChild(titreElt);
    formAjoutElt.appendChild(urlElt);
    formAjoutElt.appendChild(ajoutElt);

    var p = document.querySelector("p");
    // Remplace le bouton d'ajout par le formulaire d'ajout
    p.replaceChild(formAjoutElt, ajouterLienElt);

    // Ajoute le nouveau lien
    formAjoutElt.addEventListener("submit", function (e) {
        e.preventDefault(); // Annule la publication du formulaire
        
        var url = urlElt.value;
        // Si l'URL ne commence ni par "http://" ni par "https://"
        if ((url.indexOf("http://") !== 0) && (url.indexOf("https://") !== 0)) {
            // On la préfixe par "http://"
            url = "http://" + url;
        }

        // Création d'un objet représentant un lien a ajouter
        var lien = {
            titre: titreElt.value,
            url: url,
            auteur: auteurElt.value
        };
        // Envoi de l'objet au serveur
        ajaxPost("https://oc-jswebsrv.herokuapp.com/api/lien", lien,

            function (reponse) {
            // Le film est affiché dans la console en cas de succès
            console.log("Le lien " + JSON.stringify(lien) + " a été envoyé au serveur");
            //appler la function addNewElt pour afficher le lien ajouté en cas de succès . 
            addNewElt();
            //appler la function pour afficher le message en cas de succès . 
            messageSuccess();
             },

            true // Valeur du paramètre isJson

        );


       function addNewElt(){
            var lienElt = creerElementLien(lien);
            // Ajoute le nouveau lien en haut de la liste
            contenuElt.insertBefore(lienElt, contenuElt.firstChild);

            
       }
        // Remplace le formulaire d'ajout par le bouton d'ajout
            p.replaceChild(ajouterLienElt, formAjoutElt);

        // Création du message d'information
       
        function messageSuccess() {
            var infoElt = document.createElement("div");
            infoElt.classList.add("info");
            infoElt.textContent = "Le lien \"" + lien.titre + "\" a bien été ajouté.";
            p.insertBefore(infoElt, ajouterLienElt);
            // Suppresion du message après 2 secondes
            setTimeout(function () {
            p.removeChild(infoElt);
            }, 2000);
        };
    });
});


