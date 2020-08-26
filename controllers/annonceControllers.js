
let mysqlConnection = require('../connection');
let Annonce = require('../models/userModels');

/* GET home page. */
exports.mainrender = function (req, res) {
  let sql = "SELECT * FROM annonce INNER JOIN categorie ON categorie.idcategorie = annonce.idcategorie";
  let query = mysqlConnection.query(sql, (err, rows) => {
      if(req.session.role === 'SuperAdmin')
      res.render('admin.ejs', {
          title : 'Annonces',
          annonce : rows
      });
      else{
      res.render('admin.ejs', {
          title :'Annonces',
          annonce : rows

      })
      }
  });
}; 

/* GET form for new annonce */
exports.annonceNew = function (req, res) {
  res.render('annonce_add', {
      title : "Vendre un véhicule"
  });
};

  /* POST form for new annonce */
  exports.annonceAdd = function (req, res) {
  let annonce = new Annonce(req.body.idannonce, req.body.marque, req.body.modele, req.body.annee, req.body.kilometrage, req.body.prix, req.body.description, req.body.photo, req.body.codepostal, req.body.categorie);
  console.log(annonce);
  mysqlConnection.query("INSERT INTO annonce SET?", 
      annonce, function (err, results) {
          if (err) {
              res.status(400).send(error);
          } else {
              res.status(200).redirect('/');
          }
      });
  };

  /* GET update annonce */
  exports.annonceUpdate = function (req, res) {
  let annonce = new Annonce(req.body.idannonce, req.body.marque, req.body.modele, req.body.annee, req.body.kilometrage, req.body.prix, req.body.description, req.body.photo, req.body.codepostal);
  console.log(annonce);
  mysqlConnection.query("UPDATE annonce SET marque='"+req.body.marque+"', modele='"+req.body.modele+"', annee='"+req.body.annee+"' where idannonce ="+req.body.idannonce,
      [annonce, req.body.idannonce], function (err, results) {
          if (err) {
              console.log(error);
              res.status(400).send(error);
          } else {
              res.status(202).redirect('/');
          }
      })
};

  /* POST update annonce */
exports.annonceEdit = function (req, res) {
  const id = req.params.id;
  let sql = `SELECT * FROM annonce WHERE idannonce = ${id} `; // idannonce = nom clé primaire dans la bd, id est lié au server
  let query = mysqlConnection.query(sql,(err, result)=>{
      if(err) throw err;
      res.render('annonce_edit',{
          title : 'Annonce',
          user : result[0]
      });
  });
};

  /* GET delete annonce */
  exports.annonceDelete = function (req, res) {
  const id = req.params.id;
  let sql = `DELETE from annonce WHERE idannonce = ${id}`; 
  let query = mysqlConnection.query(sql,(err, result)=>{
      if(err) throw err;
      res.redirect('/');
  });
};

  /* GET an annonce */
  exports.annonce = function (req, res) {
  const id = req.params.id;
  let sql = `SELECT * from annonce WHERE idannonce = ${id}`; 
  let query = mysqlConnection.query(sql,(err, result)=>{
      if(err) throw err;
      res.render('annonce_page',{
          title : 'Annonce demandée',
          annonce : result[0]
      });
  });
};