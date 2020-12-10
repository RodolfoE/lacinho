var express = require('express');
var router = express.Router();
var UsuariosController = require('../Controllers/UsuariosController');
var authController = require('../Controllers/auth');
const jwt = require('jsonwebtoken');

router.post('/login', authController.ensureLogout, async function(req, res, next) {
  try{
    const {user, email, password} = req.body;
    const dbUser = await UsuariosController.execLogin(req.knex, user, email, password);
    
    const token = jwt.sign({ id: dbUser.UserId }, process.env.SECRET, {
      expiresIn: 86400 * 1000
    });
    res.cookie('token', token, {
      maxAge: 86400 * 1000, 
      httpOnly: true,
      secure: false
    });
    res.redirect('/lacinho/home');
  } catch (err){
    res.status(500).json({message: 'Login inválido!', devErr: JSON.stringify(err)});
  }
});

router.get('/login', authController.ensureLogout, function(req, res, next) {
  res.render('login');
})


module.exports = router;
