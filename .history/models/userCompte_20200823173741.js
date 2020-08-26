
//CLASSE NECESSAIRE POUR LA CREATION D'UN USER
class User {
    constructor (iduser, login, telephone, password)
    {
        this.iduser = iduser;
        this.login = login;
        this.telephone = telephone;
        this.password = password;
        }
}

 module.exports = User; 