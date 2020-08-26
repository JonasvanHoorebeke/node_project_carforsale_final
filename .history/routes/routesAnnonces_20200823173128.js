const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const annonceControllers = require('../controllers/annonceControllers.js');
const usersController = require('../controllers/usersControllers.js');
const annonceControllersApi = require ('../controllers/annonceControllersApi.js');
const userControllerApi = require ('../controllers/usersControllersApi');



// ROUTES annonces

router.get('/', annonceControllers.mainrender);

router.get('/annonce/add', annonceControllers.annonceNew);

router.post('/annonce/save', annonceControllers.annonceUpdate);

router.get('/annonce/edit/:id', annonceControllers.annonceEdit);

router.post('/annonce/update', annonceControllers.annonceUpdate);

router.get('/annonce/delete/:id', annonceControllers.annonceDelete);

router.get('/annonce/get/:id', annonceControllers.annonce);

// API ROUTES annonces

router.get('/api/annonces/all', annonceControllersApi.apiAnnoncesAll); 

router.post('/api/annonce/add', annonceControllersApi.apiAnnonceAdd); 

router.put('/api/annonce/update', annonceControllersApi.apiAnnonceUpdate); 

router.get('/api/annonce/:id', annonceControllersApi.apiAnnonce); 

router.delete('/api/annonce/delete/:id', annonceControllersApi.apiAnnonceDelete); 

//LOGIN ROUTES

router.get('/signup/now', usersControllers.signupNow);

router.post('/signup', usersControllers.signup); 

router.get('/login/now', usersControllers.loginNow);

router.post('/login', usersControllers.login); // pq post ??

router.get('/profil', usersControllers.profil);

router.get('/logout', usersControllers.logout);

router.get('/profil/update/:userId', usersControllers.profilUpdate);

router.post('/profil/update/', usersControllers.updateProfil);

//LOGIN API ROUTES

/*
router.post('/api/signup', loginControllerApi.signup); //ok

router.get('/api/login', loginControllerApi.login); //ok 

router.get('/api/profil/update/:userId', loginControllerApi.profilUpdate); //ok

router.put('/api/profil/update/', loginControllerApi.updateProfil); //ok
*/
module.exports = router;