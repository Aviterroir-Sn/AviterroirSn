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
    if (!adminConnecte) {
        alert("Accès réservé au gestionnaire.");
        return;
    }

    stock[index] += variation;

    if (stock[index] < 0) {
        stock[index] = 0;
    }

    sauvegarderStock();
    afficherStock();
}

function reinitialiserStock() {
    if (!adminConnecte) {
        alert("Accès réservé au gestionnaire.");
        return;
    }

    if (confirm("Voulez-vous vraiment remettre tout le stock à zéro ?")) {
        stock = [0, 0, 0, 0];
        sauvegarderStock();
        afficherStock();
    }
}

document.addEventListener("DOMContentLoaded", afficherStock);


/* ================================
   PROTECTION ADMIN DU STOCK
   ================================ */

const ADMIN_PASSWORD = "Poulet@2026";
let adminConnecte = sessionStorage.getItem("aviterroir_admin") === "1";

function mettreAJourAccesAdmin() {
    document.querySelectorAll(".stock-quantity button, .stock-reset").forEach(function(bouton) {
        bouton.style.display = adminConnecte ? "" : "none";
    });

    const connexion = document.getElementById("admin-login");
    const verrouillage = document.getElementById("admin-logout");
    const statut = document.getElementById("admin-status");

    if (connexion && verrouillage && statut) {
        connexion.style.display = adminConnecte ? "none" : "";
        verrouillage.style.display = adminConnecte ? "" : "none";
        statut.textContent = adminConnecte ? "🔓 Mode gestionnaire" : "🔒 Mode public";
    }
}

document.addEventListener("DOMContentLoaded", function() {

    mettreAJourAccesAdmin();

    const connexion = document.getElementById("admin-login");
    const verrouillage = document.getElementById("admin-logout");

    if (connexion) {
        connexion.addEventListener("click", function() {
            const motDePasse = prompt("Mot de passe administrateur :");

            if (motDePasse === ADMIN_PASSWORD) {
                adminConnecte = true;
                sessionStorage.setItem("aviterroir_admin", "1");
                mettreAJourAccesAdmin();
                alert("Accès gestionnaire activé.");
            } else {
                alert("Mot de passe incorrect.");
            }
        });
    }

    if (verrouillage) {
        verrouillage.addEventListener("click", function() {
            adminConnecte = false;
            sessionStorage.removeItem("aviterroir_admin");
            mettreAJourAccesAdmin();
        });
    }
});

