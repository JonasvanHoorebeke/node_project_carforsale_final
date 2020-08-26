// Classe pour la création et la mise à jour d'une annonce
class Annonce {
    constructor (idannonce, marque, modele, annee, kilometrage, prix, description, photo, codepostal, idcategorie)
    {
        this.idannonce = idannonce;
        this.marque = marque;
        this.modele = modele;
        this.annee = annee;
        this.kilometrage = kilometrage;
        this.prix = prix;
        this.description = description;
        this.photo = photo;
        this.codepostal = codepostal;
        this.idcategorie = idcategorie;

    }
    
}

module.exports = Annonce;