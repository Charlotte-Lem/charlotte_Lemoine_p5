//PENSEZ A SUPP LES CONSOLE.LOG!!!!!!!!!!!!!!!!!!
//on recupère le localStorage
let purchaseStorage = JSON.parse(localStorage.getItem('produit'));
let article = '';
console.table(purchaseStorage);
//Fonction pour la Création de l'article ou l'affichage du panier vide

fetch('http://localhost:3000/api/products')
  .then((res) => res.json())
  .then((data) => {
    if (purchaseStorage) {
      for (p of purchaseStorage) {
        const product = data.find((d) => d._id === p.idProduit);
        if (product) {
          p.price = product.price;
        }
      }
    }
    getItem();
    modifyQuantity();

    console.log(data);
  });

function getItem() {
  //Affichage si panier vide
  if (purchaseStorage === null) {
    let emptyStorage = document.createElement('article');
    document.querySelector('#cart__items').appendChild(emptyStorage);
    emptyStorage.textContent = 'Votre panier est vide';
  } else {
    //si le panier n'est pas vide creation des cart article
    for (let p in purchaseStorage) {
      let article = document.createElement('article');
      document.querySelector('#cart__items').appendChild(article);
      article.classList.add('cart__item');
      article.dataset.id = purchaseStorage[p].idProduit;
      article.dataset.color = purchaseStorage[p].color;

      //creation de la div img
      let divImage = document.createElement('div');
      article.appendChild(divImage);
      divImage.classList.add('cart__item__img');

      //Insertion de l'image dans la div img
      let imageInDiv = document.createElement('img');
      divImage.appendChild(imageInDiv);
      imageInDiv.src = purchaseStorage[p].imageUrl;
      imageInDiv.alt = purchaseStorage[p].imgAlt;

      //creation de la div cart__item__content
      let divContent = document.createElement('div');
      article.appendChild(divContent);
      divContent.classList.add('cart__item__content');

      //creation de la div cart__item__content__description dans cart__item__content
      let divContentDescription = document.createElement('div');
      divContent.appendChild(divContentDescription);
      divContentDescription.classList.add('cart__item__content__description');

      //creation du h2 dans cart__item__content__description
      let divContentDescriptionH2 = document.createElement('h2');
      divContentDescription.appendChild(divContentDescriptionH2);
      divContentDescriptionH2.textContent = purchaseStorage[p].nom;

      //creation du <p></p> pour la color
      let divContentDescriptionP = document.createElement('p');
      divContentDescription.appendChild(divContentDescriptionP);
      divContentDescriptionP.textContent = purchaseStorage[p].color;

      //creation du <p></p> pour le prix
      let divContentDescriptionPrice = document.createElement('p');
      divContentDescription.appendChild(divContentDescriptionPrice);
      divContentDescriptionPrice.textContent = purchaseStorage[p].price + ' €';

      //creation de la div cart__item__content__settings dans la div cart__item__content
      let divContentSettings = document.createElement('div');
      divContent.appendChild(divContentSettings);
      divContentSettings.classList.add('cart__item__content__settings');

      //creation de la div class="cart__item__content__settings__quantity
      let divContentSettingsQuantity = document.createElement('div');
      divContentSettings.appendChild(divContentSettingsQuantity);
      divContentSettingsQuantity.classList.add(
        'cart__item__content__settings__quantity'
      );

      //creation du p dans la div cart__item__content__settings__quantity
      let divContentSettingsQuantityP = document.createElement('p');
      divContentSettingsQuantity.appendChild(divContentSettingsQuantityP);
      divContentSettingsQuantityP.textContent = 'Qté :';

      //création de <input>
      let inputQuantity = document.createElement('input');
      divContentSettingsQuantity.appendChild(inputQuantity);
      inputQuantity.setAttribute('type', 'number');
      inputQuantity.classList.add('itemQuantity');
      inputQuantity.setAttribute('name', 'itemQuantity');
      inputQuantity.setAttribute('min', '1');
      inputQuantity.setAttribute('max', '100');
      inputQuantity.setAttribute('value', purchaseStorage[p].quantity); // A REVOIR

      //création de la div cart__item__content__settings__delete
      let itemDelete = document.createElement('div');
      divContentSettings.appendChild(itemDelete);
      itemDelete.classList.add('cart__item__content__settings__delete');

      let itemDeleteP = document.createElement('p');
      itemDelete.appendChild(itemDeleteP);
      itemDeleteP.classList.add('deleteItem');
      itemDeleteP.textContent = 'Supprimer';
    }
    totalItems();
    modifyQuantity();
  }
}

//fonction pour quantité total et prix total des articles
function totalItems() {
  //Calcul de la quantité
  let eltQuantity = document.getElementsByClassName('itemQuantity');
  let quantityArray = eltQuantity.length;
  totalQuantitySelect = 0;

  for (let i = 0; i < quantityArray; i++) {
    totalQuantitySelect += eltQuantity[i].valueAsNumber;
  }
  let totalQuantityItems = document.getElementById('totalQuantity');
  totalQuantityItems.textContent = totalQuantitySelect;
  console.log(totalQuantitySelect);

  //calcul du Prix
  totalPrice = 0;
  for (let i = 0; i < quantityArray; i++) {
    totalPrice += eltQuantity[i].valueAsNumber * purchaseStorage[i].price;
  }
  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.textContent = totalPrice;
  console.log(totalPrice);
}

//fonction de modification de la quantité des produits avec addEventListener change
function modifyQuantity() {
  const modifQuantity = document.querySelectorAll('.itemQuantity');

  for (let i = 0; i < modifQuantity.length; i++) {
    addEventListener('change', function (event) {
      event.preventDefault();
      purchaseStorage[i].quantity = event.target.value;
      localStorage.setItem('produit', JSON.stringify(purchaseStorage));
      totalItems();
    });
  }
}

//fonction pour delete un Item
function deleteItem() {
  const delArticle = document.querySelector('.deleteItem');
  addEventListener('click', (e) => {
    e.preventDefault();
  });
}
//!!!!!!!!! element.closest + removeChild
// for (let k = 0; k < delItem.length; k++) {
//   delItem[k].
//   addEventListener('click', (e) => {
//     e.preventDefault();
//     purchaseStorage.filter(
//       (el) =>
//         (el.id =
//           purchaseStorage[k].idProduit ||
//           el.color == purchaseStorage[k].color)
//     );
//     localStorage.setItem('produit', JSON.stringify(purchaseStorage));
//     totalItems();
//   });
// }

deleteItem();
// //function message d'erreur pour input">
// //(regex)
// /* aide = document.querySelectorAll(".deleteItem").forEach(item => item.addEventListener("click", (e) => {*/

// function eltForm() {}
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
-la méthode Element.closest() devrait permettre de cibler le
produit que vous souhaitez supprimer (où dont vous souhaitez
modifier la quantité) grâce à son identifiant et sa couleur
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/

// let delItem = document.querySelectorAll('.deleteItem').forEach((delItem) =>
// delItem.addEventListener('click', (e) => {
//   console.log(e);
//   if (produit.idProduit === produit.idProduit) {
//   }
//   // // localStorage.setItem('produit', JSON.stringify(purchaseStorage));
//   // totalItems();
// })
// );
// }
