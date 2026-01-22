let Products = [];
// Fonction permettant d'afficher les produits dans la page d'acceuil
const productDisplay = async () => {
  fetch(`${API_BASE_URL}/api/products`) // Récupérer les données avec fetch
    .then((res) => res.json())
    .then((promise) => {
      Products = promise;
      console.log(Products);
      let numberProducts = Products.length;
      let productsHtml = ``;
      for (let i = 0; i < numberProducts; i++) {
        // Afficher les données récupérées avec une boucle for
        productsHtml += `<a href="./product.html?id=${Products[i]._id}">
            <article>
              <img src="${Products[i].imageUrl}" alt="${Products[i].altTxt}"/>
              <h3 class="productName">${Products[i].name}</h3>
              <p class="productDescription">${Products[i].description}</p>
            </article>
          </a>`;
      }
      console.log("ici", productsHtml);

      document.getElementById("items").innerHTML = productsHtml;
      console.log(`${Products}`);
    });

  // Redirection vers la page "produit" lors du clic sur un produit affiché en page d'acceuil
  // avec affectation d'un lien dynamique en fonction de l'id du produit séléctionné

  let ahref = document.getElementsByTagName("article");
  let numberahref = ahref.length;
  console.log(ahref);
  for (let i = 0; i < numberahref; i++) {
    ahref.forEach((ahref) => {
      ahref.addEventListener("click", () => {
        innerHTML.ahref(`<a href="./product.html?id=${Products[i]._id}">`);
      });
    });
  }
};

productDisplay();
console.log(Products);
