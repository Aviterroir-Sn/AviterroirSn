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
