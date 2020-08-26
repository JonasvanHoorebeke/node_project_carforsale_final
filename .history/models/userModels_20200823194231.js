class Annonce {
    constructor(idannonce, marque, modele, annee, kilometrage, prix, description)
    {
        this.idannonce = idannonce;
        this.marque = marque;
        this.modele = modele;
        this.annee = annee;
        this.kilometrage = kilometrage;
        this.prix = prix;
        this.description = description;
    }
    
};

module.exports = Annonce;



/* DKP
class User {
    lastname ="";
    firstname = "";
    constructor(lastname, firstname)
    {
        this.lastname = lastname;
        this.firstname = firstname;
    }
    
};

module.exports = User; */