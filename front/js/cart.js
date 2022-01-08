////Initialisation du local storage
//let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));
 
 //fenêtre pop-up
//  const popupConfirmation = () => {
//     if (
//       window.confirm(`Votre commande de ${selectQuantity} ${article.name} ${selectColor} est ajoutée au panier
// Pour consulter votre panier, cliquez sur OK`)
//     ) {
//       window.location.href = 'cart.html';
//     }
//   };

//   //Importation dans le local storage
//   //Si le panier comporte déjà au moins 1 article
//   if (produitLocalStorage) {
//     const resultFind = produitLocalStorage.find(
//       (el) =>
//         el.idProduit === idProduct && el.couleurProduit === selectColor
//     );
//     //Si le produit commandé est déjà dans le panier
//     if (resultFind) {
//       let newQuantite =
//         parseInt(optionsProduit.quantiteProduit) +
//         parseInt(resultFind.quantiteProduit);
//       resultFind.quantiteProduit = newQuantite;
//       localStorage.setItem('produit', JSON.stringify(produitLocalStorage));
//       console.table(produitLocalStorage);
//       popupConfirmation();
//       //Si le produit commandé n'est pas dans le panier
//     } else {
//       produitLocalStorage.push(optionsProduit);
//       localStorage.setItem('produit', JSON.stringify(produitLocalStorage));
//       console.table(produitLocalStorage);
//       popupConfirmation();
//     }
//     //Si le panier est vide
//   } else {
//     produitLocalStorage = [];
//     produitLocalStorage.push(optionsProduit);
//     localStorage.setItem('produit', JSON.stringify(produitLocalStorage));
//     console.table(produitLocalStorage);
//     popupConfirmation();
// //   