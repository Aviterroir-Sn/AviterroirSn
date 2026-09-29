const form = document.getElementById("orderForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const product = document.getElementById("product").value;
    const quantity = document.getElementById("quantity").value;
    const address = document.getElementById("address").value;

    const message =
`Bonjour AviterroirSn,

Je souhaite passer une commande.

Nom : ${name}
Téléphone : ${phone}
Produit : ${product}
Quantité : ${quantity}
Adresse de livraison : ${address}

Merci.`;

    const whatsappNumber = "221783856205";

    const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(url, "_blank");
});

/* ================================
   GESTION DU STOCK
   ================================ */

const stockKey = "aviterroir_stock";

let stock = JSON.parse(localStorage.getItem(stockKey)) || [0, 0, 0, 0];

function sauvegarderStock() {
    localStorage.setItem(stockKey, JSON.stringify(stock));
}

function afficherStock() {
    let total = 0;

    stock.forEach((quantite, index) => {
        const element = document.getElementById("stock-" + index);
        const etat = document.getElementById("etat-" + index);

        if (element) {
            element.textContent = quantite;
        }

        if (etat) {
            if (quantite <= 0) {
                etat.textContent = "Rupture de stock";
            } else if (quantite <= 5) {
                etat.textContent = "Stock faible : " + quantite;
            } else {
                etat.textContent = "Disponible : " + quantite;
            }
        }

        total += quantite;
    });

    const totalElement = document.getElementById("stock-total");

    if (totalElement) {
        totalElement.textContent = total;
    }
}

function modifierStock(index, variation) {
    stock[index] += variation;

    if (stock[index] < 0) {
        stock[index] = 0;
    }

    sauvegarderStock();
    afficherStock();
}

function reinitialiserStock() {
    if (confirm("Voulez-vous vraiment remettre tout le stock à zéro ?")) {
        stock = [0, 0, 0, 0];
        sauvegarderStock();
        afficherStock();
    }
}

document.addEventListener("DOMContentLoaded", afficherStock);

