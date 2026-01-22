// On récupère l'id du produit séléctionné en page d'acceuil dans l'url pour l'afficher dans cette page
const product = window.location.search.split("?id=").join("");
console.log(product);

// Tableau qui contiendra les données du produit à ajouter dans le panier
let productData = [];
/*
 * Fonction asynchrone permettant de fetch un produit
 * Les données du produit iront dans la variable (tableau) productData
 */
const fetchProduct = async () => {
  await fetch(`${API_BASE_URL}/api/products/${product}`)
    .then((res) => res.json())
    .then((promise) => {
      productData = promise;
      console.log(promise);
    });
};

/*
 * Fonction asynchrone permettant d'afficher un produit
 */
const productDisplay = async () => {
  await fetchProduct();
  let images = document.getElementsByClassName("item__img");
  images[0].innerHTML = `<img id="${productData._id}" src="${productData.imageUrl}" alt="${productData.altTxt}"/>`;

  document.getElementById("title").innerHTML = `<p>${productData.name}</p>`;
  document.getElementById("price").innerHTML = `<p>${productData.price}</p>`;
  document.getElementById(
    "description"
  ).innerHTML = `<p>${productData.description}</p>`;

  // Element HTML <select> permettant de choisir la couleur
  let selectColors = document.getElementById("colors");

  productData.colors.forEach((color) => {
    let colorOption = document.createElement("option");
    colorOption.innerHTML = `${color}`;
    colorOption.value = `${color}`;
    selectColors.appendChild(colorOption);
    console.log(colorOption);
  });

  addProduct();
};
productDisplay();

/*
 * Fonction permettant d'ajouter un produit au panier
 */
const addProduct = () => {
  let button = document.getElementById("addToCart");

  button.addEventListener("click", () => {
    // la variable 'productsInStorage' représente le panier
    // On la crèe à partir de la clé 'products' du localStorage
    let productsInStorage = JSON.parse(localStorage.getItem("products")) || [];

    let selectedColor = document.getElementById("colors").value;
    let selectedQuantity = document.getElementById("quantity").value;

    ///////////////////////////////////////////////////////////////////////

    // On crèe une variable qui va contenir toutes les infos et le prix

    productDataWithoutPrice = productData;
    delete productDataWithoutPrice.price;
    /////////////////////////////////////////////////////////////////

    // on ajoute les key 'color' et quantity' dans 'productData'
    const productDataWithQuantityAndColor = Object.assign(
      {},
      productDataWithoutPrice,
      {
        color: selectedColor,
        quantity: selectedQuantity,
      }
    );
    console.log("juste en dessous : productDataWithQuantityAndColor");
    console.log(productDataWithQuantityAndColor);
    console.log("juste en dessous : productsInStorage");
    console.log(productsInStorage);

    // Si on a déjà des articles dans le panier 'productsInStorage'
    if (productsInStorage.length > 0) {
      // Variable qui permet de savoir si l'article (id et couleur) est déjà dans le panier
      productAlreadyIntoCart = false;

      let lengthOfProductInStorage = productsInStorage.length;
      // On boucle sur les articles du panier pour vérifier si l'article à ajouter n'est
      // pas déjà présent avec la même couleur
      for (let i = 0; i < lengthOfProductInStorage; i++) {
        // Si l'élément du panier sur lequel on boucle a le même id et la même couleur
        // que ce qui a été selectionné par l'user
        if (
          productsInStorage[i].color == productDataWithQuantityAndColor.color &&
          productsInStorage[i]._id == productDataWithQuantityAndColor._id
        ) {
          productsInStorage[i].quantity =
            parseInt(productsInStorage[i].quantity) +
            parseInt(productDataWithQuantityAndColor.quantity);
          productAlreadyIntoCart = true;
        }
      }

      if (!productAlreadyIntoCart) {
        productsInStorage.push(productDataWithQuantityAndColor);
      }
    } else {
      // Le panier est vide, On commence donc à le remplir
      productsInStorage.push(productDataWithQuantityAndColor);
    }
    // On met à jour (on écrase) notre panier 'products' du localStorage
    localStorage.setItem("products", JSON.stringify(productsInStorage));
    // On notifie l'utilisateur que le produit a bien été ajouté au panier
    alert("produit au panier");
  });
};
