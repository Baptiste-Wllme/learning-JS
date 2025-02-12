const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

function genererPieces(pieces){
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];
    
        const sectionFiches = document.querySelector(".fiches");
    
        const pieceElement = document.createElement("article");
    
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
    
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
    
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"}) `;
    
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie;
    
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment frerot.";
    
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "y'en a plus dommage";
    
        sectionFiches.appendChild(pieceElement);
    
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
    }
}




const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });
    console.log(piecesOrdonnees);
    });

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
const pieceFiltrees = pieces.filter(function (piece) {
    return piece.prix <= 35;
});
console.log(pieceFiltrees)
});

const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a,b) {
        return b.prix - a.prix;
    })
    console.log(piecesOrdonnees);
});
const boutonNoDescription = document.querySelector(".btn-nodesc");
boutonNoDescription.addEventListener("click", function () {
    const pieceFiltrees = pieces.filter(function (piece) {
        return piece.description
    });
    console.log(pieceFiltrees)
});

const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length-1; i >= 0; i--){
    if(pieces[i].prix > 35) {
      noms.splice[i,1];  
    }
}

const abordablesElements = document.createElement('ul');

for(let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}

document.querySelector('.abordables')
    .appendChild(abordablesElements)

const nomsDisponibles = pieces.map(piece => piece.nom)
const prixDisponible = pieces.map(piece => piece.prix)

for(let i =pieces.length-1; i>=0; i--){
    if(pieces[i].disponibilite === false){
        nomsDisponibles.splice(i,1)
        prixDisponible.splice(i,1)
    }
}

const disponiblesElement = document.createElement('ul');

for(let i=0; i<nomsDisponibles.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponible[i]} €`
    disponiblesElement.appendChild(nomElement)
}



const pElementDisponible = document.createElement('p')
pElementDisponible.innerText ="Pièces disponibles:";
document.querySelector('.disponibles').appendChild(pElementDisponible).appendChild(disponiblesElement)

const inputPrixMax = document.querySelector('#prix-max')
inputPrixMax.addEventListener("input", function (){
    const pieceFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML="";
    genererPieces(pieceFiltrees);
})