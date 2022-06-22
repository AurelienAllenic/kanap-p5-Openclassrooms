// Récupération des informations client et produit depuis le localStorage
let cart = JSON.parse(localStorage.getItem("products"));
let user = JSON.parse(localStorage.getItem("users")).pop();

// Affectation de l'id du produit à productId
cart.forEach((element) => {
  element.productId = element._id;
});
cart = cart.map((e) => {
  return e.productId;
});
//Création de payLoad, qui va contenir les informations client et produit en même temps
let payLoad = { contact: user, products: cart };
console.log(payLoad);
// Fetch des données user vers /order avec une requête POST et ajout de celles-ci dans payLoad
const submitOrder = async () => {
  return await fetch(`http://localhost:3000/api/products/order`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payLoad),
  });
};
submitOrder();
//Suite au chargement du DOM, on récupère l'id de la zone qui contiendra le numéro de commande,
//que l'on complète avec orderId
document.addEventListener("DOMContentLoaded", () => {
  let promise = submitOrder();
  promise
    .then((res) => res.json())
    .then((result) => {
      console.log("resultat", result);
      document.getElementById("orderId").innerHTML = result.orderId;
    });
});
