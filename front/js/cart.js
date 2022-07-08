//On commence par afficher les éléments du localStorage
let multipleProducts = [];
let productData = [];
let cart = JSON.parse(localStorage.getItem("products"));

/////// FONCTION POUR RECUPERER LES PRODUITS ////////////////
const getProducts = async () => {
  await fetch(`http://localhost:3000/api/products/`)
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
      console.log(promise);
      console.log(productData.price);
    });
};

///////// FONCTION QUI CALCULE LE PRIX AVEC LA QUANTITE /////////////////

const PriceMath = (id, quantity) => {
  let filteredRecord = productData.filter(function (item) {
    return item._id == id;
  });
  console.log("données reçues : " + id, quantity, filteredRecord);
  return filteredRecord[0].price * quantity;
};

//Fonction permettant d'afficher les produits présents dans le localStorage
const displayCart = async () => {
  console.log("test");

  if (cart) {
    await getProducts();
    console.log(productData);
    console.log(cart);
    await cart;
    /*product.price * product.quantity.toString().replace(/00/, "")*/
    console.log(cart);
    cart__items.innerHTML = cart.map(
      (product) => `<article class="cart__item" data-id="${
        product._id
      }" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        
 <p>${PriceMath(product._id, product.quantity)}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
            product.quantity
          }">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${product._id}" data-color="${
        product.color
      }" data-quantity="${product.quantity}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
</section>`
    );
    // Fonction permettant de supprimer un produit
    removeProduct();
    // Fonction permettant de modifier la quantité d'un produit
    addQuantity();
  } else {
    alert(
      "panier vide, veuillez ajouter des produits au panier pour continuer"
    );
  }
};
// Fonction permettant d'afficher le prix total du panier de manière dynamique
const displayTotalPrice = async () => {
  if (cart) {
    await getProducts();
    await cart;
    console.log(cart);
    // Calcul du prix total
    let totalPrice = 0;

    cart.forEach((productInCart) => {
      console.log(productInCart);
      totalPrice +=
        parseInt(productInCart.quantity) *
        PriceMath(productInCart._id, parseInt(productInCart.quantity));
    });
    //Insertion du HTML du prix total après que l'on ait affiché les produits du panier
    document.getElementById("cartAndFormContainer").insertAdjacentHTML(
      "afterend",
      `<div class="cart__price">
      <p>
        Total (<span id="totalQuantity">${cart.length}</span> articles) :
        <span id="totalPrice">${totalPrice}</span> €
      </p>
      </div>`
    );
  }
};
displayTotalPrice();

displayCart();
// fonction qui permet de supprimer un produit de la page panier
const removeProduct = async (displayCart) => {
  await displayCart;
  console.log("test de la fonction");

  let items = document.getElementsByClassName("deleteItem");
  console.log(items);
  let cartLength = cart.length;
  for (let item of items) {
    item.addEventListener("click", () => {
      if (cartLength == 1) {
        return (
          localStorage.removeItem("products"),
          console.log("panier vidé"),
          location.reload()
        );
      } else {
        multipleProducts = cart.filter((el) => {
          if (item.dataset.id != el._id || item.dataset.color != el.color) {
            return true;
          }
        });
        console.log(multipleProducts);
        localStorage.setItem("products", JSON.stringify(multipleProducts));
        console.log("remove du produit");
      }
      location.reload();
    });
  }
};
// Fonction permettant de prendre en compte dans le localStorage la modification d'une quantité en page panier
const addQuantity = async (displayCart) => {
  await displayCart;
  let quantitySelectors = document.querySelectorAll(".itemQuantity");
  quantitySelectors.forEach((element) => {
    element.addEventListener("change", (event) => {
      console.log(event);

      console.log(
        element.parentNode.parentNode.parentNode.parentNode.dataset.id
      );

      for (i = 0; i < cart.length; i++) {
        let datasetIdOfHtmlElement =
          element.parentNode.parentNode.parentNode.parentNode.dataset.id;
        let datasetColorOfHtmlElement =
          element.parentNode.parentNode.parentNode.parentNode.dataset.color;
        if (
          cart[i]._id == datasetIdOfHtmlElement &&
          cart[i].color == datasetColorOfHtmlElement
        ) {
          cart[i].quantity = element.value;
          localStorage.setItem("products", JSON.stringify(cart));
          location.reload();
        }
      }
    });
  });
};
addQuantity();

// Gestion du formulaire

// Récupération des id des différentes parties du formulaire
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// Récupération des messages d'erreur

const firstNameError = document.getElementById("firstNameErrorMsg");
const lastNameError = document.getElementById("lastNameErrorMsg");
const addressError = document.getElementById("addressErrorMsg");
const cityError = document.getElementById("cityErrorMsg");
const emailError = document.getElementById("emailErrorMsg");

// Récupération du bouton de confirmation

const confirm = document.getElementById("order");

// Gestion du firstName

firstName.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    firstNameError.innerHTML = "";
    valueFirstName = null;
    console.log(valueFirstName);
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    firstNameError.innerHTML =
      "Le prénom doit comporter entre 3 et 25 caractères";
    valueFirstName = null;
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    firstNameError.innerHTML = "";
    valueFirstName = e.target.value;
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    firstNameError.innerHTML =
      "le prénom ne doit pas contenir de caractère spécial (accent, chiffre)";
    console.log("caractère spécial");
  }
});

// Gestion du lastName

lastName.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    lastNameError.innerHTML = "";
    valueFirstName = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    lastNameError.innerHTML = "Le nom doit comporter entre 3 et 25 caractères";
    valueFirstName = null;
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    lastNameError.innerHTML = "";
    valueLastName = e.target.value;
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    lastNameError.innerHTML =
      "le nom ne doit pas contenir de caractère spécial (accent, chiffre)";
    console.log("caractère spécial");
  }
});

// Gestion de address

address.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    addressError.innerHTML = "";
    valueAddress = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 35) {
    addressError.innerHTML =
      "L'adresse doit comporter entre 3 et 35 caractères";
    valueAddress = null;
  }
  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/)) {
    addressError.innerHTML = "";
    valueAddress = e.target.value;
  }
  if (
    !e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 35
  ) {
    addressError.innerHTML =
      "l'adresse doit commencer par un chiffre (maximum 3) et ne doit pas contenir d'accent";
    console.log("caractère spécial");
  }
});

// Gestion de city

city.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    cityError.innerHTML = "";
    valueCity = null;
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    cityError.innerHTML =
      "Le nom de la ville doit comporter entre 3 et 25 caractères";
    valueCity = null;
  }
  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    cityError.innerHTML = "";
    valueCity = e.target.value;
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    cityError.innerHTML =
      "le nom de la ville ne doit pas contenir de caractère spécial (accent, chiffre)";
    console.log("caractère spécial");
  }
});

// Gestion du mail

email.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    emailError.innerHTML = "";
    valueEmail = null;
  } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    emailError.innerHTML = "";
    valueEmail = e.target.value;
  }
  if (
    !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    !e.target.value == 0
  ) {
    emailError.innerHTML =
      "un email doit être écrit avec un @ un . et des caractères (ex:kanap@gmail.com)";
    valueEmail = null;
  }
});

// objet contact

let users = [];
const addUser = (e) => {
  e.preventDefault(); // Empêcher le rechargement de la page lors du clic
  let user = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  users.push(user);
  document.querySelectorAll(".cart__order__form")[0].reset(); // Pour reset le form
  //Vérification de la prise en compte de la création de l'objet

  console.warn("added", { users });

  // stockage en localStorage et redirection vers la page de confirmation

  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "./confirmation.html";
};
confirm.addEventListener("click", addUser);
