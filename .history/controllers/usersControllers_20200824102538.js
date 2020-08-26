const mysqlConnection = require("../connection.js");
var User = require('../models/userCompte.js');

// POUR SE CONNECTER AU SITE WEB PAR SESSION
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 
   let data = {login: req.body.login, password: req.body.password};
   var login = req.body.login;
   var password = req.body.password;
   let sql="SELECT iduser, login, telephone, password FROM `users` WHERE `login`='"+login+"' and password = '"+password+"'";                           
   let query = mysqlConnection.query(sql, data,(err, results)=>{      
          if(results.length){
             req.session.id = results[0].iduser;
             req.session.isadm = results[0].isadm;
             req.session.user = results[0];
             console.log(results[0].iduser);
             res.redirect('/');
             message = 'Login réussi !';
          }
          else{
             message = 'Mauvaises informations.';
             res.render('index.ejs',{message: message});
          };
      });
};

//POUR SE DIRIGER VERS LA PAGE DE LOGIN
exports.loginNow = function(req, res){
   res.render('index.ejs', {
      message : "Connectez-vous"
   });
};

// POUR S'INSCRIRE SUR LE SITE WEB
exports.signup = function (req, res) {
   let user = new User(req.body.iduser, req.body.login, req.body.telephone, req.body.password);
   console.log(user);
   mysqlConnection.query("INSERT INTO users SET?", 
       user, function (err, results) {
           if (err) {
               res.status(400).send(error);
           } else {
               res.status(200).redirect('/');
           }
       });
   };
// POUR AFFICHER LA PAGE D'INSCRIPTION
exports.signupNow = function(req, res){
   res.render('regist.ejs', {
      message : "Inscrivez-vous"
   });
};

// POUR SE DECONNECTER DU SITE WEB
exports.logout = function(req,res){    
   req.session.destroy(function(err){  
       if(err){  
           console.log(err);  
       }  
       else  
       {  
           res.redirect('/');  
       }  
   });  
 };  
// POUR AFFICHER LES INFORMATIONS DE SON PROFIL ET LES MODIFIER
exports.profilUpdate = function (req, res) {
   const id = req.params.id;
   let sql = `Select * from users where iduser = ${id}`; 
   let query = mysqlConnection.query(sql,(err, result)=>{
       if(err) throw err;
       res.render('profilupdate.ejs',{
           title : 'Modifiez vos informations personnelles',
           users : result[0]
       });
   });
};

// POUR UPDATE LES INFORMATIONS DU PROFIL
exports.updateProfil = function (req, res) {
   let user = new User(req.body.iduser, req.body.login, req.body.telephone, req.body.password);
   console.log(user);
   mysqlConnection.query("update users SET login='"+req.body.login+"', telephone='"+req.body.telephone+"', password='"+req.body.password+"' where iduser ="+req.body.iduser,
       [user, req.body.iduser], function (err, results) {
           if (err) {
               console.log(error);
               res.status(400).send(error);
           } else {
               res.status(202).redirect('/profil');
           }
       })
};

//POUR AFFICHER LE PROFIL 
exports.profil = function(req, res, next){
	var users =  req.session.users,
	id = req.session.id;
	
	if(id == null){
		res.redirect("/login/now");
		return;
	}
	 
	 let sql="SELECT * FROM users WHERE `iduser`='"+iduser+"'";
	 
	   mysqlConnection.query(sql, function(err, results){
		   
		   console.log(results);
		   
		   res.render('profile.ejs', {users:users});	  
		  
		});	 
};
