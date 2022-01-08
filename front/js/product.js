//On récupere l'id du produit en question dans l'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
let article = '';

const colorSelect = document.querySelector('#colors');
const quantitySelect = document.querySelector('#quantity');

//On récupère les produits de l'API

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => getArticle(res));

//Création article des produits
function getArticle(article) {
  //Création des images
  let elementImg = document.createElement('img');
  document.querySelector('.item__img').appendChild(elementImg);
  elementImg.src = article.imageUrl;
  elementImg.Alt = article.altTxt;

  //Insertion des noms dans l'id title
  let elementTitle = document.getElementById('title');
  elementTitle.textContent = article.name;

  //Insertion des prix dans l'id price
  let elementPrice = document.getElementById('price');
  elementPrice.textContent = article.price;

  //Insertion de la description des produits dans l'id description
  let elementDescription = document.getElementById('description');
  elementDescription.textContent = article.description;

  //Insertion des différents choix de couleurs
  for (let colors of article.colors) {
    let elementsColor = document.createElement('option');
    document.querySelector('#colors').appendChild(elementsColor);
    elementsColor.value = colors;
    elementsColor.textContent = colors;
  }

  //button d'ajout des produits et écouteurs d'événement au click

  let button = document.querySelector('#addToCart');

  button.addEventListener('click', (e) => {
    //Récupération des valeurs quantité et couleurs
    let selectColor = colorSelect.value;
    let selectQuantity = quantitySelect.value;

    //Condition pour ajouter dans le panier couleur et quantité définit

    if (selectQuantity == 0 || (selectQuantity > 100 && selectColor == '')) {
      alert(
        //alert si l'utilisateur ne sélectionne pas de couleur ni de quantité
        'Veuillez renseigner une quantité comprise entre 1 et 100 et une couleur'
      );
    }

    //Récupération des options de l'article à ajouter au panier
    let produitStorage = {
      idProduit: id,
      couleurProduit: selectColor,
      quantiteProduit: Number(selectQuantity),
      nomProduit: article.name,
      prixProduit: article.price,
      descriptionProduit: article.description,
      imgProduit: article.imageUrl,
      altImgProduit: article.altTxt,
    };
    // console.log(produitStorage);

    //---------------------------LOCAL STORAGE------------------------------
    //--------------------------Stocker et récupérer des valeurs dans le local storage

    //Déclaration de la variable "produitEnregistrerDansLeLocalStorage"

    let purchaseStorage = JSON.parse(localStorage.getItem('produit'));
    console.log(purchaseStorage);

    //fenetre de confirmation

    const alertConfirmation = () => {
      if (
        window.confirm(`${article.name} de couleur ${selectColor} a bien été ajouté à votre panier
       pour consulter votre panier appuyer sur OK sinon ANNULER pour revenir à l'accueil`)
      ) {
        //envoie l'utilisateur sur la page panier
        window.location.href = 'cart.html';
      } else {
        //envoie l'utilisateur sur la page accueil
        window.location.href = 'index.html';
      }
    };

    //fonction d'ajout de produit dans le panier pour
    const addProduct = () => {
      purchaseStorage.push(produitStorage);
      localStorage.setItem('produit', JSON.stringify(purchaseStorage));
    };

    //s'il y a deja des produits d'enregistré dans le local storage
    if (purchaseStorage) {
      addProduct();
      alertConfirmation();
    }
    //s'il n'y a pas de produit enregistré dans le local storage
    else {
      purchaseStorage = [];
      addProduct();
      alertConfirmation();
    }
  });
}
