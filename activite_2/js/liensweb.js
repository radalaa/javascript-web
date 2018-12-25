/* 
Activité 2
*/

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
// Crée et renvoie un élément DOM affichant les données d'un lien
// Le paramètre lien est un objet JS représentant un lien
function creerElementLien(lien) {
    //crée le la balise <a>
    var titreLien = document.createElement("a");
    titreLien.href = lien.url;
    titreLien.style.color = "#428bca";
    titreLien.style.textDecoration = "none";
    titreLien.style.marginRight = "5px";
    titreLien.appendChild(document.createTextNode(lien.titre));

    //crée le la balise <span>
    var urlLien = document.createElement("span");
    urlLien.appendChild(document.createTextNode(lien.url));

    // Cette ligne contient le titre et l'URL du lien
    var ligneTitre = document.createElement("h4");
    ligneTitre.style.margin = "0px";
    ligneTitre.appendChild(titreLien);
    ligneTitre.appendChild(urlLien);

    // Cette ligne contient l'auteur
    var ligneDetails = document.createElement("span");
    ligneDetails.appendChild(document.createTextNode("Ajouté par " + lien.auteur));

    var divLien = document.createElement("div");
    divLien.classList.add("lien");
    divLien.appendChild(ligneTitre);
    divLien.appendChild(ligneDetails);

    return divLien;
}

var contenu = document.getElementById("contenu");
// Parcours de la liste des liens et ajout d'un élément au DOM pour chaque lien
listeLiens.forEach(function (lien) {
    var elementLien = creerElementLien(lien);
    contenu.appendChild(elementLien);
});

//appler la function creatButton() pour creer le button "ajouter un lien"
creatButton() 
//function pour creer le button "ajouter un lien"
function creatButton() {

    //créer le button ajouter un lien
    var BtnAjouterFormElt = document.createElement("button");
    BtnAjouterFormElt.textContent = "Ajouter un lien";
    BtnAjouterFormElt.id = "add";
    var contenu =  document.getElementById("contenu");
    document.body.insertBefore(BtnAjouterFormElt, contenu);

    //evénment click sur le button , appel a une function pour supprimer le button et ajouter un formulaire.

    BtnAjouterFormElt.addEventListener('click', addForm);
}
//ajout le formulaire
function addForm() {

    var butnAddElt =  document.getElementById("add");
    butnAddElt.remove();

    //creer le formulaire
    var formElt = document.createElement("form");
    formElt.style.paddingBottom = '20px';
    formElt.id = 'ajoutData';

    var lablAuteurElt = document.createElement("label");
    lablAuteurElt.textContent = "Auteur : "
    lablAuteurElt.for = "auteur";  
    var AuteurElt = document.createElement("input");
    AuteurElt.type = 'text';
    AuteurElt.name = 'auteur';
    AuteurElt.id = 'auteur';
    AuteurElt.required="required";



    var labelTitreElt = document.createElement("label");
    labelTitreElt.textContent = " Titre : "
    labelTitreElt.for = "titre";  
    var TitreElt = document.createElement("input");
    TitreElt.type = 'text';
    TitreElt.name = 'titre';
    TitreElt.id = 'titre';
    TitreElt.required="required";


    var labelUrlElt = document.createElement("label");
    labelUrlElt.textContent = " Url : "
    labelUrlElt.for = "url";  
    var UrlElt = document.createElement("input");
    UrlElt.type = 'text';
    UrlElt.name = 'url';
    UrlElt.id = 'url';
    UrlElt.required="required";




    var addElt = document.createElement("button");
    addElt.textContent = "Ajouter";
    addElt.value = "Ajouter";
    addElt.type = "submit";
    addElt.style.marginLeft = '10px';

    
  

    formElt.appendChild(lablAuteurElt);
    formElt.appendChild(AuteurElt);
    formElt.appendChild(labelTitreElt);
    formElt.appendChild(TitreElt);
    formElt.appendChild(labelUrlElt);
    formElt.appendChild(UrlElt);
    formElt.appendChild(addElt);

    document.body.insertBefore(formElt, contenu);

  

   
        //si on click sur le button submit
        formElt.addEventListener('submit', function(e){
        //verification du contenu URL
        var url = formElt.elements.url.value;
        //si http:// ou https:// n'existe pas, on rajoute http://
        var reg = /^(http:\/\/|https:\/\/)/;
         if(!reg.test(url)){
          url = 'http://' + url;
        };
        // regexUrl expresion regulire accepte les format
        //  https://www.monsite.com
        //  http://www.monsite.com
        //  www.monsite.com
        //  monsite.com
        
        var regexUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/;
        //condition pour tester URL 
        if(!regexUrl.test(url)){

            alert('Url invalide !!');
    
        }else {
            
            //mettre les paramettre dans un tableau
            var titre = formElt.elements.titre.value;
            var auteur = formElt.elements.auteur.value;
            var newLiens = [
            {
            titre: titre,
            url: url,
            auteur: auteur
            }];
            //appler la function addSuccess() pour afficher le message.
            addSuccess(newLiens,titre);
        }
   
        e.preventDefault();
        })
}

//la function addSuccess() pour afficher le message.
function addSuccess(newLiens,titre){   
    var contenu = document.getElementById('contenu');
    // Parcours de la liste des liens et ajout d'un élément au DOM pour chaque lien
    addLien(newLiens);
    //supprimer le formulaire
    var formRemoveElt =  document.getElementById("ajoutData");
    formRemoveElt.remove();
    //creer le button pour ajouter
    creatButton() 
    //creer le message de sucssès 
    var messageElt = document.createElement('div');
    messageElt.id = 'message'
    messageElt.style.width = '60%';
    messageElt.style.length = '30px';
    messageElt.style.backgroundColor = '#ADD8E6';
    messageElt.style.color  = '#4682B4';
    messageElt.textContent = 'Le lien ' + titre  + ' a bien été ajouté.';
    messageElt.style.padding = '20px';
    messageElt.style.marginLeft = 'auto';
    messageElt.style.marginRight = 'auto';
    messageElt.style.marginTop = '10px'; 
    messageElt.style.marginBottom = '10px'; 
    //insérer le message
    var contenu = document.getElementById('contenu');
    premier_fils = contenu.firstChild;
    contenu.insertBefore(messageElt, premier_fils);

        //function pour suprimer le message 
    function supprimerMessgae() {
        var message = document.getElementById('message');
         if (message) { message.remove(); }
        
    }

    // Appelle la fonction supprimerMessgae toutes les 2 secondes (2000 millisecondes)
    if (document.getElementById('message')) { setInterval(supprimerMessgae, 2000); }
    
}


function addLien(newLiens) {
        newLiens.forEach(function (lien) {
            console.log(lien);
        var elementLien = creerElementLien(lien);
        premier_fils = contenu.firstChild;
        contenu.insertBefore(elementLien, premier_fils);
    });
}